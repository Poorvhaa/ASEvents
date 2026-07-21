import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { galleryItems } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const type = searchParams.get('type')

    const conditions = []
    if (category) {
      conditions.push(eq(galleryItems.category, category))
    }
    if (type) {
      conditions.push(eq(galleryItems.type, type))
    }

    let query = db.select().from(galleryItems)
    if (conditions.length > 0) {
      const items = await query.where(and(...conditions)).orderBy(desc(galleryItems.createdAt)).limit(100)
      return NextResponse.json(items)
    }

    const items = await query.orderBy(desc(galleryItems.createdAt)).limit(100)

    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, description, image, thumbnail, category, type } = body

    if (!userId || !title || !image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await db
      .insert(galleryItems)
      .values({
        userId,
        title,
        description,
        image,
        thumbnail,
        category,
        type: type || 'image',
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}
