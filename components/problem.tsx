import { Clock, Zap, AlertTriangle } from 'lucide-react'
import SpotlightCard from './spotlight-card'

export default function Problem() {
  return (
    <section id="problema" className="py-20 px-4 sm:px-6" aria-labelledby="problem-heading">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--red)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color:'var(--red)' }}>O problema que você ignora</span>
        </div>

        <h2 id="problem-heading" className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] mb-4 max-w-2xl">
          Quantas horas por semana{' '}
          <span className="text-[var(--text-faint)]">você gasta de tocaia?</span>
        </h2>

        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] text-lg max-w-xl mb-6 font-body">
          Enquanto isso, seu concorrente não para de lançar. E quando você descobre que ele mudou o preço ou lançou aquela feature que os seus usuários pedem faz 6 meses —{' '}
          <strong className="text-[var(--text-primary)]">já é tarde demais.</strong>
        </p>

        {/* Banner de alerta */}
        <div className="reveal reveal-delay-3 flex items-start gap-3 px-4 py-3 rounded-xl border border-[rgba(255,107,107,0.2)] bg-[rgba(255,107,107,0.05)] mb-12 max-w-xl">
          <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-[var(--text-secondary)] font-body">
            <strong className="text-red-400">O pior jeito de descobrir:</strong> pelo próprio cliente — quando o negócio já foi perdido.
          </p>
        </div>

        {/* Cards de contraste */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card dor */}
          <SpotlightCard className="card p-7 flex flex-col gap-5" aria-label="Situação atual">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(255,107,107,0.1)', border:'1px solid rgba(255,107,107,0.2)' }}>
                <Clock size={22} color="#ff6b6b" aria-hidden="true" />
              </div>
              <div>
                <div className="font-display text-5xl font-extrabold leading-none mb-1" style={{ color:'#ff6b6b' }}>~3h</div>
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider">estimativa comum</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">Tocaia manual — o jeito atual</h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {[
                  'Abre 10 abas, esquece metade no dia seguinte',
                  'Faz print de tela, cola em doc, perde no Drive',
                  'Changelog atualiza às 2h da manhã sem você ver',
                  'Concorrente muda preço e você descobre pelo cliente',
                  'Análise vira tarefa adiada para "semana que vem"',
                  'Lançamento no Product Hunt passa batido',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 shrink-0 text-red-400" aria-hidden="true">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* Card solução */}
          <SpotlightCard
            className="card p-7 flex flex-col gap-5 relative overflow-hidden"
            aria-label="Com RivalRadar"
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
              style={{ background:'linear-gradient(135deg, var(--panel) 0%, rgba(198,242,78,0.04) 100%)' }} />
            <div className="absolute top-4 right-4 pill pill-accent" aria-label="Recomendado">
              Com RivalRadar
            </div>

            <div className="flex items-start gap-4 relative">
              <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(198,242,78,0.1)', border:'1px solid rgba(198,242,78,0.2)' }}>
                <Zap size={22} color="#c6f24e" aria-hidden="true" />
              </div>
              <div>
                <div className="font-display text-5xl font-extrabold leading-none mb-1 text-[var(--accent)]">5min</div>
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider">de digest semanal</div>
              </div>
            </div>

            <div className="relative">
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">O radar faz tudo por você</h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {[
                  'Radar varre automaticamente toda semana',
                  'Só o delta — sem repetir o que já era assim',
                  'Contexto estratégico: "por que isso importa pra você"',
                  'Chega no e-mail ou Slack, sem abrir nada',
                  'Histórico completo de cada rival ao longo do tempo',
                  'Alerta imediato quando a varredura encontra algo crítico',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
