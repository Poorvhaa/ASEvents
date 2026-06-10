import { venues as staticVenues } from '@/lib/data/venues'
import type { DbVenue } from '@/types/database'
import type { Venue, VenueCategory, VenueCity } from '@/lib/types/venues'

function slugify(name: string, city: string): string {
  return `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function dbToMinimalVenue(db: DbVenue): Venue {
  const gallery = Array.isArray(db.gallery) ? db.gallery : []
  return {
    id: db.id,
    slug: slugify(db.name, db.city),
    name: db.name,
    location: db.city,
    city: db.city as VenueCity,
    category: db.category as VenueCategory,
    capacity: `${db.capacity} Guests`,
    indoorOutdoor: 'Indoor',
    rating: 4.5,
    startingPrice: db.price_range || 'On Request',
    image: db.image || '/placeholder-venue.jpg',
    description: db.description || '',
    parking: 'Available',
    rooms: 'On Request',
    amenities: [],
    gallery: gallery.length > 0 ? gallery : [db.image || '/placeholder-venue.jpg'],
  }
}

export function mergeDbVenueWithStatic(db: DbVenue): Venue {
  const byId = staticVenues.find((v) => v.id === db.id)
  if (byId) return { ...byId, id: db.id }

  const byName = staticVenues.find(
    (v) => v.name.toLowerCase() === db.name.toLowerCase() && v.city === db.city
  )
  if (byName) return { ...byName, id: db.id }

  return dbToMinimalVenue(db)
}

export function staticVenuesToDisplay(): Venue[] {
  return staticVenues
}
