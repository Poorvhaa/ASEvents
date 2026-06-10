import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/api-security'
import { createLead, getLeads } from '@/services/leadService'
import { sendThankYouEmail, sendAdminLeadNotification } from '@/services/email'
import { syncLeadToCRM } from '@/services/crmService'

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().min(1),
  eventType: z.string().min(1),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  venuePreference: z.string().optional(),
  specialRequirements: z.string().optional(),
  aiRecommendation: z.any().optional(),
})

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

    const lead = await createLead(parsed.data)

    await Promise.allSettled([
      sendThankYouEmail({ lead: parsed.data, recommendation: parsed.data.aiRecommendation }),
      sendAdminLeadNotification(parsed.data),
      syncLeadToCRM(parsed.data, 'hubspot'),
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
