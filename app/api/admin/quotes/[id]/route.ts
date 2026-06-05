import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { quoteRequests } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const quote = await db
      .select()
      .from(quoteRequests)
      .where(eq(quoteRequests.id, parseInt(params.id)))

    if (!quote.length) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }

    return NextResponse.json(quote[0])
  } catch (error) {
    console.error('Error fetching quote:', error)
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, quote } = body

    const updateData: any = {}
    if (status) updateData.status = status
    if (quote) updateData.quote = quote
    updateData.updatedAt = new Date()

    const result = await db
      .update(quoteRequests)
      .set(updateData)
      .where(eq(quoteRequests.id, parseInt(params.id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 })
  }
}
