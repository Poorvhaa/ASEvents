export const EVENT_TYPES = [
  'Wedding',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Reception',
  'Destination Wedding',
  'Corporate Event',
  'Product Launch',
  'Exhibition',
  'Birthday',
  'Anniversary',
  'Festival Event',
  'Entertainment Event',
] as const

export type EventType = (typeof EVENT_TYPES)[number]

export type ConsultantStep =
  | 'eventType'
  | 'eventDate'
  | 'city'
  | 'guestCount'
  | 'budget'
  | 'venuePreference'
  | 'specialRequirements'
  | 'generating'
  | 'complete'
  | 'leadCapture'

export type LeadStatus = 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Closed'

export interface ConsultantAnswers {
  eventType: EventType | ''
  eventDate: string
  city: string
  guestCount: string
  budget: string
  venuePreference: string
  specialRequirements: string
}

export interface PackageRecommendation {
  name: string
  category: string
  inclusions: string[]
  estimatedBudget: string
  timeline: string
  suggestedAddons: string[]
  reason?: string
}

export interface GuestCapacityValidation {
  guestCount: number
  isWithinBudget: boolean
  suitableVenueTypes: string[]
  message: string
}

export interface VenueAvailabilitySuggestion {
  message: string
  suggestedDates?: string[]
  peakSeasonNote?: string
}

export interface VenueRecommendation {
  name: string
  type: string
  capacity: string
  location: string
  startingCost: string
}

export interface BudgetBreakdown {
  venue: number
  decor: number
  food: number
  photography: number
  entertainment: number
  contingency: number
  total: number
  rangeMin: number
  rangeMax: number
}

export interface AIConsultationResult {
  recommendedPackage: PackageRecommendation
  budgetEstimate: BudgetBreakdown
  budgetRangeLabel: string
  venueSuggestions: VenueRecommendation[]
  recommendedVenueTypes: string[]
  guestCapacityValidation: GuestCapacityValidation
  venueAvailabilitySuggestion: VenueAvailabilitySuggestion
  planningTips: string[]
  nextSteps: string[]
  summary: string
}

export interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: Date
  recommendation?: AIConsultationResult
}

export interface LeadPayload {
  name: string
  email: string
  phone: string
  city: string
  eventType: string
  eventDate?: string
  guestCount?: string
  budget?: string
  venuePreference?: string
  specialRequirements?: string
  aiRecommendation?: AIConsultationResult
}

export interface LeadRecord extends LeadPayload {
  id: string
  status: LeadStatus
  createdAt: string
}
