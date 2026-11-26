export default function Footer() {
  return (
    <footer className="border-t py-10 px-4 sm:px-6" style={{ borderColor:'var(--border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="relative w-5 h-5 flex items-center justify-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full border border-[var(--accent)] opacity-25" />
            <span className="absolute inset-0 rounded-full overflow-hidden" style={{ animation:'radar-sweep 3s linear infinite' }}>
              <span className="absolute inset-0" style={{ background:'conic-gradient(from 0deg, rgba(198,242,78,0.4) 0deg, transparent 60deg)' }} />
            </span>
            <span className="relative z-10 w-1 h-1 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="font-display font-bold text-sm text-[var(--text-secondary)]">RivalRadar</span>
        </div>

        <p className="text-xs text-[var(--text-faint)] font-mono text-center">
          © 2026 RivalRadar · inteligência competitiva pra quem constrói
        </p>
      </div>
    </footer>
  )
}
