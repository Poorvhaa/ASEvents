import { createClient, type SupabaseClient } from '@supabase/supabase-js'

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("ANON KEY EXISTS:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log("SERVICE KEY EXISTS:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured')
  return url
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!key) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured')
  return key
}

let browserClient: SupabaseClient | null = null

/** Browser-safe Supabase client (singleton). */
export function createBrowserSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!browserClient) {
    browserClient = createClient(getSupabaseUrl(), getAnonKey())
  }
  return browserClient
}

/** Server-side Supabase client for API routes. */
export function createServerSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  return createClient(getSupabaseUrl(), getAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/** Service-role client for admin operations (bypasses RLS). */
export function createAdminSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return createServerSupabaseClient()
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
