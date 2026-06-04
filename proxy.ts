import { NextRequest, NextResponse } from 'next/server'

/**
 * Protege /admin e /api/admin com HTTP Basic Auth.
 * Roda no Edge Runtime — usa comparação bit-a-bit em vez de crypto.timingSafeEqual.
 * Configure ADMIN_USERNAME e ADMIN_PASSWORD no .env.local.
 */

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Compara contra si mesmo para manter tempo constante, retorna false
    let r = 0
    for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ a.charCodeAt(i)
    return false
  }
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader?.startsWith('Basic ')) {
    const decoded = atob(authHeader.slice(6))
    const sep = decoded.indexOf(':')
    if (sep !== -1) {
      const user = decoded.slice(0, sep)
      const pass = decoded.slice(sep + 1)
      const expectedUser = process.env.ADMIN_USERNAME ?? 'admin'
      const expectedPass = process.env.ADMIN_PASSWORD ?? ''

      if (
        expectedPass &&
        timingSafeEqual(user, expectedUser) &&
        timingSafeEqual(pass, expectedPass)
      ) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Acesso restrito.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="RivalRadar Admin"' },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
