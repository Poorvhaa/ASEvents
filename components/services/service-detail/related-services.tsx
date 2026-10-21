import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { RelatedServiceItem } from '@/lib/data/services-data'

interface RelatedServicesProps {
  services: RelatedServiceItem[]
}

export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <Section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-eyebrow">Explore More</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            Related Event Planning Services
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            Discover other specialized event management solutions offered by AS Event Management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-white border border-border/40 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B1325]/85 text-primary text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {service.badgeText}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>Explore {service.title}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
