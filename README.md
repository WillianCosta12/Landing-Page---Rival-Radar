# RivalRadar — Landing Page

> Inteligência competitiva no piloto automático para indie founders e times de produto enxutos.

---

## O que é

O RivalRadar monitora automaticamente os concorrentes que você cadastra — changelog, Product Hunt, página de preços, release notes e blog — e entrega um digest semanal acionável por e-mail ou Slack. Esta repo é a **landing page + waitlist** do produto.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Estilo | Tailwind CSS (design tokens via CSS vars) |
| Banco | Supabase (Postgres) |
| E-mail | Resend |
| Deploy | Vercel |
| Validação | Zod |
| Ícones | Lucide React |

---

## Estrutura de arquivos

```
rivalradar/
├── app/
│   ├── layout.tsx              # Fonts (Bricolage, Hanken, JetBrains), metadata, OG
│   ├── page.tsx                # Monta as seções em ordem
│   ├── globals.css             # Design tokens (CSS vars), keyframes, utilitários
│   ├── og/
│   │   └── route.tsx           # OG image dinâmica via next/og (edge runtime)
│   └── api/
│       └── waitlist/
│           └── route.ts        # POST: valida (Zod) → insert Supabase → notifica Resend
│
├── components/
│   ├── nav.tsx                 # Nav fixa com blur no scroll + menu mobile
│   ├── scroll-reveal.tsx       # IntersectionObserver wrapper para animações de entrada
│   ├── hero/
│   │   ├── hero.tsx            # Layout 2 colunas, copy, social proof, faixa de fontes
│   │   ├── radar.tsx           # Radar animado: anéis, varredura, blips com tags (RAF + CSS)
│   │   └── waitlist-form.tsx   # Form com estados: idle / loading / success / error
│   ├── problem.tsx             # Contraste ~3h vs 5min com cards
│   ├── how-it-works.tsx        # 3 passos numerados
│   ├── digest-mock.tsx         # Mock de e-mail/terminal com pills coloridas
│   ├── features.tsx            # Grid de 6 cards de features
│   ├── pricing.tsx             # Planos Solo (gratuito) e Builder (R$39 travado)
│   ├── cta.tsx                 # CTA final com FOMO
│   └── footer.tsx              # Logo, copyright, links
│
├── lib/
│   ├── supabase.ts             # Client com service_role_key (server-side only)
│   ├── resend.ts               # Client Resend + função sendLeadNotification
│   └── validations.ts          # Schema Zod compartilhado (email)
│
├── supabase/
│   └── schema.sql              # Tabela waitlist + RLS (para reprodução)
│
├── .env.example                # Template de variáveis (sem valores reais)
├── .gitignore                  # Inclui .env.local
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

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

Edite `.env.local` com seus valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
RESEND_API_KEY=re_sua_api_key
NOTIFICATION_EMAIL=seu@email.com
```

### 3. Rode

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Setup do Supabase

### Criar a tabela

No [Supabase Dashboard](https://supabase.com/dashboard), vá em **SQL Editor** e execute:

```sql
-- Tabela de waitlist
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'rivalradar-landing',
  created_at timestamptz not null default now()
);

-- RLS obrigatória
alter table public.waitlist enable row level security;

-- Índices para performance
create index if not exists waitlist_email_idx on public.waitlist (email);
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
```

O arquivo completo está em `supabase/schema.sql`.

### Estratégia de RLS

RLS ativa **sem policies públicas** = nenhum cliente anônimo consegue ler ou inserir diretamente. Os inserts acontecem via `service_role_key` na Route Handler, que bypassa RLS por design — padrão correto para waitlist pública.

### Pegar as chaves

Em **Settings > API** no dashboard do Supabase:

| Variável | Onde pegar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave `service_role` (nunca a `anon`) |

---

## Setup do Resend

1. Crie conta em [resend.com](https://resend.com)
2. Vá em **API Keys > Create API Key**
3. Copie e adicione ao `.env.local` como `RESEND_API_KEY`
4. Defina `NOTIFICATION_EMAIL` com o e-mail que receberá os alertas

> **Nota:** O remetente padrão é `onboarding@resend.dev`. Para usar domínio próprio (`oi@rivalradar.app`), verifique o domínio em **Resend > Domains** e atualize o campo `from` em `lib/resend.ts`.

---

## Deploy na Vercel

### 1. Suba o código

```bash
git add .
git commit -m "chore: setup completo"
git push origin main
```

### 2. Importe na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório `Landing-Page---Rival-Radar`
3. Adicione as variáveis de ambiente no painel:

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service_role |
| `RESEND_API_KEY` | Chave da API do Resend |
| `NOTIFICATION_EMAIL` | Seu e-mail de notificação |

4. Clique em **Deploy**

### 3. Verifique o deploy

- Acesse a URL `.vercel.app` gerada
- Cadastre um e-mail de teste na waitlist
- Confirme o registro na tabela `waitlist` no Supabase Dashboard
- Confirme que chegou a notificação no seu e-mail

---

## Fluxo da waitlist

```
Usuário preenche o form
  ↓
waitlist-form.tsx (validação básica client-side — UX)
  ↓
POST /api/waitlist
  ↓
Zod valida o e-mail (server-side — segurança real)
  ↓
supabaseAdmin.from('waitlist').insert(...)
  ├── Sucesso → 201 + sendLeadNotification (async, não bloqueia)
  ├── E-mail duplicado (código 23505) → 200 gracioso
  └── Erro de banco → 500 sem vazar detalhes
```

---

## Segurança

- `SUPABASE_SERVICE_ROLE_KEY` **nunca chega ao client** — vive só na Route Handler
- RLS ativa na tabela `waitlist`, zero policies públicas
- Validação de e-mail com Zod no servidor (client é só feedback de UX)
- E-mail duplicado retorna 200 gracioso (não vaza existência do e-mail)
- `.env.local` no `.gitignore` — nunca commitado
- Logs de erro nunca expõem dados sensíveis ou chaves

---

## Animações

| Elemento | Técnica |
|---|---|
| Radar | `requestAnimationFrame` + `conic-gradient` rotacionando |
| Blips | Sincronizados com o ângulo da varredura, `animation: blip-spawn` |
| Hero | `animation: hero-fade-up` com delays escalonados por elemento |
| Scroll reveals | `IntersectionObserver` adicionando `.is-visible` nas seções |
| Hover nos cards | `translateY(-3px)` + `box-shadow` glow no acento |
| `prefers-reduced-motion` | Todas as animações desabilitadas via media query |

---

## Design tokens

Definidos em `app/globals.css` como CSS variables:

```css
--bg: #0a0c0b;           /* fundo principal */
--panel: #111614;         /* cards e painéis */
--panel-2: #171c19;       /* painéis secundários */
--accent: #c6f24e;        /* verde-limão — CTAs e destaque */
--teal: #3dd7b0;          /* teal — variação de blips e pills */
--text-primary: #edf0ea;
--text-secondary: #9aa39a;
--text-faint: #5d655d;
--border: rgba(198,242,78,0.12);
```

---

## Roadmap pós-validação

- [ ] Domínio próprio na Vercel
- [ ] Verificar domínio no Resend para remetente customizado
- [ ] Counter real de leads (query `count` na tabela waitlist)
- [ ] Dashboard admin para visualizar e exportar leads
- [ ] Integração Slack para notificação de novos leads
- [ ] A/B test no copy do CTA
- [ ] Analytics (Plausible ou Umami — sem cookies)
- [ ] Implementar o produto de fato 🚀

---

## Licença

Privado — todos os direitos reservados © 2026 RivalRadar.
