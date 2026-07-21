import { recommendPackage } from '@/lib/ai/package-recommender'
import { estimateBudget, formatBudgetRange } from '@/lib/ai/budget-estimator'
import { validateGuestCapacity } from '@/lib/ai/guest-validator'
import { suggestVenueAvailability } from '@/lib/ai/venue-availability'
import { recommendVenues, getVenueTypeSuggestions } from '@/lib/venue-engine'
import type { AIConsultationResult, ConsultantAnswers } from '@/lib/ai/types'
import { formatINR } from '@/lib/ai/utils'

function getPlanningTips(answers: ConsultantAnswers): string[] {
  const tips: string[] = [
    'Book your venue 4-6 months in advance for peak wedding season.',
    'Allocate 40-50% of budget to venue and catering combined.',
    'Confirm vendor availability before finalizing your event date.',
  ]

  if (answers.eventType.includes('Wedding') || answers.eventType === 'Destination Wedding') {
    tips.push('Plan haldi, mehendi, and sangeet as separate coordinated events.')
    tips.push('Consider a backup indoor space for outdoor ceremonies.')
  }

  if (['Corporate Event'].includes(answers.eventType)) {
    tips.push('Finalize AV and branding requirements early with your team.')
    tips.push('Schedule a venue walkthrough before signing contracts.')
  }

  if (answers.specialRequirements) {
    tips.push(`We'll accommodate: "${answers.specialRequirements.slice(0, 80)}..."`)
  }

  return tips.slice(0, 4)
}

function getNextSteps(): string[] {
  return [
    'Submit your details to receive a personalized proposal',
    'Schedule a free consultation with our event planner',
    'Visit shortlisted venues with our team',
    'Review package inclusions and customize as needed',
  ]
}

export function generateConsultation(answers: ConsultantAnswers): AIConsultationResult {
  const recommendedPackage = recommendPackage(answers)
  const budgetEstimate = estimateBudget(answers)
  const budgetRangeLabel = formatBudgetRange(budgetEstimate)
  const venueSuggestions = recommendVenues(answers)
  const recommendedVenueTypes = getVenueTypeSuggestions(answers.eventType)
  const guestCapacityValidation = validateGuestCapacity(answers)
  const venueAvailabilitySuggestion = suggestVenueAvailability(answers)
  const planningTips = getPlanningTips(answers)
  const nextSteps = getNextSteps()

  const cityLabel = answers.city || 'your preferred city'
  const guestLabel = answers.guestCount || `${guestCapacityValidation.guestCount} guests`
  const summary = `${answers.eventType} in ${cityLabel} · ${guestLabel} . Recommended: **${recommendedPackage.name}**.`

  return {
    recommendedPackage,
    budgetEstimate,
    budgetRangeLabel,
    venueSuggestions,
    recommendedVenueTypes,
    guestCapacityValidation,
    venueAvailabilitySuggestion,
    planningTips,
    nextSteps,
    summary,
    answers,
  }
}

