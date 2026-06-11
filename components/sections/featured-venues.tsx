'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Star, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFeaturedVenues } from '@/hooks/use-venues'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

export function FeaturedVenues() {
  const { venues: featuredVenues, loading } = useFeaturedVenues()
  const { t } = useTranslation()

  return (
    <Section className="bg-background">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6"
        >
          <div className="text-center md:text-left">
            <span className="text-eyebrow">{t('featuredVenues.eyebrow')}</span>
            <h2 className="text-section-heading text-foreground mt-3 sm:mt-4">
              {t('featuredVenues.headingPart1')}{' '}
              <span className="text-gold-gradient">{t('featuredVenues.headingPart2')}</span>
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="min-h-11 border-primary/50 text-foreground hover:bg-primary/10 gap-2 w-full sm:w-fit mx-auto md:mx-0"
          >
            <Link href="/venues">
              {t('featuredVenues.viewAll')}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <Link href={`/venues/${venue.slug}`} className="block h-full">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                      <Star size={12} className="text-primary fill-primary" />
                      <span className="text-xs font-semibold">{venue.rating}</span>
                    </div>
                  </div>
                  <span className="text-primary text-xs sm:text-sm font-medium">{venue.category}</span>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-small">{venue.city}</span>
                  </div>
                  <p className="text-small font-semibold text-foreground mt-2">{venue.startingPrice}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </SectionContainer>
    </Section>
  )
}
