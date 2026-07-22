'use client'

import { Package, MapPin, IndianRupee, Users } from 'lucide-react'
import type { AIConsultationResult } from '@/lib/ai/types'

interface RecommendationSummaryProps {
  recommendation: AIConsultationResult
}

export function RecommendationSummary({ recommendation }: RecommendationSummaryProps) {
  const {
    recommendedPackage: pkg,
    venueSuggestions,
    guestCapacityValidation,
  } = recommendation

  return (
    <div className="mx-4 mb-4 p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-4">
      <div className="flex items-start gap-2">
        <Package size={16} className="text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Recommended Package</p>
          <p className="text-sm font-semibold text-foreground">{pkg.name}</p>
          {pkg.reason && <p className="text-xs text-muted-foreground mt-0.5">{pkg.reason}</p>}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Users size={16} className="text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">{guestCapacityValidation.message}</p>
      </div>

      {venueSuggestions.length > 0 && (
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Top Venues</p>
            {venueSuggestions.slice(0, 3).map((v) => (
              <p key={v.name} className="text-xs text-foreground">
                {v.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
