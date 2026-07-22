import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone, sanitizeString } from '@/lib/api-security'
import { quoteSchema } from '@/lib/validations/schemas'
import { createQuoteLead, getLeads } from '@/services/leadService'
import { sendQuoteEmails } from '@/services/email'
import { verifyAdminRequest } from '@/lib/api-security'

/** Legacy endpoint — forwards to Supabase-backed quote flow */
export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'quote')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()

    const parsed = quoteSchema.safeParse({
      name: body.name,
      email: body.email,
      phone: body.phone || '+910000000000',
      eventType: body.eventType,
      venueType: body.venueType || body.city || body.location || '',
      location: body.location || body.city || '',
      guestCount: body.guestCount,
      budget: body.budget,
      requirements: body.requirements,
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    await createQuoteLead({
      name: sanitizeString(data.name, 100),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      eventType: sanitizeString(data.eventType, 100),
      venueType: data.venueType ? sanitizeString(data.venueType, 100) : undefined,
      location: data.location ? sanitizeString(data.location, 120) : undefined,
      guestCount: data.guestCount !== undefined ? String(data.guestCount) : undefined,
      budget: data.budget ? sanitizeString(data.budget, 100) : undefined,
      requirements: data.requirements ? sanitizeString(data.requirements, 5000) : undefined,
      source: 'legacy_quotes_api',
    })

    await sendQuoteEmails({
      name: data.name,
      email: data.email,
      eventType: data.eventType,
      venueType: data.venueType,
      location: data.location,
      guestCount: data.guestCount !== undefined ? String(data.guestCount) : undefined,
      budget: data.budget !== undefined ? String(data.budget) : undefined,
    })

    return NextResponse.json({ success: true, message: 'Quote request submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('[Quotes API] Error:', error)
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const leads = await getLeads()
    return NextResponse.json(leads)
  } catch (error) {
    console.error('[Quotes API] Fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}
