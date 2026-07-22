import type { ConsultantAnswers } from '@/lib/ai/types'
import { generateConsultation, formatConsultationMessage } from '@/lib/ai/consultant-engine'

const SYSTEM_PROMPT = `You are AS Events AI Event Consultant — a senior event planner for a premium Indian event management company.

Your job:
- Understand customer requirements for weddings, corporate events, social celebrations, and festivals.
- Suggest appropriate event packages (Essential, Premium, Luxury for weddings; Conference, Product Launch for corporate).
- Recommend venues in Indian cities (Ahmedabad, Mumbai, Udaipur, Pune, Delhi, etc.).
- Estimate budgets in Indian Rupees (₹) with realistic ranges.
- Encourage lead generation by suggesting the user request a personalized proposal.
- Be concise, professional, friendly, and consultative.

Always ask follow-up questions when information is missing.
Use Indian event terminology (mandap, sangeet, haldi, mehendi, baarat).
Format responses with clear sections using markdown bold for headings.`

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function getAIConsultantResponse(
  answers: ConsultantAnswers,
  userMessage?: string
): Promise<string> {
  const engineResult = generateConsultation(answers)
  const engineFallback = formatConsultationMessage(engineResult)

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return engineFallback
  }

  try {
    const context = `
Customer consultation data:
- Event Type: ${answers.eventType}
- Event Date: ${answers.eventDate || 'Not specified'}
- Location: ${answers.location || 'Not specified'}
- Guest Count: ${answers.guestCount || 'Not specified'}
- Budget: ${answers.budget || 'Not specified'}
- Venue Type: ${answers.venueType || 'Not specified'}
- Special Requirements: ${answers.specialRequirements || 'None'}

Engine recommendations (use as basis, enhance with your expertise):
${engineFallback}
`

    const messages: ChatCompletionMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage || context },
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 1200,
      }),
    })

    if (!response.ok) {
      console.error('[OpenAI] API error:', await response.text())
      return engineFallback
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || engineFallback
  } catch (error) {
    console.error('[OpenAI] Request failed:', error)
    return engineFallback
  }
}

export { SYSTEM_PROMPT }
