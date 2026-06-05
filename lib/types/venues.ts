export type VenueCategory =
  | 'Wedding Halls'
  | 'Banquet Halls'
  | 'Luxury Resorts'
  | 'Destination Venues'
  | 'Farmhouses'
  | 'Beach Venues'
  | 'Corporate Venues'
  | 'Exhibition Venues'
  | 'Open Lawns'

export type VenueCity =
  | 'Ahmedabad'
  | 'Surat'
  | 'Vadodara'
  | 'Rajkot'
  | 'Mumbai'
  | 'Pune'
  | 'Udaipur'
  | 'Jaipur'
  | 'Goa'
  | 'Delhi'

export interface Venue {
  id: string
  slug: string
  name: string
  location: string
  city: VenueCity
  category: VenueCategory
  capacity: string
  indoorOutdoor: 'Indoor' | 'Outdoor' | 'Indoor & Outdoor'
  rating: number
  startingPrice: string
  image: string
  description: string
  parking: string
  rooms: string
  amenities: string[]
  gallery: string[]
  featured?: boolean
}
