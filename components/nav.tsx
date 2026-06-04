'use client'
import { useState, useEffect, useRef } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => {
      const winH = document.documentElement.scrollHeight - window.innerHeight
      const pct = winH > 0 ? (window.scrollY / winH) * 100 : 0
      setScrolled(window.scrollY > 32)
      setProgress(Math.min(pct, 100))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [mobileOpen])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(6,8,7,0.88)] backdrop-blur-xl border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      {/* Barra de progresso de scroll */}
      <div
        className="absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-100"
        style={{ width: `${progress}%`, opacity: progress > 2 ? 1 : 0 }}
        aria-hidden="true"
      />

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="RivalRadar">
          <span className="relative w-7 h-7 flex items-center justify-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-25" />
            <span className="absolute inset-[5px] rounded-full border border-[var(--accent)] opacity-15" />
            <span className="absolute inset-0 rounded-full overflow-hidden" style={{ animation: 'radar-sweep 3s linear infinite' }}>
              <span className="absolute inset-0" style={{ background: 'conic-gradient(from 0deg, rgba(198,242,78,0.55) 0deg, transparent 65deg)' }} />
            </span>
            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ animation: 'pulse-core 2s ease-in-out infinite' }} />
          </span>
          <span className="font-display font-extrabold text-base tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            RivalRadar
          </span>
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-7">
          {[['#problema','O problema'],['#como-funciona','Como funciona'],['#digest','O digest'],['#preco','Preço'],['#faq','FAQ']].map(([href,label]) => (
            <a key={href} href={href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-body">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#waitlist" className="btn-primary text-sm py-2 px-4">
            Entrar na lista →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass border-b border-[var(--border)] px-4 pb-6 pt-4 flex flex-col gap-4">
          {[['#problema','O problema'],['#como-funciona','Como funciona'],['#digest','O digest'],['#preco','Preço'],['#faq','FAQ']].map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">{label}</a>
          ))}
          <a href="#waitlist" className="btn-primary text-sm py-2.5 justify-center">Entrar na lista →</a>
        </div>
      )}
    </header>
  )
}
