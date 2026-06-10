import { isVenueDateBooked } from '@/lib/data/venue-bookings'
import type { ConsultantAnswers, VenueAvailabilitySuggestion } from '@/lib/ai/types'

export interface VenueDateCheckResult {
  available: boolean
  message: string
}

export function checkMockVenueDateAvailability(
  venueId: string,
  eventDate: string
): VenueDateCheckResult {
  if (!eventDate) {
    return { available: true, message: '' }
  }

  if (isVenueDateBooked(venueId, eventDate)) {
    return {
      available: false,
      message: 'Venue unavailable on selected date. Please choose another date.',
    }
  }

  return {
    available: true,
    message: 'Venue available. Continue with booking.',
  }
}

export function suggestVenueAvailability(answers: ConsultantAnswers): VenueAvailabilitySuggestion {
  const city = answers.city || 'your city'
  const month = answers.eventDate
    ? new Date(answers.eventDate).toLocaleString('en-IN', { month: 'long' })
    : ''

  const peakMonths = ['November', 'December', 'January', 'February']
  const isPeak = month && peakMonths.includes(month)

  let message = `We recommend checking venue availability in ${city} early`
  if (isPeak) {
    message = `${month} is peak wedding season in ${city} — book 6-9 months in advance`
  } else if (answers.eventType.includes('Wedding')) {
    message = `For weddings in ${city}, popular venues fill 4-6 months ahead`
  }

  return {
    message,
    peakSeasonNote: isPeak ? 'Peak season — limited dates available' : undefined,
    suggestedDates: isPeak
      ? ['Consider weekday dates for better availability', 'Early December slots may still be open']
      : undefined,
  }
}
