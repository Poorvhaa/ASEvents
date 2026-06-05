import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quoteRequests, events, contactSubmissions } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'

export async function GET() {
  try {
    const [totalQuotes, pendingQuotesResult, totalEventsResult, totalContactsResult] = await Promise.all([
      db.select({ count: count() }).from(quoteRequests),
      db
        .select({ count: count() })
        .from(quoteRequests)
        .where(eq(quoteRequests.status, 'pending')),
      db.select({ count: count() }).from(events),
      db.select({ count: count() }).from(contactSubmissions),
    ])

    return NextResponse.json({
      totalQuotes: totalQuotes[0]?.count || 0,
      pendingQuotes: pendingQuotesResult[0]?.count || 0,
      totalEvents: totalEventsResult[0]?.count || 0,
      totalContacts: totalContactsResult[0]?.count || 0,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
