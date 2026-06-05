'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { quoteRequests } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id
}

export async function submitQuoteRequest(data: {
  eventType: string
  eventDate: Date
  guestCount: number
  budget?: string
  location: string
  name: string
  email: string
  phone: string
  requirements?: string
}) {
  const userId = await getUserId()
  const result = await db
    .insert(quoteRequests)
    .values({
      ...data,
      userId: userId || null,
    })
    .returning()
  revalidatePath('/')
  return result[0]
}

export async function getQuoteRequests() {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')
  
  return db
    .select()
    .from(quoteRequests)
    .where(eq(quoteRequests.userId, userId))
    .orderBy(desc(quoteRequests.createdAt))
}

export async function updateQuoteRequest(
  id: number,
  data: {
    status?: string
    quote?: string
  }
) {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')
  
  const result = await db
    .update(quoteRequests)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(quoteRequests.id, id) && eq(quoteRequests.userId, userId))
    .returning()
  revalidatePath('/admin/quotes')
  return result[0]
}

export async function getAdminQuotes() {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')
  
  return db
    .select()
    .from(quoteRequests)
    .orderBy(desc(quoteRequests.createdAt))
}
