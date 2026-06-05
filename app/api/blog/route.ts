import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const published = searchParams.get('published') === 'true'

    let query = db.select().from(blogPosts)

    if (category) {
      query = db.select().from(blogPosts).where(eq(blogPosts.category, category))
    }

    if (published) {
      query = db.select().from(blogPosts).where(eq(blogPosts.published, true))
    }

    const posts = await query.orderBy(desc(blogPosts.createdAt)).limit(50)

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, slug, excerpt, content, image, category, tags, published } = body

    if (!userId || !title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await db
      .insert(blogPosts)
      .values({
        userId,
        title,
        slug,
        excerpt,
        content,
        image,
        category,
        tags,
        published: published || false,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
