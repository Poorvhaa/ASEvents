'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { buildProposalDocument } from '@/services/pdfService'
import { DownloadProposalButton } from '@/components/pdf/download-proposal-button'
import type { LeadPayload } from '@/lib/ai/types'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { cn } from '@/lib/utils'
import { z } from 'zod'

type LeadFormValues = z.infer<typeof leadSchema>

export function LeadForm() {
  const { t, language } = useTranslation()
  const { answers, recommendation } = useAIConsultant()
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      location: answers.location || '',
      eventType: answers.eventType || '',
      eventDate: answers.eventDate || '',
      guestCount: answers.guestCount || '',
      budget: answers.budget || '',
      venueType: answers.venueType || '',
      specialRequirements: answers.specialRequirements || '',
    },
  })

  const onSubmit = async (data: LeadFormValues) => {
    if (!recommendation) return
    setApiError('')

    const payload: LeadPayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      venueType: data.venueType || answers.venueType || '',
      location: data.location || answers.location || '',
      eventType: answers.eventType || data.eventType,
      eventDate: answers.eventDate,
      guestCount: answers.guestCount,
      budget: answers.budget,
      specialRequirements: answers.specialRequirements,
      aiRecommendation: recommendation,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const resData = await res.json()
        throw new Error(resData.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  // Get current form values to generate draft proposal document (for rendering download link after success)
  const currentValues = getValues()
  const proposalDoc =
    recommendation &&
    buildProposalDocument(
      {
        name: currentValues.name,
        phone: currentValues.phone,
        email: currentValues.email,
        venueType: currentValues.venueType || answers.venueType || '',
        location: currentValues.location || answers.location || '',
        eventType: answers.eventType,
        eventDate: answers.eventDate,
        guestCount: answers.guestCount,
        budget: answers.budget,
        specialRequirements: answers.specialRequirements,
      },
      recommendation,
      language
    )

  if (submitted) {
    return (
      <div className="p-4 border-t border-slate-200 bg-slate-50 text-center space-y-3">
        <p className="text-sm font-semibold text-foreground">{t('leadForm.successTitle')}</p>
        <p className="text-xs text-muted-foreground">{t('leadForm.successDesc')}</p>
        {proposalDoc && (
          <DownloadProposalButton
            document={proposalDoc}
            className="border-primary/50 text-primary w-full"
          />
        )}
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors duration-200 bg-white',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
        : 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20'
    )

  return (
    <div className="p-4 border-t border-slate-200 bg-slate-50">
      <h3 className="text-sm font-semibold text-foreground mb-1">{t('leadForm.title')}</h3>
      <p className="text-xs text-muted-foreground mb-4">{t('leadForm.desc')}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div>
          <input
            type="text"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder={t('leadForm.placeholders.name')}
            className={inputClass(!!errors.name)}
          />
          <ErrorMessage id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <input
            type="tel"
            {...register('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            placeholder={t('leadForm.placeholders.phone')}
            className={inputClass(!!errors.phone)}
          />
          <ErrorMessage id="phone-error" message={errors.phone?.message} />
        </div>

        <div>
          <input
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder={t('leadForm.placeholders.email')}
            className={inputClass(!!errors.email)}
          />
          <ErrorMessage id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <input
            type="text"
            {...register('location')}
            aria-invalid={errors.location ? 'true' : 'false'}
            aria-describedby={errors.location ? 'location-error' : undefined}
            placeholder={t('leadForm.placeholders.location') || t('quoteModal.step6.locationPlaceholder')}
            className={inputClass(!!errors.location)}
          />
          <ErrorMessage id="location-error" message={errors.location?.message} />
        </div>

        {apiError && <p className="text-xs text-red-500 font-medium">{apiError}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('leadForm.submitting')}
            </>
          ) : (
            t('leadForm.getProposal')
          )}
        </Button>
      </form>
    </div>
  )
}
