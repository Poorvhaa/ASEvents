import type { AIConsultationResult, LeadPayload } from '@/lib/ai/types'
import { generateQuote } from '@/services/quoteService'
import { generateProposalPDF } from '@/services/pdfProposalService'
import {
  formatINR,
  formatINRRange,
  formatTimeline,
  formatVenueStartingCost,
  computeDisplayTotal,
} from '@/lib/currency/format-inr'

/**
 * Structured proposal data for PDF generation.
 */
export interface ProposalDocument {
  title: string
  clientDetails: {
    name: string
    email: string
    phone: string
    city: string
  }
  eventSummary: {
    eventType: string
    eventDate: string
    guestCount: string
    budget: string
    venuePreference: string
    specialRequirements: string
  }
  packageRecommendation: AIConsultationResult['recommendedPackage']
  budgetEstimate: AIConsultationResult['budgetEstimate']
  budgetRange: string
  timeline: string
  venueSuggestions: AIConsultationResult['venueSuggestions']
  planningTips: string[]
  nextSteps: string[]
  quoteNumber: string
  generatedAt: string
}

function safeText(value: string | null | undefined, fallback = 'N/A'): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export function buildProposalDocument(
  lead: LeadPayload,
  recommendation: AIConsultationResult
): ProposalDocument {
  const quote = generateQuote(lead, recommendation)
  const b = recommendation.budgetEstimate
  const displayTotal = computeDisplayTotal(b) ?? b.total

  return {
    title: `Event Proposal — ${lead.eventType}`,
    clientDetails: {
      name: safeText(lead.name),
      email: safeText(lead.email),
      phone: safeText(lead.phone),
      city: safeText(lead.city),
    },
    eventSummary: {
      eventType: safeText(lead.eventType),
      eventDate: safeText(lead.eventDate, 'Flexible'),
      guestCount: safeText(lead.guestCount, 'TBD'),
      budget: formatINR(displayTotal),
      venuePreference: safeText(lead.venuePreference, 'Open'),
      specialRequirements: safeText(lead.specialRequirements, 'None'),
    },
    packageRecommendation: recommendation.recommendedPackage,
    budgetEstimate: {
      ...b,
      total: displayTotal,
    },
    budgetRange: formatINRRange(b.rangeMin, b.rangeMax),
    timeline: formatTimeline(recommendation.recommendedPackage.timeline),
    venueSuggestions: recommendation.venueSuggestions.map((v) => ({
      ...v,
      startingCost: formatVenueStartingCost(v.startingCost),
    })),
    planningTips: recommendation.planningTips.length > 0 ? recommendation.planningTips : ['N/A'],
    nextSteps: recommendation.nextSteps.length > 0 ? recommendation.nextSteps : ['N/A'],
    quoteNumber: quote.quoteNumber,
    generatedAt: new Date().toISOString(),
  }
}

export async function downloadProposalAsPDF(doc: ProposalDocument): Promise<void> {
  const blob = await generateProposalPDF(doc)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `AS-Events-Proposal-${doc.quoteNumber}.pdf`
  anchor.click()
  URL.revokeObjectURL(url)
}
