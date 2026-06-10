import { packages } from '@/lib/data/packages'
import type { ConsultantAnswers, PackageRecommendation } from '@/lib/ai/types'
import { parseBudgetMax, parseGuestCount } from '@/lib/ai/utils'

const WEDDING_TYPES = new Set([
  'Wedding',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Reception',
  'Destination Wedding',
])

const CORPORATE_TYPES = new Set(['Corporate Event', 'Product Launch', 'Exhibition'])

export interface PackageRecommendationResult extends PackageRecommendation {
  reason: string
}

function catalogPackage(title: string): Partial<PackageRecommendation> | null {
  const match = packages.find((p) => p.title === title)
  if (!match) return null
  return {
    name: match.title,
    category: match.category,
    inclusions: match.includedServices ?? match.includes,
    estimatedBudget: match.price.replace('Starting from ', ''),
    timeline: match.duration,
    suggestedAddons: match.highlights.slice(0, 3),
  }
}

function buildReason(
  packageName: string,
  guests: number,
  budgetMax: number,
  eventType: string
): string {
  const parts: string[] = [`Suitable for ${guests} guests`]
  if (budgetMax > 0) {
    parts.push(`within your budget range`)
  }
  if (eventType === 'Wedding' || WEDDING_TYPES.has(eventType)) {
    parts.push('covers full wedding coordination needs')
  }
  return `${packageName} — ${parts.join(' and ')}.`
}

export function recommendPackage(answers: ConsultantAnswers): PackageRecommendationResult {
  const { eventType, guestCount, budget } = answers
  const guests = parseGuestCount(guestCount)
  const budgetMax = parseBudgetMax(budget)

  if (eventType === 'Haldi') {
    const base = catalogPackage('Haldi Ceremony') ?? catalogPackage('Haldi')
    return finalize(base, 'Haldi Ceremony', guests, budgetMax, eventType, [
      'Traditional decor',
      'Photography',
      'Music system',
    ])
  }
  if (eventType === 'Mehendi') {
    return finalize(catalogPackage('Mehendi Ceremony'), 'Mehendi Ceremony', guests, budgetMax, eventType, [
      'Theme decor',
      'Mehendi artists',
      'Live music',
    ])
  }
  if (eventType === 'Sangeet') {
    return finalize(catalogPackage('Sangeet Night'), 'Sangeet Night', guests, budgetMax, eventType, [
      'Stage design',
      'DJ & sound',
      'Dance floor',
    ])
  }
  if (eventType === 'Reception') {
    return finalize(catalogPackage('Reception Celebration'), 'Reception Celebration', guests, budgetMax, eventType, [
      'Luxury stage',
      'Entertainment',
      'Catering',
    ])
  }

  if (WEDDING_TYPES.has(eventType)) {
    if (guests >= 350 || budgetMax >= 2_000_000) {
      return finalize(
        catalogPackage('Complete Wedding Package'),
        'Complete Wedding Package',
        guests,
        budgetMax,
        eventType,
        ['Full wedding coordination', 'Premium decor', 'Entertainment', 'Photography']
      )
    }
    if (guests >= 200 || budgetMax >= 800_000) {
      return finalize(
        catalogPackage('Complete Wedding Package') ?? catalogPackage('Premium Wedding Package'),
        'Premium Wedding Package',
        guests,
        budgetMax,
        eventType,
        ['Engagement to reception', 'Mandap design', 'Sangeet setup', 'Catering']
      )
    }
    return finalize(
      catalogPackage('Haldi Ceremony'),
      'Essential Wedding Package',
      guests,
      budgetMax,
      eventType,
      ['Ceremony planning', 'Mandap decor', 'Photography', 'Guest coordination']
    )
  }

  if (eventType === 'Product Launch') {
    return finalize(catalogPackage('Product Launch'), 'Product Launch', guests, budgetMax, eventType, [
      'Branding & stage',
      'AV setup',
      'VIP hospitality',
    ])
  }

  if (eventType === 'Exhibition') {
    return finalize(catalogPackage('Trade Exhibition'), 'Trade Exhibition', guests, budgetMax, eventType, [
      'Booth design',
      'Visitor management',
      'Branding',
    ])
  }

  if (CORPORATE_TYPES.has(eventType)) {
    return finalize(catalogPackage('Corporate Conference'), 'Corporate Conference', guests, budgetMax, eventType, [
      'Agenda planning',
      'AV setup',
      'Hospitality',
    ])
  }

  if (eventType === 'Birthday') {
    return finalize(catalogPackage('Birthday Celebration'), 'Birthday Celebration', guests, budgetMax, eventType, [
      'Theme decor',
      'Entertainment',
      'Photography',
    ])
  }

  if (eventType === 'Anniversary') {
    return finalize(
      catalogPackage('Anniversary Celebration'),
      'Anniversary Celebration',
      guests,
      budgetMax,
      eventType,
      ['Elegant decor', 'Live music', 'Fine dining']
    )
  }

  if (eventType === 'Festival Event' || eventType === 'Entertainment Event') {
    return finalize(catalogPackage('Cultural Festival'), 'Cultural Festival', guests, budgetMax, eventType, [
      'Stage & lighting',
      'Entertainment',
      'Crowd management',
    ])
  }

  return finalize(null, 'Custom Event Package', guests, budgetMax, eventType, [
    'Event planning',
    'Venue coordination',
    'Decor & styling',
  ])
}

function finalize(
  catalog: Partial<PackageRecommendation> | null,
  fallbackName: string,
  guests: number,
  budgetMax: number,
  eventType: string,
  defaultInclusions: string[]
): PackageRecommendationResult {
  const name = catalog?.name ?? fallbackName
  return {
    name,
    category: catalog?.category ?? 'General',
    inclusions: catalog?.inclusions ?? defaultInclusions,
    estimatedBudget: catalog?.estimatedBudget ?? 'On request',
    timeline: catalog?.timeline ?? '4-8 weeks planning recommended',
    suggestedAddons: catalog?.suggestedAddons ?? ['Premium entertainment', 'Extended coordination'],
    reason: buildReason(name, guests, budgetMax, eventType),
  }
}
