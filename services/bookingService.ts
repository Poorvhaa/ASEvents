import { createServerSupabaseClient } from '@/lib/supabase'
import { getVenueById } from '@/services/venueService'
import type { DbVenueBooking } from '@/types/database'

const ACTIVE_STATUSES = ['pending', 'confirmed']

export async function checkVenueAvailability(
  venueId: string,
  eventDate: string
): Promise<{ available: boolean; message?: string }> {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase
      .from('venue_bookings')
      .select('id')
      .eq('venue_id', venueId)
      .eq('event_date', eventDate)
      .in('status', ACTIVE_STATUSES)
      .limit(1)

    if (error) {
      console.error('[BookingService] Availability check error:', error.message)
    } else if (data && data.length > 0) {
      return { available: false, message: 'Venue already booked' }
    }
    return { available: true }
  }

  return { available: true }
}

export async function createVenueBooking(input: {
  venueId: string
  eventDate: string
  customerName: string
  email: string
  phone?: string
  guestCount: number
}): Promise<{ booking: DbVenueBooking | null; error?: string }> {
  const venue = await getVenueById(input.venueId)
  if (!venue) {
    return { booking: null, error: 'Venue not found' }
  }

  if (input.guestCount > venue.capacity) {
    return {
      booking: null,
      error: `Guest count exceeds venue capacity of ${venue.capacity}`,
    }
  }

  const availability = await checkVenueAvailability(input.venueId, input.eventDate)
  if (!availability.available) {
    return { booking: null, error: availability.message || 'Venue not available' }
  }

  const supabase = createServerSupabaseClient()
  if (!supabase) {
    const mockBooking: DbVenueBooking = {
      id: crypto.randomUUID(),
      venue_id: input.venueId,
      event_date: input.eventDate,
      customer_name: input.customerName,
      email: input.email,
      phone: input.phone || null,
      guest_count: input.guestCount,
      status: 'pending',
    }
    console.log('[BookingService] Supabase not configured — mock booking:', mockBooking)
    return { booking: mockBooking }
  }

  const { data, error } = await supabase
    .from('venue_bookings')
    .insert({
      venue_id: input.venueId,
      event_date: input.eventDate,
      customer_name: input.customerName,
      email: input.email,
      phone: input.phone || null,
      guest_count: input.guestCount,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
  console.error('[BookingService] Full Insert Error:', error)

  return {
    booking: null,
    error: `${error.code} - ${error.message}`
  }
}

  return { booking: data as DbVenueBooking }
}

export async function getBookings(filters?: {
  status?: string
  fromDate?: string
  toDate?: string
}): Promise<DbVenueBooking[]> {
  const supabase = createServerSupabaseClient()
  if (!supabase) return []

  let query = supabase.from('venue_bookings').select('*').order('event_date', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.fromDate) query = query.gte('event_date', filters.fromDate)
  if (filters?.toDate) query = query.lte('event_date', filters.toDate)

  const { data, error } = await query.limit(200)
  if (error) {
    console.error('[BookingService] Fetch error:', error.message)
    return []
  }
  return (data || []) as DbVenueBooking[]
}
