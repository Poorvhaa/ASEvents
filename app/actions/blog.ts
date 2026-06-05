'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getBlogPosts() {
  const userId = await getUserId()
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.userId, userId))
    .orderBy(desc(blogPosts.createdAt))
}

export async function getPublishedBlogPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt))
}

export async function getBlogPostBySlug(slug: string) {
  const result = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
  return result[0]
}

export async function createBlogPost(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  category: string
  tags?: string
  published?: boolean
}) {
  const userId = await getUserId()
  const result = await db
    .insert(blogPosts)
    .values({
      ...data,
      userId,
      published: data.published ?? false,
    })
    .returning()
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return result[0]
}

export async function updateBlogPost(
  id: number,
  data: Partial<{
    title: string
    slug: string
    excerpt: string
    content: string
    image?: string
    category: string
    tags?: string
    published?: boolean
  }>
) {
  const userId = await getUserId()
  const result = await db
    .update(blogPosts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(blogPosts.id, id), eq(blogPosts.userId, userId)))
    .returning()
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return result[0]
}

export async function deleteBlogPost(id: number) {
  const userId = await getUserId()
  await db
    .delete(blogPosts)
    .where(and(eq(blogPosts.id, id), eq(blogPosts.userId, userId)))
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}
