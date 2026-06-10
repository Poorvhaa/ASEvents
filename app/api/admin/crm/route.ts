import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'
import { getLeadCount, getLeads, getContactInquiries } from '@/services/leadService'
import { getBookings } from '@/services/bookingService'
import { getConsultations } from '@/services/consultationService'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const fromDate = searchParams.get('fromDate') || undefined
    const toDate = searchParams.get('toDate') || undefined
    const status = searchParams.get('status') || undefined
    const eventType = searchParams.get('eventType') || undefined

    const [leads, bookings, contacts, consultations, totalLeads] = await Promise.all([
      getLeads({
        status: status as import('@/lib/ai/types').LeadStatus | undefined,
        eventType,
        fromDate,
        toDate,
      }),
      getBookings({ fromDate, toDate, status: status || undefined }),
      getContactInquiries({ fromDate, toDate }),
      getConsultations(50),
      getLeadCount(),
    ])

    const pendingBookings = bookings.filter((b) => b.status === 'pending').length
    const pendingInquiries = contacts.length

    return NextResponse.json({
      stats: {
        totalLeads: totalLeads || leads.length,
        venueBookings: bookings.length,
        pendingInquiries,
        aiConsultations: consultations.length,
        pendingBookings,
      },
      leads,
      bookings,
      contacts,
      consultations,
    })
  } catch (error) {
    console.error('[CRM API] Error:', error)
    return NextResponse.json({ error: 'Failed to load CRM data' }, { status: 500 })
  }
}
