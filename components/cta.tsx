import WaitlistForm from './hero/waitlist-form'

export default function CtaFinal() {
  return (
    <section
      className="py-24 px-4 sm:px-6"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="reveal flex items-center justify-center gap-2 mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="eyebrow">Última chamada</span>
        </div>

        {/* Headline com FOMO */}
        <h2
          id="cta-heading"
          className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4 leading-tight"
        >
          Seu concorrente mudou algo{' '}
          <span className="text-[var(--accent)]">esta semana.</span>
          <br />Você viu?
        </h2>

        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-10 max-w-lg mx-auto">
          Enquanto você lê isso, os changelogs estão atualizando. Entre na lista e
          nunca mais descubra pelo cliente que o concorrente lançou algo importante.
        </p>

        {/* Urgência */}
        <div className="reveal reveal-delay-3 flex items-center justify-center gap-2 mb-8">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(198,242,78,0.2)', background: 'rgba(198,242,78,0.05)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Beta com vagas limitadas · <span className="text-[var(--accent)]">47 pessoas na fila</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="reveal reveal-delay-4 flex justify-center">
          <div className="w-full max-w-md">
            <WaitlistForm variant="cta" />
          </div>
        </div>
      </div>
    </section>
  )
}
