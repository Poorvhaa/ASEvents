import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'
import { getLeadCount, getContactInquiries } from '@/services/leadService'
import { getBookings } from '@/services/bookingService'
import { getConsultations } from '@/services/consultationService'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [totalLeads, contacts, bookings, consultations] = await Promise.all([
      getLeadCount(),
      getContactInquiries(),
      getBookings(),
      getConsultations(1000),
    ])

    const pendingBookings = bookings.filter((b) => b.status === 'pending').length

    return NextResponse.json({
      totalQuotes: totalLeads,
      pendingQuotes: bookings.filter((b) => b.status === 'pending').length,
      totalEvents: bookings.length,
      totalContacts: contacts.length,
      totalLeads,
      venueBookings: bookings.length,
      pendingInquiries: contacts.length,
      aiConsultations: consultations.length,
      pendingBookings,
    })
  } catch (error) {
    console.error('[Admin Stats API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
