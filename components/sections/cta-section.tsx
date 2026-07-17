'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const categories = [
  { label: 'Wedding', value: 'Wedding', key: 'quoteModal.step1.types.Wedding' },
  { label: 'Corporate Event', value: 'Corporate Event', key: 'quoteModal.step1.types.Corporate Event' },
  { label: 'Destination Wedding', value: 'Destination Event', key: 'quoteModal.step1.types.Destination Event' },
  { label: 'Anniversary', value: 'Anniversary', key: 'quoteModal.step1.types.Anniversary' },
  { label: 'Birthday Celebration', value: 'Birthday Celebration', key: 'quoteModal.step1.types.Birthday Celebration' },
  { label: 'Other', value: 'Other', key: 'quoteModal.step1.types.Other' },
]

export function CTASection() {
  const { openModal } = useQuoteModal()
  const { t } = useTranslation()

  const handleChipClick = (eventType: string) => {
    // Open modal prefilled with selected event type and move to step 2 (guest count)
    openModal({ eventType, step: 2 })
  }

  return (
    <Section className="bg-slate-50 relative py-20 sm:py-28 border-t border-border/20 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 sm:w-[480px] h-72 sm:h-[480px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-[480px] h-72 sm:h-[480px] bg-[#EADBC8]/30 rounded-full blur-3xl" />
      </div>

      <SectionContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Column: Copy + Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <span className="text-eyebrow flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-primary" />
              {t('cta.getStarted')}
            </span>
            
            <h2 className="text-section-heading text-foreground mt-3 mb-6 font-serif">
              {t('cta.headingPart1')}{' '}
              <span className="text-gold-gradient block sm:inline">{t('cta.headingPart2')}</span>
            </h2>
            
            <p className="text-body text-muted-foreground mb-8 font-light max-w-xl">
              {t('cta.description')}
            </p>

            {/* Direct Contact Details */}
            <div className="w-full max-w-md flex flex-col gap-5 border-t border-border/30 pt-8 mt-2">
              <a 
                href="tel:+919510324143" 
                className="flex items-center gap-4 group p-3.5 rounded-xl bg-white border border-border/10 hover:border-primary/20 hover:shadow-md transition-all duration-300 w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">Consultation Hotline</span>
                  <span className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">+91 95103 24143</span>
                </div>
              </a>

              <a 
                href="mailto:as.eventmanagement2829@gmail.com" 
                className="flex items-center gap-4 group p-3.5 rounded-xl bg-white border border-border/10 hover:border-primary/20 hover:shadow-md transition-all duration-300 w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="text-left truncate min-w-0">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">General Inquiries</span>
                  <span className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors block truncate">as.eventmanagement2829@gmail.com</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interaction Card (Prefill Chips) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 w-full max-w-lg mx-auto"
          >
            <div className="bg-white border border-border/20 shadow-xl rounded-3xl p-8 sm:p-10 relative">
              <span className="text-xs uppercase font-bold text-primary tracking-widest block mb-4 border-b border-border/10 pb-2">
                Quick Quote Builder
              </span>
              
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3 leading-snug">
                Select your event type to begin planning
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 font-light">
                Choose a category below to prefill our planner. We will walk you through capacity, budget, and dates.
              </p>

              {/* Category Chips Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((cat) => {
                  const translatedLabel = t(cat.key) === cat.key ? cat.label : t(cat.key)
                  return (
                    <button
                      key={cat.value}
                      onClick={() => handleChipClick(cat.value)}
                      className="py-3 px-3.5 text-center text-xs sm:text-sm font-semibold rounded-xl border border-border/20 bg-muted/30 text-foreground hover:bg-primary hover:text-foreground hover:border-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm"
                    >
                      {translatedLabel}
                    </button>
                  )
                })}
              </div>

              {/* Alternative General CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <Button
                  onClick={() => openModal()}
                  className="flex-1 min-h-11 bg-primary text-foreground font-bold hover:bg-primary/90 rounded-xl"
                >
                  Start Custom Quote
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 min-h-11 border-primary/50 text-foreground hover:bg-primary/10 rounded-xl"
                >
                  <Link href="/contact" className="flex items-center justify-center gap-1.5">
                    <span>Contact Us</span>
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </Section>
  )
}
