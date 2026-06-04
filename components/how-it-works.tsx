import { UserPlus, ScanLine, Inbox } from 'lucide-react'
import SpotlightCard from './spotlight-card'

const STEPS = [
  { n:'01', icon:UserPlus, title:'Cadastre os rivais', desc:'Adicione a URL dos seus concorrentes. O radar descobre automaticamente as fontes relevantes — changelog, preços, Product Hunt, release notes.', pill:'Setup único', pillClass:'pill-accent' },
  { n:'02', icon:ScanLine, title:'O radar varre',      desc:'Toda semana o agente visita cada fonte, detecta o que mudou semanticamente e descarta ruído. Zero trabalho manual da sua parte.',          pill:'100% automático', pillClass:'pill-teal'   },
  { n:'03', icon:Inbox,    title:'Recebe o diff',      desc:'Um digest acionável chega no seu e-mail ou Slack com só o que mudou — e por que aquilo importa pra você, pro seu produto e pro seu preço.', pill:'Acionável', pillClass:'pill-accent'   },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6" aria-labelledby="how-heading">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color:'var(--teal)' }}>Como funciona</span>
        </div>

        <h2 id="how-heading" className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
          Três passos. Depois é só ler.
        </h2>
        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg max-w-lg mb-14">
          O único trabalho manual é o setup inicial de 5 minutos. O resto acontece enquanto você constrói seu produto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Conector visual */}
          <div className="hidden md:block absolute top-12 left-[33%] right-[33%] h-px"
            style={{ background:'linear-gradient(90deg, rgba(198,242,78,0.2), rgba(61,215,176,0.2))' }}
            aria-hidden="true" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <SpotlightCard
                key={step.n}
                className={`reveal reveal-delay-${i+1} card-gradient-border card p-7 flex flex-col gap-5 group`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold leading-none"
                    style={{ color:'rgba(198,242,78,0.12)' }} aria-hidden="true">
                    {step.n}
                  </span>
                  <span className={`pill ${step.pillClass}`}>{step.pill}</span>
                </div>

                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background:'rgba(198,242,78,0.08)', border:'1px solid var(--border)' }} aria-hidden="true">
                  <Icon size={20} color="#c6f24e" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed">{step.desc}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
