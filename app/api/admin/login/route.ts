import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/api-security'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'admin-login', 10)
  if (rateLimited) return rateLimited

  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin login is not configured. Set ADMIN_PASSWORD.' },
        { status: 503 }
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const secret = process.env.ADMIN_SESSION_SECRET || adminPassword
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
