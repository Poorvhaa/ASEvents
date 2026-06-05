'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Plane, 
  Building2, 
  Rocket, 
  LayoutGrid, 
  Cake, 
  Gift, 
  Music 
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Heart,
    title: 'Wedding Planning',
    slug: 'wedding',
    description: 'Exquisite wedding experiences tailored to your unique love story with meticulous attention to detail.',
  },
  {
    icon: Plane,
    title: 'Destination Weddings',
    slug: 'destination',
    description: 'Transform your dream location into the perfect wedding venue with our global expertise.',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    slug: 'corporate',
    description: 'Professional corporate gatherings that reflect your brand excellence and leave lasting impressions.',
  },
  {
    icon: Rocket,
    title: 'Product Launches',
    slug: 'product-launches',
    description: 'Create buzz-worthy product launch events that captivate audiences and drive engagement.',
  },
  {
    icon: LayoutGrid,
    title: 'Exhibitions',
    slug: 'exhibitions',
    description: 'Immersive exhibition experiences that showcase your vision with stunning visual impact.',
  },
  {
    icon: Cake,
    title: 'Birthday Celebrations',
    slug: 'birthdays',
    description: 'Unforgettable birthday parties from intimate gatherings to grand milestone celebrations.',
  },
  {
    icon: Gift,
    title: 'Anniversary Events',
    slug: 'anniversaries',
    description: 'Celebrate love milestones with elegant anniversary events that honor your journey.',
  },
  {
    icon: Music,
    title: 'Entertainment Management',
    slug: 'entertainment',
    description: 'World-class entertainment coordination featuring top performers and spectacular productions.',
  },
]

export function Services() {
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
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">
  What We Offer
</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Our Premium <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From intimate gatherings to grand celebrations, we bring your vision to life 
            with creativity, precision, and an unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
  href={`/portfolio?category=${service.slug}`}
  className="block group h-full"
>
                <div className="h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
