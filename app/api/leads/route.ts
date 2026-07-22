import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/api-security'
import { createLead, getLeads } from '@/services/leadService'
import { sendThankYouEmail, sendAdminLeadNotification } from '@/services/email'
import { syncLeadToCRM } from '@/services/crmService'
import { leadSchema } from '@/lib/validations/schemas'
import { escapeHTML, sanitizeTextarea } from '@/lib/validations/sanitization'

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, 'leads')
  if (rateLimited) return rateLimited

  try {
    const body = await request.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const rawData = parsed.data
    const sanitizedData = {
      name: escapeHTML(rawData.name),
      email: rawData.email.toLowerCase().trim(),
      phone: rawData.phone,
      location: escapeHTML(rawData.location),
      eventType: escapeHTML(rawData.eventType),
      eventDate: rawData.eventDate,
      guestCount: rawData.guestCount,
      budget: rawData.budget,
      venueType: rawData.venueType ? escapeHTML(rawData.venueType) : undefined,
      specialRequirements: rawData.specialRequirements ? escapeHTML(sanitizeTextarea(rawData.specialRequirements)) : undefined,
      aiRecommendation: rawData.aiRecommendation,
    }

    const lead = await createLead(sanitizedData)

    await Promise.allSettled([
      sendThankYouEmail({ lead: sanitizedData, recommendation: sanitizedData.aiRecommendation }),
      sendAdminLeadNotification(sanitizedData),
      syncLeadToCRM(sanitizedData, 'hubspot'),
    ])

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error('[Leads API] Create error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: 'Failed to save lead', message: process.env.NODE_ENV === 'development' ? message : undefined },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    const status = searchParams.get('status') as import('@/lib/ai/types').LeadStatus | null

    const leadsList = await getLeads({
      search,
      status: status || undefined,
    })

    return NextResponse.json(leadsList)
  } catch (error) {
    console.error('[Leads API] Fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
