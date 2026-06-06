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

export async function POST(request: NextRequest) {
  const body = await request.json()
  const username = String(body?.username ?? '')
  const password = String(body?.password ?? '')

  const expectedUser = process.env.ADMIN_USERNAME ?? ''
  const expectedPass = process.env.ADMIN_PASSWORD ?? ''

  if (
    expectedUser &&
    expectedPass &&
    timingSafeEqual(username, expectedUser) &&
    timingSafeEqual(password, expectedPass)
  ) {
    const token = btoa(`${username}:${password}`)
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })
    return res
  }

  return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_token')
  return res
}
