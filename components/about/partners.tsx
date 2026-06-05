'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'Four Seasons', logo: 'Four Seasons' },
  { name: 'Ritz Carlton', logo: 'Ritz Carlton' },
  { name: 'Mandarin Oriental', logo: 'Mandarin Oriental' },
  { name: 'St. Regis', logo: 'St. Regis' },
  { name: 'Peninsula', logo: 'Peninsula' },
  { name: 'Waldorf Astoria', logo: 'Waldorf Astoria' },
]

export function Partners() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Partners</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Trusted <span className="text-gold-gradient">Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We collaborate with the world&apos;s finest venues and service providers to deliver 
            exceptional experiences.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <span className="text-muted-foreground font-semibold text-center">{partner.logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
