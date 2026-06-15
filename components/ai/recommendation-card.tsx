'use client'

import { Package, MapPin, IndianRupee, Lightbulb, CheckCircle2, Users, Calendar } from 'lucide-react'
import type { AIConsultationResult } from '@/lib/ai/types'
import { useTranslation } from '@/src/hooks/useTranslation'

interface RecommendationCardProps {
  recommendation: AIConsultationResult
  compact?: boolean
}

export function RecommendationCard({ recommendation, compact }: RecommendationCardProps) {
  const { t, language } = useTranslation()
  const {
    recommendedPackage: pkg,
    budgetEstimate,
    venueSuggestions,
    recommendedVenueTypes,
    guestCapacityValidation,
    venueAvailabilitySuggestion,
    planningTips,
    answers,
  } = recommendation

  const transName = pkg.id ? t(`packages.${pkg.id}.title`) : pkg.name
  const displayName = transName.startsWith('packages.') ? pkg.name : transName

  // Parse values for dynamic localizations
  const guestCount = parseInt(answers?.guestCount?.match(/\d+/)?.[0] || '0') || 50
  const budgetMax = parseInt(answers?.budget?.replace(/[^\d]/g, '') || '0') || 0

  // 1. Localize Package Reason
  const reasonParts = [t('aiPlanner.reason.suitableGuests').replace('{guests}', guestCount.toString())]
  if (budgetMax > 0) {
    reasonParts.push(t('aiPlanner.reason.withinBudget'))
  }
  if (answers?.eventType === 'Wedding' || answers?.eventType?.includes('Wedding')) {
    reasonParts.push(t('aiPlanner.reason.weddingCoordination'))
  }
  const displayReason = `${displayName} — ` + reasonParts.join(t('aiPlanner.reason.and')) + '.'

  // 2. Localize Guest Capacity message
  let displayCapacity = guestCapacityValidation.message
  if (answers) {
    if (guestCount > 500) {
      displayCapacity = t('aiPlanner.guests.requiresLarge').replace('{guests}', guestCount.toString())
    } else if (guestCount > 250) {
      displayCapacity = t('aiPlanner.guests.suitsPremium').replace('{guests}', guestCount.toString())
    } else {
      displayCapacity = t('aiPlanner.guests.manageable').replace('{guests}', guestCount.toString()).replace('{eventType}', answers.eventType || 'your event')
    }
    if (budgetMax > 0 && guestCount > 300 && budgetMax < 1_000_000) {
      displayCapacity += t('aiPlanner.guests.considerIncreasing')
    }
  }

  // 3. Localize Availability message
  let displayAvailability = venueAvailabilitySuggestion.message
  if (answers) {
    const city = answers.city || 'your city'
    const month = answers.eventDate
      ? new Date(answers.eventDate).toLocaleString('en-IN', { month: 'long' })
      : ''
    const monthsMap: Record<string, Record<string, string>> = {
      hi: {
        January: 'जनवरी', February: 'फ़रवरी', March: 'मार्च', April: 'अप्रैल', May: 'मई', June: 'जून',
        July: 'जुलाई', August: 'अगस्त', September: 'सितंबर', October: 'अक्टूबर', November: 'नवंबर', December: 'दिसंबर'
      },
      gu: {
        January: 'જાન્યુઆરી', February: 'ફેબ્રુઆરી', March: 'માર્ચ', April: 'એપ્રિલ', May: 'મે', June: 'જૂન',
        July: 'જૂલી', August: 'ઓગસ્ટ', September: 'સપ્ટેમ્બર', October: 'ઓક્ટોબર', November: 'નવેમ્બર', December: 'ડિસેમ્બર'
      }
    }
    const translatedMonth = monthsMap[language]?.[month] || month
    const peakMonths = ['November', 'December', 'January', 'February']
    const isPeak = month && peakMonths.includes(month)

    displayAvailability = t('aiPlanner.availability.recommendEarly').replace('{city}', city)
    if (isPeak) {
      displayAvailability = t('aiPlanner.availability.peakSeason').replace('{month}', translatedMonth).replace('{city}', city)
    } else if (answers.eventType.includes('Wedding')) {
      displayAvailability = t('aiPlanner.availability.weddingAdvance').replace('{city}', city)
    }
  }

  // 4. Localize Planning Tips
  const localizedTips = planningTips.map((tip) => {
    if (tip.includes('Book your venue')) return t('aiPlanner.tips.bookEarly')
    if (tip.includes('Allocate 40-50%')) return t('aiPlanner.tips.allocateBudget')
    if (tip.includes('Confirm vendor availability')) return t('aiPlanner.tips.confirmVendor')
    if (tip.includes('Plan haldi')) return t('aiPlanner.tips.coordinateWeddingEvents')
    if (tip.includes('Consider a backup')) return t('aiPlanner.tips.backupIndoor')
    if (tip.includes('Finalize AV')) return t('aiPlanner.tips.finalizeAV')
    if (tip.includes('Schedule a venue walkthrough')) return t('aiPlanner.tips.scheduleWalkthrough')
    if (tip.startsWith("We'll accommodate")) {
      const reqText = tip.replace("We'll accommodate: \"", "").replace("...\"", "")
      return t('aiPlanner.tips.specialRequirements').replace('{req}', reqText)
    }
    return tip
  })

  // 5. Localize Venue Suggestions
  const venueList =
    venueSuggestions.length > 0
      ? venueSuggestions.map((v) => {
          const transName = v.slug ? t(`venues.${v.slug}.name`) : v.name
          const dispName = transName.startsWith('venues.') ? v.name : transName
          
          let displayLocation = v.location
          if (v.slug) {
            const locKey = `venues.${v.slug}.location`
            const translatedLoc = t(locKey)
            if (translatedLoc && translatedLoc !== locKey) {
              const cityPart = v.location.split(', ').pop()
              const translatedCity = cityPart ? t(`cities.${cityPart}`) : ''
              if (translatedCity && translatedCity !== `cities.${cityPart}`) {
                displayLocation = `${translatedLoc}, ${translatedCity}`
              } else {
                displayLocation = translatedLoc
              }
            }
          }
          return {
            name: dispName,
            location: displayLocation
          }
        })
      : recommendedVenueTypes.map((tVal) => {
          const transKey = `aiPlanner.venuePreferences.${tVal}`
          const transVal = t(transKey)
          return {
            name: transVal === transKey ? tVal : transVal,
            location: ''
          }
        })

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 text-sm">
      <div className="flex items-start gap-2">
        <Package size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wide">{t('aiPlanner.recommendedPackage')}</p>
          <p className="font-semibold text-foreground">{displayName}</p>
          {(pkg.reason || displayReason) && (
            <p className="text-xs text-muted-foreground mt-1">
              {t('aiPlanner.reasonLabel')} {displayReason || pkg.reason}
            </p>
          )}
        </div>
      </div>

      {!compact && recommendedVenueTypes.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1.5">{t('aiPlanner.recommendedVenueTypes')}</p>
          <div className="flex flex-wrap gap-1.5">
            {recommendedVenueTypes.map((tVal) => {
              const transKey = `aiPlanner.venuePreferences.${tVal}`
              const transVal = t(transKey)
              return (
                <span key={tVal} className="px-2 py-0.5 rounded-full bg-blue-50 text-primary text-xs">
                  {transVal === transKey ? tVal : transVal}
                </span>
              )
            })}
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
            <p className="text-xs font-medium text-muted-foreground mb-2">{t('aiPlanner.budgetBreakdown')}</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <span>{t('aiPlanner.venueLabel')}: ₹{budgetEstimate.venue.toLocaleString('en-IN')}</span>
              <span>{t('aiPlanner.decorLabel')}: ₹{budgetEstimate.decor.toLocaleString('en-IN')}</span>
              <span>{t('aiPlanner.cateringLabel')}: ₹{budgetEstimate.food.toLocaleString('en-IN')}</span>
              <span>{t('aiPlanner.entertainmentLabel')}: ₹{budgetEstimate.entertainment.toLocaleString('en-IN')}</span>
              <span>{t('aiPlanner.contingencyLabel')}: ₹{(budgetEstimate.contingency ?? 0).toLocaleString('en-IN')}</span>
              <span className="font-semibold col-span-2">
                {t('aiPlanner.estimatedTotal')}: ₹{budgetEstimate.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs">
            <Users size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{displayCapacity}</p>
          </div>

          <div className="flex items-start gap-2 text-xs">
            <Calendar size={14} className="text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{displayAvailability}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <MapPin size={12} /> {t('aiPlanner.venueSuggestions')}
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
              <Lightbulb size={12} /> {t('aiPlanner.planningTips')}
            </p>
            <ul className="space-y-1">
              {localizedTips.slice(0, 2).map((tip) => (
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
