'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Plane, Building2, Cake, Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

import en from '@/src/locales/en.json'
import hi from '@/src/locales/hi.json'
import gu from '@/src/locales/gu.json'

const localesData = { en, hi, gu }

const services = [
  {
    icon: Heart,
    slug: 'wedding',
    indexStr: '01',
  },
  {
    icon: Plane,
    slug: 'destination',
    indexStr: '02',
  },
  {
    icon: Building2,
    slug: 'corporate',
    indexStr: '03',
  },
  {
    icon: Cake,
    slug: 'birthdays',
    indexStr: '04',
  },
  {
    icon: Gift,
    slug: 'anniversaries',
    indexStr: '05',
  },
]

export function Services() {
  const { t, language } = useTranslation()
  const activeLocale = localesData[language as keyof typeof localesData] || en

  return (
    <Section className="bg-[#FAF8F5] py-20 sm:py-28 border-b border-border/30">
      <SectionContainer>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-24"
        >
          <span className="text-eyebrow">{t('services.eyebrow')}</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6 font-serif">
            {t('services.headingPart1')}{' '}
            <span className="text-gold-gradient">{t('services.headingPart2')}</span>
          </h2>
          <p className="text-body text-muted-foreground font-light">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {services.map((service, index) => {
            const IconComponent = service.icon
            // Safely fetch features list from JSON
            // @ts-ignore
            const rawFeatures = activeLocale.services?.[service.slug]?.features || en.services[service.slug]?.features || []
            const features: string[] = Array.isArray(rawFeatures) ? rawFeatures : []

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={cn(
                  "relative h-[360px] rounded-2xl bg-white border border-border/20 shadow-sm overflow-hidden group",
                  index === 4 && "lg:col-start-2" // Center the 5th item in the 3-column layout on desktop
                )}
              >
                {/* Standard Card Content */}
                <div className="p-8 h-full flex flex-col justify-between relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="font-serif font-bold text-4xl text-primary/10 tracking-tight select-none">
                        {service.indexStr}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground mb-4 font-serif group-hover:text-primary transition-colors duration-300">
                      {t(`services.${service.slug}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-small text-muted-foreground leading-relaxed font-light line-clamp-4">
                      {t(`services.${service.slug}.desc`)}
                    </p>
                  </div>

                  {/* "Hover to reveal" hint on bottom */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/60 group-hover:text-primary transition-colors duration-300 mt-4">
                    <span>{t('cta.getStarted') || 'Explore Details'}</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Overlay Panel containing features & CTA */}
                <div className="absolute inset-0 bg-[#0B1325]/98 text-white p-8 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-20">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-4 border-b border-white/10 pb-2">
                      Included Services
                    </span>
                    
                    <ul className="space-y-2.5">
                      {features.slice(0, 4).map((feat, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: fIdx * 0.05 }}
                          className="flex items-start gap-2.5 text-xs text-white/80"
                        >
                          <span className="text-primary mt-0.5">•</span>
                          <span className="leading-relaxed font-light">{feat}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/portfolio?category=${service.slug}`}
                    className="flex items-center justify-between w-full py-3 px-4 bg-primary text-foreground text-sm font-bold rounded-xl hover:bg-primary/90 transition-all duration-300"
                  >
                    <span>View Projects</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

// Utility class merger helper to ensure code builds correctly
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
