import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'
import { getContactInquiries } from '@/services/leadService'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contacts = await getContactInquiries()
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('[Admin Contacts API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
