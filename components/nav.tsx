'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 font-body"
  >
    {children}
  </a>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,12,11,0.85)] backdrop-blur-md border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="RivalRadar - Início">
          {/* Glyph de radar girando */}
          <span className="relative w-7 h-7 flex items-center justify-center" aria-hidden="true">
            {/* Anéis */}
            <span className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-30" />
            <span className="absolute inset-[5px] rounded-full border border-[var(--accent)] opacity-20" />
            {/* Sweep girando */}
            <span
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ animation: 'radar-sweep 3s linear infinite' }}
            >
              <span
                className="absolute inset-0 origin-center"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(198,242,78,0.5) 0deg, transparent 60deg)',
                }}
              />
            </span>
            {/* Core */}
            <span
              className="relative z-10 w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              style={{ animation: 'pulse-core 2s ease-in-out infinite' }}
            />
          </span>
          <span className="font-display font-800 text-base tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            RivalRadar
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#problema">O problema</NavLink>
          <NavLink href="#como-funciona">Como funciona</NavLink>
          <NavLink href="#digest">O digest</NavLink>
          <NavLink href="#preco">Preço</NavLink>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#waitlist" className="btn-primary text-sm py-2 px-4">
            Entrar na lista
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-px bg-current transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px bg-current transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--panel)] border-b border-[var(--border)] px-4 pb-6 pt-4 flex flex-col gap-4">
          <NavLink href="#problema">O problema</NavLink>
          <NavLink href="#como-funciona">Como funciona</NavLink>
          <NavLink href="#digest">O digest</NavLink>
          <NavLink href="#preco">Preço</NavLink>
          <a href="#waitlist" className="btn-primary text-sm py-2.5 justify-center">
            Entrar na lista
          </a>
        </div>
      )}
    </header>
  )
}
