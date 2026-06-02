import { Check, Zap } from 'lucide-react'

const SOLO_FEATURES = [
  '3 concorrentes monitorados',
  'Digest semanal por e-mail',
  'Detecção de preço & feature',
  'Histórico de 30 dias',
  'Setup em menos de 5 minutos',
]

const BUILDER_FEATURES = [
  'Concorrentes ilimitados',
  'E-mail + Slack',
  'Frequência customizável (diária ou semanal)',
  'Histórico completo & export CSV',
  'Contexto "por que importa" em cada item',
  'Descoberta automática de fontes',
  'Linha do tempo por rival',
  'Suporte prioritário',
]

export default function Pricing() {
  return (
    <section
      id="preco"
      className="py-20 px-4 sm:px-6"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="eyebrow">Preço</span>
        </div>

        <h2
          id="pricing-heading"
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2"
        >
          Preço de fundador. Por tempo limitado.
        </h2>
        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-14 max-w-xl">
          Quem entra agora trava o valor do beta para sempre. Sem pegadinha.
        </p>

        <div className="reveal reveal-delay-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">

          {/* ── Plano Solo (gratuito) ── */}
          <div className="card p-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-lg text-[var(--text-primary)]">Solo</span>
                <span className="pill pill-teal">Beta gratuito</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-4xl font-extrabold text-[var(--text-primary)]">R$0</span>
                <span className="text-sm text-[var(--text-secondary)]">/mês durante o beta</span>
              </div>
              <p className="text-sm text-[var(--text-faint)] font-body">
                Perfeito pra validar. Sem cartão.
              </p>
            </div>

            <a href="#waitlist" className="btn-ghost w-full justify-center">
              Entrar na lista →
            </a>

            <ul className="flex flex-col gap-2.5" role="list">
              {SOLO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[var(--teal)]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Plano Builder (destacado) ── */}
          <div
            className="relative card p-7 flex flex-col gap-6"
            style={{
              borderColor: 'rgba(198,242,78,0.35)',
              background: 'linear-gradient(135deg, var(--panel) 0%, rgba(198,242,78,0.04) 100%)',
              boxShadow: '0 0 40px rgba(198,242,78,0.08)',
            }}
          >
            {/* Badge de destaque */}
            <div
              className="absolute -top-3 left-6 pill pill-accent"
              aria-label="Melhor valor"
            >
              <Zap size={10} aria-hidden="true" />
              Fundador — melhor valor
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 mt-2">
                <span className="font-display font-bold text-lg text-[var(--text-primary)]">Builder</span>
                <span className="pill" style={{
                  background: 'rgba(198,242,78,0.1)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(198,242,78,0.3)',
                }}>Trava pra sempre</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-4xl font-extrabold text-[var(--accent)]">R$39</span>
                <span className="text-sm text-[var(--text-secondary)]">/mês travado</span>
              </div>
              <p className="text-sm text-[var(--text-faint)] font-body">
                Quem entrar agora nunca paga mais que isso.
              </p>
            </div>

            <a
              href="#waitlist"
              className="btn-primary w-full justify-center"
              aria-label="Garantir preço de fundador no plano Builder"
            >
              Garantir preço de fundador →
            </a>

            <ul className="flex flex-col gap-2.5" role="list">
              {BUILDER_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nota de rodapé */}
        <p className="reveal reveal-delay-4 mt-8 text-xs font-mono text-[var(--text-faint)] text-center">
          // sem contrato · cancela quando quiser · migra de plano com 1 clique
        </p>
      </div>
    </section>
  )
}
