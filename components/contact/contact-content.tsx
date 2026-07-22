'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/src/hooks/useTranslation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validations/schemas'
import { ErrorMessage } from '@/components/ui/error-message'
import { sanitizeTextarea } from '@/lib/validations/sanitization'
import { cn } from '@/lib/utils'
import { z } from 'zod'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Celebration',
  'Anniversary',
  'Other',
]

const budgetRanges = [
  'Under ₹3,00,000',
  '₹3,00,000 - ₹8,00,000',
  '₹8,00,000 - ₹15,00,000',
  '₹15,00,000 - ₹30,00,000',
  '₹30,00,000+',
]

type ContactFormData = z.infer<typeof contactSchema>

export function ContactContent() {
  const { t } = useTranslation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      budget: '',
      subject: 'General Inquiry',
      message: '',
    },
  })

  const translateEventType = (val: string) => {
    const key = `quoteModal.step1.types.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const translateBudgetRange = (val: string) => {
    const key = `quoteModal.step4.ranges.${val}`
    const translated = t(key)
    return translated === key ? val : translated
  }

  const onSubmit = async (data: ContactFormData) => {
    try {
      const sanitizedMessage = sanitizeTextarea(data.message)

      // Submit quote request if type and date are provided
      if (data.eventType && data.eventDate) {
        const guestCount = sanitizedMessage.includes('guests')
          ? parseInt(sanitizedMessage.match(/\d+/)?.[0] || '50')
          : 50

        await fetch('/api/quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: data.eventType,
            city: 'TBD',
            guestCount,
            budget: data.budget,
            name: data.name,
            email: data.email,
            phone: data.phone,
            requirements: sanitizedMessage,
            eventDate: data.eventDate,
          }),
        })
      }

      // Submit contact form
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          subject: data.eventType || 'General Inquiry',
          message: sanitizedMessage,
        }),
      })

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Submission error:', error)
      alert(t('contactExtra.submissionFailed'))
    }
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-lg bg-card border text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors duration-200',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
        : 'border-border focus:border-primary focus:ring-1 focus:ring-primary/20'
    )

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              {t('contact.content.sendMessage')}
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-card border border-primary/30 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t('contact.content.successTitle')}
                </h3>
                <p className="text-muted-foreground">
                  {t('contact.content.successDesc')}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-primary text-primary-foreground hover:bg-gold-light"
                >
                  {t('contact.content.sendAnother')}
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={inputClass(!!errors.name)}
                      placeholder={t('contactExtra.placeholders.name')}
                    />
                    <ErrorMessage id="name-error" message={errors.name?.message} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClass(!!errors.email)}
                      placeholder={t('contactExtra.placeholders.email')}
                    />
                    <ErrorMessage id="email-error" message={errors.email?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={inputClass(!!errors.phone)}
                      placeholder={t('contactExtra.placeholders.phone')}
                    />
                    <ErrorMessage id="phone-error" message={errors.phone?.message} />
                  </div>
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.eventType')}
                    </label>
                    <select
                      id="eventType"
                      {...register('eventType')}
                      aria-invalid={errors.eventType ? 'true' : 'false'}
                      aria-describedby={errors.eventType ? 'eventType-error' : undefined}
                      className={inputClass(!!errors.eventType)}
                    >
                      <option value="">{t('contactExtra.selectType')}</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{translateEventType(type)}</option>
                      ))}
                    </select>
                    <ErrorMessage id="eventType-error" message={errors.eventType?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.eventDate')}
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      {...register('eventDate')}
                      aria-invalid={errors.eventDate ? 'true' : 'false'}
                      aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
                      className={inputClass(!!errors.eventDate)}
                    />
                    <ErrorMessage id="eventDate-error" message={errors.eventDate?.message} />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.content.budget')}
                    </label>
                    <select
                      id="budget"
                      {...register('budget')}
                      aria-invalid={errors.budget ? 'true' : 'false'}
                      aria-describedby={errors.budget ? 'budget-error' : undefined}
                      className={inputClass(!!errors.budget)}
                    >
                      <option value="">{t('contactExtra.selectBudget')}</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{translateBudgetRange(range)}</option>
                      ))}
                    </select>
                    <ErrorMessage id="budget-error" message={errors.budget?.message} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.content.message')}
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={5}
                    className={cn(inputClass(!!errors.message), 'resize-none')}
                    placeholder={t('contact.content.messagePlaceholder')}
                  />
                  <ErrorMessage id="message-error" message={errors.message?.message} />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-gold-light font-semibold py-6 text-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.content.sending')}
                    </>
                  ) : (
                    t('contact.content.send')
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                {t('contact.content.getInTouch')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('contact.content.description')}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-xl glass flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.content.visit')}</h3>
                  <a
                    href="https://maps.app.goo.gl/92BBaz8P4wzcxPMK9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {t('footer.address')}
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl glass flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.content.call')}</h3>
                  <a href="tel:+919510324143" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 95103 24143
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl glass flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.content.emailUs')}</h3>
                  <a href="mailto:as.eventmanagement2829@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    as.eventmanagement2829@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl glass flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.content.hours')}</h3>
                  <p className="text-muted-foreground">
                    {t('contactExtra.monFri')}<br />
                    {t('contactExtra.sat')}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/+919510324143"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              {t('contact.content.whatsapp')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
