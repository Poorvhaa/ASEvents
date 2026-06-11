'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/src/hooks/useTranslation'

export function ContactHero() {
  const { t } = useTranslation()

  return (
    <section className="relative pt-32 pb-20 bg-slate-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            {t('contact.hero.eyebrow')}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            {t('contact.hero.titlePart1')}{' '}
            <span className="text-gold-gradient">{t('contact.hero.titlePart2')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            {t('contact.hero.description')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
