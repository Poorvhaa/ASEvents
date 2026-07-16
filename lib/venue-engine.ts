import { venues } from '@/lib/data/venues'
import type { ConsultantAnswers, VenueRecommendation } from '@/lib/ai/types'

function parseGuestCount(guests: string): number {
  const match = guests.match(/\d+/g)
  if (!match) return 200
  if (match.length >= 2) return parseInt(match[1]) || parseInt(match[0])
  return parseInt(match[0])
}

function parseCapacity(capacity: string): number {
  return parseInt(capacity.replace(/\D/g, '')) || 0
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/[₹,\s]/g, '')) || 0
}

function getPreferredCategories(eventType: string, venuePreference: string): string[] {
  const pref = venuePreference.toLowerCase()

  if (pref.includes('resort')) return ['Luxury Resorts', 'Destination Venues', 'Beach Venues']
  if (pref.includes('palace')) return ['Destination Venues', 'Wedding Halls']
  if (pref.includes('farmhouse')) return ['Farmhouses', 'Open Lawns']
  if (pref.includes('banquet')) return ['Banquet Halls', 'Wedding Halls']
  if (pref.includes('convention') || pref.includes('corporate'))
    return ['Corporate Venues', 'Exhibition Venues']

  if (['Corporate Event'].includes(eventType)) {
    return ['Corporate Venues', 'Exhibition Venues', 'Banquet Halls']
  }
  if (['Wedding', 'Engagement', 'Reception', 'Destination Wedding'].includes(eventType)) {
    return ['Wedding Halls', 'Luxury Resorts', 'Banquet Halls', 'Destination Venues', 'Farmhouses']
  }
  if (['Birthday', 'Anniversary', 'Festival Event'].includes(eventType)) {
    return ['Banquet Halls', 'Farmhouses', 'Open Lawns']
  }
  return ['Banquet Halls', 'Wedding Halls', 'Corporate Venues']
}

export function recommendVenues(answers: ConsultantAnswers): VenueRecommendation[] {
  const guests = parseGuestCount(answers.guestCount)
  const preferredCategories = getPreferredCategories(answers.eventType, answers.venuePreference)

  let filtered = venues.filter((v) => parseCapacity(v.capacity) >= guests * 0.7)

  if (answers.city) {
    const cityMatches = filtered.filter((v) => v.city === answers.city)
    if (cityMatches.length > 0) filtered = cityMatches
  }

  const scored = filtered.map((venue) => {
    let score = 0
    if (preferredCategories.includes(venue.category)) score += 10
    if (answers.city && venue.city === answers.city) score += 5
    score += venue.rating
    return { venue, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const top = scored.slice(0, 3).map(({ venue }) => ({
    slug: venue.slug,
    name: venue.name,
    type: venue.category,
    capacity: venue.capacity,
    location: `${venue.location}, ${venue.city}`,
    startingCost: venue.startingPrice,
  }))

  if (top.length === 0) {
    return [
      {
        slug: 'crystal-banquet-rajkot',
        name: 'Premium Banquet Hall',
        type: 'Banquet Hall',
        capacity: `${guests + 100} Guests`,
        location: answers.city || 'Ahmedabad',
        startingCost: '₹1,50,000',
      },
      {
        slug: 'azure-luxury-resort-udaipur',
        name: 'Luxury Resort Venue',
        type: 'Resort',
        capacity: `${guests + 200} Guests`,
        location: answers.city || 'Udaipur',
        startingCost: '₹5,00,000',
      },
    ]
  }

  return top
}

export function getVenueTypeSuggestions(eventType: string): string[] {
  if (['Wedding', 'Engagement', 'Reception', 'Destination Wedding'].includes(eventType)) {
    return ['Banquet Hall', 'Resort', 'Palace', 'Farmhouse']
  }
  if (['Corporate Event'].includes(eventType)) {
    return ['Convention Center', 'Hotel Ballroom', 'Exhibition Hall']
  }
  return ['Banquet Hall', 'Open Lawn', 'Farmhouse']
}
