export default function DigestMock() {
  return (
    <section
      id="digest"
      className="py-20 px-4 sm:px-6"
      aria-labelledby="digest-heading"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Texto ── */}
        <div>
          <div className="reveal flex items-center gap-2 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="eyebrow">O digest</span>
          </div>

          <h2
            id="digest-heading"
            className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4"
          >
            O diff semanal que chega{' '}
            <span className="text-[var(--accent)]">pronto pra agir.</span>
          </h2>

          <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-8 leading-relaxed">
            Não é mais um dashboard pra esquecer de abrir. É uma mensagem que chega na
            segunda de manhã com exatamente o que mudou — e por que aquilo importa pro
            seu produto.
          </p>

          <ul className="reveal reveal-delay-3 flex flex-col gap-3" role="list">
            {[
              'Só o delta: sem repetir o que já era assim',
              'Contexto estratégico em cada linha',
              'Links diretos pra fonte original',
              'Chega no canal que você já usa (e-mail ou Slack)',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                <span
                  className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[10px]"
                  style={{ background: 'rgba(198,242,78,0.12)', color: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mock de e-mail/terminal ── */}
        <div className="reveal reveal-delay-2">
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: 'rgba(198,242,78,0.2)', boxShadow: '0 0 40px rgba(198,242,78,0.06)' }}
            aria-label="Exemplo de digest semanal do RivalRadar"
          >
            {/* Barra de janela */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: 'var(--panel-2)', borderColor: 'rgba(198,242,78,0.1)' }}
            >
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="font-mono text-xs text-[var(--text-faint)] ml-2 tracking-wide">
                RivalRadar · Digest #12 — semana de 27 jan
              </span>
            </div>

            {/* Conteúdo mono */}
            <div
              className="p-6 font-mono text-sm space-y-6"
              style={{ background: 'var(--panel)' }}
            >
              {/* Header do digest */}
              <div className="pb-4 border-b" style={{ borderColor: 'rgba(198,242,78,0.08)' }}>
                <div className="text-[var(--accent)] font-bold mb-1">
                  ▸ RivalRadar · Digest semanal
                </div>
                <div className="text-[var(--text-faint)] text-xs">
                  3 mudanças detectadas · 1 alerta de atenção
                </div>
              </div>

              {/* Item 1: Preço */}
              <DigestItem
                pill="PREÇO"
                pillClass="pill-red"
                company="Acme"
                change='subiu o Pro de US$29 → <span class="text-red-400">US$39</span>'
                detail="free perdeu histórico ilimitado"
                impact="Oportunidade de posicionar seu plano como mais barato. Usuários insatisfeitos aparecem no G2 nas próximas semanas."
                tag="⚠ Atenção"
                tagClass="text-red-400"
              />

              {/* Item 2: Feature */}
              <DigestItem
                pill="FEATURE"
                pillClass="pill-teal"
                company="Beedo"
                change='lançou integração nativa com <span class="text-[var(--teal)]">Slack</span>'
                detail="era o gap nº1 nos reviews do G2"
                impact="Esse gap era um dos seus diferenciadores. Avaliar priorização do roadmap."
                tag="→ Roadmap"
                tagClass="text-[var(--teal)]"
              />

              {/* Item 3: Product Hunt */}
              <DigestItem
                pill="PH LAUNCH"
                pillClass="pill-orange"
                company="Cortex"
                change='lançou ontem — <span class="text-[#ffaa50]">#2 do dia, 340 upvotes</span>'
                detail="mira exatamente o seu ICP"
                impact="Produto jovem mas com tração. Monitorar crescimento de features nos próximos 30 dias."
                tag="↗ Monitorar"
                tagClass="text-[#ffaa50]"
              />

              {/* Footer */}
              <div
                className="pt-4 border-t text-[10px] text-[var(--text-faint)] flex items-center justify-between"
                style={{ borderColor: 'rgba(198,242,78,0.08)' }}
              >
                <span>// próximo digest: seg, 03 fev</span>
                <span className="text-[var(--accent)]">rivalradar.app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Subcomponente de item do digest ── */
function DigestItem({
  pill, pillClass, company, change, detail, impact, tag, tagClass,
}: {
  pill: string
  pillClass: string
  company: string
  change: string
  detail: string
  impact: string
  tag: string
  tagClass: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className={`pill ${pillClass} shrink-0`}>{pill}</span>
        <span className="text-[var(--text-secondary)] text-xs leading-relaxed">
          <span className="text-[var(--text-primary)] font-semibold">{company} </span>
          <span dangerouslySetInnerHTML={{ __html: change }} />
          {' '}
          <span className="text-[var(--text-faint)]">({detail})</span>
        </span>
      </div>
      <div className="ml-1 pl-3 border-l border-[var(--border)] text-xs text-[var(--text-faint)] leading-relaxed">
        <span className={`font-semibold ${tagClass}`}>{tag}: </span>
        {impact}
      </div>
    </div>
  )
}
