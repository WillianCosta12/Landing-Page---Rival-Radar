import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase com SERVICE ROLE KEY.
 * ⚠️  NUNCA importe este arquivo em componentes client-side.
 *     Ele vive apenas em Route Handlers e Server Components.
 */
function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      '[Supabase] Variáveis de ambiente ausentes. ' +
      'Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.'
    )
  }

  return createClient(url, key, {
    auth: {
      // service role não usa sessão de usuário
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Singleton: evita criar N clients em hot-reload do Next.js dev
export const supabaseAdmin = createSupabaseAdmin()
