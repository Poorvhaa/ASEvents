import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/api-security'
import { chatSchema } from '@/lib/validations/schemas'
import { generateEventConsultation } from '@/services/openai'
import { saveConsultation } from '@/services/consultationService'
import { generateConsultation } from '@/lib/ai/consultant-engine'
import type { ConsultantAnswers } from '@/lib/ai/types'
import { escapeHTML, sanitizeTextarea } from '@/lib/validations/sanitization'

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
      eventType: escapeHTML(parsed.data.eventType),
      location: parsed.data.location ? escapeHTML(parsed.data.location) : undefined,
      guestCount: parsed.data.guestCount ? escapeHTML(parsed.data.guestCount) : undefined,
      budget: parsed.data.budget ? escapeHTML(parsed.data.budget) : undefined,
      venueType: parsed.data.venueType ? escapeHTML(parsed.data.venueType) : undefined,
      specialRequirements: parsed.data.specialRequirements
        ? escapeHTML(sanitizeTextarea(parsed.data.specialRequirements))
        : undefined,
      language: parsed.data.language ? escapeHTML(parsed.data.language) : undefined,
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
      location: input.location || '',
      guestCount: input.guestCount || '',
      budget: input.budget || '',
      venueType: input.venueType || '',
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
