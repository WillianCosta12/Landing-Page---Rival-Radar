import { Check, Zap, Lock } from 'lucide-react'
import SpotlightCard from './spotlight-card'

const SOLO = ['3 concorrentes monitorados','Digest semanal por e-mail','Detecção de preço & feature','Histórico de 30 dias','Setup em 5 minutos']
const BUILDER = ['Concorrentes ilimitados','E-mail + Slack','Frequência customizável','Histórico completo & export CSV','Contexto "por que importa"','Descoberta automática de fontes','Linha do tempo por rival','Suporte prioritário']
const SPOTS_TAKEN = 38
const SPOTS_TOTAL = 50

export default function Pricing() {
  const pct = Math.round((SPOTS_TAKEN / SPOTS_TOTAL) * 100)

  return (
    <section id="preco" className="py-20 px-4 sm:px-6" aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="eyebrow">Preço</span>
        </div>

        <h2 id="pricing-heading" className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2">
          Preço de fundador. Por tempo limitado.
        </h2>
        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-10 max-w-xl">
          Quem entra agora trava o valor do beta <strong className="text-[var(--text-primary)]">para sempre</strong>. Sem pegadinha, sem asterisco.
        </p>

        {/* Barra de escassez */}
        <div className="reveal reveal-delay-3 mb-10 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-[var(--text-secondary)]">
              Vagas Builder preenchidas
            </span>
            <span className="text-sm font-mono text-[var(--accent)] font-semibold">
              {SPOTS_TAKEN}/{SPOTS_TOTAL} vagas
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--panel-2)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width:`${pct}%`,
                background:'linear-gradient(90deg, var(--accent), var(--teal))',
              }}
              role="progressbar"
              aria-valuenow={SPOTS_TAKEN}
              aria-valuemin={0}
              aria-valuemax={SPOTS_TOTAL}
              aria-label={`${SPOTS_TAKEN} de ${SPOTS_TOTAL} vagas preenchidas`}
            />
          </div>
          <p className="text-xs text-[var(--text-faint)] font-mono mt-1.5">
            // apenas {SPOTS_TOTAL - SPOTS_TAKEN} vagas com preço travado restantes
          </p>
        </div>

        <div className="reveal reveal-delay-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {/* Solo */}
          <SpotlightCard className="card p-7 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-lg text-[var(--text-primary)]">Solo</span>
                <span className="pill pill-teal">Beta gratuito</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-5xl font-extrabold text-[var(--text-primary)]">R$0</span>
                <span className="text-sm text-[var(--text-secondary)]">/mês durante o beta</span>
              </div>
              <p className="text-sm text-[var(--text-faint)]">Perfeito pra validar. Sem cartão.</p>
            </div>
            <a href="#waitlist" className="btn-ghost w-full justify-center">
              Entrar na lista →
            </a>
            <ul className="flex flex-col gap-2.5" role="list">
              {SOLO.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[var(--teal)]" aria-hidden="true" />{f}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          {/* Builder — destacado */}
          <SpotlightCard
            className="card-gradient-border card p-7 flex flex-col gap-5 relative"
            aria-label="Plano Builder — melhor valor"
          >
            {/* Badge dentro do card — evita problemas de overflow na cadeia pai */}
            <div className="flex items-center gap-1.5 pill pill-accent self-start -mt-1 mb-1">
              <Zap size={10} aria-hidden="true" />
              Fundador — melhor valor
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-lg text-[var(--text-primary)]">Builder</span>
                <div className="flex items-center gap-1 pill" style={{ background:'rgba(198,242,78,0.08)', color:'var(--accent)', border:'1px solid rgba(198,242,78,0.25)' }}>
                  <Lock size={10} aria-hidden="true" />
                  Travado pra sempre
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-5xl font-extrabold text-[var(--accent)]">R$39</span>
                <span className="text-sm text-[var(--text-secondary)]">/mês travado</span>
              </div>
              <p className="text-sm text-[var(--text-faint)]">Quem entra agora nunca paga mais.</p>
            </div>

            <a href="#waitlist" className="btn-primary btn-primary-glow w-full justify-center">
              Garantir preço de fundador →
            </a>

            <ul className="flex flex-col gap-2.5" role="list">
              {BUILDER.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />{f}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>

        <p className="reveal reveal-delay-5 mt-6 text-xs font-mono text-[var(--text-faint)]">
          // sem contrato · cancela quando quiser · migra de plano com 1 clique
        </p>
      </div>
    </section>
  )
}
