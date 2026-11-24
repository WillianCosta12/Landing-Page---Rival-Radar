import SpotlightCard from './spotlight-card'

function DigestRow({
  pill, pillBg, pillColor, pillBorder,
  company, change, changeColor,
  detail, impact, tag, tagColor,
}: {
  pill:string; pillBg:string; pillColor:string; pillBorder:string
  company:string; change:string; changeColor:string
  detail:string; impact:string; tag:string; tagColor:string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2 flex-wrap">
        <span className="pill shrink-0 text-[10px]"
          style={{ background:pillBg, color:pillColor, border:`1px solid ${pillBorder}` }}>
          {pill}
        </span>
        <span className="text-[var(--text-secondary)] text-xs leading-relaxed">
          <span className="text-[var(--text-primary)] font-semibold">{company} </span>
          {change.split('||').map((part, i) => (
            i % 2 === 0
              ? <span key={i}>{part}</span>
              : <span key={i} className="font-semibold" style={{ color:changeColor }}>{part}</span>
          ))}
          {' '}<span className="text-[var(--text-faint)]">({detail})</span>
        </span>
      </div>
      <div className="ml-1 pl-3 border-l border-[var(--border)] text-xs text-[var(--text-faint)] leading-relaxed">
        <span className="font-semibold" style={{ color:tagColor }}>{tag}: </span>
        {impact}
      </div>
    </div>
  )
}

export default function DigestMock() {
  return (
    <section id="digest" className="py-20 px-4 sm:px-6" aria-labelledby="digest-heading">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Texto */}
        <div>
          <div className="reveal flex items-center gap-2 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span className="eyebrow">O digest</span>
          </div>
          <h2 id="digest-heading" className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
            O diff semanal que chega{' '}
            <span className="text-[var(--accent)]">pronto pra agir.</span>
          </h2>
          <p className="reveal reveal-delay-2 text-[var(--text-secondary)] font-body text-lg mb-8 leading-relaxed">
            Não é mais um dashboard pra esquecer de abrir. É uma mensagem que chega toda segunda de manhã com exatamente o que mudou — e por que aquilo importa pro <em className="not-italic text-[var(--text-primary)]">seu</em> produto.
          </p>
          <ul className="reveal reveal-delay-3 flex flex-col gap-3" role="list">
            {[
              'Só o delta: sem repetir o que já era assim',
              'Contexto estratégico em cada linha',
              'Links diretos para a fonte original',
              'Chega no canal que você já usa',
              'Funciona mesmo quando você está ocupado demais',
            ].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                <span className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[10px]"
                  style={{ background:'rgba(198,242,78,0.10)', color:'var(--accent)' }} aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mock */}
        <SpotlightCard className="reveal reveal-delay-2">
          <div className="rounded-xl border overflow-hidden"
            style={{ borderColor:'rgba(198,242,78,0.18)', boxShadow:'0 0 60px rgba(198,242,78,0.06)' }}
            aria-label="Exemplo de digest semanal">

            {/* Barra de janela */}
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background:'var(--panel-2)', borderColor:'rgba(198,242,78,0.08)' }}>
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full" style={{ background:'#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background:'#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background:'#28c840' }} />
              </div>
              <span className="font-mono text-xs text-[var(--text-faint)] ml-2">
                RivalRadar · exemplo de digest (empresas fictícias)
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-5 font-mono text-sm space-y-5" style={{ background:'var(--panel)' }}>
              <div className="pb-4 border-b" style={{ borderColor:'rgba(198,242,78,0.08)' }}>
                <div className="text-[var(--accent)] font-bold mb-0.5">▸ RivalRadar · Digest semanal</div>
                <div className="text-[var(--text-faint)] text-xs">3 mudanças detectadas · 1 alerta crítico</div>
              </div>

              <DigestRow
                pill="PREÇO ⚠"
                pillBg="rgba(255,107,107,0.12)" pillColor="#ff8080" pillBorder="rgba(255,107,107,0.3)"
                company="Acme" change="subiu Pro de US$29 → ||US$39||" changeColor="#ff8080"
                detail="free perdeu histórico ilimitado"
                tag="⚠ Atenção" tagColor="#ff8080"
                impact="Oportunidade de posicionar seu plano como mais barato. Clientes insatisfeitos vão aparecer no G2 nas próximas semanas."
              />

              <DigestRow
                pill="FEATURE"
                pillBg="rgba(61,215,176,0.12)" pillColor="#3dd7b0" pillBorder="rgba(61,215,176,0.3)"
                company="Beedo" change="lançou integração com ||Slack nativo||" changeColor="#3dd7b0"
                detail="era o gap nº1 nos reviews do G2"
                tag="→ Roadmap" tagColor="#3dd7b0"
                impact="Era um dos seus diferenciadores. Hora de reavaliar priorização."
              />

              <DigestRow
                pill="PH"
                pillBg="rgba(255,170,80,0.12)" pillColor="#ffaa50" pillBorder="rgba(255,170,80,0.3)"
                company="Cortex" change="lançou ontem — ||#2 do dia, 340 upvotes||" changeColor="#ffaa50"
                detail="mira o seu ICP diretamente"
                tag="↗ Monitorar" tagColor="#ffaa50"
                impact="Produto jovem com tração real. Monitorar features nos próximos 30 dias."
              />

              <div className="pt-3 border-t text-[10px] text-[var(--text-faint)] flex justify-between"
                style={{ borderColor:'rgba(198,242,78,0.08)' }}>
                <span>// próximo digest: seg, 03 fev · 08h00</span>
                <span className="text-[var(--accent)]">rivalradar.app</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
