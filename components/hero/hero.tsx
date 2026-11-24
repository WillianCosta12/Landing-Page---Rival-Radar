'use client'

import dynamic from 'next/dynamic'
import WaitlistForm from './waitlist-form'
import AbHeadline from './ab-headline'

const Radar = dynamic(() => import('./radar'), { ssr: false })

const SOURCES = ['Changelogs','Product Hunt','Páginas de preço','Release notes','Blog & docs','G2 Reviews']

export default function Hero() {
  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 px-4 sm:px-6 overflow-hidden" aria-label="Hero">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-8 items-center">

          {/* ── Copy ── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow badge */}
            <div className="hero-animate hero-delay-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(198,242,78,0.2)] bg-[rgba(198,242,78,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
                <span className="eyebrow text-[0.65rem]">Lista de espera aberta</span>
              </div>
            </div>

            {/* Headline — A/B test (50/50 entre variante A e B) */}
            <AbHeadline />

            {/* Lead */}
            <p className="hero-animate hero-delay-3 text-lg text-[var(--text-secondary)] font-body leading-relaxed max-w-lg">
              Cadastre seus concorrentes uma vez. O radar varre changelog, Product Hunt
              e preços toda semana —{' '}
              <strong className="text-[var(--text-primary)] font-semibold">
                e te entrega só o que mudou, em 90 segundos.
              </strong>
            </p>

            {/* Form */}
            <div className="hero-animate hero-delay-4">
              <WaitlistForm variant="hero" />
            </div>

            {/* Trust signals */}
            <div className="hero-animate hero-delay-5 flex flex-wrap gap-4 text-xs text-[var(--text-faint)] font-mono">
              {['✓ Sem cartão de crédito','✓ Acesso antecipado grátis','✓ Cancela quando quiser'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          {/* ── Radar ── */}
          <div className="hero-animate hero-delay-7 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] lg:max-w-[460px]">

              {/* Badge de status */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[11px] font-mono text-[var(--text-secondary)] whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
                DEMONSTRAÇÃO · 3 rivais de exemplo
              </div>

              {/* Container */}
              <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 lg:p-8"
                style={{ boxShadow:'0 0 80px rgba(198,242,78,0.06), 0 0 0 1px rgba(198,242,78,0.08), inset 0 0 40px rgba(0,0,0,0.4)' }}>
                <Radar />

                {/* Floating cards */}
                <div className="-mt-2 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-4">
                  {[
                    { v:'3',   l:'Rivais rastreados' },
                    { v:'7d',  l:'Ciclo de varredura' },
                    { v:'90s', l:'Tempo de leitura'   },
                  ].map(s => (
                    <div key={s.l} className="text-center">
                      <div className="font-display text-2xl font-extrabold text-[var(--accent)]">{s.v}</div>
                      <div className="text-[10px] font-mono text-[var(--text-faint)] leading-tight mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating alert card */}
              <div className="absolute -right-4 top-16 w-48 glass rounded-xl p-3 border border-[rgba(255,107,107,0.2)]"
                style={{ animation:'float 4s ease-in-out infinite', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}
                aria-hidden="true">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Alerta</span>
                </div>
                <p className="text-[11px] text-[var(--text-primary)] font-body leading-tight">
                  Acme subiu plano Pro de <span className="text-red-400 font-semibold">US$29 → US$39</span>
                </p>
              </div>

              {/* Floating feature card */}
              <div className="absolute -left-6 bottom-20 w-44 glass rounded-xl p-3 border border-[rgba(61,215,176,0.2)]"
                style={{ animation:'float-b 3.5s ease-in-out infinite', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}
                aria-hidden="true">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" />
                  <span className="text-[10px] font-mono text-[var(--teal)] uppercase tracking-wider">Feature</span>
                </div>
                <p className="text-[11px] text-[var(--text-primary)] font-body leading-tight">
                  Beedo lançou <span className="text-[var(--teal)] font-semibold">Slack nativo</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Faixa de fontes */}
        <div className="mt-14 hero-animate hero-delay-7">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
            <span className="eyebrow shrink-0">Fontes monitoradas</span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {SOURCES.map(s => (
                <span key={s} className="pill pill-accent">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
