'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import Link from 'next/link'

export function Hero() {
  const { openModal } = useQuoteModal()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/35 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
    backgroundImage: `url('https://i.pinimg.com/1200x/7d/41/90/7d4190744201d3773e563feff30d64cf.jpg')`,
  }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto pt-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-white/90 font-semibold tracking-[0.3em] uppercase text-lg mb-8"
          >
            Luxury Event Management
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
  Creating Extraordinary Events{' '}
  <span className="text-gold-gradient">That Last Forever</span>
</h1>

<p className="text-lg text-slate-200 max-w-xl mx-auto mb-12 leading-relaxed">
  Luxury weddings, corporate events, destination celebrations, and unforgettable experiences
  crafted with elegance and precision.
</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={openModal}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold px-8 py-6 text-lg rounded-xl"
            >
              Get Free Quote
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-6 text-lg rounded-xl"
            >
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
