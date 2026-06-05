export type EventType = 'Wedding' | 'Corporate' | 'Birthday' | 'Festival' | 'Other'

export type ConsultantStep =
  | 'eventType'
  | 'guests'
  | 'budget'
  | 'city'
  | 'date'
  | 'complete'

export interface ConsultantAnswers {
  eventType: EventType | ''
  guests: string
  budget: string
  city: string
  date: string
}

export interface ConsultantRecommendation {
  suggestedPackage: string
  estimatedBudget: string
  recommendedServices: string[]
  venueSuggestions: string[]
  nextSteps: string[]
}

export interface ChatMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: Date
}
