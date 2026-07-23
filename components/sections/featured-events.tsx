'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const featuredEvents = [
  {
    id: 1,
    title: 'The Royal Garden Wedding',
    category: 'Wedding',
    slug: 'wedding',
    location: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Tech Summit 2024',
    category: 'Corporate',
    slug: 'corporate',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Maldives Destination Wedding',
    category: 'Destination',
    slug: 'destination',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Golden Anniversary Gala',
    category: 'Social',
    slug: 'social',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Luxury Brand Launch',
    category: 'Corporate',
    slug: 'corporate',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Enchanted Forest Reception',
    category: 'Wedding',
    slug: 'wedding',
    location: 'Vadodara',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
  },
]

export function FeaturedEvents() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4 text-balance">
              Featured <span className="text-gold-gradient">Events</span>
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:text-foreground hover:border-primary gap-2 w-fit transition-all duration-300 ease-out"
          >
            <Link href="/portfolio">
              View All Events
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/portfolio?category=${event.slug}`}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-gold-light w-full">
                      View Details
                    </Button>
                  </div>
                </div>
                <span className="text-primary text-sm font-medium">{event.category}</span>
                <h3 className="text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-sm">{event.location}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
