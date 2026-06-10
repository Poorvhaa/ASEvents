import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/api-security'
import { availabilityQuerySchema } from '@/lib/validations/schemas'
import { checkVenueAvailability } from '@/services/bookingService'

export async function GET(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'availability', 60)
  if (rateLimited) return rateLimited

  try {
    const { searchParams } = new URL(request.url)
    const parsed = availabilityQuerySchema.safeParse({
      venueId: searchParams.get('venueId'),
      eventDate: searchParams.get('eventDate'),
    })

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid parameters', available: false }, { status: 400 })
    }

    const result = await checkVenueAvailability(parsed.data.venueId, parsed.data.eventDate)

    if (!result.available) {
      return NextResponse.json({
        available: false,
        message: result.message || 'Venue already booked',
      })
    }

    return NextResponse.json({ available: true })
  } catch (error) {
    console.error('[Availability API] Error:', error)
    return NextResponse.json({ error: 'Availability check failed' }, { status: 500 })
  }
}
