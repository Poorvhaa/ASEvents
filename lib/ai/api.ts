import type { ConsultantAnswers, ConsultantRecommendation } from '@/lib/ai/types'
import { generateRecommendation } from '@/lib/ai/mock-consultant'

/**
 * Future OpenAI integration endpoint.
 * Replace mock implementation with actual API call when ready.
 *
 * Example:
 * const response = await fetch('/api/ai/consultant', {
 *   method: 'POST',
 *   body: JSON.stringify({ answers }),
 * })
 */
export async function getConsultantRecommendation(
  answers: ConsultantAnswers
): Promise<ConsultantRecommendation> {
  // TODO: Replace with OpenAI API call
  // const res = await fetch('/api/ai/consultant', { method: 'POST', body: JSON.stringify(answers) })
  // return res.json()

  await new Promise((r) => setTimeout(r, 500))
  return generateRecommendation(answers)
}
