import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { portfolioItems } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    let query = db.select().from(portfolioItems)

    if (category) {
      query = db.select().from(portfolioItems).where(eq(portfolioItems.category, category))
    }

    const items = await query.orderBy(desc(portfolioItems.createdAt)).limit(100)

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, description, fullDescription, image, thumbnail, category, date, client, location, highlights } = body

    if (!userId || !title || !image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await db
      .insert(portfolioItems)
      .values({
        userId,
        title,
        description,
        fullDescription,
        image,
        thumbnail,
        category,
        date: date ? new Date(date) : null,
        client,
        location,
        highlights,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    )
  }
}
