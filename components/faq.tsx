'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Precisa instalar alguma coisa?',
    a: 'Não. Você cadastra a URL do concorrente e o radar varre tudo automaticamente. Sem extensão, sem script, sem setup técnico.',
  },
  {
    q: 'Como funciona a detecção de mudanças?',
    a: 'O agente visita as páginas configuradas toda semana, compara com a versão anterior e identifica o que mudou semanticamente — não só diferenças de HTML. Isso evita falsos positivos por mudanças de layout.',
  },
  {
    q: 'O que exatamente é monitorado?',
    a: 'Changelog oficial, página de preços (tiers, limites, features), lançamentos no Product Hunt, release notes, blog de produto e documentação. Você pode customizar as fontes por rival.',
  },
  {
    q: 'Com que frequência recebo o digest?',
    a: 'No plano Solo o digest chega semanalmente por e-mail. No Builder você pode configurar frequência diária ou semanal, e ativar notificações no Slack também.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Sim. Os dados são armazenados com Row Level Security (RLS) no Supabase, e o sistema nunca envia informações sensíveis para LLMs terceiros. Usamos provedores que não treinam nos seus dados.',
  },
  {
    q: 'O preço de R$39 vai subir depois do lançamento?',
    a: 'Sim. Quem entrar na lista antes do lançamento trava o plano Builder nesse valor para sempre. É o preço de fundador, sem asterisco. Depois disso o valor sobe.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  // Controla visibilidade dos itens no React — evita conflito com JS externo
  const [visible, setVisible] = useState<boolean[]>(FAQS.map(() => false))
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Revela o heading imediatamente quando a seção entra na viewport
    const section = sectionRef.current
    if (!section) return

    const headings = section.querySelectorAll<HTMLElement>('.faq-heading-reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    headings.forEach((el) => obs.observe(el))

    // Revela os itens do FAQ com stagger usando React state (não classList)
    const itemObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Revela todos os itens em cascata quando a lista entra na tela
            FAQS.forEach((_, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev]
                  next[i] = true
                  return next
                })
              }, i * 60)
            })
            itemObs.disconnect()
          }
        })
      },
      { threshold: 0.05 }
    )

    const list = section.querySelector('.faq-list')
    if (list) itemObs.observe(list)

    return () => {
      obs.disconnect()
      itemObs.disconnect()
    }
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow e heading usam reveal normal (sem estado de botão) */}
        <div className="faq-heading-reveal reveal flex items-center gap-2 mb-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true" />
          <span className="eyebrow" style={{ color: 'var(--teal)' }}>Perguntas frequentes</span>
        </div>

        <h2
          id="faq-heading"
          className="faq-heading-reveal reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-10"
        >
          Todas as suas dúvidas, resolvidas.
        </h2>

        <dl className="faq-list flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              // Visibilidade controlada via React state — imune a re-renders
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                borderColor: open === i ? 'rgba(198,242,78,0.28)' : undefined,
              }}
              className="card rounded-xl overflow-hidden transition-colors duration-200"
            >
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-[var(--text-primary)] font-body text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    color="#c6f24e"
                    className="shrink-0 transition-transform duration-300"
                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <dd id={`faq-answer-${i}`}>
                <div
                  style={{
                    maxHeight: open === i ? '400px' : '0',
                    opacity: open === i ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
                  }}
                >
                  <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] font-body leading-relaxed border-t border-[var(--border)] pt-3">
                    {faq.a}
                  </p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
