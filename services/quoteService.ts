import type { AIConsultationResult, LeadPayload } from '@/lib/ai/types'

export interface GeneratedQuote {
  quoteNumber: string
  clientName: string
  packageName: string
  services: string[]
  priceBreakdown: {
    venue: number
    decor: number
    food: number
    photography: number
    entertainment: number
    subtotal: number
    tax: number
    total: number
  }
  createdAt: string
}

export function generateQuote(
  lead: LeadPayload,
  recommendation: AIConsultationResult
): GeneratedQuote {
  return {
    quoteNumber: `ASE-${Date.now().toString(36).toUpperCase()}`,
    clientName: lead.name,
    packageName: recommendation.recommendedPackage.name,
    services: recommendation.recommendedPackage.inclusions,
    priceBreakdown: {
      venue: 0,
      decor: 0,
      food: 0,
      photography: 0,
      entertainment: 0,
      subtotal: 0,
      tax: 0,
      total: 0,
    },
    createdAt: new Date().toISOString(),
  }
}
