'use client'

import { Package, MapPin, IndianRupee, Users } from 'lucide-react'
import type { AIConsultationResult } from '@/lib/ai/types'

interface RecommendationSummaryProps {
  recommendation: AIConsultationResult
}

export function RecommendationSummary({ recommendation }: RecommendationSummaryProps) {
  const {
    recommendedPackage: pkg,
    budgetEstimate,
    venueSuggestions,
    guestCapacityValidation,
  } = recommendation

  return (
    <div className="mx-4 mb-4 p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-4">
      <div className="flex items-start gap-2">
        <Package size={16} className="text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Recommended Package</p>
          <p className="text-sm font-semibold text-foreground">{pkg.name}</p>
          {pkg.reason && <p className="text-xs text-muted-foreground mt-0.5">{pkg.reason}</p>}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <IndianRupee size={16} className="text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Budget Estimate</p>
          <p className="text-sm font-semibold text-foreground">{recommendation.budgetRangeLabel}</p>
          <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
            <span>Venue: ₹{budgetEstimate.venue.toLocaleString('en-IN')}</span>
            <span>Decor: ₹{budgetEstimate.decor.toLocaleString('en-IN')}</span>
            <span>Catering: ₹{budgetEstimate.food.toLocaleString('en-IN')}</span>
            <span>Entertainment: ₹{budgetEstimate.entertainment.toLocaleString('en-IN')}</span>
            <span className="col-span-2 font-medium text-foreground">
              Total: ₹{budgetEstimate.total.toLocaleString('en-IN')}
            </span>
          </div>
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
