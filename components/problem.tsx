import { Clock, Zap } from 'lucide-react'

export default function Problem() {
  return (
    <section
      id="problema"
      className="py-20 px-4 sm:px-6"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="eyebrow">O problema</span>
        </div>

        {/* Headline */}
        <h2
          id="problem-heading"
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] mb-4 max-w-2xl"
        >
          Você não tem 3 horas por semana{' '}
          <span className="text-[var(--text-faint)]">pra ficar de tocaia.</span>
        </h2>

        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] text-lg max-w-xl mb-14 font-body">
          Todo founder abre uma aba pra checar o site do concorrente. Depois outra.
          Depois esquece. Quando lembra, a feature já foi lançada, o preço já subiu
          e o cliente já perguntou por que a concorrência faz isso e você não.
        </p>

        {/* Cards de contraste */}
        <div className="reveal reveal-delay-3 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card: dor */}
          <div
            className="card card-teal p-8 flex flex-col gap-6"
            aria-label="Situação atual: tocaia manual"
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)' }}
                aria-hidden="true"
              >
                <Clock size={22} color="#ff6060" />
              </div>
              <div>
                <div
                  className="font-display text-5xl font-extrabold leading-none mb-1"
                  style={{ color: '#ff6060' }}
                >
                  ~3h
                </div>
                <div className="text-sm font-mono text-[var(--text-faint)] uppercase tracking-wider">por semana</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 font-body">Tocaia manual</h3>
              <ul className="flex flex-col gap-2" role="list">
                {[
                  'Abre 10 abas, esquece metade',
                  'Printa tela, cola em doc, perde no Drive',
                  'Changelog atualiza sem você ver',
                  'Concorrente muda preço e você descobre pelo cliente',
                  'Análise vira tarefa adiada eternamente',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="mt-1 text-[#ff6060] shrink-0" aria-hidden="true">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card: solução */}
          <div
            className="card p-8 flex flex-col gap-6 relative overflow-hidden"
            style={{
              borderColor: 'rgba(198,242,78,0.25)',
              background: 'linear-gradient(135deg, var(--panel) 0%, rgba(198,242,78,0.03) 100%)',
            }}
            aria-label="Com RivalRadar: 5 minutos"
          >
            {/* Badge */}
            <div
              className="absolute top-4 right-4 pill pill-accent"
              aria-label="Recomendado"
            >
              Com RivalRadar
            </div>

            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(198,242,78,0.1)', border: '1px solid rgba(198,242,78,0.2)' }}
                aria-hidden="true"
              >
                <Zap size={22} color="var(--accent)" />
              </div>
              <div>
                <div className="font-display text-5xl font-extrabold leading-none mb-1 text-[var(--accent)]">
                  5min
                </div>
                <div className="text-sm font-mono text-[var(--text-faint)] uppercase tracking-wider">digest semanal</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3 font-body">Agente faz por você</h3>
              <ul className="flex flex-col gap-2" role="list">
                {[
                  'Radar varre automaticamente toda semana',
                  'Só o que mudou — sem ruído, sem repetição',
                  'Contexto "por que importa" em cada item',
                  'Chega no seu e-mail ou Slack, sem abrir nada',
                  'Histórico completo de cada rival ao longo do tempo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="mt-1 text-[var(--accent)] shrink-0" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
