import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

function checkBasicAuth(request: Request): boolean {
  const auth = request.headers.get('authorization')
  if (!auth?.startsWith('Basic ')) return false
  const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf-8')
  const sep = decoded.indexOf(':')
  if (sep === -1) return false
  const user = decoded.slice(0, sep)
  const pass = decoded.slice(sep + 1)
  const expectedUser = process.env.ADMIN_USERNAME ?? 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD ?? ''
  if (!expectedPass) return false
  try {
    const ub = Buffer.from(user), eb = Buffer.from(expectedUser)
    const pb = Buffer.from(pass), epb = Buffer.from(expectedPass)
    return (
      ub.length === eb.length && timingSafeEqual(ub, eb) &&
      pb.length === epb.length && timingSafeEqual(pb, epb)
    )
  } catch {
    return false
  }
}

function csvEscape(v: string): string {
  if (/[",\n\r=+\-@\t]/.test(v)) return `"${v.replace(/"/g, '""')}"`
  return v
}

/**
 * GET /api/admin/leads?format=csv|json&page=0
 * Retorna leads paginados. Protegido por Basic Auth (independente do middleware).
 */
export async function GET(request: Request) {
  if (!checkBasicAuth(request)) {
    return new NextResponse('Acesso restrito.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="RivalRadar Admin"' },
    })
  }

  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') ?? 'json'
  const PAGE_SIZE = 500
  const page = Math.max(0, parseInt(searchParams.get('page') ?? '0', 10))
  const from = page * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabaseAdmin
    .from('waitlist')
    .select('id, email, source, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: 'Falha ao buscar leads.' }, { status: 500 })
  }

  if (format === 'csv') {
    const header = 'id,email,source,created_at'
    const rows = (data ?? []).map(
      (r) => [r.id, r.email, r.source, r.created_at].map(csvEscape).join(',')
    )
    const csv = [header, ...rows].join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="rivalradar-leads-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    })
  }

  return NextResponse.json({
    data,
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
    hasMore: (count ?? 0) > to + 1,
  })
}
