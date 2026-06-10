'use client'

import { useEffect, useState } from 'react'
import type { Venue } from '@/lib/types/venues'

interface VenueFilters {
  city?: string
  category?: string
  capacity?: number
}

export function useVenues(filters?: VenueFilters) {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters?.city && filters.city !== 'All') params.set('city', filters.city)
    if (filters?.category && filters.category !== 'All') params.set('category', filters.category)
    if (filters?.capacity) params.set('capacity', String(filters.capacity))

    setLoading(true)
    setError(null)

    fetch(`/api/venues?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.venues) {
          setVenues(data.venues)
        } else {
          setError('Failed to load venues')
        }
      })
      .catch(() => setError('Failed to load venues'))
      .finally(() => setLoading(false))
  }, [filters?.city, filters?.category, filters?.capacity])

  return { venues, loading, error }
}

export function useFeaturedVenues() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/venues?featured=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.venues) setVenues(data.venues)
      })
      .finally(() => setLoading(false))
  }, [])

  return { venues, loading }
}
