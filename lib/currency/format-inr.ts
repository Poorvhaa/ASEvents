/** Shared INR parsing and formatting for UI + PDF */

const NA = 'N/A'

export function safeNumber(value: number | null | undefined): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null
  return value
}

/**
 * Parse Indian currency strings into numeric rupee amounts.
 * Handles ₹2,50,000, Rs. 250000, "Starting from ₹1,80,000", lakh/crore, ranges.
 */
export function parseINRString(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'number') return safeNumber(value)

  const normalized = value.toLowerCase().replace(/,/g, '').trim()
  if (!normalized || normalized === 'na' || normalized === 'n/a' || normalized === 'on request') {
    return null
  }

  const lakhMatch = normalized.match(/(\d+(?:\.\d+)?)\s*lakh/)
  if (lakhMatch) return Math.round(parseFloat(lakhMatch[1]) * 100_000)

  const croreMatch = normalized.match(/(\d+(?:\.\d+)?)\s*crore/)
  if (croreMatch) return Math.round(parseFloat(croreMatch[1]) * 10_000_000)

  const nums = normalized.replace(/[₹rs.\s]/g, '').match(/\d+/g)?.map(Number) ?? []
  if (nums.length === 0) return null

  // Ranges like 300000-500000 — use the lower bound for "starting from" style strings
  if (normalized.includes('under') || normalized.includes('starting')) {
    return nums[0]
  }

  return nums.length >= 2 ? Math.max(...nums) : nums[0]
}

export function formatINR(amount: number | null | undefined): string {
  const num = safeNumber(amount)
  if (num === null || num <= 0) return NA
  return `₹${num.toLocaleString('en-IN')}`
}

export function formatINRRange(
  min: number | null | undefined,
  max: number | null | undefined
): string {
  const low = safeNumber(min)
  const high = safeNumber(max)
  if (low === null && high === null) return NA
  if (low !== null && high !== null) {
    return `${formatINR(low)} – ${formatINR(high)}`
  }
  return formatINR(low ?? high)
}

export function formatVenueStartingCost(cost: string | number | null | undefined): string {
  const parsed = typeof cost === 'number' ? safeNumber(cost) : parseINRString(cost)
  return formatINR(parsed)
}

/** Normalize package / event timeline for PDF display */
export function formatTimeline(timeline: string | null | undefined): string {
  if (!timeline?.trim()) return NA

  const cleaned = timeline.replace(/planning recommended/gi, '').trim()
  const match = cleaned.match(/(\d+)\s*[-–]\s*(\d+)\s*(hours?|days?|weeks?|months?)/i)

  if (match) {
    const unit = match[3].toLowerCase()
    const label =
      unit.startsWith('hour') ? 'Hours' :
      unit.startsWith('day') ? 'Days' :
      unit.startsWith('week') ? 'Weeks' : 'Months'
    return `${match[1]}–${match[2]} ${label}`
  }

  return cleaned || NA
}

export function computeDisplayTotal(breakdown: {
  venue?: number
  decor?: number
  food?: number
  entertainment?: number
  contingency?: number
}): number | null {
  const parts = [
    safeNumber(breakdown.venue),
    safeNumber(breakdown.decor),
    safeNumber(breakdown.food),
    safeNumber(breakdown.entertainment),
    safeNumber(breakdown.contingency),
  ]

  if (parts.every((p) => p === null)) return null
  return parts.reduce((sum: number, p) => sum + (p ?? 0), 0)
}
