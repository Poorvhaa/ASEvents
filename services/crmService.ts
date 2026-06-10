import type { LeadPayload } from '@/lib/ai/types'

export type CRMProvider = 'hubspot' | 'zoho' | 'salesforce'

export interface CRMLeadPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  eventType: string
  guestCount: string
  budget: string
  source: string
  notes: string
  customFields: Record<string, string>
}

/**
 * CRM Integration Layer — Phase 3 placeholder
 * Prepares lead payload for future HubSpot, Zoho CRM, or Salesforce integration.
 */
export function prepareCRMPayload(lead: LeadPayload): CRMLeadPayload {
  const nameParts = lead.name.trim().split(' ')
  const firstName = nameParts[0] || lead.name
  const lastName = nameParts.slice(1).join(' ') || ''

  return {
    firstName,
    lastName,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    eventType: lead.eventType,
    guestCount: lead.guestCount || '',
    budget: lead.budget || '',
    source: 'AI Event Consultant',
    notes: [
      lead.specialRequirements && `Requirements: ${lead.specialRequirements}`,
      lead.venuePreference && `Venue Preference: ${lead.venuePreference}`,
      lead.aiRecommendation?.recommendedPackage?.name &&
        `Package: ${lead.aiRecommendation.recommendedPackage.name}`,
    ]
      .filter(Boolean)
      .join('\n'),
    customFields: {
      event_date: lead.eventDate || '',
      venue_preference: lead.venuePreference || '',
      ai_package: lead.aiRecommendation?.recommendedPackage?.name || '',
      ai_budget: lead.aiRecommendation?.budgetRangeLabel || '',
    },
  }
}

export async function syncLeadToCRM(
  lead: LeadPayload,
  provider: CRMProvider
): Promise<{ success: boolean; provider: CRMProvider; payload: CRMLeadPayload }> {
  const payload = prepareCRMPayload(lead)

  // Phase 3: Implement actual CRM API calls
  console.log(`[CRMService] Prepared ${provider} payload for ${lead.email}:`, payload)

  return { success: false, provider, payload }
}
