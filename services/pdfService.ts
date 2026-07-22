import type { AIConsultationResult, LeadPayload } from '@/lib/ai/types'
import { generateQuote } from '@/services/quoteService'
import { generateProposalPDF } from '@/services/pdfProposalService'
import {
  formatTimeline,
  formatVenueStartingCost,
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
    location: string
  }
  eventSummary: {
    eventType: string
    eventDate: string
    guestCount: string
    venueType: string
    specialRequirements: string
  }
  packageRecommendation: AIConsultationResult['recommendedPackage']
  timeline: string
  venueSuggestions: AIConsultationResult['venueSuggestions']
  planningTips: string[]
  nextSteps: string[]
  quoteNumber: string
  generatedAt: string
  language?: string
}

function safeText(value: string | null | undefined, fallback = 'N/A'): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export function buildProposalDocument(
  lead: LeadPayload,
  recommendation: AIConsultationResult,
  language?: string
): ProposalDocument {
  const quote = generateQuote(lead, recommendation)
  return {
    title: `Event Proposal — ${lead.eventType}`,
    clientDetails: {
      name: safeText(lead.name),
      email: safeText(lead.email),
      phone: safeText(lead.phone),
      location: safeText(lead.location),
    },
    eventSummary: {
      eventType: safeText(lead.eventType),
      eventDate: safeText(lead.eventDate, 'Flexible'),
      guestCount: safeText(lead.guestCount, 'TBD'),
      venueType: safeText(lead.venueType, 'Open'),
      specialRequirements: safeText(lead.specialRequirements, 'None'),
    },
    packageRecommendation: recommendation.recommendedPackage,
    timeline: formatTimeline(recommendation.recommendedPackage.timeline),
    venueSuggestions: recommendation.venueSuggestions.map((v) => ({
      ...v,
      startingCost: formatVenueStartingCost(v.startingCost),
    })),
    planningTips: recommendation.planningTips.length > 0 ? recommendation.planningTips : ['N/A'],
    nextSteps: recommendation.nextSteps.length > 0 ? recommendation.nextSteps : ['N/A'],
    quoteNumber: quote.quoteNumber,
    generatedAt: new Date().toISOString(),
    language,
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
