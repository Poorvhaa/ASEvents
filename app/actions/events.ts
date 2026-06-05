'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { events } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getEvents() {
  const userId = await getUserId()
  return db
    .select()
    .from(events)
    .where(eq(events.userId, userId))
    .orderBy(desc(events.createdAt))
}

export async function createEvent(data: {
  title: string
  description?: string
  date: Date
  location: string
  category: string
  image?: string
}) {
  const userId = await getUserId()
  const result = await db
    .insert(events)
    .values({
      ...data,
      userId,
    })
    .returning()
  revalidatePath('/admin/events')
  return result[0]
}

export async function updateEvent(
  id: number,
  data: Partial<{
    title: string
    description?: string
    date: Date
    location: string
    category: string
    status: string
    image?: string
  }>
) {
  const userId = await getUserId()
  const result = await db
    .update(events)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(events.id, id) && eq(events.userId, userId))
    .returning()
  revalidatePath('/admin/events')
  return result[0]
}

export async function deleteEvent(id: number) {
  const userId = await getUserId()
  await db.delete(events).where(eq(events.id, id) && eq(events.userId, userId))
  revalidatePath('/admin/events')
}

export async function getPublicEvents() {
  return db
    .select()
    .from(events)
    .where(eq(events.status, 'confirmed'))
    .orderBy(desc(events.date))
    .limit(6)
}