export function formatConsultationMessage(result: AIConsultationResult, t?: (key: string) => string): string {
  const answers = result.answers
  const lang = (t && t('contact.placeholders.name') ? (t('contact.placeholders.name').includes('અપૂર્વ') ? 'gu' : t('contact.placeholders.name').includes('अपूर्व') ? 'hi' : 'en') : 'en')

  const translate = t || ((key: string) => {
    const parts = key.split('.')
    const lastPart = parts[parts.length - 1]
    if (key === 'aiPlanner.whatsappMessage') return "Here's your personalized event consultation:"
    if (key === 'aiPlanner.recommendedPackage') return "Recommended Package"
    if (key === 'aiPlanner.reasonLabel') return "Reason:"
    if (key === 'aiPlanner.venueSuggestions') return "Venue Suggestions"
    if (key === 'aiPlanner.guestCapacity') return "Guest Capacity"
    if (key === 'aiPlanner.availability') return "Availability"
    if (key === 'aiPlanner.planningTips') return "Planning Tips"
    if (key === 'aiPlanner.nextSteps') return "Next Steps"
    if (key === 'aiPlanner.proposalPrompt') return "Would you like to receive your personalized proposal? Fill in your details below!"
    if (key === 'packagesPage.guests') return "guests"
    if (key === 'pdf.labels.venue') return "Venue"
    if (key === 'pdf.labels.decor') return "Decor"
    if (key === 'pdf.labels.catering') return "Catering"
    if (key === 'pdf.labels.entertainment') return "Entertainment"
    if (key === 'pdf.labels.contingency') return "Contingency"
    return lastPart
  })

  const { recommendedPackage: pkg, venueSuggestions, planningTips, nextSteps } = result

  const venueList =
    venueSuggestions.length > 0
      ? venueSuggestions.map((v) => {
          const transName = v.slug ? translate(`venues.${v.slug}.name`) : v.name
          const displayName = transName.startsWith('venues.') ? v.name : transName
          return `• ${displayName}`
        }).join('\n')
      : result.recommendedVenueTypes.map((tVal) => {
          const hiMap: Record<string, string> = {
            'Banquet Hall': 'बैंक्वेट हॉल',
            'Resort': 'रिसॉर्ट',
            'Palace': 'महल (पैलेस)',
            'Farmhouse': 'फार्महाउस',
            'Convention Center': 'कन्वेंशन सेंटर',
            'Hotel Ballroom': 'होटल बॉलरूम',
            'Exhibition Hall': 'प्रदर्शनी हॉल',
            'Open Lawn': 'खुला लॉन',
          }
          const guMap: Record<string, string> = {
            'Banquet Hall': 'બેન્ક્વેટ હોલ',
            'Resort': 'રિસોર્ટ',
            'Palace': 'મહેલ (પેલેસ)',
            'Farmhouse': 'ફાર્મહાઉસ',
            'Convention Center': 'કન્વેન્શન સેન્ટર',
            'Hotel Ballroom': 'હોટેલ બોલરૂમ',
            'Exhibition Hall': 'પ્રદર્શન હોલ',
            'Open Lawn': 'ખુલ્લું લોન',
          }
          const transVal = lang === 'hi' ? hiMap[tVal] : lang === 'gu' ? guMap[tVal] : tVal
          return `• ${transVal || tVal}`
        }).join('\n')

  let displaySummary = result.summary
  let displayReason = pkg.reason ?? 'Tailored to your event requirements'
  let displayCapacity = result.guestCapacityValidation.message
  let displayAvailability = result.venueAvailabilitySuggestion.message

  if (answers) {
    const guestCount = parseInt(answers.guestCount.match(/\d+/)?.[0] || '0') || 50
    const budgetMax = answers.budget ? (parseInt(answers.budget.replace(/[^\d]/g, '')) || 0) : 0

    // Localize capacity message
    if (guestCount > 500) {
      displayCapacity = translate('aiPlanner.guests.requiresLarge').replace('{guests}', guestCount.toString())
    } else if (guestCount > 250) {
      displayCapacity = translate('aiPlanner.guests.suitsPremium').replace('{guests}', guestCount.toString())
    } else {
      displayCapacity = translate('aiPlanner.guests.manageable').replace('{guests}', guestCount.toString()).replace('{eventType}', answers.eventType || 'your event')
    }
    if (budgetMax > 0 && guestCount > 300 && budgetMax < 1_000_000) {
      displayCapacity += translate('aiPlanner.guests.considerIncreasing')
    }

    // Localize availability message
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
        July: 'જુલાઈ', August: 'ઓગસ્ટ', September: 'સપ્ટેમ્બર', October: 'ઓક્ટોબર', November: 'નવેમ્બર', December: 'ડિસેમ્બર'
      }
    }
    const translatedMonth = monthsMap[lang]?.[month] || month
    const peakMonths = ['November', 'December', 'January', 'February']
    const isPeak = month && peakMonths.includes(month)

    displayAvailability = translate('aiPlanner.availability.recommendEarly').replace('{city}', city)
    if (isPeak) {
      displayAvailability = translate('aiPlanner.availability.peakSeason').replace('{month}', translatedMonth).replace('{city}', city)
    } else if (answers.eventType.includes('Wedding')) {
      displayAvailability = translate('aiPlanner.availability.weddingAdvance').replace('{city}', city)
    }

    // Localize package title and reason
    const pkgId = pkg.id
    const pkgName = pkgId ? translate(`packages.${pkgId}.title`) : pkg.name
    const displayName = pkgName.startsWith('packages.') ? pkg.name : pkgName

    const eventTypeTranslated = translate(`quoteModal.step1.types.${answers.eventType}`)
    const displayEventType = eventTypeTranslated.startsWith('quoteModal.') ? answers.eventType : eventTypeTranslated

    const inWord = lang === 'hi' ? 'में' : lang === 'gu' ? 'માં' : 'in'
    const cityLabel = answers.city || translate('aiPlanner.placeholders.city')
    const guestLabel = answers.guestCount || `${guestCount} ${translate('packagesPage.guests')}`

    displaySummary = `${displayEventType} ${inWord} ${cityLabel} · ${guestLabel}. Recommended: **${displayName}**.`

    // Localize reason
    const parts: string[] = [translate('aiPlanner.reason.suitableGuests').replace('{guests}', guestCount.toString())]
    if (budgetMax > 0) {
      parts.push(translate('aiPlanner.reason.withinBudget'))
    }
    if (answers.eventType === 'Wedding' || answers.eventType.includes('Wedding')) {
      parts.push(translate('aiPlanner.reason.weddingCoordination'))
    }
    displayReason = `${displayName} — ` + parts.join(translate('aiPlanner.reason.and')) + '.'
  }

  const localizedTips = planningTips.map((tip) => {
    if (tip.includes('Book your venue')) return translate('aiPlanner.tips.bookEarly')
    if (tip.includes('Allocate 40-50%')) return translate('aiPlanner.tips.allocateBudget')
    if (tip.includes('Confirm vendor availability')) return translate('aiPlanner.tips.confirmVendor')
    if (tip.includes('Plan haldi')) return translate('aiPlanner.tips.coordinateWeddingEvents')
    if (tip.includes('Consider a backup')) return translate('aiPlanner.tips.backupIndoor')
    if (tip.includes('Finalize AV')) return translate('aiPlanner.tips.finalizeAV')
    if (tip.includes('Schedule a venue walkthrough')) return translate('aiPlanner.tips.scheduleWalkthrough')
    if (tip.startsWith("We'll accommodate")) {
      const reqText = tip.replace("We'll accommodate: \"", "").replace("...\"", "")
      return translate('aiPlanner.tips.specialRequirements').replace('{req}', reqText)
    }
    return tip
  })

  const localizedSteps = nextSteps.map((step) => {
    if (step.includes('Submit your details')) return translate('aiPlanner.nextSteps.submitDetails')
    if (step.includes('Schedule a free consultation')) return translate('aiPlanner.nextSteps.scheduleConsultation')
    if (step.includes('Visit shortlisted venues')) return translate('aiPlanner.nextSteps.visitVenues')
    if (step.includes('Review package inclusions')) return translate('aiPlanner.nextSteps.reviewPackage')
    return step
  })

  const pkgId = pkg.id
  const pkgName = pkgId ? translate(`packages.${pkgId}.title`) : pkg.name
  const displayName = pkgName.startsWith('packages.') ? pkg.name : pkgName

  return `${translate('aiPlanner.whatsappMessage')}

**${displaySummary.replace(/\*\*/g, '')}**

**${translate('aiPlanner.recommendedPackage')}:** ${displayName}
**${translate('aiPlanner.reasonLabel')}** ${displayReason}

**${translate('aiPlanner.venueSuggestions')}:**
${venueList}

**${translate('aiPlanner.guestCapacity') || 'Guest Capacity'}:** ${displayCapacity}

**${translate('aiPlanner.availability') || 'Availability'}:** ${displayAvailability}

**${translate('aiPlanner.planningTips')}:**
${localizedTips.map((tVal) => `• ${tVal}`).join('\n')}

**${translate('aiPlanner.nextSteps')}:**
${localizedSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${translate('aiPlanner.proposalPrompt') || 'Would you like to receive your personalized proposal? Fill in your details below!'}`
}
