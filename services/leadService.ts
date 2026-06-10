import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase'
import type { DbLead } from '@/types/database'
import type { LeadPayload, LeadRecord, LeadStatus } from '@/lib/ai/types'

export interface QuotePayload {
  name: string
  email: string
  phone: string
  eventType: string
  city?: string
  guestCount?: string | number
  budget?: string
  venuePreference?: string
  requirements?: string
  source?: string
}

function mapDbLead(row: DbLead): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    city: row.city || '',
    eventType: row.event_type,
    guestCount: row.guest_count || undefined,
    budget: row.budget || undefined,
    venuePreference: row.venue_preference || undefined,
    specialRequirements: row.requirements || undefined,
    status: normalizeStatus(row.status),
    createdAt: row.created_at,
  }
}

function normalizeStatus(status: string): LeadStatus {
  const map: Record<string, LeadStatus> = {
    new: 'New',
    contacted: 'Contacted',
    quoted: 'Quoted',
    booked: 'Booked',
    closed: 'Closed',
    New: 'New',
    Contacted: 'Contacted',
    Quoted: 'Quoted',
    Booked: 'Booked',
    Closed: 'Closed',
  }
  return map[status] || 'New'
}

function toDbStatus(status: LeadStatus): string {
  return status.toLowerCase()
}

export async function createQuoteLead(payload: QuotePayload): Promise<LeadRecord> {
  const guestCount =
    payload.guestCount !== undefined ? String(payload.guestCount) : null

  const row = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    event_type: payload.eventType,
    city: payload.city || null,
    guest_count: guestCount,
    budget: payload.budget || null,
    venue_preference: payload.venuePreference || null,
    requirements: payload.requirements || null,
    source: payload.source || 'quote_form',
    status: 'new',
  }

  const supabase = createServerSupabaseClient()
  if (!supabase) {
    const mock: LeadRecord = {
      id: crypto.randomUUID(),
      ...payload,
      city: payload.city || '',
      guestCount: guestCount || undefined,
      status: 'New',
      createdAt: new Date().toISOString(),
    }
    console.log('[LeadService] Supabase not configured — mock lead:', mock)
    return mock
  }

  const { data, error } = await supabase.from('leads').insert(row).select().single()
  if (error) throw new Error(error.message)
  return mapDbLead(data as DbLead)
}

export async function createLead(payload: LeadPayload): Promise<LeadRecord> {
  return createQuoteLead({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    eventType: payload.eventType,
    city: payload.city,
    guestCount: payload.guestCount,
    budget: payload.budget,
    venuePreference: payload.venuePreference,
    requirements: payload.specialRequirements,
    source: 'ai_consultant',
  })
}

export async function getLeads(filters?: {
  search?: string
  status?: LeadStatus
  eventType?: string
  fromDate?: string
  toDate?: string
}): Promise<LeadRecord[]> {
  const supabase = createAdminSupabaseClient()
  if (!supabase) return []

  let query = supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(200)

  if (filters?.status) query = query.eq('status', toDbStatus(filters.status))
  if (filters?.eventType) query = query.ilike('event_type', `%${filters.eventType}%`)
  if (filters?.fromDate) query = query.gte('created_at', filters.fromDate)
  if (filters?.toDate) query = query.lte('created_at', filters.toDate)

  const { data, error } = await query
  if (error) {
    console.error('[LeadService] Fetch error:', error.message)
    return []
  }

  let results = (data || []).map((row) => mapDbLead(row as DbLead))

  if (filters?.search) {
    const term = filters.search.toLowerCase()
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(term) ||
        l.email.toLowerCase().includes(term) ||
        l.phone.includes(term) ||
        l.city.toLowerCase().includes(term) ||
        l.eventType.toLowerCase().includes(term)
    )
  }

  return results
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<LeadRecord | null> {
  const supabase = createAdminSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('leads')
    .update({ status: toDbStatus(status) })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) return null
  return mapDbLead(data as DbLead)
}

export async function getLeadCount(): Promise<number> {
  const supabase = createAdminSupabaseClient()
  if (!supabase) return 0
  const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true })
  if (error) return 0
  return count || 0
}

export function leadsToCSV(leadsList: LeadRecord[]): string {
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'City',
    'Event Type',
    'Guest Count',
    'Budget',
    'Status',
    'Created At',
  ]
  const rows = leadsList.map((l) =>
    [l.id, l.name, l.email, l.phone, l.city, l.eventType, l.guestCount, l.budget, l.status, l.createdAt]
      .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
      .join(',')
  )
  return [headers.join(','), ...rows].join('\n')
}

export async function getContactInquiries(filters?: {
  fromDate?: string
  toDate?: string
}): Promise<import('@/types/database').DbContactInquiry[]> {
  const supabase = createAdminSupabaseClient()
  if (!supabase) return []

  let query = supabase
    .from('contact_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (filters?.fromDate) query = query.gte('created_at', filters.fromDate)
  if (filters?.toDate) query = query.lte('created_at', filters.toDate)

  const { data, error } = await query
  if (error) return []
  return (data || []) as import('@/types/database').DbContactInquiry[]
}

export async function createContactInquiry(input: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<import('@/types/database').DbContactInquiry | null> {
  const supabase = createServerSupabaseClient()
  if (!supabase) {
    console.log('[LeadService] Contact inquiry (mock):', input)
    return {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...input,
      phone: input.phone || null,
    }
  }

  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      subject: input.subject,
      message: input.message,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as import('@/types/database').DbContactInquiry
}
