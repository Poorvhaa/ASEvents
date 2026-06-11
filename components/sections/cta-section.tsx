'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

export function CTASection() {
  const { openModal } = useQuoteModal()
  const { t } = useTranslation()

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
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-eyebrow">{t('cta.getStarted')}</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            {t('cta.headingPart1')}{' '}
            <span className="text-gold-gradient">{t('cta.headingPart2')}</span>
          </h2>
          <p className="text-body text-muted-foreground mb-8 sm:mb-10">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
            <Button
              onClick={openModal}
              size="lg"
              className="min-h-11 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-blue-700 font-semibold px-8 text-base sm:text-lg"
            >
              {t('cta.bookConsultation')}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-11 w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 text-base sm:text-lg"
            >
              <Link href="/contact">{t('cta.contactUs')}</Link>
            </Button>
          </div>
        </motion.div>
      </SectionContainer>
    </Section>
  )
}
