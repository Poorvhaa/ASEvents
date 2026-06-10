import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, sanitizeString } from '@/lib/api-security'
import { chatSchema } from '@/lib/validations/schemas'
import { generateEventConsultation } from '@/services/openai'
import { saveConsultation } from '@/services/consultationService'
import { generateConsultation } from '@/lib/ai/consultant-engine'
import type { ConsultantAnswers } from '@/lib/ai/types'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'chat')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()
    const parsed = chatSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid consultation data' }, { status: 400 })
    }

    const input = {
      eventType: sanitizeString(parsed.data.eventType, 100),
      city: parsed.data.city ? sanitizeString(parsed.data.city, 100) : undefined,
      guestCount: parsed.data.guestCount
        ? sanitizeString(parsed.data.guestCount, 50)
        : undefined,
      budget: parsed.data.budget ? sanitizeString(parsed.data.budget, 100) : undefined,
      venuePreference: parsed.data.venuePreference
        ? sanitizeString(parsed.data.venuePreference, 200)
        : undefined,
      specialRequirements: parsed.data.specialRequirements
        ? sanitizeString(parsed.data.specialRequirements, 5000)
        : undefined,
    }

    const structured = await generateEventConsultation(input)

    const prompt = JSON.stringify(input)
    await saveConsultation({
      leadId: parsed.data.leadId,
      prompt,
      response: JSON.stringify(structured),
    })

    const answers: ConsultantAnswers = {
      eventType: input.eventType as ConsultantAnswers['eventType'],
      eventDate: '',
      city: input.city || '',
      guestCount: input.guestCount || '',
      budget: input.budget || '',
      venuePreference: input.venuePreference || '',
      specialRequirements: input.specialRequirements || '',
    }
    const recommendation = generateConsultation(answers)

    return NextResponse.json({
      success: true,
      consultation: structured,
      recommendation,
      source: process.env.OPENAI_API_KEY ? 'openai' : 'engine',
    })
  } catch (error) {
    console.error('[Chat API] Error:', error)
    return NextResponse.json({ error: 'Failed to generate consultation' }, { status: 500 })
  }
}
