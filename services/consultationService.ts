import { createServerSupabaseClient } from '@/lib/supabase'
import type { DbAiConsultation } from '@/types/database'

export async function saveConsultation(input: {
  leadId?: string
  prompt: string
  response: string
}): Promise<DbAiConsultation | null> {
  const supabase = createServerSupabaseClient()
  if (!supabase) {
    console.log('[ConsultationService] Supabase not configured — consultation not persisted')
    return null
  }

  const { data, error } = await supabase
    .from('ai_consultations')
    .insert({
      lead_id: input.leadId || null,
      prompt: input.prompt,
      response: input.response,
    })
    .select()
    .single()

  if (error) {
    console.error('[ConsultationService] Insert error:', error.message)
    return null
  }

  return data as DbAiConsultation
}

export async function getConsultations(limit = 100): Promise<DbAiConsultation[]> {
  const supabase = createServerSupabaseClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('ai_consultations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[ConsultationService] Fetch error:', error.message)
    return []
  }
  return (data || []) as DbAiConsultation[]
}
