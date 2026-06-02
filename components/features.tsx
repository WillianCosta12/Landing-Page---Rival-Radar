import {
  ScanSearch,
  DollarSign,
  Webhook,
  Globe,
  Clock,
  Lightbulb,
} from 'lucide-react'

const FEATURES = [
  {
    icon: ScanSearch,
    title: 'Detecção de diff de verdade',
    desc: 'Não é scraping ingênuo. O agente compara versões, detecta mudanças semânticas e filtra ruído antes de te notificar.',
    color: 'var(--accent)',
    bg: 'rgba(198,242,78,0.07)',
  },
  {
    icon: DollarSign,
    title: 'Foco em preço & feature',
    desc: 'As duas mudanças que mais impactam sua estratégia têm detecção especializada — incluindo tiers, limites e condições.',
    color: 'var(--teal)',
    bg: 'rgba(61,215,176,0.07)',
  },
  {
    icon: Webhook,
    title: 'E-mail ou Slack',
    desc: 'O digest chega onde você já está. Sem app novo pra baixar, sem dashboard pra lembrar de abrir.',
    color: 'var(--accent)',
    bg: 'rgba(198,242,78,0.07)',
  },
  {
    icon: Globe,
    title: 'Descoberta automática de fontes',
    desc: 'Você passa a URL. O radar encontra changelog, blog, release notes e página de preços sozinho.',
    color: 'var(--teal)',
    bg: 'rgba(61,215,176,0.07)',
  },
  {
    icon: Clock,
    title: 'Linha do tempo do rival',
    desc: 'Histórico completo de tudo que mudou desde que você começou a monitorar. Padrões emergem com o tempo.',
    color: 'var(--accent)',
    bg: 'rgba(198,242,78,0.07)',
  },
  {
    icon: Lightbulb,
    title: '"Por que importa" — não só o quê',
    desc: 'Cada mudança vem com contexto estratégico: o que isso significa pra você, pro seu roadmap, pro seu preço.',
    color: 'var(--teal)',
    bg: 'rgba(61,215,176,0.07)',
  },
]

export default function Features() {
  return (
    <section
      className="py-20 px-4 sm:px-6"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color: 'var(--teal)' }}>O que torna diferente</span>
        </div>

        <h2
          id="features-heading"
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4"
        >
          Inteligência, não apenas dados.
        </h2>
        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg max-w-xl mb-14">
          Qualquer script raspa dados. O RivalRadar transforma dados em insight acionável.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className={`reveal reveal-delay-${(i % 4) + 1} card p-6 flex flex-col gap-4`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: f.bg, border: `1px solid ${f.color}22` }}
                  aria-hidden="true"
                >
                  <Icon size={18} color={f.color} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] mb-1.5 text-base">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
