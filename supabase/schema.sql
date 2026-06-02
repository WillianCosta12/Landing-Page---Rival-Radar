-- ═══════════════════════════════════════
-- RivalRadar · Schema Supabase
-- Execute no SQL Editor do Supabase Dashboard
-- ═══════════════════════════════════════

-- 1. Tabela de waitlist
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  source     text not null default 'rivalradar-landing',
  created_at timestamptz not null default now()
);

-- 2. RLS obrigatória (sem exceção)
alter table public.waitlist enable row level security;

-- 3. Nenhuma policy pública de leitura ou escrita.
--    Inserts são feitos exclusivamente via service_role_key
--    na Route Handler — que bypassa RLS por design no Supabase.
--    Isso garante que nenhum cliente anônimo consiga inserir
--    ou ler dados diretamente.

-- 4. (Opcional) Index para acelerar lookup por e-mail
create index if not exists waitlist_email_idx on public.waitlist (email);

-- 5. (Opcional) Index para ordenar por data de cadastro
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- ═══════════════════════════════════════
-- Como verificar que está correto:
-- 1. No Supabase Dashboard > Authentication > Policies:
--    a tabela waitlist deve aparecer sem policies listadas.
-- 2. Tente fazer um INSERT pelo Supabase Table Editor
--    com a anon key — deve retornar erro de RLS.
-- 3. O insert via Route Handler (service_role) deve funcionar.
-- ═══════════════════════════════════════
