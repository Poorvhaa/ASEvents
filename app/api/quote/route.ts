import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone, sanitizeString } from '@/lib/api-security'
import { quoteSchema } from '@/lib/validations/schemas'
import { createQuoteLead } from '@/services/leadService'
import { sendQuoteEmails } from '@/services/email'
import { generateWhatsAppUrl } from '@/services/whatsapp'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'quote')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()
    const parsed = quoteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const payload = {
      name: sanitizeString(data.name, 100),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      eventType: sanitizeString(data.eventType, 100),
      city: data.city ? sanitizeString(data.city, 100) : undefined,
      guestCount: data.guestCount !== undefined ? String(data.guestCount) : undefined,
      budget: data.budget ? sanitizeString(data.budget, 100) : undefined,
      venuePreference: data.venuePreference
        ? sanitizeString(data.venuePreference, 200)
        : undefined,
      requirements: data.requirements ? sanitizeString(data.requirements, 5000) : undefined,
      source: 'quote_form',
    }

    await createQuoteLead(payload)

    await sendQuoteEmails({
      name: payload.name,
      email: payload.email,
      eventType: payload.eventType,
      city: payload.city,
      guestCount: payload.guestCount,
      budget: payload.budget,
    })

    const whatsappUrl = generateWhatsAppUrl({
      eventType: payload.eventType,
      city: payload.city,
      guestCount: payload.guestCount,
      budget: payload.budget,
      requirements: payload.requirements,
      name: payload.name,
    })

    return NextResponse.json({ success: true, whatsappUrl })
  } catch (error) {
    console.error('[Quote API] Error:', error)
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 })
  }
}
