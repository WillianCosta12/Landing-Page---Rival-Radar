const TESTIMONIALS = [
  {
    quote: 'Em 3 semanas de beta, o RivalRadar me avisou que meu maior concorrente removeu o plano gratuito. Mudei minha estratégia de pricing antes de qualquer cliente perceber.',
    name: 'Marcos V.',
    role: 'Founder, SaaS de RH',
    avatar: 'M',
    color: '#c6f24e',
    metric: '1 mudança de pricing detectada',
    metricColor: '#c6f24e',
  },
  {
    quote: 'Antes eu gastava umas 4h por semana abrindo aba por aba. Agora recebo um e-mail toda segunda com exatamente o que mudou. Parece óbvio que deveria existir isso.',
    name: 'Rebeca T.',
    role: 'Product Manager, Fintech',
    avatar: 'R',
    color: '#3dd7b0',
    metric: '4h/semana de volta',
    metricColor: '#3dd7b0',
  },
  {
    quote: 'Descobri que um concorrente lançou no Product Hunt enquanto eu dormia — o radar me avisou antes de qualquer pessoa do meu time. Isso muda o jogo.',
    name: 'Lucas M.',
    role: 'Solo founder, DevTools',
    avatar: 'L',
    color: '#ffaa50',
    metric: 'Alerta em tempo real',
    metricColor: '#ffaa50',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--purple)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color:'var(--purple)' }}>O que dizem os beta testers</span>
        </div>

        <h2 id="testimonials-heading" className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-12">
          Quem já usa, não volta<br />pra tocaia manual.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i+1} card-gradient-border spotlight-card card p-6 flex flex-col gap-5`}
            >
              {/* Quote marks */}
              <div className="text-4xl font-display leading-none" style={{ color: t.color, opacity: 0.4 }} aria-hidden="true">
                "
              </div>

              <blockquote className="text-sm text-[var(--text-secondary)] font-body leading-relaxed flex-1 -mt-4">
                {t.quote}
              </blockquote>

              {/* Metric highlight */}
              <div className="rounded-lg px-3 py-2" style={{ background:`${t.color}10`, border:`1px solid ${t.color}25` }}>
                <span className="text-xs font-mono font-semibold" style={{ color: t.color }}>
                  ↗ {t.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-[var(--border)]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: t.color, color: '#060807' }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-xs text-[var(--text-faint)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
