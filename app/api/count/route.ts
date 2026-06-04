import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * GET /api/count
 * Retorna o número total de leads na waitlist.
 * Cached por 60s na edge — evita flood de requests.
 */
export const revalidate = 60

export async function GET() {
  const { count, error } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('[Count] Erro ao buscar count:', error.code)
    return NextResponse.json({ count: null }, { status: 500 })
  }

  return NextResponse.json({ count }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}
