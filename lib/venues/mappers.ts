import { venues as staticVenues } from '@/lib/data/venues'
import type { DbVenue } from '@/types/database'
import type { Venue, VenueCategory, VenueCity } from '@/lib/types/venues'



function dbToMinimalVenue(db: DbVenue): Venue {
  return {
    id: db.id,
    slug: db.slug,
    name: db.name,
    location: db.location,
    city: db.city as VenueCity,
    category: db.category as VenueCategory,
    capacity: `${db.capacity} Guests`,
    indoorOutdoor: db.indoor_outdoor as Venue['indoorOutdoor'],
    rating: Number(db.rating),
    startingPrice: db.starting_price || '',
    image: db.image,
    description: db.description,
    parking: db.parking,
    rooms: db.rooms,
    amenities: Array.isArray(db.amenities) ? db.amenities : [],
    gallery: Array.isArray(db.gallery) ? db.gallery : [],
    featured: db.featured,
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
