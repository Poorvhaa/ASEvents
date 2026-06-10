import type { ConsultantAnswers } from '@/lib/ai/types'

export function parseGuestCount(guests: string): number {
  if (!guests) return 200
  const match = guests.match(/\d+/g)
  if (!match) return 200
  if (match.length >= 2) {
    return Math.floor((parseInt(match[0], 10) + parseInt(match[1], 10)) / 2)
  }
  return parseInt(match[0], 10)
}

export function parseBudgetMax(budget: string): number {
  if (!budget) return 0
  const normalized = budget.toLowerCase().replace(/,/g, '')
  const lakhMatch = normalized.match(/(\d+(?:\.\d+)?)\s*lakh/)
  if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 100_000)
  const croreMatch = normalized.match(/(\d+(?:\.\d+)?)\s*crore/)
  if (croreMatch) return Math.round(parseFloat(croreMatch[1]) * 10_000_000)
  const nums = normalized.match(/\d+/g)?.map(Number) ?? []
  if (nums.length === 0) return 0
  return Math.max(...nums)
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function answersSummary(answers: ConsultantAnswers): string {
  const parts = [
    answers.eventType,
    answers.city ? `in ${answers.city}` : '',
    answers.guestCount ? `${answers.guestCount} guests` : '',
    answers.budget ? `Budget ${answers.budget}` : '',
  ].filter(Boolean)
  return parts.join(' · ')
}
