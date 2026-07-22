'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { venueCities } from '@/lib/data/venues'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { customPackageSchema } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { cn } from '@/lib/utils'
import { z } from 'zod'

const eventTypes = [
  'Wedding',
  'Engagement',
  'Corporate Event',
  'Birthday Celebration',
  'Festival Event',
  'Other',
]

const guestCounts = [
  'Less than 50',
  '50 - 100',
  '100 - 200',
  '200 - 500',
  '500 - 1000',
  '1000+',
]

const selectClass = (hasError: boolean) =>
  cn(
    'w-full min-h-11 px-4 py-3 rounded-xl bg-white border text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200',
    hasError
      ? 'border-red-500 focus:border-red-500'
      : 'border-slate-200 focus:border-primary'
  )

type CustomPackageValues = z.infer<typeof customPackageSchema>

export function CustomPackageBuilder() {
  const { openModal } = useQuoteModal()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomPackageValues>({
    resolver: zodResolver(customPackageSchema),
    mode: 'onTouched',
    defaultValues: {
      eventType: '',
      guestCount: '',
      location: '',
    },
  })

  const onSubmit = (data: CustomPackageValues) => {
    openModal({
      eventType: data.eventType || 'Custom Package',
      step: 2,
    })
  }

  return (
    <Section className="bg-slate-50 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <SectionContainer className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <span className="text-eyebrow">{t('packagesPage.builder.eyebrow')}</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            {t('packagesPage.builder.titlePart1')}{' '}
            <span className="text-gold-gradient">{t('packagesPage.builder.titlePart2')}</span>
          </h2>
          <p className="text-body text-muted-foreground">
            {t('packagesPage.builder.description')}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-3xl mx-auto p-5 sm:p-8 lg:p-10 rounded-2xl bg-white border border-slate-200 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="min-w-0">
              <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                {t('packagesPage.builder.eventType')}
              </label>
              <select
                id="eventType"
                {...register('eventType')}
                aria-invalid={errors.eventType ? 'true' : 'false'}
                aria-describedby={errors.eventType ? 'eventType-error' : undefined}
                className={selectClass(!!errors.eventType)}
              >
                <option value="">{t('packagesPage.builder.selectEventType')}</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(`packagesPage.builder.types.${type}`) || type}
                  </option>
                ))}
              </select>
              <ErrorMessage id="eventType-error" message={errors.eventType?.message} />
            </div>

            <div className="min-w-0">
              <label htmlFor="guestCount" className="block text-sm font-medium text-foreground mb-2">
                {t('packagesPage.builder.guestCount')}
              </label>
              <select
                id="guestCount"
                {...register('guestCount')}
                aria-invalid={errors.guestCount ? 'true' : 'false'}
                aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
                className={selectClass(!!errors.guestCount)}
              >
                <option value="">{t('packagesPage.builder.selectGuestCount')}</option>
                {guestCounts.map((count) => (
                  <option key={count} value={count}>
                    {t(`packagesPage.builder.counts.${count}`) || count}
                  </option>
                ))}
              </select>
              <ErrorMessage id="guestCount-error" message={errors.guestCount?.message} />
            </div>

            <div className="min-w-0">
              <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                {t('packagesPage.builder.location')}
              </label>
              <select
                id="location"
                {...register('location')}
                aria-invalid={errors.location ? 'true' : 'false'}
                aria-describedby={errors.location ? 'location-error' : undefined}
                className={selectClass(!!errors.location)}
              >
                <option value="">{t('packagesPage.builder.selectLocation')}</option>
                {venueCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ErrorMessage id="location-error" message={errors.location?.message} />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="min-h-11 w-full mt-6 sm:mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base sm:text-lg"
          >
            {t('packagesPage.builder.button')}
          </Button>
        </motion.form>
      </SectionContainer>
    </Section>
  )
}
