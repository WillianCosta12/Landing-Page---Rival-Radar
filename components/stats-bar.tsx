'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 63,   suffix: '+',  label: 'Founders na lista',        desc: 'e crescendo todo dia'  },
  { value: 3,    suffix: 'h',  label: 'Economizadas por semana',  desc: 'por founder em média'  },
  { value: 90,   suffix: 's',  label: 'Para ler o digest',        desc: 'em vez de 3 horas'     },
  { value: 100,  suffix: '%',  label: 'Automatizado',             desc: 'zero esforço manual'   },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          // easeOutExpo
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          setCount(Math.floor(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsBar() {
  return (
    <section className="py-14 px-4 sm:px-6" aria-label="Estatísticas do RivalRadar">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-delay-${i+1} spotlight-card card-gradient-border card p-6 text-center group cursor-default`}
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--accent)] mb-1 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="font-semibold text-[var(--text-primary)] text-sm mb-0.5">{s.label}</div>
              <div className="text-xs text-[var(--text-faint)] font-mono">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
