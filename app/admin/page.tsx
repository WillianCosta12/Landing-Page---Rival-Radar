import { supabaseAdmin } from '@/lib/supabase'
import { Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Lead {
  id: string
  email: string
  source: string
  created_at: string
}

export default async function AdminPage() {
  const { data, count, error } = await supabaseAdmin
    .from('waitlist')
    .select('id, email, source, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })

  const leads: Lead[] = data ?? []

  return (
    <div style={{ background: '#060807', minHeight: '100vh', color: '#edf0ea', fontFamily: 'var(--font-hanken, system-ui)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(198,242,78,0.12)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#c6f24e',
              boxShadow: '0 0 8px rgba(198,242,78,0.8)',
            }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c6f24e', fontFamily: 'monospace' }}>
              RivalRadar · Admin
            </span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Dashboard de Leads
          </h1>
        </div>

        <a
          href="/api/admin/leads?format=csv"
          download
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#c6f24e', color: '#060807',
            padding: '8px 16px', borderRadius: 6,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}
        >
          <Download size={15} />
          Exportar CSV
        </a>
      </div>

      {/* Stats */}
      <div style={{ padding: '24px 32px', display: 'flex', gap: 16 }}>
        {[
          { label: 'Total de leads', value: count ?? 0, color: '#c6f24e' },
          { label: 'Esta semana', value: leads.filter(l => {
            const d = new Date(l.created_at)
            const now = new Date()
            const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
            return diff <= 7
          }).length, color: '#3dd7b0' },
          { label: 'Hoje', value: leads.filter(l => {
            const d = new Date(l.created_at)
            const now = new Date()
            return d.toDateString() === now.toDateString()
          }).length, color: '#ffaa50' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#0f1410', border: '1px solid rgba(198,242,78,0.1)',
            borderRadius: 12, padding: '16px 24px', flex: 1,
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#4a574a', marginTop: 4, fontFamily: 'monospace' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Erro */}
      {error && (
        <div style={{ margin: '0 32px', padding: 12, background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: 8, color: '#ff8080', fontSize: 14 }}>
          Erro ao carregar leads: {error.message}
        </div>
      )}

      {/* Tabela */}
      <div style={{ padding: '0 32px 32px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(198,242,78,0.12)' }}>
              {['E-mail', 'Fonte', 'Data de cadastro', 'ID'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '10px 12px',
                  color: '#4a574a', fontSize: 11,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'monospace', fontWeight: 600,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={lead.id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                <td style={{ padding: '12px', color: '#edf0ea', fontWeight: 500 }}>
                  {lead.email}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: 'rgba(198,242,78,0.08)', color: '#c6f24e',
                    border: '1px solid rgba(198,242,78,0.2)',
                    borderRadius: 4, padding: '2px 8px',
                    fontSize: 11, fontFamily: 'monospace',
                  }}>
                    {lead.source}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#8a9b8a', fontFamily: 'monospace', fontSize: 12 }}>
                  {new Date(lead.created_at).toLocaleString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                    timeZone: 'America/Sao_Paulo',
                  })}
                </td>
                <td style={{ padding: '12px', color: '#4a574a', fontFamily: 'monospace', fontSize: 11 }}>
                  {lead.id.slice(0, 8)}…
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#4a574a', fontFamily: 'monospace' }}>
            // nenhum lead ainda — compartilhe a landing page!
          </div>
        )}
      </div>
    </div>
  )
}
