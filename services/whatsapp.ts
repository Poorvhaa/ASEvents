const WHATSAPP_NUMBER = process.env.WHATSAPP_BUSINESS_NUMBER || '919510324143'

export interface WhatsAppMessageInput {
  eventType: string
  venueType?: string
  location?: string
  guestCount?: string | number
  budget?: string
  requirements?: string
  name?: string
}

export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
  return `Hello AS Events,

I would like to plan an event.

Event Type: ${input.eventType}
Venue Type: ${input.venueType || 'TBD'}
Location: ${input.location || 'TBD'}
Guests: ${input.guestCount || 'TBD'}
Requirements: ${input.requirements || 'None'}
${input.name ? `Name: ${input.name}` : ''}

Please share a detailed proposal.

Thank you!`
}

export function generateWhatsAppUrl(input: WhatsAppMessageInput): string {
  const message = buildWhatsAppMessage(input)
  const number = WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppNumber(): string {
  return WHATSAPP_NUMBER
}
