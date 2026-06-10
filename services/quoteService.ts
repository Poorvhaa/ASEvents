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

/**
 * Auto Quote System — Phase 3 placeholder
 */
export function generateQuote(
  lead: LeadPayload,
  recommendation: AIConsultationResult
): GeneratedQuote {
  const b = recommendation.budgetEstimate
  const subtotal = b.total
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + tax

  return {
    quoteNumber: `ASE-${Date.now().toString(36).toUpperCase()}`,
    clientName: lead.name,
    packageName: recommendation.recommendedPackage.name,
    services: recommendation.recommendedPackage.inclusions,
    priceBreakdown: {
      venue: b.venue,
      decor: b.decor,
      food: b.food,
      photography: b.photography,
      entertainment: b.entertainment,
      subtotal,
      tax,
      total,
    },
    createdAt: new Date().toISOString(),
  }
}
