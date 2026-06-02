'use client'

import { useEffect, useRef, useState } from 'react'

interface Blip {
  id: number
  x: number       // % dentro do radar
  y: number
  angle: number   // ângulo em que aparece
  label: string
  type: 'price' | 'feature' | 'launch'
  visible: boolean
}

const BLIPS: Omit<Blip, 'visible'>[] = [
  { id: 1, x: 68, y: 34, angle: 25,  label: 'Preço ↑ 20%',    type: 'price'   },
  { id: 2, x: 72, y: 62, angle: 95,  label: 'Feature nova',    type: 'feature' },
  { id: 3, x: 32, y: 70, angle: 200, label: '↑ Product Hunt',  type: 'launch'  },
  { id: 4, x: 28, y: 36, angle: 295, label: 'Changelog ↗',     type: 'feature' },
]

const TYPE_COLORS = {
  price:   { dot: '#c6f24e', tag: 'bg-[rgba(198,242,78,0.12)] text-[#c6f24e] border-[rgba(198,242,78,0.3)]' },
  feature: { dot: '#3dd7b0', tag: 'bg-[rgba(61,215,176,0.12)] text-[#3dd7b0] border-[rgba(61,215,176,0.3)]' },
  launch:  { dot: '#ffaa50', tag: 'bg-[rgba(255,170,80,0.12)]  text-[#ffaa50]  border-[rgba(255,170,80,0.3)]'  },
}

export default function Radar() {
  const sweepRef = useRef<number>(0)
  const [blips, setBlips] = useState<Blip[]>(
    BLIPS.map((b) => ({ ...b, visible: false }))
  )
  const animRef = useRef<number | null>(null)
  const lastTick = useRef<number>(0)

  useEffect(() => {
    const SPEED = 0.8 // graus por frame @ 60fps ≈ 3s/volta

    const tick = (timestamp: number) => {
      const delta = timestamp - lastTick.current
      lastTick.current = timestamp

      sweepRef.current = (sweepRef.current + SPEED * (delta / 16.67)) % 360

      // Ativa blip quando a varredura passa por ele (±15°)
      setBlips((prev) =>
        prev.map((b) => {
          const diff = Math.abs(((sweepRef.current - b.angle + 360) % 360))
          if (diff < 15 && !b.visible) return { ...b, visible: true }
          // Reset após meia volta completa (mantém os 4 visíveis por simplificidade)
          return b
        })
      )

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto select-none" aria-hidden="true">
      {/* Glow de fundo */}
      <div
        className="absolute inset-[-20%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(198,242,78,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Anéis concêntricos */}
      {[1, 0.67, 0.33].map((scale, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-[rgba(198,242,78,0.12)]"
          style={{
            transform: `scale(${scale})`,
            animation: `pulse-ring ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Cruz de mira */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-px bg-[rgba(198,242,78,0.08)]" />
        <div className="absolute h-full w-px bg-[rgba(198,242,78,0.08)]" />
      </div>

      {/* Varredura (conic-gradient) */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          animation: 'radar-sweep 3s linear infinite',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(198,242,78,0.0) 0deg, rgba(198,242,78,0.35) 0deg, rgba(198,242,78,0.0) 60deg)',
          }}
        />
      </div>

      {/* Linha de varredura */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ animation: 'radar-sweep 3s linear infinite' }}
      >
        <div
          className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom"
          style={{ background: 'linear-gradient(to top, var(--accent), transparent)' }}
        />
      </div>

      {/* Blips */}
      {blips.map((blip) => {
        const colors = TYPE_COLORS[blip.type]
        return (
          <div
            key={blip.id}
            className="absolute"
            style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
          >
            {/* Ponto */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: colors.dot,
                boxShadow: `0 0 8px ${colors.dot}`,
                opacity: blip.visible ? 1 : 0,
                animation: blip.visible
                  ? 'blip-spawn 0.4s ease-out, blip-pulse 2s 0.4s ease-in-out infinite'
                  : 'none',
              }}
            />
            {/* Tag flutuante */}
            {blip.visible && (
              <div
                className={`absolute left-4 -top-3 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${colors.tag}`}
                style={{ animation: 'tag-appear 0.3s 0.3s ease-out both' }}
              >
                {blip.label}
              </div>
            )}
          </div>
        )
      })}

      {/* Core pulsante */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-3 h-3 rounded-full bg-[var(--accent)]"
          style={{ animation: 'pulse-core 2s ease-in-out infinite' }}
        />
      </div>
    </div>
  )
}
