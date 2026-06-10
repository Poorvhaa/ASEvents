import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'
import { getLeads, updateLeadStatus, leadsToCSV } from '@/services/leadService'
import type { LeadStatus } from '@/lib/ai/types'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    const status = searchParams.get('status') as LeadStatus | null
    const format = searchParams.get('format')

    const leadsList = await getLeads({ search, status: status || undefined })

    if (format === 'csv') {
      const csv = leadsToCSV(leadsList)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="as-events-leads-${Date.now()}.csv"`,
        },
      })
    }

    return NextResponse.json(leadsList)
  } catch (error) {
    console.error('[Admin Leads API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    const lead = await updateLeadStatus(String(id), status as LeadStatus)
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('[Admin Leads API] Update error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
