'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function CompanyStory() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                alt="AS Events team planning"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
              A Legacy of <span className="text-gold-gradient">Excellence</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2014, AS Events began with a simple vision: to revolutionize the event 
                planning industry by combining creativity, precision, and unparalleled service.
              </p>
              <p>
                What started as a small team of passionate event enthusiasts has grown into one of 
                the most sought-after luxury event management companies.
              </p>
              <p>
                Our journey has been defined by our commitment to exceeding expectations. Every event 
                we create is a testament to our dedication to perfection and our clients&apos; unique 
                visions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
