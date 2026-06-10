'use client'

import { Package, MapPin, IndianRupee, Lightbulb, CheckCircle2, Users, Calendar } from 'lucide-react'
import type { AIConsultationResult } from '@/lib/ai/types'

interface RecommendationCardProps {
  recommendation: AIConsultationResult
  compact?: boolean
}

export function RecommendationCard({ recommendation, compact }: RecommendationCardProps) {
  const {
    recommendedPackage: pkg,
    budgetEstimate,
    venueSuggestions,
    recommendedVenueTypes,
    guestCapacityValidation,
    venueAvailabilitySuggestion,
    planningTips,
  } = recommendation

  const venueList =
    venueSuggestions.length > 0
      ? venueSuggestions
      : recommendedVenueTypes.map((t) => ({
          name: t,
          type: t,
          capacity: '',
          location: '',
          startingCost: '',
        }))

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 text-sm">
      <div className="flex items-start gap-2">
        <Package size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">Recommended Package</p>
          <p className="font-semibold text-foreground">{pkg.name}</p>
          {pkg.reason && (
            <p className="text-xs text-muted-foreground mt-1">Reason: {pkg.reason}</p>
          )}
        </div>
      </div>

      {!compact && recommendedVenueTypes.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Recommended Venue Types</p>
          <div className="flex flex-wrap gap-1.5">
            {recommendedVenueTypes.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-blue-50 text-primary text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-primary font-semibold">
        <IndianRupee size={16} />
        <span>{recommendation.budgetRangeLabel}</span>
      </div>

      {!compact && (
        <>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Budget Breakdown</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <span>Venue: ₹{budgetEstimate.venue.toLocaleString('en-IN')}</span>
              <span>Decor: ₹{budgetEstimate.decor.toLocaleString('en-IN')}</span>
              <span>Catering: ₹{budgetEstimate.food.toLocaleString('en-IN')}</span>
              <span>Entertainment: ₹{budgetEstimate.entertainment.toLocaleString('en-IN')}</span>
              <span>Contingency: ₹{(budgetEstimate.contingency ?? 0).toLocaleString('en-IN')}</span>
              <span className="font-semibold col-span-2">
                Estimated Total: ₹{budgetEstimate.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs">
            <Users size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{guestCapacityValidation.message}</p>
          </div>

          <div className="flex items-start gap-2 text-xs">
            <Calendar size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{venueAvailabilitySuggestion.message}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <MapPin size={12} /> Venue Suggestions
            </p>
            <ul className="space-y-1.5">
              {venueList.map((v) => (
                <li key={v.name} className="text-xs text-foreground">
                  <span className="font-medium">{v.name}</span>
                  {v.location && (
                    <span className="text-muted-foreground"> — {v.location}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Lightbulb size={12} /> Planning Tips
            </p>
            <ul className="space-y-1">
              {planningTips.slice(0, 2).map((tip) => (
                <li key={tip} className="text-xs text-muted-foreground flex gap-1.5">
                  <CheckCircle2 size={12} className="text-primary shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
