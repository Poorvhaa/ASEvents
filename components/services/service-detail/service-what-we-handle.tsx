import { Section, SectionContainer } from '@/components/layout/section-container'
import {
  MapPin,
  Palette,
  Users,
  Calendar,
  HeartHandshake,
  Clock,
  Compass,
  Hotel,
  Plane,
  Sparkles,
  ShieldCheck,
  Presentation,
  Megaphone,
  Trophy,
  Monitor,
  QrCode,
  Coffee,
  Music,
  UtensilsCrossed,
  Camera,
  Gift,
  Heart,
  Film,
  Check,
  LucideIcon,
} from 'lucide-react'
import { ServiceWhatWeHandleItem } from '@/lib/data/services-data'

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Palette,
  Users,
  Calendar,
  HeartHandshake,
  Clock,
  Compass,
  Hotel,
  Plane,
  Sparkles,
  ShieldCheck,
  Presentation,
  Megaphone,
  Trophy,
  Monitor,
  QrCode,
  Coffee,
  Music,
  UtensilsCrossed,
  Camera,
  Gift,
  Heart,
  Film,
}

interface ServiceWhatWeHandleProps {
  items: ServiceWhatWeHandleItem[]
}

export function ServiceWhatWeHandle({ items }: ServiceWhatWeHandleProps) {
  return (
    <Section id="offerings" className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-border/30">
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <span className="text-eyebrow">Comprehensive Scope</span>
          <h2 className="text-section-heading text-foreground mt-3 mb-4 font-serif">
            What We Handle For You
          </h2>
          <p className="text-body text-muted-foreground font-light leading-relaxed">
            Every critical element managed with disciplined attention to detail, so you never have to juggle vendors or worry about logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles
            return (
              <div
                key={index}
                className="group p-7 sm:p-8 rounded-2xl bg-white border border-border/40 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300 mb-6">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-border/30 pt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-3">
                    Key Highlights
                  </span>
                  <ul className="space-y-2">
                    {item.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80 font-light">
                        <Check size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}
