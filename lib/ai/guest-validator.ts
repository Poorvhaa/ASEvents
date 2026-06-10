import type { ConsultantAnswers, GuestCapacityValidation } from '@/lib/ai/types'
import { getVenueTypeSuggestions } from '@/lib/venue-engine'
import { parseGuestCount, parseBudgetMax } from '@/lib/ai/utils'

export function validateGuestCapacity(answers: ConsultantAnswers): GuestCapacityValidation {
  const guestCount = parseGuestCount(answers.guestCount)
  const budgetMax = parseBudgetMax(answers.budget)
  const suitableVenueTypes = getVenueTypeSuggestions(answers.eventType)

  let message = `${guestCount} guests is manageable for ${answers.eventType || 'your event'}`
  if (guestCount > 500) {
    message = `${guestCount} guests requires a large banquet hall, resort, or convention venue`
  } else if (guestCount > 250) {
    message = `${guestCount} guests suits premium banquet halls and luxury resorts`
  }

  if (budgetMax > 0 && guestCount > 300 && budgetMax < 1_000_000) {
    message += '. Consider increasing budget or reducing guest count for optimal experience'
  }

  return {
    guestCount,
    isWithinBudget: budgetMax === 0 || guestCount <= 500 || budgetMax >= guestCount * 2_500,
    suitableVenueTypes,
    message,
  }
}
