import { recommendPackage } from '@/lib/ai/package-recommender'
import { estimateBudget, formatBudgetRange } from '@/lib/ai/budget-estimator'
import { validateGuestCapacity } from '@/lib/ai/guest-validator'
import { suggestVenueAvailability } from '@/lib/ai/venue-availability'
import { recommendVenues, getVenueTypeSuggestions } from '@/lib/venue-engine'
import type { AIConsultationResult, ConsultantAnswers } from '@/lib/ai/types'
import { formatINR } from '@/lib/ai/utils'

function getPlanningTips(answers: ConsultantAnswers): string[] {
  const tips: string[] = [
    'Book your venue 4-6 months in advance for peak wedding season.',
    'Allocate 40-50% of budget to venue and catering combined.',
    'Confirm vendor availability before finalizing your event date.',
  ]

  if (answers.eventType.includes('Wedding') || answers.eventType === 'Destination Wedding') {
    tips.push('Plan haldi, mehendi, and sangeet as separate coordinated events.')
    tips.push('Consider a backup indoor space for outdoor ceremonies.')
  }

  if (['Corporate Event', 'Product Launch'].includes(answers.eventType)) {
    tips.push('Finalize AV and branding requirements early with your team.')
    tips.push('Schedule a venue walkthrough before signing contracts.')
  }

  if (answers.specialRequirements) {
    tips.push(`We'll accommodate: "${answers.specialRequirements.slice(0, 80)}..."`)
  }

  return tips.slice(0, 4)
}

function getNextSteps(): string[] {
  return [
    'Submit your details to receive a personalized proposal',
    'Schedule a free consultation with our event planner',
    'Visit shortlisted venues with our team',
    'Review package inclusions and customize as needed',
  ]
}

export function generateConsultation(answers: ConsultantAnswers): AIConsultationResult {
  const recommendedPackage = recommendPackage(answers)
  const budgetEstimate = estimateBudget(answers)
  const venueSuggestions = recommendVenues(answers)
  const recommendedVenueTypes = getVenueTypeSuggestions(answers.eventType)
  const guestCapacityValidation = validateGuestCapacity(answers)
  const venueAvailabilitySuggestion = suggestVenueAvailability(answers)
  const budgetRangeLabel = formatBudgetRange(budgetEstimate)
  const planningTips = getPlanningTips(answers)
  const nextSteps = getNextSteps()

  const cityLabel = answers.city || 'your preferred city'
  const guestLabel = answers.guestCount || `${guestCapacityValidation.guestCount} guests`
  const summary = `${answers.eventType} in ${cityLabel} · ${guestLabel} · Budget ${answers.budget || budgetRangeLabel}. Recommended: **${recommendedPackage.name}**.`

  return {
    recommendedPackage,
    budgetEstimate,
    budgetRangeLabel,
    venueSuggestions,
    recommendedVenueTypes,
    guestCapacityValidation,
    venueAvailabilitySuggestion,
    planningTips,
    nextSteps,
    summary,
  }
}

export function formatConsultationMessage(result: AIConsultationResult): string {
  const { recommendedPackage: pkg, budgetEstimate, venueSuggestions, planningTips, nextSteps } =
    result

  const venueList =
    venueSuggestions.length > 0
      ? venueSuggestions.map((v) => `• ${v.name}`).join('\n')
      : result.recommendedVenueTypes.map((t) => `• ${t}`).join('\n')

  return `Here's your personalized event consultation:

**${result.summary.replace(/\*\*/g, '')}**

**Recommended Package:** ${pkg.name}
**Reason:** ${pkg.reason ?? 'Tailored to your event requirements'}

**Venue Suggestions:**
${venueList}

**Budget Estimate:**
• Venue: ${formatINR(budgetEstimate.venue)}
• Decor: ${formatINR(budgetEstimate.decor)}
• Catering: ${formatINR(budgetEstimate.food)}
• Entertainment: ${formatINR(budgetEstimate.entertainment)}
• Contingency: ${formatINR(budgetEstimate.contingency)}
• **Estimated Total: ${formatINR(budgetEstimate.total)}**

**Guest Capacity:** ${result.guestCapacityValidation.message}

**Availability:** ${result.venueAvailabilitySuggestion.message}

**Planning Tips:**
${planningTips.map((t) => `• ${t}`).join('\n')}

**Next Steps:**
${nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Would you like to receive your personalized proposal? Fill in your details below!`
}
