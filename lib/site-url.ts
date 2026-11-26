/**
 * URL pública do site, usada em metadata, OG, robots e sitemap.
 *
 * Ordem: NEXT_PUBLIC_SITE_URL (definida manualmente) → domínio de produção
 * que a Vercel injeta automaticamente → localhost em desenvolvimento.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
