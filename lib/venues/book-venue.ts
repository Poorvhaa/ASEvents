import type { Venue } from '@/lib/types/venues'
import type { QuoteModalPrefill } from '@/hooks/use-quote-modal'

export function getVenueQuotePrefill(venue: Venue, overrides?: Partial<QuoteModalPrefill>): QuoteModalPrefill {
  const eventType =
    venue.category === 'Corporate Venues'
      ? 'Corporate Event'
      : venue.category === 'Exhibition Venues'
        ? 'Exhibition'
        : 'Wedding'

  return {
    eventType,
    venueName: venue.name,
    venueCategory: venue.category,
    venueCapacity: venue.capacity,
    city: venue.city,
    guestCount: venue.capacity,
    step: 4,
    ...overrides,
  }
}
