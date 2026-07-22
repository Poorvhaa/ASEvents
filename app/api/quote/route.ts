import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone } from '@/lib/api-security'
import { quoteSchema } from '@/lib/validations/schemas'
import { createQuoteLead } from '@/services/leadService'
import { sendQuoteEmails } from '@/services/email'
import { generateWhatsAppUrl } from '@/services/whatsapp'
import { escapeHTML, sanitizeTextarea } from '@/lib/validations/sanitization'

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
      name: escapeHTML(data.name),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      eventType: escapeHTML(data.eventType),
      venueType: data.venueType ? escapeHTML(data.venueType) : undefined,
      location: escapeHTML(data.location),
      guestCount: data.guestCount !== undefined ? String(data.guestCount) : undefined,
      budget: data.budget ? String(data.budget) : undefined,
      requirements: data.requirements ? escapeHTML(sanitizeTextarea(data.requirements)) : undefined,
      source: 'quote_form',
    }

    await createQuoteLead(payload)

    await sendQuoteEmails({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      eventType: payload.eventType,
      venueType: payload.venueType,
      location: payload.location,
      guestCount: payload.guestCount,
      budget: payload.budget,
    })

    const whatsappUrl = generateWhatsAppUrl({
      eventType: payload.eventType,
      venueType: payload.venueType,
      location: payload.location,
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
