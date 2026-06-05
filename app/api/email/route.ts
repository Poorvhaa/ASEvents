import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quoteRequests, contactSubmissions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// This is a webhook endpoint to handle email notifications
// You can integrate with services like SendGrid, Resend, or AWS SES

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, id } = body

    if (type === 'quote_submitted') {
      const quote = await db.query.quoteRequests.findFirst({
        where: eq(quoteRequests.id, id),
      })

      if (!quote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
      }

      // Send email notification to admin
      // Example: await sendEmail({
      //   to: 'admin@asevents.com',
      //   subject: `New Quote Request from ${quote.name}`,
      //   template: 'quote-notification',
      //   data: quote,
      // })

      return NextResponse.json({ success: true, message: 'Quote notification sent' })
    }

    if (type === 'contact_submitted') {
      const contact = await db.query.contactSubmissions.findFirst({
        where: eq(contactSubmissions.id, id),
      })

      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
      }

      // Send email notification to admin
      // Example: await sendEmail({
      //   to: 'admin@asevents.com',
      //   subject: `New Contact: ${contact.subject}`,
      //   template: 'contact-notification',
      //   data: contact,
      // })

      return NextResponse.json({ success: true, message: 'Contact notification sent' })
    }

    return NextResponse.json({ error: 'Unknown email type' }, { status: 400 })
  } catch (error) {
    console.error('[v0] Email endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
