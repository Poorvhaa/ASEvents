'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'

const services = [
  {
    id: 1,
    title: 'Wedding Planning',
    description: 'Transform your wedding dreams into a breathtaking reality. Our expert planners handle every detail, from venue selection to the final farewell, ensuring your special day is nothing short of magical.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Venue scouting and selection',
      'Theme development and design',
      'Vendor coordination and management',
      'Budget planning and tracking',
      'Day-of coordination',
      'Guest management',
    ],
  },
  {
    id: 2,
    title: 'Destination Weddings',
    description: 'Say "I do" in paradise. We specialize in creating unforgettable destination weddings at exotic locations worldwide, handling all logistics so you can focus on your love story.',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Global destination expertise',
      'Travel and accommodation coordination',
      'Local vendor partnerships',
      'Legal documentation assistance',
      'Multi-day event planning',
      'Guest concierge services',
    ],
  },
  {
    id: 3,
    title: 'Corporate Events',
    description: 'Elevate your corporate image with professionally executed events. From product launches to annual galas, we create impactful experiences that strengthen your brand.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Conference and summit planning',
      'Team building events',
      'Award ceremonies',
      'Networking events',
      'Brand activation',
      'Audio-visual production',
    ],
  },
  {
    id: 4,
    title: 'Product Launches',
    description: 'Make your product debut unforgettable. We create buzz-worthy launch events that captivate media, influencers, and your target audience.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Creative concept development',
      'Media and PR coordination',
      'Influencer management',
      'Brand experience design',
      'Live streaming capabilities',
      'Post-event analytics',
    ],
  },
  {
    id: 5,
    title: 'Exhibitions & Trade Shows',
    description: 'Stand out at exhibitions and trade shows with stunning booth designs and seamless execution that attracts visitors and generates leads.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Booth design and fabrication',
      'Interactive displays',
      'Staff training and management',
      'Lead capture systems',
      'Logistics and shipping',
      'Setup and teardown',
    ],
  },
  {
    id: 6,
    title: 'Birthday & Milestone Celebrations',
    description: 'Celebrate life&apos;s special moments in style. From sweet sixteens to golden anniversaries, we create personalized celebrations that reflect your story.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Custom theme design',
      'Entertainment booking',
      'Catering coordination',
      'Photography and videography',
      'Invitations and RSVP management',
      'Party favors and gifts',
    ],
  },
  {
    id: 7,
    title: 'Anniversary Events',
    description: 'Honor your journey together with an elegant anniversary celebration. We create intimate gatherings or grand parties that celebrate your enduring love.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Renewal of vows ceremonies',
      'Memory lane installations',
      'Custom video tributes',
      'Elegant dining experiences',
      'Live entertainment',
      'Guest coordination',
    ],
  },
  {
    id: 8,
    title: 'Entertainment Management',
    description: 'World-class entertainment for world-class events. We source and manage top-tier performers, from live bands to celebrity appearances.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Artist booking and management',
      'Sound and lighting production',
      'Stage design and setup',
      'Technical direction',
      'Hospitality riders',
      'Performance coordination',
    ],
  },
]

export function ServicesList() {
  const { openModal } = useQuoteModal()

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative Element */}
                <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-left-6' : '-right-6'} w-48 h-48 bg-primary/10 rounded-2xl -z-10`} />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-primary font-medium text-sm">0{service.id}</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
  onClick={() =>
    openModal({
      eventType: service.title,
      step: 2,
    })
  }
  className="bg-primary text-primary-foreground hover:bg-gold-light"
>
  Get Quote for {service.title}
</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
