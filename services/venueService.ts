import { createServerSupabaseClient } from '@/lib/supabase'
import { venues as staticVenues, getVenueBySlug as getStaticVenueBySlug } from '@/lib/data/venues'
import { mergeDbVenueWithStatic, staticVenuesToDisplay } from '@/lib/venues/mappers'
import type { DbVenue } from '@/types/database'
import type { Venue } from '@/lib/types/venues'

function parseCapacity(capacity: string): number {
  const match = capacity.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

function staticToDbVenue(venue: (typeof staticVenues)[0]): DbVenue {
  return {
    id: venue.id,
    slug: venue.slug,
    name: venue.name,
    location: venue.location,
    city: venue.city,
    category: venue.category,
    capacity: parseCapacity(venue.capacity),
    indoor_outdoor: venue.indoorOutdoor,
    rating: venue.rating,
    starting_price: venue.startingPrice,
    image: venue.image,
    description: venue.description,
    parking: venue.parking,
    rooms: venue.rooms,
    amenities: venue.amenities,
    gallery: venue.gallery,
    featured: venue.featured,
  }
}

export async function getVenues(filters?: {
  city?: string
  category?: string
  capacity?: number
}): Promise<DbVenue[]> {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    let query = supabase.from('venues').select('*').order('name')

    if (filters?.city) query = query.ilike('city', filters.city)
    if (filters?.category) query = query.ilike('category', `%${filters.category}%`)
    if (filters?.capacity) query = query.gte('capacity', filters.capacity)

    const { data, error } = await query
    if (!error && data && data.length > 0) {
      return data as DbVenue[]
    }
    if (error) console.error('[VenueService] Supabase error:', error.message)
  }

  let results = staticVenues.map(staticToDbVenue)

  if (filters?.city) {
    results = results.filter((v) => v.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters?.category) {
    results = results.filter((v) =>
      v.category.toLowerCase().includes(filters.category!.toLowerCase())
    )
  }
  if (filters?.capacity) {
    results = results.filter((v) => v.capacity >= filters.capacity!)
  }

  return results
}

export async function getVenueById(id: string): Promise<DbVenue | null> {
  const supabase = createServerSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase.from('venues').select('*').eq('id', id).maybeSingle()
    if (!error && data) return data as DbVenue
  }

  const staticVenue = staticVenues.find((v) => v.id === id)
  return staticVenue ? staticToDbVenue(staticVenue) : null
}

export async function getDisplayVenues(filters?: {
  city?: string
  category?: string
  capacity?: number
}): Promise<Venue[]> {
  const dbVenues = await getVenues(filters)
  if (dbVenues.length > 0) {
    return dbVenues.map(mergeDbVenueWithStatic)
  }
  let results = staticVenuesToDisplay()
  if (filters?.city) {
    results = results.filter((v) => v.city.toLowerCase() === filters.city!.toLowerCase())
  }
  if (filters?.category) {
    results = results.filter((v) => v.category === filters.category)
  }
  if (filters?.capacity) {
    results = results.filter((v) => parseCapacity(v.capacity) >= filters.capacity!)
  }
  return results
}

export async function getFeaturedDisplayVenues(): Promise<Venue[]> {
  const all = await getDisplayVenues()
  const featured = all.filter((v) => v.featured)
  return featured.length > 0 ? featured : all.slice(0, 4)
}

export async function getDisplayVenueBySlug(slug: string): Promise<Venue | null> {
  const staticVenue = getStaticVenueBySlug(slug)
  if (staticVenue) {
    const db = await getVenueById(staticVenue.id)
    return db ? mergeDbVenueWithStatic(db) : staticVenue
  }
  const all = await getDisplayVenues()
  return all.find((v) => v.slug === slug) || null
}
