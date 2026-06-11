'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { checkMockVenueDateAvailability } from '@/lib/ai/venue-availability'
import { useTranslation } from '@/src/hooks/useTranslation'

interface VenueAvailabilityProps {
  venueId: string
  eventDate: string
  onAvailabilityChange?: (available: boolean) => void
}

export function VenueAvailability({
  venueId,
  eventDate,
  onAvailabilityChange,
}: VenueAvailabilityProps) {
  const { t } = useTranslation()
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    if (!eventDate || !venueId) {
      setAvailable(true)
      onAvailabilityChange?.(true)
      return
    }

    const result = checkMockVenueDateAvailability(venueId, eventDate)
    setAvailable(result.available)
    onAvailabilityChange?.(result.available)
  }, [venueId, eventDate, onAvailabilityChange])

  if (!eventDate) return null

  if (available) {
    return (
      <div className="mt-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
        <p className="flex items-center gap-2 text-sm text-green-700 font-medium">
          <CheckCircle2 size={16} className="shrink-0" />
          {t('venuesPage.availability.available')}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
      <p className="flex items-center gap-2 text-sm text-red-700 font-medium">
        <XCircle size={16} className="shrink-0" />
        {t('venuesPage.availability.unavailable')}
      </p>
      <p className="text-xs text-red-600 mt-1 ml-6">{t('venuesPage.availability.chooseAnother')}</p>
    </div>
  )
}
