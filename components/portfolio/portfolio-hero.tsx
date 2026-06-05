'use client'

import { motion } from 'framer-motion'

export function PortfolioHero() {
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
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Our <span className="text-gold-gradient">Work</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Browse our portfolio of extraordinary events and stunning gallery photography.
            Each project represents our commitment to excellence and attention to detail.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
