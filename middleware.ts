import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_session')?.value
    const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD

    if (!secret || token !== secret) {
      const signIn = new URL('/sign-in', request.url)
      signIn.searchParams.set('redirect', pathname)
      return NextResponse.redirect(signIn)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
