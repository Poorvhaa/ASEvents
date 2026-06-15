'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const testimonials = [
  {
    id: 1,
    name: 'Vishva & Jay Rathore',
    roleKey: 'testimonials.items.wedding',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewKey: 'testimonials.items.review1',
  },
  {
    id: 2,
    name: 'Vansh Joshi',
    roleKey: 'testimonials.items.corporate',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewKey: 'testimonials.items.review2',
  },
  {
    id: 3,
    name: 'Sara Khan',
    roleKey: 'testimonials.items.birthday',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    reviewKey: 'testimonials.items.review3',
  },
  {
    id: 4,
    name: 'Yashvi & Nisarg Pandya',
    roleKey: 'testimonials.items.destination',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
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
    <Section className="bg-slate-50">
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
              className="rounded-2xl p-6 sm:p-8 md:p-12 bg-white border border-slate-200 shadow-sm"
            >
              <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-primary/30 mb-4 sm:mb-6" />

              <p className="text-body text-foreground mb-6 sm:mb-8">
                {t(testimonials[currentIndex].reviewKey)}
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonials[currentIndex].name}</h4>
                  <p className="text-muted-foreground text-small">{t(testimonials[currentIndex].roleKey)}</p>
                  <div className="flex gap-1 mt-1 justify-center sm:justify-start">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prev}
              className="touch-target w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={t('testimonials.prev')}
            >
              <ChevronLeft size={22} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`min-w-2 min-h-2 rounded-full transition-colors touch-target p-2 ${
                    index === currentIndex ? 'bg-primary' : 'bg-border'
                  }`}
                  aria-label={t('testimonials.goTo').replace('{num}', (index + 1).toString())}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="touch-target w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
