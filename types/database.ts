export interface DbLead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  event_type: string
  city: string | null
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
  name: string
  city: string
  category: string
  capacity: number
  price_range: string | null
  description: string | null
  image: string | null
  gallery: string[] | null
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
  name: string
  category: string
  price: number
  description: string | null
  features: string[] | null
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
