'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { portfolioItems } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getPortfolioItems() {
  const userId = await getUserId()
  return db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.userId, userId))
    .orderBy(desc(portfolioItems.order), desc(portfolioItems.createdAt))
}

export async function getPublicPortfolio(category?: string) {
  const conditions = []
  if (category) {
    conditions.push(eq(portfolioItems.category, category))
  }
  let query = db.select().from(portfolioItems)
  if (conditions.length > 0) {
    return query
      .where(and(...conditions))
      .orderBy(desc(portfolioItems.order), desc(portfolioItems.createdAt))
  }
  return query.orderBy(desc(portfolioItems.order), desc(portfolioItems.createdAt))
}

export async function createPortfolioItem(data: {
  title: string
  description?: string
  fullDescription?: string
  image: string
  thumbnail?: string
  category: string
  date?: Date
  client?: string
  location?: string
  highlights?: string
  order?: number
}) {
  const userId = await getUserId()
  const result = await db
    .insert(portfolioItems)
    .values({
      ...data,
      userId,
      order: data.order ?? 0,
    })
    .returning()
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  return result[0]
}

export async function updatePortfolioItem(
  id: number,
  data: Partial<{
    title: string
    description?: string
    fullDescription?: string
    image: string
    thumbnail?: string
    category: string
    date?: Date
    client?: string
    location?: string
    highlights?: string
    order?: number
  }>
) {
  const userId = await getUserId()
  const result = await db
    .update(portfolioItems)
    .set(data)
    .where(eq(portfolioItems.id, id) && eq(portfolioItems.userId, userId))
    .returning()
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
  return result[0]
}

export async function deletePortfolioItem(id: number) {
  const userId = await getUserId()
  await db
    .delete(portfolioItems)
    .where(eq(portfolioItems.id, id) && eq(portfolioItems.userId, userId))
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}

export async function reorderPortfolioItems(items: { id: number; order: number }[]) {
  const userId = await getUserId()
  
  for (const item of items) {
    await db
      .update(portfolioItems)
      .set({ order: item.order })
      .where(eq(portfolioItems.id, item.id) && eq(portfolioItems.userId, userId))
  }
  
  revalidatePath('/admin/portfolio')
  revalidatePath('/portfolio')
}
