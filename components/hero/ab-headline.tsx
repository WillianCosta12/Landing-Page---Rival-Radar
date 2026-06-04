'use client'
import { useEffect, useState } from 'react'

/**
 * A/B Test de headline.
 *
 * Variante A (controle): "Pare de stalkear concorrente na mão."
 * Variante B (teste):    "Seu concorrente mudou. Você ainda não sabe."
 *
 * Atribuição: 50/50 via Math.random(), persistida em localStorage.
 * Rastreamento: dispara evento Plausible 'AB Headline' com prop 'variant'.
 */
export default function AbHeadline() {
  // Variante A é o default SSR-safe: sem flash, H1 sempre visível para crawlers
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    let v = localStorage.getItem('rr_ab_headline') as 'A' | 'B' | null
    if (!v) {
      v = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem('rr_ab_headline', v)
    }
    setVariant(v)

    if (typeof window !== 'undefined' && (window as any).plausible) {
      ;(window as any).plausible('AB Headline', { props: { variant: v } })
    }
  }, [])

  if (variant === 'B') {
    return (
      <h1 className="hero-animate hero-delay-2 font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.04] tracking-tight text-[var(--text-primary)]">
        Seu concorrente mudou.{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #c6f24e 0%, #3dd7b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Você ainda não sabe.
        </span>
      </h1>
    )
  }

  // Variant A — controle
  return (
    <h1 className="hero-animate hero-delay-2 font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.04] tracking-tight text-[var(--text-primary)]">
      Pare de stalkear<br />
      concorrente{' '}
      <span
        style={{
          background: 'linear-gradient(135deg, #c6f24e 0%, #3dd7b0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        na mão.
      </span>
    </h1>
  )
}
