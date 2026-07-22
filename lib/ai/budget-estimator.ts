import type { BudgetBreakdown, ConsultantAnswers } from '@/lib/ai/types'
import { formatINR, parseBudgetMax, parseGuestCount } from '@/lib/ai/utils'

const WEDDING_MULTIPLIER = 1.4
const CORPORATE_MULTIPLIER = 1.0
const SOCIAL_MULTIPLIER = 0.7

function getEventMultiplier(eventType: string): number {
  if (
    ['Wedding', 'Engagement', 'Haldi', 'Mehendi', 'Sangeet','Carnival Wedding', 'Reception', 'Destination Wedding'].includes(
      eventType
    )
  ) {
    return WEDDING_MULTIPLIER
  }
  if (['Corporate Event'].includes(eventType)) {
    return CORPORATE_MULTIPLIER
  }
  return SOCIAL_MULTIPLIER
}

function scaleToTarget(
  breakdown: Omit<BudgetBreakdown, 'rangeMin' | 'rangeMax' | 'total'>,
  targetTotal: number
): Omit<BudgetBreakdown, 'rangeMin' | 'rangeMax' | 'total'> {
  const current =
    breakdown.venue +
    breakdown.decor +
    breakdown.food +
    breakdown.photography +
    breakdown.entertainment +
    breakdown.contingency
  if (current <= 0 || targetTotal <= 0) return breakdown
  const ratio = targetTotal / current
  return {
    venue: Math.round(breakdown.venue * ratio),
    decor: Math.round(breakdown.decor * ratio),
    food: Math.round(breakdown.food * ratio),
    photography: Math.round(breakdown.photography * ratio),
    entertainment: Math.round(breakdown.entertainment * ratio),
    contingency: Math.round(breakdown.contingency * ratio),
  }
}

export function estimateBudget(answers: ConsultantAnswers): BudgetBreakdown {
  const guests = parseGuestCount(answers.guestCount)
  const multiplier = getEventMultiplier(answers.eventType)
  const pref = answers.venueType?.toLowerCase() ?? ''

  const venueBase = pref.includes('resort')
    ? 500_000
    : pref.includes('palace')
      ? 800_000
      : pref.includes('farmhouse')
        ? 200_000
        : 300_000

  let venue = Math.round(venueBase * multiplier)
  let decor = Math.round((80_000 + guests * 150) * multiplier)
  let food = Math.round(guests * 1_200 * multiplier)
  let photography = Math.round((60_000 + guests * 50) * (multiplier > 1 ? 1.2 : 1))
  let entertainment = Math.round((50_000 + guests * 80) * multiplier)

  let subtotal = venue + decor + food + photography + entertainment
  let contingency = Math.round(subtotal * 0.08)

  const userBudget = parseBudgetMax(answers.budget)
  if (userBudget > 0) {
    const scaled = scaleToTarget(
      { venue, decor, food, photography, entertainment, contingency },
      userBudget
    )
    venue = scaled.venue
    decor = scaled.decor
    food = scaled.food
    photography = scaled.photography
    entertainment = scaled.entertainment
    contingency = scaled.contingency
    subtotal = venue + decor + food + photography + entertainment
  }

  const total = venue + decor + food + photography + entertainment + contingency
  const rangeMin = Math.round(total * 0.9)
  const rangeMax = Math.round(total * 1.15)

  return { venue, decor, food, photography, entertainment, contingency, total, rangeMin, rangeMax }
}

export function formatBudgetBreakdown(breakdown: BudgetBreakdown): string {
  return [
    `Venue: ${formatINR(breakdown.venue)}`,
    `Decor: ${formatINR(breakdown.decor)}`,
    `Catering: ${formatINR(breakdown.food)}`,
    `Entertainment: ${formatINR(breakdown.entertainment)}`,
    `Photography: ${formatINR(breakdown.photography)}`,
    `Contingency: ${formatINR(breakdown.contingency)}`,
  ].join('\n')
}

export function formatBudgetRange(breakdown: BudgetBreakdown): string {
  return `${formatINR(breakdown.rangeMin)} - ${formatINR(breakdown.rangeMax)}`
}
