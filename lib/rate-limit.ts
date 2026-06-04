/**
 * Rate limiter em memória por chave (IP ou identificador).
 *
 * Limitação: cada instância serverless tem seu próprio mapa — resets no
 * cold start. Fornece proteção básica contra bursts. Para produção com
 * tráfego alto, substituir por @upstash/ratelimit + @upstash/redis.
 */
const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, retryAfter: 0 }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((record.reset - now) / 1000),
    }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count, retryAfter: 0 }
}
