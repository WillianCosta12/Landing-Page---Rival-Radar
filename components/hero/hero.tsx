import dynamic from 'next/dynamic'
import WaitlistForm from './waitlist-form'

// Radar usa requestAnimationFrame, só roda no client
const Radar = dynamic(() => import('./radar'), { ssr: false })

const SOURCES = [
  'Changelogs',
  'Product Hunt',
  'Páginas de preço',
  'Release notes',
  'Blog & docs',
]

export default function Hero() {
  return (
    <section
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 overflow-hidden"
      aria-label="Seção principal"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Coluna esquerda: copy + form ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="hero-animate hero-delay-1 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span className="eyebrow">Inteligência competitiva no piloto automático</span>
            </div>

            {/* Headline */}
            <h1
              className="hero-animate hero-delay-2 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-[var(--text-primary)]"
            >
              Pare de stalkear<br />
              concorrente{' '}
              <span
                className="relative inline-block"
                aria-label="na mão"
              >
                <span className="text-[var(--accent)]">na mão.</span>
                {/* Underline decorativo */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Lead */}
            <p className="hero-animate hero-delay-3 text-lg text-[var(--text-secondary)] font-body leading-relaxed max-w-lg">
              Cadastre seus concorrentes uma vez. O radar varre changelog,
              Product Hunt e página de preços toda semana —{' '}
              <strong className="text-[var(--text-primary)] font-semibold">
                e te entrega só o que mudou, pronto pra agir.
              </strong>
            </p>

            {/* Social proof inline */}
            <div className="hero-animate hero-delay-4 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {['#c6f24e','#3dd7b0','#ffaa50','#c084fc'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[var(--bg)] flex items-center justify-center text-[9px] font-bold"
                    style={{ background: c, color: '#0a0c0b' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] font-semibold">+47 founders</span>
                {' '}já na lista de espera
              </span>
            </div>

            {/* Form */}
            <div className="hero-animate hero-delay-5">
              <WaitlistForm variant="hero" />
            </div>
          </div>

          {/* ── Coluna direita: radar ── */}
          <div className="hero-animate hero-delay-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] lg:max-w-[440px]">
              {/* Label flutuante de status */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--panel)] text-[11px] font-mono text-[var(--text-secondary)]"
                aria-label="Status: varredura em andamento"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
                VARREDURA EM ANDAMENTO
              </div>

              {/* Container do radar */}
              <div
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 lg:p-8"
                style={{ boxShadow: '0 0 60px rgba(198,242,78,0.05), inset 0 0 40px rgba(0,0,0,0.3)' }}
              >
                <Radar />

                {/* Stats abaixo do radar */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { value: '3', label: 'Rivais ativos' },
                    { value: '7d',  label: 'Ciclo de varredura' },
                    { value: '90s', label: 'Tempo de leitura' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-display text-xl font-bold text-[var(--accent)]">{s.value}</div>
                      <div className="text-[10px] font-mono text-[var(--text-faint)] leading-tight mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Faixa de fontes monitoradas ── */}
        <div className="mt-14 hero-animate hero-delay-6">
          <div
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-6 py-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <span className="eyebrow shrink-0">Fontes monitoradas</span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {SOURCES.map((s) => (
                <span key={s} className="pill pill-accent">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
