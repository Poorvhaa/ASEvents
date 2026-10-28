'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Vishva & Jay Rathore',
    roleKey: 'testimonials.items.wedding',
    rating: 5,
    reviewKey: 'testimonials.items.review1',
  },
  {
    id: 2,
    name: 'Vansh Joshi',
    roleKey: 'testimonials.items.corporate',
    rating: 5,
    reviewKey: 'testimonials.items.review2',
  },
  {
    id: 3,
    name: 'Meera Patel',
    roleKey: 'testimonials.items.birthday',
    rating: 5,
    reviewKey: 'testimonials.items.review3',
  },
  {
    id: 4,
    name: 'Yashvi & Nisarg Pandya',
    roleKey: 'testimonials.items.destination',
    rating: 5,
    reviewKey: 'testimonials.items.review4',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useTranslation()

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <Section className="bg-[#F5EFEB]/40 border-b border-border/20">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            {t('testimonials.headingPart1')}{' '}
            <span className="text-gold-gradient">{t('testimonials.headingPart2')}</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-6 sm:p-8 md:p-12 bg-white border border-border/30 shadow-luxury-sm min-h-[260px] sm:min-h-[220px] flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-primary/30 mb-4 sm:mb-6" />

              <p className="font-serif text-base sm:text-lg md:text-xl text-foreground italic leading-relaxed mb-6 sm:mb-8">
                {t(testimonials[currentIndex].reviewKey)}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-border/20 text-center sm:text-left">
                <div>
                  <p className="font-bold text-foreground text-base sm:text-lg">{testimonials[currentIndex].name}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{t(testimonials[currentIndex].roleKey)}</p>
                </div>
                <div className="flex gap-1 justify-center sm:justify-start self-center sm:self-auto" aria-label="5 out of 5 stars">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prev}
              className="touch-target w-11 h-11 rounded-full bg-white border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-luxury-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t('testimonials.prev')}
            >
              <ChevronLeft size={22} />
            </button>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="touch-target p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                  aria-label={t('testimonials.goTo').replace('{num}', (index + 1).toString())}
                  aria-selected={index === currentIndex}
                  role="tab"
                >
                  <span
                    className={cn(
                      'block h-2 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'w-6 bg-primary'
                        : 'w-2 bg-border hover:bg-primary/50'
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="touch-target w-11 h-11 rounded-full bg-white border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-luxury-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t('testimonials.next')}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}
