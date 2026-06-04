'use client'
import { useEffect, useRef, useState } from 'react'

interface Blip {
  id: number; x: number; y: number; angle: number
  label: string; type: 'price'|'feature'|'launch'; visible: boolean
}

const BLIPS: Omit<Blip,'visible'>[] = [
  { id:1, x:67, y:30, angle:22,  label:'Preço ↑ 34%',    type:'price'   },
  { id:2, x:74, y:60, angle:92,  label:'Nova feature',    type:'feature' },
  { id:3, x:30, y:68, angle:198, label:'#2 Product Hunt', type:'launch'  },
  { id:4, x:26, y:32, angle:292, label:'Changelog ↗',     type:'feature' },
]

const COLORS = {
  price:   { dot:'#c6f24e', tag:'bg-[rgba(198,242,78,0.12)] text-[#c6f24e] border-[rgba(198,242,78,0.3)]' },
  feature: { dot:'#3dd7b0', tag:'bg-[rgba(61,215,176,0.12)] text-[#3dd7b0] border-[rgba(61,215,176,0.3)]' },
  launch:  { dot:'#ffaa50', tag:'bg-[rgba(255,170,80,0.12)] text-[#ffaa50] border-[rgba(255,170,80,0.3)]'  },
}

export default function Radar() {
  const sweepRef = useRef(0)
  const [blips, setBlips] = useState<Blip[]>(BLIPS.map(b => ({ ...b, visible: false })))
  const animRef = useRef<number|null>(null)
  const lastTick = useRef(0)

  useEffect(() => {
    const tick = (ts: number) => {
      const delta = ts - lastTick.current
      lastTick.current = ts
      sweepRef.current = (sweepRef.current + 0.75 * (delta / 16.67)) % 360
      setBlips(prev => prev.map(b => {
        const diff = Math.abs(((sweepRef.current - b.angle + 360) % 360))
        if (diff < 14 && !b.visible) return { ...b, visible: true }
        return b
      }))
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <div className="relative w-full max-w-[440px] aspect-square mx-auto select-none" aria-hidden="true">
      {/* Glow externo */}
      <div className="absolute inset-[-25%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(198,242,78,0.08) 0%, transparent 65%)' }} />

      {/* Anéis */}
      {[1, 0.66, 0.33].map((scale, i) => (
        <div key={i} className="absolute inset-0 rounded-full border border-[rgba(198,242,78,0.13)]"
          style={{ transform:`scale(${scale})`, animation:`pulse-ring ${2+i*0.6}s ease-in-out infinite`, animationDelay:`${i*0.25}s` }} />
      ))}

      {/* Cruz de mira */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-px bg-[rgba(198,242,78,0.06)]" />
        <div className="absolute h-full w-px bg-[rgba(198,242,78,0.06)]" />
        {/* Diagonais tênues */}
        <div className="absolute w-full h-px bg-[rgba(198,242,78,0.03)]" style={{ transform:'rotate(45deg)' }} />
        <div className="absolute w-full h-px bg-[rgba(198,242,78,0.03)]" style={{ transform:'rotate(-45deg)' }} />
      </div>

      {/* Varredura conic-gradient */}
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ animation:'radar-sweep 3.2s linear infinite' }}>
        <div className="absolute inset-0" style={{
          background: 'conic-gradient(from 0deg, rgba(198,242,78,0.0) 0deg, rgba(198,242,78,0.45) 0deg, rgba(198,242,78,0.0) 70deg)'
        }} />
      </div>
      {/* Linha de varredura */}
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ animation:'radar-sweep 3.2s linear infinite' }}>
        <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom"
          style={{ background:'linear-gradient(to top, var(--accent), rgba(198,242,78,0.3), transparent)', filter:'blur(0.5px)' }} />
      </div>

      {/* Blips */}
      {blips.map(blip => {
        const c = COLORS[blip.type]
        return (
          <div key={blip.id} className="absolute" style={{ left:`${blip.x}%`, top:`${blip.y}%` }}>
            <div className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: c.dot,
                boxShadow: `0 0 10px ${c.dot}, 0 0 20px ${c.dot}55`,
                opacity: blip.visible ? 1 : 0,
                animation: blip.visible ? 'blip-spawn 0.4s ease-out, blip-pulse 2.2s 0.4s ease-in-out infinite' : 'none',
              }} />
            {blip.visible && (
              <div className={`absolute left-4 -top-3.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border whitespace-nowrap ${c.tag}`}
                style={{ animation:'tag-appear 0.35s 0.3s ease-out both', backdropFilter:'blur(8px)' }}>
                {blip.label}
              </div>
            )}
          </div>
        )
      })}

      {/* Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-[var(--accent)]"
          style={{ animation:'pulse-core 2s ease-in-out infinite' }} />
      </div>
    </div>
  )
}
