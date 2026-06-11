'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  Plane,
  Building2,
  Rocket,
  LayoutGrid,
  Cake,
  Gift,
  Music,
} from 'lucide-react'
import Link from 'next/link'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

const services = [
  {
    icon: Heart,
    title: 'Wedding Planning',
    slug: 'wedding',
    description: 'Exquisite wedding experiences tailored to your unique love story with meticulous attention to detail.',
  },
  {
    icon: Plane,
    title: 'Destination Weddings',
    slug: 'destination',
    description: 'Transform your dream location into the perfect wedding venue with our global expertise.',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    slug: 'corporate',
    description: 'Professional corporate gatherings that reflect your brand excellence and leave lasting impressions.',
  },
  {
    icon: Rocket,
    title: 'Product Launches',
    slug: 'product-launches',
    description: 'Create buzz-worthy product launch events that captivate audiences and drive engagement.',
  },
  {
    icon: LayoutGrid,
    title: 'Exhibitions',
    slug: 'exhibitions',
    description: 'Immersive exhibition experiences that showcase your vision with stunning visual impact.',
  },
  {
    icon: Cake,
    title: 'Birthday Celebrations',
    slug: 'birthdays',
    description: 'Unforgettable birthday parties from intimate gatherings to grand milestone celebrations.',
  },
  {
    icon: Gift,
    title: 'Anniversary Events',
    slug: 'anniversaries',
    description: 'Celebrate love milestones with elegant anniversary events that honor your journey.',
  },
  {
    icon: Music,
    title: 'Entertainment Management',
    slug: 'entertainment',
    description: 'World-class entertainment coordination featuring top performers and spectacular productions.',
  },
]

export function Services() {
  const { t } = useTranslation()

  return (
    <Section className="bg-background">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-eyebrow">{t('services.eyebrow')}</span>
          <h2 className="text-section-heading text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            {t('services.headingPart1')}{' '}
            <span className="text-gold-gradient">{t('services.headingPart2')}</span>
          </h2>
          <p className="text-body text-muted-foreground">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href={`/portfolio?category=${service.slug}`} className="block group h-full">
                <div className="h-full flex flex-col p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:border-blue-400 transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-blue-100 transition-all duration-300 shrink-0">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                    {t(`services.${service.slug}.title`)}
                  </h3>
                  <p className="text-small text-slate-600 leading-relaxed flex-1">
                    {t(`services.${service.slug}.desc`)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
