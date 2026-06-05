'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'

export function CTASection() {
  const { openModal } = useQuoteModal()

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Get Started</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Let&apos;s Create Your{' '}
            <span className="text-gold-gradient">Dream Event</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
            Ready to turn your vision into reality? Our team is here to make your next event 
            an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openModal}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-gold-light font-semibold px-8 py-6 text-lg"
            >
              Book Consultation
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
