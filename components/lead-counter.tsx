'use client'
import { useEffect, useState } from 'react'

interface Props {
  fallback?: number
  className?: string
}

/**
 * Mostra o número real de leads na waitlist buscado de /api/count.
 * Exibe o fallback enquanto carrega — sem layout shift.
 */
export default function LeadCounter({ fallback = 63, className = '' }: Props) {
  const [count, setCount] = useState<number>(fallback)

  useEffect(() => {
    fetch('/api/count')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === 'number' && data.count > 0) {
          setCount(data.count)
        }
      })
      .catch(() => {/* mantém o fallback */})
  }, [])

  return <span className={className}>{count}+</span>
}
