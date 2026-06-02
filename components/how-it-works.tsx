import { UserPlus, Radar as RadarIcon, Inbox } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: UserPlus,
    title: 'Cadastre os rivais',
    desc: 'Adicione URL, nome e o que quer monitorar. Feito isso, pode esquecer — o radar cuida do resto.',
    pill: 'Setup único',
    pillClass: 'pill-accent',
  },
  {
    n: '02',
    icon: RadarIcon,
    title: 'O radar varre',
    desc: 'Toda semana o agente visita changelog, Product Hunt, página de preços, release notes e blog de cada rival.',
    pill: 'Automatizado',
    pillClass: 'pill-teal',
  },
  {
    n: '03',
    icon: Inbox,
    title: 'Recebe o diff',
    desc: 'Um digest acionável chega no seu e-mail ou Slack com só o que mudou — e por que aquilo importa pra você.',
    pill: 'Acionável',
    pillClass: 'pill-accent',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-20 px-4 sm:px-6"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color: 'var(--teal)' }}>Como funciona</span>
        </div>

        <h2
          id="how-heading"
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4"
        >
          Três passos. Depois é só ler.
        </h2>
        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] max-w-lg mb-14 font-body text-lg">
          O único trabalho manual é o setup inicial. O restante acontece enquanto você dorme.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Linha conectora (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px"
            style={{ background: 'linear-gradient(90deg, var(--border), var(--border-teal), var(--border))' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.n}
                className={`reveal reveal-delay-${i + 1} card p-6 flex flex-col gap-4 relative`}
              >
                {/* Número */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-display text-4xl font-extrabold leading-none"
                    style={{ color: 'rgba(198,242,78,0.15)' }}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  <span className={`pill ${step.pillClass}`}>{step.pill}</span>
                </div>

                {/* Ícone */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(198,242,78,0.08)', border: '1px solid var(--border)' }}
                  aria-hidden="true"
                >
                  <Icon size={18} color="var(--accent)" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">
                    {step.desc}
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
