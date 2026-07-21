import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Locale route prefix redirection
  const localeMatch = pathname.match(/^\/(en|hi|gu)(\/|$)/)
  if (localeMatch) {
    const locale = localeMatch[1]
    const cleanPath = pathname.replace(/^\/(en|hi|gu)/, '') || '/'
    const redirectUrl = new URL(cleanPath, request.url)
    
    // Copy query parameters
    request.nextUrl.searchParams.forEach((val, key) => {
      redirectUrl.searchParams.set(key, val)
    })

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('as-events-language', locale, { path: '/', maxAge: 31536000 })
    return response
  }

  // Admin authentication check
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
