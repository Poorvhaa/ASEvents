'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'

interface ServiceHeroProps {
  eyebrow: string
  h1: string
  description: string
  quoteEventType: string
  image: {
    src: string
    alt: string
  }
}

export function ServiceHero({
  eyebrow,
  h1,
  description,
  quoteEventType,
  image,
}: ServiceHeroProps) {
  const { openModal } = useQuoteModal()

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFEB] to-[#FAF8F5] overflow-hidden border-b border-border/30">
      {/* Decorative luxury background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#EADBC8] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <span className="text-eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-5">
              <Sparkles size={13} className="text-primary shrink-0" />
              <span>{eyebrow}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground leading-[1.15] text-balance mb-5 sm:mb-6">
              {h1}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl font-light">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                onClick={() => openModal({ eventType: quoteEventType, step: 2 })}
                className="min-h-12 bg-primary hover:bg-gold-light text-foreground border border-border font-semibold px-6 sm:px-7 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                <span>Get Free Quote</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>

              <Button
                asChild
                variant="outline"
                className="min-h-12 border-border/80 hover:bg-muted text-foreground font-semibold px-6 rounded-xl transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                <Link href="#offerings" className="inline-flex items-center justify-center gap-2">
                  <span>Explore What We Handle</span>
                </Link>
              </Button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/40 w-full text-xs sm:text-sm text-foreground/80 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                <span>Vadodara & Gujarat Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                <span>Dedicated Event Director</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <PhoneCall size={16} className="text-primary shrink-0" />
                <a href="tel:+919510324143" className="hover:text-primary transition-colors">
                  Direct Line: +91 95103 24143
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/60">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative background accent */}
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-primary/20 rounded-3xl -z-10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
