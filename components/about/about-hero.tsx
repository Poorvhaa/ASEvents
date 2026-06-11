'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/src/hooks/useTranslation'

export function AboutHero() {
  const { t } = useTranslation()

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            {t('about.hero.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            {t('about.hero.titlePart1')}{' '}
            <span className="text-gold-gradient">{t('about.hero.titlePart2')}</span>{' '}
            {t('about.hero.titlePart3')}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {t('about.hero.description')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
