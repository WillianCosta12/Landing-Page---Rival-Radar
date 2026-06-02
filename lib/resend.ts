import { Resend } from 'resend'

/**
 * Client Resend para envio de notificações.
 * ⚠️  Server-side only — nunca expor RESEND_API_KEY ao client.
 */
function createResendClient() {
  const key = process.env.RESEND_API_KEY

  if (!key) {
    // Não quebra o build — log de aviso apenas
    console.warn('[Resend] RESEND_API_KEY não configurada. E-mails desabilitados.')
    return null
  }

  return new Resend(key)
}

export const resend = createResendClient()

/**
 * Envia notificação de novo lead para o dono do produto.
 * Falha silenciosa — não bloqueia o cadastro no banco.
 */
export async function sendLeadNotification(email: string): Promise<void> {
  if (!resend) return

  const to = process.env.NOTIFICATION_EMAIL
  if (!to) {
    console.warn('[Resend] NOTIFICATION_EMAIL não configurado.')
    return
  }

  try {
    await resend.emails.send({
      from: 'RivalRadar <onboarding@resend.dev>', // trocar pelo domínio verificado depois
      to,
      subject: '🎯 Novo lead no RivalRadar',
      html: `
        <div style="font-family: monospace; background: #0a0c0b; color: #edf0ea; padding: 24px; border-radius: 12px; border: 1px solid rgba(198,242,78,0.2);">
          <h2 style="color: #c6f24e; margin: 0 0 16px;">RivalRadar · Novo lead</h2>
          <p style="color: #9aa39a; margin: 0 0 8px;">E-mail cadastrado na waitlist:</p>
          <p style="color: #edf0ea; font-size: 18px; margin: 0 0 24px;">${email}</p>
          <p style="color: #5d655d; font-size: 12px; margin: 0;">
            // ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
          </p>
        </div>
      `,
    })
  } catch (err) {
    // Falha silenciosa — o cadastro no banco já ocorreu
    console.error('[Resend] Falha ao enviar notificação:', err)
  }
}
