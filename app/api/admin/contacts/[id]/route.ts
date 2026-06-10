import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'

/** Contact inquiries have no status field in Supabase schema — acknowledge only */
export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await request.json().catch(() => ({}))
  return NextResponse.json({ success: true })
}
