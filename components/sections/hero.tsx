'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import Link from 'next/link'
import { SectionContainer } from '@/components/layout/section-container'

export function Hero() {
  const { openModal } = useQuoteModal()

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/herobg.jpeg"
          alt="Luxury event celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/35 z-10" />
      </div>

      <SectionContainer className="relative z-20 text-center py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-white/90 font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base mb-6 sm:mb-8"
          >
            Luxury Event Management
          </motion.span>

          <h1 className="text-hero text-white mb-6 sm:mb-8 px-2">
            Creating Extraordinary Events{' '}
            <span className="text-gold-gradient">That Last Forever</span>
          </h1>

          <p className="text-body text-slate-200 max-w-xl mx-auto mb-8 sm:mb-12 px-2">
            Luxury weddings, corporate events, destination celebrations, and unforgettable experiences
            crafted with elegance and precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto px-2">
            <Button
              onClick={openModal}
              size="lg"
              className="min-h-11 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold px-8 text-base sm:text-lg rounded-xl"
            >
              Get Free Quote
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-11 w-full sm:w-auto border-white/80 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white px-8 text-base sm:text-lg rounded-xl backdrop-blur-sm"
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  )
}
