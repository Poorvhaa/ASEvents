'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { useTranslation } from '@/src/hooks/useTranslation'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Celebration',
  'Anniversary',
  'Product Launch',
  'Exhibition',
  'Destination Event',
  'Other',
]

const guestCounts = [
  'Less than 50',
  '50 - 100',
  '100 - 200',
  '200 - 500',
  '500+',
]

const venuePreferences = [
  'Indoor Venue',
  'Outdoor Venue',
  'Beach/Destination',
  'Hotel/Resort',
  'Private Estate',
  'No Preference',
]

const budgetRanges = [
  'Under ₹3,00,000',
  '₹3,00,000 - ₹8,00,000',
  '₹8,00,000 - ₹15,00,000',
  '₹15,00,000 - ₹30,00,000',
  '₹30,00,000+',
]

export function QuoteModal() {
  const { t, language } = useTranslation()
  const {
    isOpen,
    closeModal,
    initialEventType,
    initialVenue,
    initialCity,
    initialGuestCount,
    initialStep,
    initialVenueName,
    initialVenueCategory,
    initialVenueCapacity,
    initialEventDate,
    bookingBlocked,
    capacityExceeded,
  } = useQuoteModal()
  const [step, setStep] = useState(initialStep)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    venuePreference: '',
    budgetRange: '',
    requirements: '',
    name: '',
    email: '',
    phone: '',
    eventDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep)
      setFormData((prev) => ({
        ...prev,
        eventType: initialEventType || prev.eventType,
        venuePreference: initialVenueName
          ? `${initialVenueName}${initialVenueCategory ? ` (${initialVenueCategory})` : ''}`
          : initialVenue || prev.venuePreference,
        guestCount: initialGuestCount || prev.guestCount,
        requirements: initialVenueName
          ? `${t('quoteModalExtra.prefillVenue')} ${initialVenueName}, ${initialCity || ''}. ${t('quoteModalExtra.prefillCapacity')} ${initialVenueCapacity || 'N/A'}.`
          : prev.requirements,
        eventDate: initialEventDate || prev.eventDate,
      }))
    }
  }, [
    isOpen,
    initialEventType,
    initialVenue,
    initialVenueName,
    initialVenueCategory,
    initialVenueCapacity,
    initialCity,
    initialGuestCount,
    initialEventDate,
    initialStep,
    language,
  ])

  const submitBlocked = bookingBlocked || capacityExceeded

  const totalSteps = 6

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const translateEventType = (val: string) => {
    const key = `quoteModal.step1.types.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const translateGuestCount = (val: string) => {
    const key = `quoteModal.step2.counts.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const translateVenuePreference = (val: string) => {
    const key = `quoteModal.step3.venues.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const translateBudgetRange = (val: string) => {
    const key = `quoteModal.step4.ranges.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const handleSubmit = async () => {
    console.log('[v0] Quote Modal: Starting submission...')
    setIsSubmitting(true)
    setError(null)

    try {
      const guestCountMap: { [key: string]: number } = {
        'Less than 50': 50,
        '50 - 100': 75,
        '100 - 200': 150,
        '200 - 500': 350,
        '500+': 750,
      }

      const payload = {
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guestCount: guestCountMap[formData.guestCount] || 50,
        budget: formData.budgetRange,
        location: formData.venuePreference,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        requirements: formData.requirements,
      }

      console.log('[v0] Quote Modal: Sending payload:', {
        eventType: payload.eventType,
        guestCount: payload.guestCount,
        email: payload.email,
        name: payload.name,
      })

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          eventType: payload.eventType,
          city: formData.venuePreference,
          guestCount: formData.guestCount || payload.guestCount,
          budget: payload.budget,
          venuePreference: formData.venuePreference,
          requirements: payload.requirements,
        }),
      })

      console.log('[v0] Quote Modal: Response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('[v0] Quote Modal: Success response:', data)
        
        // Reset form
        closeModal()
        setStep(1)
        setFormData({
          eventType: '',
          guestCount: '',
          venuePreference: '',
          budgetRange: '',
          requirements: '',
          name: '',
          email: '',
          phone: '',
          eventDate: new Date().toISOString().split('T')[0],
        })
        alert(t('quoteModal.success'))
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        const errorMsg = errorData.error || `HTTP ${response.status}`
        console.error('[v0] Quote Modal: Error response:', errorData)
        setError(errorMsg)
        alert(`${t('quoteModalExtra.submissionFailed')} ${errorMsg}.`)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      console.error('[v0] Quote Modal: Submission error:', errorMsg)
      setError(errorMsg)
      alert(`${t('quoteModalExtra.connectionError')}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.eventType !== ''
      case 2:
        return formData.guestCount !== ''
      case 3:
        return formData.venuePreference !== ''
      case 4:
        return formData.budgetRange !== ''
      case 5:
        return true // Requirements is optional
      case 6:
        return formData.name !== '' && formData.email !== ''
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step1.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step1.sub')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelect('eventType', type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.eventType === type
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  {translateEventType(type)}
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step2.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step2.sub')}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {guestCounts.map((count) => (
                <button
                  key={count}
                  onClick={() => handleSelect('guestCount', count)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.guestCount === count
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  {translateGuestCount(count)}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step3.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step3.sub')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {venuePreferences.map((venue) => (
                <button
                  key={venue}
                  onClick={() => handleSelect('venuePreference', venue)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.venuePreference === venue
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  {translateVenuePreference(venue)}
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step4.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step4.sub')}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {budgetRanges.map((budget) => (
                <button
                  key={budget}
                  onClick={() => handleSelect('budgetRange', budget)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.budgetRange === budget
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  {translateBudgetRange(budget)}
                </button>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step5.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step5.sub')}</p>
            </div>
            <textarea
              value={formData.requirements}
              onChange={(e) => handleSelect('requirements', e.target.value)}
              placeholder={t('quoteModal.step5.placeholder')}
              className="w-full h-40 p-4 rounded-lg border-2 border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step6.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step6.sub')}</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleSelect('name', e.target.value)}
                placeholder={t('quoteModal.step6.name')}
                className="w-full p-4 rounded-lg border-2 border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleSelect('email', e.target.value)}
                placeholder={t('quoteModal.step6.email')}
                className="w-full p-4 rounded-lg border-2 border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleSelect('phone', e.target.value)}
                placeholder={t('quoteModal.step6.phone')}
                className="w-full p-4 rounded-lg border-2 border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            
            {/* Summary */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/50 space-y-2">
              <h4 className="font-semibold text-foreground mb-3">{t('quoteModal.step6.summaryTitle')}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">{t('quoteModal.step6.eventType')}</span>
                <span className="text-foreground">{translateEventType(formData.eventType)}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.guestCount')}</span>
                <span className="text-foreground">{translateGuestCount(formData.guestCount)}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.venue')}</span>
                <span className="text-foreground">{translateVenuePreference(formData.venuePreference)}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.budget')}</span>
                <span className="text-foreground">{translateBudgetRange(formData.budgetRange)}</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl border border-border"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <span className="text-sm text-primary font-medium">
                  {t('quoteModal.step')} {step} {t('quoteModal.of')} {totalSteps}
                </span>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-8 rounded-full transition-colors ${
                        i < step ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t('quoteModal.close')}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {initialVenueName && (
                <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                  <p className="font-semibold text-foreground">{initialVenueName}</p>
                  <p className="text-muted-foreground mt-1">
                    {initialVenueCategory} · {initialCity} · {t('quoteModalExtra.prefillCapacity')} {initialVenueCapacity}
                  </p>
                </div>
              )}
              {submitBlocked && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {capacityExceeded && (
                    <p>⚠ {t('quoteModal.errors.capacity')}</p>
                  )}
                  {bookingBlocked && (
                    <p>❌ {t('quoteModal.errors.date')}</p>
                  )}
                </div>
              )}
              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronLeft size={18} />
                {t('quoteModal.back')}
              </Button>
              {step < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-primary text-primary-foreground hover:bg-gold-light gap-2"
                >
                  {t('quoteModal.next')}
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting || submitBlocked}
                  className="bg-primary text-primary-foreground hover:bg-gold-light gap-2"
                >
                  {isSubmitting ? t('quoteModal.submitting') : t('quoteModal.submit')}
                  {!isSubmitting && <Check size={18} />}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
