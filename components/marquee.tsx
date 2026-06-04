const ITEMS = [
  { type:'PREÇO',    color:'#ff8080', text:'Stripe subiu plano Growth de $499 → $649/mês' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Notion lançou IA nativa em todos os planos' },
  { type:'PH',       color:'#ffaa50', text:'Linear atingiu #1 do dia no Product Hunt · 890 upvotes' },
  { type:'PREÇO',    color:'#ff8080', text:'Intercom removeu plano gratuito sem aviso' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Vercel lançou Analytics sem limites no plano Pro' },
  { type:'CHANGELOG',color:'#c6f24e', text:'Supabase anunciou branching em produção' },
  { type:'PH',       color:'#ffaa50', text:'Cursor lançou extensão para VS Code · #3 do dia' },
  { type:'PREÇO',    color:'#ff8080', text:'HubSpot aumentou preço de onboarding em 40%' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Figma lançou variáveis de design para todos' },
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS] // duplica para loop perfeito

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--panel)] py-3"
      aria-label="Mudanças detectadas recentemente pelo radar"
    >
      {/* Gradientes de fade nas bordas */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background:'linear-gradient(90deg, var(--panel), transparent)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background:'linear-gradient(-90deg, var(--panel), transparent)' }} aria-hidden="true" />

      {/* Eyebrow fixo à esquerda */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span className="eyebrow text-[0.6rem]">Ao vivo</span>
      </div>

      <div className="marquee-track pl-40">
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 shrink-0">
            <span
              className="pill shrink-0"
              style={{
                background: `${item.color}18`,
                color: item.color,
                border: `1px solid ${item.color}33`,
              }}
            >
              {item.type}
            </span>
            <span className="text-sm text-[var(--text-secondary)] font-body whitespace-nowrap">
              {item.text}
            </span>
            <span className="text-[var(--text-faint)] mx-2" aria-hidden="true">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}
