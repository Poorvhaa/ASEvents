import type { ConsultantAnswers, AIConsultationResult } from '@/lib/ai/types'
import {
  generateWhatsAppUrl as buildUrl,
  buildWhatsAppMessage,
  getWhatsAppNumber,
} from '@/services/whatsapp'

export { buildWhatsAppMessage, getWhatsAppNumber }

export function generateWhatsAppUrl(
  answers: ConsultantAnswers,
  recommendation?: AIConsultationResult
): string {
  return buildUrl({
    eventType: answers.eventType,
    city: answers.city,
    guestCount: answers.guestCount,
    requirements: answers.specialRequirements,
  })
}
