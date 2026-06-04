'use client'
import { useEffect, useState } from 'react'
import LeadCounter from '@/components/lead-counter'

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => {
      // Aparece depois de rolar 60% da página
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setVisible(scrolled > 0.45)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="glass border-t border-[var(--border)] px-4 py-3 flex items-center justify-between gap-4 max-w-2xl mx-auto rounded-t-2xl">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Seu concorrente mudou algo esta semana.</p>
          <p className="text-xs text-[var(--text-secondary)]">Você ainda não sabe. Entre na lista agora.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-faint)] whitespace-nowrap hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
            <LeadCounter fallback={63} /> na fila
          </span>
          <a href="#waitlist" className="btn-primary btn-primary-glow text-sm py-2.5 px-5 w-full sm:w-auto justify-center">
            Garantir acesso grátis →
          </a>
        </div>
      </div>
    </div>
  )
}
