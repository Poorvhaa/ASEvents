import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/api-security'

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: verifyAdminRequest(request) })
}
