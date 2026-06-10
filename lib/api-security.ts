import { NextRequest, NextResponse } from 'next/server'

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 30

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function sanitizeString(value: unknown, maxLength = 5000): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeEmail(value: unknown): string {
  return sanitizeString(value, 254).toLowerCase()
}

export function sanitizePhone(value: unknown): string {
  return sanitizeString(value, 20).replace(/[^\d+\-\s()]/g, '')
}

export function checkRateLimit(
  request: NextRequest,
  routeKey: string,
  max = RATE_LIMIT_MAX,
  windowMs = RATE_LIMIT_WINDOW_MS
): NextResponse | null {
  const ip = getClientIp(request)
  const key = `${routeKey}:${ip}`
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  if (entry.count >= max) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  entry.count += 1
  return null
}

export function verifyAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  return Boolean(secret && token === secret)
}
