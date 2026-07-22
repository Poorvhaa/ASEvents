'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteSchema } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { sanitizeTextarea } from '@/lib/validations/sanitization'
import { cn } from '@/lib/utils'
import { z } from 'zod'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Celebration',
  'Anniversary',
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

type QuoteFormValues = z.infer<typeof quoteSchema>

export function QuoteModal() {
  const { t } = useTranslation()
  const {
    isOpen,
    closeModal,
    initialEventType,
    initialStep,
  } = useQuoteModal()
  const [step, setStep] = useState(initialStep)
  const [apiError, setApiError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLFormElement>(null)

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Reset scroll position and focus the container when step changes or modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
      const rafId = requestAnimationFrame(() => {
        scrollContainerRef.current?.focus()
      })
      return () => cancelAnimationFrame(rafId)
    }
  }, [isOpen, step])

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      eventType: '',
      guestCount: '',
      venueType: '',
      location: '',
      requirements: '',
      name: '',
      email: '',
      phone: '',
    },
  })

  // Watch fields for rendering and custom flow transitions
  const watchedEventType = watch('eventType')
  const watchedGuestCount = watch('guestCount')
  const watchedVenueType = watch('venueType')
  const watchedLocation = watch('location')
  const watchedRequirements = watch('requirements')
  const watchedName = watch('name')
  const watchedEmail = watch('email')
  const watchedPhone = watch('phone')

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep)
      if (initialEventType) {
        setValue('eventType', initialEventType, { shouldValidate: true })
      }
    }
  }, [isOpen, initialEventType, initialStep, setValue])

  const totalSteps = 5

  const handleSelect = (field: keyof QuoteFormValues, value: string) => {
    setValue(field, value, { shouldValidate: true })
  }

  const handleNext = async () => {
    let isValid = false
    if (step === 1) isValid = await trigger('eventType')
    else if (step === 2) isValid = await trigger('guestCount')
    else if (step === 3) isValid = await trigger('venueType')
    else if (step === 4) isValid = await trigger('requirements')

    if (isValid && step < totalSteps) {
      setStep(step + 1)
    }
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

  const translateVenueType = (val: string) => {
    const key = `quoteModal.step3.venues.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const onSubmit = async (data: QuoteFormValues) => {
    setApiError(null)

    try {
      const guestCountMap: { [key: string]: number } = {
        'Less than 50': 50,
        '50 - 100': 75,
        '100 - 200': 150,
        '200 - 500': 350,
        '500+': 750,
      }

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        venueType: data.venueType,
        location: data.location,
        guestCount: data.guestCount || guestCountMap[data.guestCount || ''] || 50,
        requirements: data.requirements ? sanitizeTextarea(data.requirements) : '',
      }

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        closeModal()
        setStep(1)
        reset()
        alert(t('quoteModal.success'))
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        const errorMsg = errorData.error || `HTTP ${response.status}`
        setApiError(errorMsg)
        alert(`${t('quoteModalExtra.submissionFailed')} ${errorMsg}.`)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      setApiError(errorMsg)
      alert(`${t('quoteModalExtra.connectionError')}`)
    }
  }

  const onInvalid = (errors: FieldErrors<QuoteFormValues>) => {
    console.error("Quote form validation failed:", errors)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!watchedEventType
      case 2:
        return !!watchedGuestCount
      case 3:
        return !!watchedVenueType
      case 4:
        return !errors.requirements
      case 5:
        return (
          !!watchedName &&
          !!watchedEmail &&
          !!watchedPhone &&
          !!watchedLocation &&
          !errors.name &&
          !errors.email &&
          !errors.phone &&
          !errors.location
        )
      default:
        return false
    }
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full p-4 rounded-lg border-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-200',
      hasError
        ? 'border-red-500 focus:border-red-500'
        : 'border-border focus:border-primary'
    )

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
                  type="button"
                  key={type}
                  onClick={() => handleSelect('eventType', type)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all cursor-pointer',
                    watchedEventType === type
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  )}
                >
                  {translateEventType(type)}
                </button>
              ))}
            </div>
            <ErrorMessage message={errors.eventType?.message} />
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
                  type="button"
                  key={count}
                  onClick={() => handleSelect('guestCount', count)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all cursor-pointer',
                    watchedGuestCount === count
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  )}
                >
                  {translateGuestCount(count)}
                </button>
              ))}
            </div>
            <ErrorMessage message={errors.guestCount?.message} />
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
                  type="button"
                  key={venue}
                  onClick={() => handleSelect('venueType', venue)}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all cursor-pointer',
                    watchedVenueType === venue
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  )}
                >
                  {translateVenueType(venue)}
                </button>
              ))}
            </div>
            <ErrorMessage message={errors.venueType?.message} />
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step5.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step5.sub')}</p>
            </div>
            <div>
              <textarea
                {...register('requirements')}
                placeholder={t('quoteModal.step5.placeholder')}
                aria-invalid={errors.requirements ? 'true' : 'false'}
                aria-describedby={errors.requirements ? 'requirements-error' : undefined}
                className="w-full h-40 p-4 rounded-lg border-2 border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
              />
              <ErrorMessage id="requirements-error" message={errors.requirements?.message} />
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                {t('quoteModal.step6.heading')}
              </h3>
              <p className="text-muted-foreground">{t('quoteModal.step6.sub')}</p>
            </div>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register('name')}
                  placeholder={t('quoteModal.step6.name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass(!!errors.name)}
                />
                <ErrorMessage id="name-error" message={errors.name?.message} />
              </div>
              <div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder={t('quoteModal.step6.email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass(!!errors.email)}
                />
                <ErrorMessage id="email-error" message={errors.email?.message} />
              </div>
              <div>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder={t('quoteModal.step6.phone')}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={inputClass(!!errors.phone)}
                />
                <ErrorMessage id="phone-error" message={errors.phone?.message} />
              </div>
              <div>
                <input
                  type="text"
                  {...register('location')}
                  placeholder={t('quoteModal.step6.locationPlaceholder')}
                  aria-invalid={errors.location ? 'true' : 'false'}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                  className={inputClass(!!errors.location)}
                />
                <ErrorMessage id="location-error" message={errors.location?.message} />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/50 space-y-2">
              <h4 className="font-semibold text-foreground mb-3">{t('quoteModal.step6.summaryTitle')}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">{t('quoteModal.step6.eventType')}</span>
                <span className="text-foreground">{translateEventType(watchedEventType)}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.guestCount')}</span>
                <span className="text-foreground">{translateGuestCount(watchedGuestCount !== undefined ? String(watchedGuestCount) : '')}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.venue')}</span>
                <span className="text-foreground">{translateVenueType(watchedVenueType || '')}</span>
                <span className="text-muted-foreground">{t('quoteModal.step6.location') || 'Event Location:'}</span>
                <span className="text-foreground">{watchedLocation || '—'}</span>
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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl border border-border"
          >
            {/* Header */}
            <div className="shrink-0 bg-card border-b border-border p-6 flex items-center justify-between">
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

            {/* Content / Dedicated Scroll Container */}
            <form
              id="quote-form"
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              ref={scrollContainerRef}
              data-lenis-prevent
              tabIndex={0}
              className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-6 touch-pan-y pointer-events-auto focus:outline-none"
            >
              {apiError && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700">
                  <p className="text-sm font-medium">{apiError}</p>
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
            </form>

            {/* Footer */}
            <div className="shrink-0 bg-card border-t border-border p-6 flex justify-between">
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
                  type="submit"
                  form="quote-form"
                  disabled={!canProceed() || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-gold-light gap-2 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('quoteModal.submitting')}
                    </>
                  ) : (
                    <>
                      {t('quoteModal.submit')}
                      <Check size={18} />
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
