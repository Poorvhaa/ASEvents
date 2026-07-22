export interface DbLead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  event_type: string
  city: string | null
  location: string | null
  guest_count: string | null
  budget: string | null
  venue_preference: string | null
  requirements: string | null
  source: string | null
  status: string
}

export interface DbContactInquiry {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
}

export interface DbVenue {
  id: string
  slug: string
  name: string
  location: string
  city: string
  category: string
  capacity: number
  indoor_outdoor: string
  rating: number
  starting_price: string
  image: string
  description: string
  parking: string
  rooms: string
  amenities: string[] | null
  gallery: string[] | null
  featured?: boolean
}

export interface DbVenueBooking {
  id: string
  venue_id: string
  event_date: string
  customer_name: string
  email: string
  phone: string | null
  guest_count: number
  status: string
  created_at?: string
}

export interface DbPackage {
  id: string
  slug: string
  title: string
  category: string
  includes: string[] | null
  included_services: string[] | null
  highlights: string[] | null
  suitable_guests: string | null
  duration: string | null
  price: string
  popular?: boolean
  description: string | null
}

export interface DbAiConsultation {
  id: string
  created_at: string
  lead_id: string | null
  prompt: string
  response: string
}

export interface StructuredAIResponse {
  summary: string
  recommendedPackage: string
  estimatedBudget: string
  suggestedVenues: string[]
  eventTimeline: string[]
  nextSteps: string[]
}
