import { createServerSupabaseClient } from '@/lib/supabase'
import { packages as staticPackages } from '@/lib/data/packages'
import type { DbPackage } from '@/types/database'
import type { EventPackage } from '@/lib/types/packages'

function dbToPackage(db: DbPackage): EventPackage {
  return {
    id: db.id,
    slug: db.slug,
    title: db.title,
    category: db.category as EventPackage['category'],
    includes: Array.isArray(db.includes) ? db.includes : [],
    includedServices: Array.isArray(db.included_services) ? db.included_services : [],
    highlights: Array.isArray(db.highlights) ? db.highlights : [],
    suitableGuests: db.suitable_guests || '',
    duration: db.duration || '',
    popular: db.popular || false,
    description: db.description || undefined,
  }
}

export async function getPackages(category?: string): Promise<DbPackage[]> {
  const supabase = createServerSupabaseClient()
  if (supabase) {
    let query = supabase.from('packages').select('*')
    if (category) {
      query = query.eq('category', category)
    }
    const { data, error } = await query
    if (!error && data && data.length > 0) {
      return data as DbPackage[]
    }
    if (error) console.error('[PackageService] Supabase error:', error.message)
  }

  // Fallback to static packages
  let results = staticPackages.map(pkg => ({
    id: pkg.id,
    slug: pkg.slug,
    title: pkg.title,
    category: pkg.category,
    includes: pkg.includes,
    included_services: pkg.includedServices,
    highlights: pkg.highlights,
    suitable_guests: pkg.suitableGuests,
    duration: pkg.duration,
    popular: pkg.popular || false,
    description: pkg.description || null,
  }))

  if (category) {
    results = results.filter(p => p.category === category)
  }

  return results as DbPackage[]
}

export async function getDisplayPackages(category?: string): Promise<EventPackage[]> {
  const dbPkgs = await getPackages(category)
  return dbPkgs.map(dbToPackage)
}
