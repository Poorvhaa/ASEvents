import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone, sanitizeString } from '@/lib/api-security'
import { contactSchema } from '@/lib/validations/schemas'
import { createContactInquiry } from '@/services/leadService'
import { sendContactEmails } from '@/services/email'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'contact')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const payload = {
      name: sanitizeString(parsed.data.name, 100),
      email: sanitizeEmail(parsed.data.email),
      phone: parsed.data.phone ? sanitizePhone(parsed.data.phone) : undefined,
      subject: sanitizeString(parsed.data.subject, 200),
      message: sanitizeString(parsed.data.message, 5000),
    }

    const inquiry = await createContactInquiry(payload)

    await sendContactEmails({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    })

    return NextResponse.json(
      { success: true, id: inquiry?.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Contact API] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      {
        error: 'Failed to submit contact form',
        message: process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    )
  }
}
