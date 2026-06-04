'use client'

import { useEffect, useRef } from 'react'

/**
 * Wrapper que ativa .is-visible nos elementos com .reveal ou .reveal-scale
 * quando entram na viewport. Usa IntersectionObserver com retry para
 * garantir que client components (SpotlightCard etc) sejam capturados
 * após hidratação completa.
 */
export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      // threshold 0.05 = dispara assim que ~5% do elemento entra na tela
      { threshold: 0.05 }
    )

    const observe = () => {
      const targets = container.querySelectorAll<HTMLElement>(
        '.reveal:not(.is-visible), .reveal-scale:not(.is-visible)'
      )
      targets.forEach((el) => observer.observe(el))
    }

    // Roda imediatamente
    observe()

    // Re-observa após 150ms e 400ms para pegar client components que
    // hidratam após o primeiro render (SpotlightCard, FAQ, etc)
    const t1 = setTimeout(observe, 150)
    const t2 = setTimeout(observe, 400)

    return () => {
      observer.disconnect()
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
