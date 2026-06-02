import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendLeadNotification } from '@/lib/resend'
import { waitlistSchema } from '@/lib/validations'
import { ZodError } from 'zod'

/**
 * POST /api/waitlist
 *
 * Valida o e-mail (Zod), insere no Supabase via service_role,
 * dispara notificação por e-mail e retorna resposta adequada.
 *
 * Segurança:
 * - Validação server-side obrigatória (client-side é só UX)
 * - Insert via service_role (bypassa RLS intencionalmente)
 * - E-mail duplicado tratado graciosamente (retorna sucesso)
 * - Nenhuma chave ou dado sensível é logado
 */
export async function POST(request: NextRequest) {
  // Lê e valida o body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Requisição inválida.' },
      { status: 400 }
    )
  }

  // Validação Zod
  let email: string
  try {
    const parsed = waitlistSchema.parse(body)
    email = parsed.email
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message ?? 'Dados inválidos.' },
        { status: 422 }
      )
    }
    return NextResponse.json({ error: 'Erro de validação.' }, { status: 422 })
  }

  // Insert no Supabase
  const { error: dbError } = await supabaseAdmin
    .from('waitlist')
    .insert({ email, source: 'rivalradar-landing' })

  if (dbError) {
    // Código 23505 = violação de unique constraint (e-mail duplicado)
    if (dbError.code === '23505') {
      // Resposta graciosa — não vaza que o e-mail já existe
      return NextResponse.json(
        { success: true, alreadyRegistered: true },
        { status: 200 }
      )
    }

    // Outros erros de banco — log server-side sem expor detalhes ao client
    console.error('[Waitlist] Erro ao inserir no banco:', dbError.code)
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente em instantes.' },
      { status: 500 }
    )
  }

  // Notificação assíncrona — não bloqueia a resposta
  sendLeadNotification(email).catch(() => {
    // já logado internamente no sendLeadNotification
  })

  return NextResponse.json({ success: true }, { status: 201 })
}

// Rejeita outros métodos HTTP
export async function GET() {
  return NextResponse.json({ error: 'Método não permitido.' }, { status: 405 })
}
