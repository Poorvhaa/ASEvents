'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { galleryItems } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getGalleryItems() {
  const userId = await getUserId()
  return db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.userId, userId))
    .orderBy(desc(galleryItems.order), desc(galleryItems.createdAt))
}

export async function getPublicGallery(category?: string) {
  const conditions = []
  if (category) {
    conditions.push(eq(galleryItems.category, category))
  }
  let query = db.select().from(galleryItems)
  if (conditions.length > 0) {
    return query
      .where(and(...conditions))
      .orderBy(desc(galleryItems.order), desc(galleryItems.createdAt))
  }
  return query.orderBy(desc(galleryItems.order), desc(galleryItems.createdAt))
}

export async function createGalleryItem(data: {
  title: string
  description?: string
  image: string
  thumbnail?: string
  category: string
  type?: string
  order?: number
}) {
  const userId = await getUserId()
  const result = await db
    .insert(galleryItems)
    .values({
      ...data,
      userId,
      type: data.type ?? 'image',
      order: data.order ?? 0,
    })
    .returning()
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return result[0]
}

export async function updateGalleryItem(
  id: number,
  data: Partial<{
    title: string
    description?: string
    image: string
    thumbnail?: string
    category: string
    type?: string
    order?: number
  }>
) {
  const userId = await getUserId()
  const result = await db
    .update(galleryItems)
    .set(data)
    .where(eq(galleryItems.id, id) && eq(galleryItems.userId, userId))
    .returning()
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  return result[0]
}

export async function deleteGalleryItem(id: number) {
  const userId = await getUserId()
  await db
    .delete(galleryItems)
    .where(eq(galleryItems.id, id) && eq(galleryItems.userId, userId))
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

export async function reorderGalleryItems(items: { id: number; order: number }[]) {
  const userId = await getUserId()
  
  for (const item of items) {
    await db
      .update(galleryItems)
      .set({ order: item.order })
      .where(eq(galleryItems.id, item.id) && eq(galleryItems.userId, userId))
  }
  
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}
