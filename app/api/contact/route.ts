import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone } from '@/lib/api-security'
import { contactSchema } from '@/lib/validations/schemas'
import { createContactInquiry } from '@/services/leadService'
import { sendContactEmails } from '@/services/email'
import { escapeHTML, sanitizeTextarea } from '@/lib/validations/sanitization'

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

    // Escape HTML tags to prevent XSS (script injection)
    const payload = {
      name: escapeHTML(parsed.data.name),
      email: sanitizeEmail(parsed.data.email),
      phone: parsed.data.phone ? sanitizePhone(parsed.data.phone) : undefined,
      subject: escapeHTML(parsed.data.subject || 'General Inquiry'),
      message: escapeHTML(sanitizeTextarea(parsed.data.message)),
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
