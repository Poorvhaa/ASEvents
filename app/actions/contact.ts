'use server'

import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id
}

export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const result = await db
    .insert(contactSubmissions)
    .values({
      ...data,
      status: 'new',
    })
    .returning()
  revalidatePath('/')
  return result[0]
}

export async function getContactSubmissions() {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')
  
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt))
}

export async function updateContactStatus(id: number, status: string) {
  const userId = await getUserId()
  if (!userId) throw new Error('Unauthorized')
  
  const result = await db
    .update(contactSubmissions)
    .set({ status })
    .where(eq(contactSubmissions.id, id))
    .returning()
  revalidatePath('/admin/contact')
  return result[0]
}
