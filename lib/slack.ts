/**
 * Notificação Slack via Incoming Webhook.
 * Configure SLACK_WEBHOOK_URL no .env.local.
 *
 * Para criar um webhook:
 * 1. https://api.slack.com/apps → Create New App → From scratch
 * 2. Incoming Webhooks → Activate → Add New Webhook to Workspace
 * 3. Copie a URL e adicione como SLACK_WEBHOOK_URL
 */
export async function sendSlackLeadNotification(email: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return // Silencioso se não configurado

  const payload = {
    text: '🎯 *Novo lead no RivalRadar!*',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🎯 *Novo lead na waitlist!*\n\n*E-mail:* \`${email}\`\n*Horário:* ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: 'RivalRadar · rivalradar.vercel.app',
          },
        ],
      },
    ],
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.warn('[Slack] Webhook retornou status inesperado:', res.status)
    }
  } catch (err) {
    // Falha silenciosa — não bloqueia o cadastro
    console.error('[Slack] Falha ao notificar:', err)
  }
}
