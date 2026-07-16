import { Resend } from 'resend'
import type { LeadPayload, AIConsultationResult } from '@/lib/ai/types'
import type { DbVenueBooking } from '@/types/database'

const COMPANY_NAME = 'AS Events'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sales@asevents.in'

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

async function sendEmail(to: string[], subject: string, html: string): Promise<boolean> {
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    console.error('[Email] Configuration Error: RESEND_FROM_EMAIL environment variable is missing.')
    return false
  }

  const resend = getResend()
  if (!resend) {
    console.log('[Email] RESEND_API_KEY not set — preview:', { to, subject })
    return false
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    })
    if (error) {
      console.error('[Email] Send error:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('[Email] Failed:', error)
    return false
  }
}

export async function sendQuoteEmails(payload: {
  name: string
  email: string
  eventType: string
  city?: string
  guestCount?: string
  budget?: string
}): Promise<void> {
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="color:#2563EB;">Thank You, ${payload.name}!</h1>
      <p>We've received your quote request for <strong>${payload.eventType}</strong>.</p>
      <p>Our team will contact you within 24 hours with a personalized proposal.</p>
      <p>— ${COMPANY_NAME}</p>
    </div>`

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;">
      <h2>New Quote Request</h2>
      <ul>
        <li><strong>Name:</strong> ${payload.name}</li>
        <li><strong>Email:</strong> ${payload.email}</li>
        <li><strong>Event:</strong> ${payload.eventType}</li>
        <li><strong>City:</strong> ${payload.city || 'N/A'}</li>
        <li><strong>Guests:</strong> ${payload.guestCount || 'N/A'}</li>
        <li><strong>Budget:</strong> ${payload.budget || 'N/A'}</li>
      </ul>
    </div>`

  await Promise.allSettled([
    sendEmail([payload.email], `Thank You — ${COMPANY_NAME}`, customerHtml),
    sendEmail([ADMIN_EMAIL], `New Quote: ${payload.name}`, adminHtml),
  ])
}

export async function sendContactEmails(payload: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<void> {
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h1 style="color:#2563EB;">Message Received</h1>
      <p>Hi ${payload.name}, thank you for contacting ${COMPANY_NAME}. We'll respond shortly.</p>
    </div>`

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;">
      <h2>Contact Form Submission</h2>
      <p><strong>From:</strong> ${payload.name} (${payload.email})</p>
      <p><strong>Subject:</strong> ${payload.subject}</p>
      <p>${payload.message}</p>
    </div>`

  await Promise.allSettled([
    sendEmail([payload.email], `We received your message — ${COMPANY_NAME}`, customerHtml),
    sendEmail([ADMIN_EMAIL], `Contact: ${payload.subject}`, adminHtml),
  ])
}

export async function sendBookingEmails(
  booking: DbVenueBooking,
  venueName: string
): Promise<void> {
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;">
      <h1 style="color:#2563EB;">Booking Request Received</h1>
      <p>Hi ${booking.customer_name}, we've received your booking request for <strong>${venueName}</strong> on ${booking.event_date}.</p>
      <p>Our team will confirm availability and contact you shortly.</p>
    </div>`

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;">
      <h2>New Venue Booking</h2>
      <ul>
        <li><strong>Venue:</strong> ${venueName}</li>
        <li><strong>Date:</strong> ${booking.event_date}</li>
        <li><strong>Customer:</strong> ${booking.customer_name}</li>
        <li><strong>Email:</strong> ${booking.email}</li>
        <li><strong>Guests:</strong> ${booking.guest_count}</li>
      </ul>
    </div>`

  await Promise.allSettled([
    sendEmail([booking.email], `Booking Request — ${COMPANY_NAME}`, customerHtml),
    sendEmail([ADMIN_EMAIL], `Venue Booking: ${venueName}`, adminHtml),
  ])
}

/** @deprecated Use sendQuoteEmails — kept for AI lead flow compatibility */
export async function sendThankYouEmail(data: {
  lead: LeadPayload
  recommendation?: AIConsultationResult
}): Promise<boolean> {
  await sendQuoteEmails({
    name: data.lead.name,
    email: data.lead.email,
    eventType: data.lead.eventType,
    city: data.lead.city,
    guestCount: data.lead.guestCount,
    budget: data.lead.budget,
  })
  return true
}

/** @deprecated Use sendQuoteEmails */
export async function sendAdminLeadNotification(lead: LeadPayload): Promise<boolean> {
  await sendQuoteEmails({
    name: lead.name,
    email: lead.email,
    eventType: lead.eventType,
    city: lead.city,
    guestCount: lead.guestCount,
    budget: lead.budget,
  })
  return true
}
