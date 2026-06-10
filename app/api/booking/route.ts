import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeEmail, sanitizePhone, sanitizeString } from '@/lib/api-security'
import { bookingSchema } from '@/lib/validations/schemas'
import { createVenueBooking } from '@/services/bookingService'
import { getVenueById } from '@/services/venueService'
import { sendBookingEmails } from '@/services/email'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'booking')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()
    const parsed = bookingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const { booking, error } = await createVenueBooking({
      venueId: data.venueId,
      eventDate: data.eventDate,
      customerName: sanitizeString(data.customerName, 100),
      email: sanitizeEmail(data.email),
      phone: data.phone ? sanitizePhone(data.phone) : undefined,
      guestCount: data.guestCount,
    })

    if (error || !booking) {
      return NextResponse.json({ error: error || 'Booking failed' }, { status: 400 })
    }

    const venue = await getVenueById(data.venueId)
    await sendBookingEmails(booking, venue?.name || 'Venue')

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('[Booking API] Error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
