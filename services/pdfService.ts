import type { AIConsultationResult, LeadPayload } from '@/lib/ai/types'
import { generateQuote } from '@/services/quoteService'
import { generateProposalPDF } from '@/services/pdfProposalService'

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

export function buildProposalDocument(
  lead: LeadPayload,
  recommendation: AIConsultationResult
): ProposalDocument {
  const quote = generateQuote(lead, recommendation)

  return {
    title: `Event Proposal — ${lead.eventType}`,
    clientDetails: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      city: lead.city,
    },
    eventSummary: {
      eventType: lead.eventType,
      eventDate: lead.eventDate || 'Flexible',
      guestCount: lead.guestCount || 'TBD',
      budget: lead.budget || recommendation.budgetRangeLabel,
      venuePreference: lead.venuePreference || 'Open',
      specialRequirements: lead.specialRequirements || 'None',
    },
    packageRecommendation: recommendation.recommendedPackage,
    budgetEstimate: recommendation.budgetEstimate,
    budgetRange: recommendation.budgetRangeLabel,
    timeline: recommendation.recommendedPackage.timeline,
    venueSuggestions: recommendation.venueSuggestions,
    planningTips: recommendation.planningTips,
    nextSteps: recommendation.nextSteps,
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
