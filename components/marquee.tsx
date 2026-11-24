// Exemplos ilustrativos com empresas fictícias — não são detecções reais.
const ITEMS = [
  { type:'PREÇO',    color:'#ff8080', text:'Acme subiu plano Pro de US$29 → US$39/mês' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Beedo lançou integração nativa com Slack' },
  { type:'PH',       color:'#ffaa50', text:'Cortex ficou em #2 do dia no Product Hunt' },
  { type:'PREÇO',    color:'#ff8080', text:'Nimbo removeu o plano gratuito' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Kandu liberou export CSV em todos os planos' },
  { type:'CHANGELOG',color:'#c6f24e', text:'Orbita publicou a v3.2 com API pública' },
  { type:'PH',       color:'#ffaa50', text:'Tramo lançou extensão para VS Code' },
  { type:'PREÇO',    color:'#ff8080', text:'Vexa aumentou a taxa de onboarding em 40%' },
  { type:'FEATURE',  color:'#3dd7b0', text:'Zanzo lançou modo offline no app mobile' },
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS] // duplica para loop perfeito

  return (
    <div
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--panel)] py-3"
      aria-label="Exemplos fictícios do tipo de mudança que o radar detecta"
    >
      {/* Gradientes de fade nas bordas */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background:'linear-gradient(90deg, var(--panel), transparent)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background:'linear-gradient(-90deg, var(--panel), transparent)' }} aria-hidden="true" />

      {/* Eyebrow fixo à esquerda */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-2" aria-hidden="true">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span className="eyebrow text-[0.6rem]">Exemplos</span>
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
