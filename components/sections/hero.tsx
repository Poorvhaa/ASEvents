'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import Link from 'next/link'
import { SectionContainer } from '@/components/layout/section-container'
import { useTranslation } from '@/src/hooks/useTranslation'

import en from '@/src/locales/en.json'
import hi from '@/src/locales/hi.json'
import gu from '@/src/locales/gu.json'

// Dynamically import ThreeJS Canvas to prevent hydration failures / SSR errors
const HeroScene = dynamic(() => import('@/components/three/hero-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-black/20" />,
})

export function Hero() {
  const { openModal } = useQuoteModal()
  const { t } = useTranslation()
  const [taglineIndex, setTaglineIndex] = useState(0)

  const taglines = [
    en.hero.subtitle,
    hi.hero.subtitle,
    gu.hero.subtitle,
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [taglines.length])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050B14]">
      {/* 2D Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/herobg.jpeg"
          alt="Luxury event celebration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />
        {/* Navy/Dark vignette overlay for editorial contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-[#050B14]/85 z-10" />
      </div>

      {/* Hero Content Container */}
      <SectionContainer className="relative z-20 text-center py-24 sm:py-32 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animated cycling greeting subtitle */}
          <div className="h-8 overflow-hidden mb-6 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-primary font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm md:text-base text-gold-gradient"
              >
                {taglines[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="text-hero text-white mb-6 sm:mb-8 px-2 font-serif tracking-tight leading-tight">
            {t('hero.titlePart1')}{' '}
            <span className="text-gold-gradient block sm:inline">{t('hero.titlePart2')}</span>
          </h1>

          <p className="text-body text-slate-200 max-w-xl mx-auto mb-8 sm:mb-12 px-4 leading-relaxed font-sans font-light">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto px-4">
            <Button
              onClick={() => openModal()}
              size="lg"
              className="min-h-12 w-full sm:w-auto bg-primary text-foreground hover:bg-primary/90 font-bold px-8 text-base sm:text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-102 active:scale-98"
            >
              {t('hero.getQuote')}
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-12 w-full sm:w-auto border-white/40 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white px-8 text-base sm:text-lg rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-102 active:scale-98"
            >
              <Link href="/portfolio">{t('hero.viewPortfolio')}</Link>
            </Button>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  )
}
