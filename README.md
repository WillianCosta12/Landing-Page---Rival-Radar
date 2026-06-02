# RivalRadar — Landing Page

Inteligência competitiva no piloto automático para indie founders.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** (sem shadcn — design custom)
- **Supabase** (Postgres) para waitlist
- **Resend** para notificações de novos leads
- **Vercel** para deploy

---

## Rodar localmente

### 1. Clone e instale

```bash
git clone <repo-url>
cd rivalradar
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com seus valores reais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
RESEND_API_KEY=re_sua_api_key
NOTIFICATION_EMAIL=seu@email.com
```

### 3. Configure o Supabase

No [Supabase Dashboard](https://supabase.com/dashboard):

1. Crie um projeto novo
2. Vá em **SQL Editor** e rode o conteúdo de `supabase/schema.sql`
3. Verifique em **Authentication > Policies** que a tabela `waitlist` não tem policies públicas
4. Copie `Project URL` e `service_role key` de **Settings > API**

### 4. Configure o Resend (opcional — para notificações)

1. Crie conta em [resend.com](https://resend.com)
2. Crie uma API key
3. Adicione ao `.env.local`
4. *(Opcional)* Verifique um domínio próprio para usar como remetente

### 5. Rode

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Deploy na Vercel

### 1. Suba o código

```bash
git init
git add .
git commit -m "feat: rivalradar landing page"
git remote add origin <seu-repo-github>
git push -u origin main
```

### 2. Importe na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório GitHub
3. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
4. Clique em **Deploy**

### 3. Verifique

- Acesse a URL gerada pela Vercel
- Faça um cadastro de teste na waitlist
- Verifique o registro na tabela `waitlist` no Supabase Dashboard
- Cheque se chegou a notificação no seu e-mail

---

## Estrutura de arquivos

```
rivalradar/
├── app/
│   ├── layout.tsx          # Fonts, metadata, OG
│   ├── page.tsx            # Monta as seções
│   ├── globals.css         # Design tokens + animações
│   ├── og/route.tsx        # OG image dinâmica (next/og)
│   └── api/waitlist/
│       └── route.ts        # POST: valida → insert → notifica
│
├── components/
│   ├── nav.tsx
│   ├── scroll-reveal.tsx   # IntersectionObserver wrapper
│   ├── hero/
│   │   ├── hero.tsx
│   │   ├── radar.tsx       # Radar animado (CSS + RAF)
│   │   └── waitlist-form.tsx
│   ├── problem.tsx
│   ├── how-it-works.tsx
│   ├── digest-mock.tsx
│   ├── features.tsx
│   ├── pricing.tsx
│   ├── cta.tsx
│   └── footer.tsx
│
├── lib/
│   ├── supabase.ts         # Client server-side (service role)
│   ├── resend.ts           # Notificação de leads
│   └── validations.ts      # Schema Zod compartilhado
│
└── supabase/
    └── schema.sql          # Tabela + RLS
```

---

## Segurança

- `SUPABASE_SERVICE_ROLE_KEY` nunca fica no client — apenas na Route Handler
- RLS ativa na tabela `waitlist` sem policies públicas
- Validação de e-mail com Zod no servidor (client é só UX)
- E-mail duplicado retorna sucesso (não vaza existência)
- `.env.local` no `.gitignore` — nunca commitar

---

## Próximos passos (pós-validação)

- [ ] Domínio próprio na Vercel
- [ ] Verificar domínio no Resend para remetente customizado
- [ ] Counter real de waitlist (query count da tabela)
- [ ] Dashboard admin para ver os leads
- [ ] Integração Slack para notificação de leads
