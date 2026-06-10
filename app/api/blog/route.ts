import { NextResponse } from 'next/server'

/** Blog posts table not yet configured — returns empty list until content CMS is wired */
export async function GET() {
  return NextResponse.json([])
}

export async function POST() {
  return NextResponse.json({ error: 'Blog API not configured' }, { status: 501 })
}
