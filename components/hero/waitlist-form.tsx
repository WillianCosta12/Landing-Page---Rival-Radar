'use client'

import { useState, useId } from 'react'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface WaitlistFormProps {
  variant?: 'hero' | 'cta'
}

export default function WaitlistForm({ variant = 'hero' }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputId = useId()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return

    // Validação client-side básica (segurança real é no servidor)
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Informe um e-mail válido.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      const data = await res.json()

      if (res.ok || data.alreadyRegistered) {
        setStatus('success')
      } else {
        setErrorMsg(data.error ?? 'Algo deu errado. Tente novamente.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Falha na conexão. Tente novamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-start gap-3 py-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 text-[var(--accent)]">
          <CheckCircle size={20} aria-hidden="true" />
          <span className="font-semibold font-body text-[var(--text-primary)]">
            Você está na lista!
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-body">
          Vamos te avisar assim que o RivalRadar abrir. Fique de olho no seu inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full" id="waitlist">
      <div className={`flex gap-2 ${variant === 'cta' ? 'flex-col sm:flex-row justify-center' : 'flex-col sm:flex-row'}`}>
        <label htmlFor={inputId} className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
          placeholder="seu@email.com"
          className={`input-email ${variant === 'cta' ? 'sm:w-72' : 'flex-1'}`}
          disabled={status === 'loading'}
          autoComplete="email"
          aria-describedby={errorMsg ? 'waitlist-error' : undefined}
          aria-invalid={!!errorMsg}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary justify-center"
          aria-label="Garantir acesso antecipado ao RivalRadar"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Enviando…
            </>
          ) : (
            <>
              Garantir acesso
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {errorMsg && (
        <p
          id="waitlist-error"
          className="mt-2 text-xs text-red-400 font-mono"
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <p className="mt-3 font-mono text-[var(--text-faint)] text-[11px] tracking-wide">
        // acesso antecipado · sem cartão · cancela quando quiser
      </p>
    </form>
  )
}
