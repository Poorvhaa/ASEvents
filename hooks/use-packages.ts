'use client'

import { useEffect, useState } from 'react'
import type { EventPackage } from '@/lib/types/packages'

export function usePackages(category?: string) {
  const [packages, setPackages] = useState<EventPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (category && category !== 'All') params.set('category', category)

    setLoading(true)
    setError(null)

    fetch(`/api/packages?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.packages) {
          setPackages(data.packages)
        } else {
          setError('Failed to load packages')
        }
      })
      .catch(() => setError('Failed to load packages'))
      .finally(() => setLoading(false))
  }, [category])

  return { packages, loading, error }
}
