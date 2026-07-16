import type { StructuredAIResponse } from '@/types/database'
import { generateConsultation } from '@/lib/ai/consultant-engine'
import type { ConsultantAnswers } from '@/lib/ai/types'

const SYSTEM_PROMPT = `You are AS Events AI Consultant.

You specialize in Indian weddings, haldi, mehendi, sangeet, baraat, reception, destination weddings, corporate events, exhibitions, product launches and luxury celebrations.

Always recommend:
- Packages
- Venues
- Budget estimates
- Planning tips

Return structured JSON only with this exact shape:
{
  "summary": "string",
  "recommendedPackage": "string",
  "estimatedBudget": "string",
  "suggestedVenues": ["string"],
  "eventTimeline": ["string"],
  "nextSteps": ["string"]
}`

export interface ChatInput {
  eventType: string
  city?: string
  guestCount?: string
  budget?: string
  venuePreference?: string
  specialRequirements?: string
  language?: string
}

function engineFallback(input: ChatInput): StructuredAIResponse {
  const answers: ConsultantAnswers = {
    eventType: input.eventType as ConsultantAnswers['eventType'],
    eventDate: '',
    city: input.city || '',
    guestCount: input.guestCount || '',
    budget: input.budget || '',
    venuePreference: input.venuePreference || '',
    specialRequirements: input.specialRequirements || '',
  }

  const result = generateConsultation(answers)
  return {
    summary: result.summary,
    recommendedPackage: result.recommendedPackage.name,
    estimatedBudget: '',
    suggestedVenues: result.venueSuggestions.map((v) => `${v.name} — ${v.location}`),
    eventTimeline: [result.recommendedPackage.timeline],
    nextSteps: result.nextSteps,
  }
}

export async function generateEventConsultation(input: ChatInput): Promise<StructuredAIResponse> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return engineFallback(input)

  const targetLang = input.language === 'hi' ? 'Hindi' : input.language === 'gu' ? 'Gujarati' : 'English'

  const userPrompt = `Event consultation request:
- Event Type: ${input.eventType}
- City: ${input.city || 'Not specified'}
- Guest Count: ${input.guestCount || 'Not specified'}
- Budget: ${input.budget || 'Not specified'}
- Venue Preference: ${input.venuePreference || 'Not specified'}
- Special Requirements: ${input.specialRequirements || 'None'}
- Required Output Language: ${targetLang}

IMPORTANT: You MUST generate all text fields in the structured response (including summary, recommendedPackage, suggestedVenues, eventTimeline, nextSteps) in ${targetLang}. Do NOT return any English text, english labels or english translations for these fields if the language is Hindi or Gujarati.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1200,
      }),
    })

    if (!response.ok) {
      console.error('[OpenAI] API error:', await response.text())
      return engineFallback(input)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) return engineFallback(input)

    const parsed = JSON.parse(content) as StructuredAIResponse
    return {
      summary: parsed.summary || '',
      recommendedPackage: parsed.recommendedPackage || '',
      estimatedBudget: parsed.estimatedBudget || '',
      suggestedVenues: Array.isArray(parsed.suggestedVenues) ? parsed.suggestedVenues : [],
      eventTimeline: Array.isArray(parsed.eventTimeline) ? parsed.eventTimeline : [],
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
    }
  } catch (error) {
    console.error('[OpenAI] Request failed:', error)
    return engineFallback(input)
  }
}
