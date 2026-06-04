# RivalRadar — Landing Page

> Inteligência competitiva no piloto automático para indie founders e times de produto enxutos.

**Live:** [rivalradar.vercel.app](https://rivalradar.vercel.app) · **Repositório:** [github.com/WillianCosta12/Landing-Page---Rival-Radar](https://github.com/WillianCosta12/Landing-Page---Rival-Radar)

---

## O que é

Landing page de validação do **RivalRadar** — produto que monitora automaticamente concorrentes (changelog, Product Hunt, preços, release notes, blog) e entrega um digest semanal acionável por e-mail ou Slack.

Esta página serve dois propósitos:
1. **Portfólio** — peça com qualidade de produto real, animações modernas e design system próprio
2. **Smoke test** — captura e-mails de uma lista de espera real, gravando no banco de dados

---

## Stack

| Camada | Tecnologia | Motivo da escolha |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript | Server Components por padrão, deploy trivial na Vercel |
| Estilo | Tailwind CSS + CSS custom (sem shadcn) | Design system próprio via CSS variables — mais controle visual |
| Banco | Supabase (Postgres) | RLS nativa, setup rápido, free tier generoso |
| E-mail | Resend | SDK mínimo, free tier 3k/mês, zero configuração de SMTP |
| Validação | Zod | Schema único reutilizado no client (UX) e server (segurança) |
| Ícones | Lucide React | Tree-shakeable, compatível com React 19 |
| Deploy | Vercel | CI/CD automático via GitHub, preview deployments grátis |

---

## Estrutura de arquivos

```
rivalradar/
│
├── app/
│   ├── layout.tsx              # Fonts (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono),
│   │                           # metadata global, Open Graph, lang="pt-BR"
│   ├── page.tsx                # Monta todas as seções em ordem
│   ├── globals.css             # Design tokens (CSS vars), keyframes, classes utilitárias
│   │                           # spotlight, cards, botões, pills, marquee, reveal
│   ├── og/
│   │   └── route.tsx           # OG image dinâmica via next/og (edge runtime)
│   └── api/
│       └── waitlist/
│           └── route.ts        # POST: Zod valida → insert Supabase → notifica Resend
│
├── components/
│   ├── nav.tsx                 # Nav fixa com blur no scroll + barra de progresso de leitura
│   ├── scroll-reveal.tsx       # IntersectionObserver (.reveal e .reveal-scale) com retry
│   ├── spotlight-card.tsx      # Card com glow que segue o mouse via CSS variables
│   ├── sticky-cta-bar.tsx      # Barra CTA que aparece após 45% de scroll
│   ├── marquee.tsx             # Ticker infinito com mudanças detectadas (demonstra o produto)
│   ├── stats-bar.tsx           # Contadores animados com easeOutExpo via IntersectionObserver
│   │
│   ├── hero/
│   │   ├── hero.tsx            # Layout 2 colunas, copy, social proof, floating alert cards
│   │   ├── radar.tsx           # Radar animado: anéis, varredura conic-gradient, blips + tags
│   │   └── waitlist-form.tsx   # Form com estados idle/loading/success/error
│   │
│   ├── problem.tsx             # Contraste ~3h (vermelho) vs 5min (verde) com cards
│   ├── how-it-works.tsx        # 3 passos com SpotlightCard e ícones
│   ├── digest-mock.tsx         # Mock de e-mail/terminal com pills coloridas por tipo
│   ├── testimonials.tsx        # 3 depoimentos com métricas concretas e gradient border
│   ├── features.tsx            # Grid 6 cards com spotlight e reveal-scale
│   ├── pricing.tsx             # Planos Solo/Builder, barra de escassez, urgência
│   ├── faq.tsx                 # Accordion com visibilidade gerenciada por React state
│   ├── cta.tsx                 # CTA final com headline FOMO e gradiente animado
│   └── footer.tsx
│
├── lib/
│   ├── supabase.ts             # Client Supabase com service_role_key (server-side only)
│   ├── resend.ts               # Client Resend + sendLeadNotification (falha silenciosa)
│   └── validations.ts          # Schema Zod do e-mail (reutilizado client + server)
│
├── supabase/
│   └── schema.sql              # CREATE TABLE waitlist + RLS + indexes (reproduzível)
│
├── .env.example                # Template de variáveis sem valores reais
├── .gitignore                  # Inclui .env.local, .next, node_modules
├── tailwind.config.ts          # Safelist para classes dinâmicas (reveal-delay-N, is-visible)
├── next.config.ts
├── tsconfig.json               # strict: true
└── postcss.config.mjs
```

---

## Seções da landing page

| # | Seção | Estratégia de conversão |
|---|---|---|
| 1 | **Nav** | Blur no scroll, barra de progresso de leitura, CTA fixo |
| 2 | **Hero** | Headline + radar ao vivo + floating alert cards + social proof "+63 founders" |
| 3 | **Marquee** | Ticker com mudanças reais detectadas — demonstra o produto antes de explicar |
| 4 | **Stats bar** | Contadores animados: 63+ founders, 3h economizadas, 90s digest, 100% automático |
| 5 | **Problema** | Contraste visual ~3h vs 5min + banner "78% descobrem pelo cliente" |
| 6 | **Como funciona** | 3 passos simples — remove objeção de complexidade |
| 7 | **O digest** | Mock realista de e-mail — mostra exatamente o que o usuário recebe |
| 8 | **Depoimentos** | 3 testemunhos com métricas concretas e gradient border hover |
| 9 | **Features** | Grid 6 itens com spotlight — diferencia de "só mais um scraper" |
| 10 | **Pricing** | Barra de escassez 38/50, badge "Fundador", price lock urgency |
| 11 | **FAQ** | 6 perguntas que quebram as principais objeções de compra |
| 12 | **CTA final** | Headline FOMO "Seu concorrente mudou algo esta semana. Você viu?" |
| 13 | **Sticky CTA** | Aparece após 45% de scroll, pressão constante sem ser invasivo |

---

## Rodar localmente

### 1. Clone e instale

```bash
git clone https://github.com/WillianCosta12/Landing-Page---Rival-Radar.git
cd Landing-Page---Rival-Radar
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
RESEND_API_KEY=re_sua_api_key
NOTIFICATION_EMAIL=seu@email.com
```

### 3. Suba o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Setup do Supabase

### Criar a tabela

No [Supabase Dashboard](https://supabase.com/dashboard) → **SQL Editor**, execute:

```sql
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'rivalradar-landing',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
```

O arquivo completo está em `supabase/schema.sql`.

### Pegar as chaves

**Settings → API** no dashboard do Supabase:

| Variável | Onde pegar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave `service_role` (nunca a `anon`) |

### Estratégia de RLS

RLS ativa **sem policies públicas** — nenhum cliente anônimo lê ou insere diretamente. Os inserts acontecem exclusivamente via `service_role_key` na Route Handler, que bypassa RLS por design. É o padrão correto para waitlist pública.

---

## Setup do Resend

1. Crie conta em [resend.com](https://resend.com)
2. **API Keys → Create API Key** → copie para `RESEND_API_KEY`
3. Defina `NOTIFICATION_EMAIL` com seu e-mail de notificação

> **Remetente padrão:** `onboarding@resend.dev` (domínio do Resend).
> Para usar domínio próprio (`oi@rivalradar.app`): verifique em **Resend → Domains** e atualize `from` em `lib/resend.ts`.

---

## Deploy na Vercel

### 1. Push para o GitHub

```bash
git add .
git commit -m "feat: landing page rivalradar"
git push origin main
```

### 2. Importe na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe `Landing-Page---Rival-Radar`
3. Adicione as variáveis de ambiente:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service_role (privada, server-only) |
| `RESEND_API_KEY` | Chave da API do Resend |
| `NOTIFICATION_EMAIL` | E-mail que recebe alertas de novos leads |

4. **Deploy** → aguarde o build

### 3. Verifique

- Acesse a URL `.vercel.app`
- Cadastre um e-mail na waitlist
- Confirme o registro na tabela `waitlist` no Supabase
- Confirme que chegou a notificação no seu e-mail

---

## Fluxo da waitlist

```
Usuário preenche o form
  │
  ▼
waitlist-form.tsx
  Validação básica no client (UX — feedback imediato)
  │
  ▼ POST /api/waitlist
route.ts
  Zod valida e-mail no servidor (segurança real)
  │
  ├─ Inválido → 422 com mensagem
  │
  ▼
supabaseAdmin.from('waitlist').insert({ email, source })
  │
  ├─ E-mail duplicado (código 23505) → 200 gracioso (não vaza existência)
  ├─ Erro de banco → 500 sem expor detalhes internos
  │
  ▼ Sucesso → 201
sendLeadNotification(email)
  Chamada async, não bloqueia a resposta
  Falha silenciosa — o lead já está no banco
```

---

## Sistema de animações

| Elemento | Técnica | Arquivo |
|---|---|---|
| Radar | `requestAnimationFrame` + `conic-gradient` rotacionando | `hero/radar.tsx` |
| Blips do radar | Sincronizados com ângulo da varredura, `animation: blip-spawn` | `hero/radar.tsx` |
| Floating cards | `animation: float / float-b` com delays diferentes | `hero/hero.tsx` |
| Hero entry | `hero-fade-up` com delays escalonados por elemento | `globals.css` |
| Scroll reveals | `IntersectionObserver` em `.reveal` e `.reveal-scale` com retry 150ms/400ms | `scroll-reveal.tsx` |
| Spotlight nos cards | Mouse `onMouseMove` → CSS variables `--mouse-x/y` → `radial-gradient` no `::before` | `spotlight-card.tsx` |
| Contadores | `easeOutExpo` via `requestAnimationFrame`, dispara ao entrar na viewport | `stats-bar.tsx` |
| Marquee | `animation: marquee-left` CSS puro, pausa no hover | `marquee.tsx` |
| FAQ | Visibilidade controlada por React state — imune a re-renders | `faq.tsx` |
| Background | `radial-gradient` animado com `bg-shift` keyframe | `globals.css` |
| Sticky CTA | Aparece com `translateY` quando scroll > 45% | `sticky-cta-bar.tsx` |
| `prefers-reduced-motion` | Todas as animações desabilitadas via media query | `globals.css` |

---

## Design system

Todos os tokens são CSS variables definidas em `app/globals.css`:

```css
/* Cores */
--bg:              #060807   /* fundo principal */
--panel:           #0f1410   /* cards e painéis */
--panel-2:         #141a15   /* painéis secundários */
--accent:          #c6f24e   /* verde-limão — CTAs, destaque, acento */
--teal:            #3dd7b0   /* teal — variação de blips e pills */
--text-primary:    #edf0ea
--text-secondary:  #8a9b8a
--text-faint:      #4a574a

/* Bordas */
--border:          rgba(198, 242, 78, 0.10)
--border-bright:   rgba(198, 242, 78, 0.28)

/* Glows */
--glow-accent:     0 0 40px rgba(198,242,78,0.18)
--glow-accent-strong: 0 0 60px rgba(198,242,78,0.35)
```

**Tipografia:**
- Display/Headline: `Bricolage Grotesque` (800) — headlines grandes, tracking apertado
- Corpo: `Hanken Grotesk` (400–700) — leitura confortável
- Mono: `JetBrains Mono` — eyebrows, labels de dados, mock de e-mail

---

## Segurança

| Ponto | Implementação |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — nunca em variável `NEXT_PUBLIC_` |
| RLS na tabela `waitlist` | Ativa sem policies públicas — zero acesso anônimo direto |
| Validação de e-mail | Zod no servidor (segurança) + client (UX) com o mesmo schema |
| E-mail duplicado | Retorna 200 gracioso — não vaza se o e-mail já existe |
| `.env.local` | No `.gitignore` — nunca commitado |
| Logs de erro | Nunca expõem chaves ou dados sensíveis ao client |
| Rate limiting | Via Vercel Edge (proteção DDoS nativa no free tier) |

---

## Decisões técnicas relevantes

**Por que sem shadcn/ui?**
O design system é completamente custom (tema escuro, cores específicas, animações proprietárias). Shadcn adiciona overhead de componentes que seriam sobrescritos 100%. Tailwind + CSS variables diretas entregam mais controle com menos código.

**Por que FAQ usa React state em vez de ScrollReveal?**
O `ScrollReveal` adiciona `is-visible` ao `classList` via JS vanilla. Quando o React re-renderiza um componente com `useState` (ex: abrir/fechar FAQ), ele reescreve o `className` do DOM e remove classes adicionadas externamente. A solução é controlar visibilidade com `useState` dentro do próprio componente client.

**Por que Resend tem falha silenciosa?**
O cadastro no banco é a ação crítica. A notificação por e-mail é conveniência. Se o Resend falhar (timeout, rate limit, API key errada), o lead já está salvo no Supabase. Não faz sentido retornar erro 500 para o usuário por causa de uma notificação.

**Por que `safelist` no Tailwind?**
Classes geradas via template literal (`reveal-delay-${i}`) são invisíveis para o analisador estático do Tailwind e seriam purgadas em produção. O `safelist` com pattern `/^reveal/` garante que todas as variantes sejam incluídas no bundle CSS final.

---

## Roadmap pós-validação

- [ ] Domínio próprio (`rivalradar.com` ou `.app`) na Vercel
- [ ] Verificar domínio no Resend para remetente customizado
- [ ] Counter de leads em tempo real na landing (query `count` no Supabase)
- [ ] Dashboard admin para visualizar e exportar leads
- [ ] Notificação de novos leads no Slack além do e-mail
- [ ] A/B test no copy do headline principal
- [ ] Analytics sem cookies (Plausible ou Umami)
- [ ] Lighthouse audit: meta 95+ em todas as categorias
- [ ] Construir o produto de fato 🚀

---

## Licença

Privado — todos os direitos reservados © 2026 RivalRadar.
