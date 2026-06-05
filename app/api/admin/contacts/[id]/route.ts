import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    const result = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, parseInt(params.id)))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}
