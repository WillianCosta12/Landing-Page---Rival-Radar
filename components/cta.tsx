import WaitlistForm from './hero/waitlist-form'

export default function CtaFinal() {
  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Glow decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[400px] rounded-full"
          style={{ background:'radial-gradient(ellipse, rgba(198,242,78,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-2xl mx-auto text-center relative">
        <div className="reveal flex items-center justify-center gap-2 mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          <span className="eyebrow">lista de espera</span>
        </div>

        <h2 id="cta-heading" className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
          <span style={{
            background:'linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 50%, var(--teal) 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
          }}>
            Seu concorrente mudou algo esta semana.
          </span>
          <br />
          <span className="text-[var(--text-secondary)] text-3xl sm:text-4xl">Você ainda não sabe.</span>
        </h2>

        <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-8 max-w-lg mx-auto">
          Enquanto você lê isso, changelogs estão sendo publicados.
          Entre na lista agora e nunca mais descubra mudanças pelo seu cliente.
        </p>

        {/* Form */}
        <div className="reveal reveal-delay-3 flex justify-center">
          <div className="w-full max-w-md">
            <WaitlistForm variant="cta" />
          </div>
        </div>

        {/* Risk reversal */}
        <p className="reveal reveal-delay-4 mt-6 text-xs text-[var(--text-faint)] font-mono">
          // sem cartão · cancela quando quiser · acesso antecipado gratuito
        </p>
      </div>
    </section>
  )
}
