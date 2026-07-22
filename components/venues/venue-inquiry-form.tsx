'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { VenueAvailability } from '@/components/venues/venue-availability'
import type { Venue } from '@/lib/types/venues'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, guestCountInputSchema } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { sanitizeTextarea } from '@/lib/validations/sanitization'
import { cn } from '@/lib/utils'
import { z } from 'zod'

interface VenueInquiryFormProps {
  venue: Venue
}

export function VenueInquiryForm({ venue }: VenueInquiryFormProps) {
  const { t } = useTranslation()
  const maxGuests = parseInt(venue.capacity.replace(/\D/g, ''), 10) || 0
  const [dateAvailable, setDateAvailable] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')

  const localizedGuestsLabel = t('portfolioPage.grid.guestsLabel')
  const localizedCapacity = venue.capacity.replace(' Guests', ' ' + localizedGuestsLabel)

  // Dynamically extend bookingSchema to include venue capacity check with proper localization
  const formSchema = useMemo(() => {
    return bookingSchema.extend({
      customerName: bookingSchema.shape.customerName,
      guestCount: guestCountInputSchema.refine(
        (val) => {
          const num = typeof val === 'string' ? parseInt(val, 10) : val
          return maxGuests === 0 || num <= maxGuests
        },
        { message: `${t('venuesPage.inquiry.errorCapacity')} ${localizedCapacity}` }
      ),
    })
  }, [maxGuests, localizedCapacity, t])

  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      venueId: venue.id,
      eventDate: '',
      customerName: '',
      email: '',
      phone: '',
      guestCount: '' as any,
      message: '',
    },
  })

  const watchedEventDate = watch('eventDate')

  const onSubmit = async (data: FormValues) => {
    setApiError('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueId: data.venueId,
          eventDate: data.eventDate,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          guestCount: typeof data.guestCount === 'string' ? parseInt(data.guestCount, 10) : data.guestCount,
          message: data.message ? sanitizeTextarea(data.message) : undefined,
        }),
      })

      const responseData = await res.json()
      if (!res.ok) throw new Error(responseData.error || 'Booking failed')

      setSubmitted(true)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-green-800 font-medium">{t('venuesPage.inquiry.submitted')}</p>
        <p className="text-sm text-green-700 mt-2">
          {t('venuesPage.inquiry.contactShort')}
        </p>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors duration-200 bg-white',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
        : 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-foreground mb-1.5">
          {t('venuesPage.inquiry.fullName')}
        </label>
        <input
          id="customerName"
          type="text"
          {...register('customerName')}
          aria-invalid={errors.customerName ? 'true' : 'false'}
          aria-describedby={errors.customerName ? 'customerName-error' : undefined}
          className={inputClass(!!errors.customerName)}
          placeholder={t('venuesPage.inquiry.namePlaceholder')}
        />
        <ErrorMessage id="customerName-error" message={errors.customerName?.message} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          {t('venuesPage.inquiry.email')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass(!!errors.email)}
          placeholder={t('venuesPage.inquiry.emailPlaceholder')}
        />
        <ErrorMessage id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
          {t('venuesPage.inquiry.phone')}
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={inputClass(!!errors.phone)}
          placeholder={t('venuesPage.inquiry.phonePlaceholder')}
        />
        <ErrorMessage id="phone-error" message={errors.phone?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-foreground mb-1.5">
            {t('venuesPage.inquiry.eventDate')}
          </label>
          <input
            id="eventDate"
            type="date"
            {...register('eventDate')}
            aria-invalid={errors.eventDate ? 'true' : 'false'}
            aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass(!!errors.eventDate)}
          />
          <VenueAvailability
            venueId={venue.id}
            eventDate={watchedEventDate}
            onAvailabilityChange={setDateAvailable}
          />
          <ErrorMessage id="eventDate-error" message={errors.eventDate?.message} />
        </div>
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-foreground mb-1.5">
            {t('venuesPage.inquiry.guests')}
          </label>
          <input
            id="guestCount"
            type="number"
            {...register('guestCount')}
            aria-invalid={errors.guestCount ? 'true' : 'false'}
            aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
            className={inputClass(!!errors.guestCount)}
            placeholder={`${t('venuesPage.inquiry.guestsMax')} ${localizedCapacity}`}
          />
          <ErrorMessage id="guestCount-error" message={errors.guestCount?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          {t('venuesPage.inquiry.message')}
        </label>
        <textarea
          id="message"
          rows={3}
          {...register('message')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(inputClass(!!errors.message), 'resize-none')}
          placeholder={`${t('venuesPage.inquiry.messagePlaceholder')} ${t(`venues.${venue.slug}.name`) || venue.name}...`}
        />
        <ErrorMessage id="message-error" message={errors.message?.message} />
      </div>

      {apiError && <p className="text-sm text-red-500 font-medium">{apiError}</p>}

      <Button
        disabled={!dateAvailable || isSubmitting}
        type="submit"
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t('venuesPage.inquiry.submitting')}
          </>
        ) : (
          t('venuesPage.inquiry.requestButton')
        )}
      </Button>
    </form>
  )
}
