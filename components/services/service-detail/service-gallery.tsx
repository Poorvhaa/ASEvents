import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionContainer } from '@/components/layout/section-container'
import { ServiceGalleryImage } from '@/lib/data/services-data'

interface ServiceGalleryProps {
  heading: string
  description: string
  images: ServiceGalleryImage[]
}

export function ServiceGallery({
  heading,
  description,
  images,
}: ServiceGalleryProps) {
  return (
    <Section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-border/30">
      <SectionContainer>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-eyebrow">Portfolio Spotlight</span>
            <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
              {heading}
            </h2>
            <p className="text-body text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="self-start md:self-end border-border/80 hover:bg-muted text-foreground font-semibold px-5 rounded-xl transition-all"
          >
            <Link href="/portfolio" className="inline-flex items-center gap-2">
              <span>View Complete Portfolio</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-muted shadow-sm border border-border/40"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">
                  {img.category}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold leading-snug">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
