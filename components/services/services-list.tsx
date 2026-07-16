'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { useTranslation } from '@/src/hooks/useTranslation'

const services = [
  {
    id: 1,
    slug: 'wedding-planning',
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
    slug: 'destination-weddings',
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
    slug: 'corporate-events',
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
    id: 6,
    slug: 'birthday-celebrations',
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
    slug: 'anniversary-events',
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
  /*{
    id: 8,
    slug: 'entertainment-management',
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
  },*/
]

export function ServicesList() {
  const { openModal } = useQuoteModal()
  const { t } = useTranslation()

  const getLocaleSlug = (slug: string): string => {
    switch (slug) {
      case 'wedding-planning': return 'wedding'
      case 'destination-weddings': return 'destination'
      case 'corporate-events': return 'corporate'
      case 'birthday-celebrations': return 'birthdays'
      case 'anniversary-events': return 'anniversaries'
      case 'entertainment-management': return 'entertainment'
      default: return slug
    }
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-24">
          {services.map((service, index) => {
            const localeSlug = getLocaleSlug(service.slug)
            return (
              <motion.div
                id={service.slug}
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={t(`services.${localeSlug}.title`)}
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
                    {t(`services.${localeSlug}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t(`services.${localeSlug}.desc`)}
                  </p>

                  {/* Features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, fIndex) => {
                      const featureKey = `services.${localeSlug}.features.${fIndex}`
                      const translatedFeature = t(featureKey)
                      return (
                        <li key={feature} className="flex items-center gap-2 text-foreground">
                          <Check className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm">
                            {translatedFeature === featureKey ? feature : translatedFeature}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  <Button
                    onClick={() =>
                      openModal({
                        eventType: t(`services.${localeSlug}.title`),
                        step: 2,
                      })
                    }
                    className="bg-primary text-primary-foreground hover:bg-gold-light"
                  >
                    {t('servicesPage.getQuoteFor')} {t(`services.${localeSlug}.title`)}
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
