'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight, Star, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFeaturedVenues } from '@/hooks/use-venues'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'
import { cn } from '@/lib/utils'

// Separate subcomponent for each card to isolate mouse tracking state
function VenueCard({ venue, index }: { venue: any; index: number }) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for coordinates
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  
  // Map mouse coordinates to 3D rotation angles
  const rotateX = useTransform(y, [0, 1], [8, -8])
  const rotateY = useTransform(x, [0, 1], [-8, 8])
  
  // Check prefers-reduced-motion to disable 3D tilt if needed
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <Link href={`/venues/${venue.slug}`} className="block h-full">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={prefersReducedMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900 border border-border/10 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out">
            <Image
              src={venue.image}
              alt={t(`venues.${venue.slug}.name`) || venue.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Luxury gradients overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 z-10 transition-opacity duration-300 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-[#C5A880]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-foreground shadow-sm">
            <Star size={12} className="text-[#C5A880] fill-[#C5A880]" />
            <span className="text-[10px] font-bold">{venue.rating}</span>
          </div>

          {/* Card Content Wrapper (transformZ for depth) */}
          <div 
            style={{ transform: 'translateZ(40px)' }}
            className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white"
          >
            {/* Category */}
            <span className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1 block">
              {t(`venuesPage.categories.${venue.category}`) || venue.category}
            </span>
            
            {/* Title */}
            <h3 className="text-xl font-serif font-bold leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
              {t(`venues.${venue.slug}.name`) || venue.name}
            </h3>

            {/* City */}
            <div className="flex items-center gap-1 text-white/60 mb-3">
              <MapPin size={12} className="shrink-0" />
              <span className="text-xs">{t(`cities.${venue.city}`) || venue.city}</span>
            </div>

            {/* Price & Hover Affordance */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1 overflow-hidden">
              <p className="text-sm font-semibold text-white/90">{venue.startingPrice}</p>
              
              <div className="flex items-center gap-1 text-xs font-bold text-primary translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <span>View Details</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function FeaturedVenues() {
  const { venues: featuredVenues, loading } = useFeaturedVenues()
  const { t } = useTranslation()

  return (
    <section className="bg-background overflow-hidden">
      {/* 1. Decorative Infinite Repeating Marquee Divider */}
      <div 
        className="w-full overflow-hidden bg-background border-y border-border/20 py-4 sm:py-6 select-none pointer-events-none" 
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap min-w-full animate-marquee">
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-primary/10 tracking-[0.1em] uppercase mx-4">
            AS Events • Featured Venues • Elite Destinations • Exquisite Celebrations •
          </span>
          <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-primary/10 tracking-[0.1em] uppercase mx-4">
            AS Events • Featured Venues • Elite Destinations • Exquisite Celebrations •
          </span>
        </div>
      </div>

      <SectionContainer className="py-16 sm:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
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
            className="min-h-11 border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground hover:border-primary gap-2 w-full sm:w-fit mx-auto md:mx-0 rounded-xl transition-all duration-300 ease-out"
          >
            <Link href="/venues">
              {t('featuredVenues.viewAll')}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={28} />
          </div>
        ) : (
          /* Venues Grid with 3D card tilt layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredVenues.slice(0, 4).map((venue, index) => (
              <VenueCard key={venue.id} venue={venue} index={index} />
            ))}
          </div>
        )}
      </SectionContainer>
    </section>
  )
}
