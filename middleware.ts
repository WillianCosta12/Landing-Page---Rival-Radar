import { NextRequest, NextResponse } from 'next/server'

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()
  if (pathname.startsWith('/api/admin/auth')) return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value ?? ''
  const expected = btoa(
    `${process.env.ADMIN_USERNAME ?? 'admin'}:${process.env.ADMIN_PASSWORD ?? ''}`
  )

  if (!timingSafeEqual(token, expected)) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
