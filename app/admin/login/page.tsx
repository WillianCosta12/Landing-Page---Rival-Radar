'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Usuário ou senha incorretos.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-root flex items-center justify-center p-4 relative overflow-hidden">
      {/* Radar decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[600px] h-[600px] rounded-full border border-accent/5" />
        <div className="absolute w-[420px] h-[420px] rounded-full border border-accent/5" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-accent/5" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm">
        {/* Glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/20 to-transparent pointer-events-none" />

        <div className="relative bg-surface rounded-2xl border border-border p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(198,242,78,0.8)]" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Rival<span className="text-accent">Radar</span>
            </span>
            <span className="ml-auto text-xs text-muted border border-border rounded px-2 py-0.5">
              Admin
            </span>
          </div>

          <h1 className="text-xl font-heading font-bold text-foreground mb-1">
            Acesso restrito
          </h1>
          <p className="text-sm text-muted mb-6">
            Entre com suas credenciais para acessar o painel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="input-email w-full"
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-email w-full"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Entrando…
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
