'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { SectionContainer } from '@/components/layout/section-container'
import Image from 'next/image'
import { useTranslation } from '@/src/hooks/useTranslation'

const services = [
  { href: '/services', label: 'Wedding Planning', key: 'services.wedding.title' },
  { href: '/services', label: 'Destination Weddings', key: 'services.destination.title' },
  { href: '/services', label: 'Corporate Events', key: 'services.corporate.title' },
  { href: '/packages', label: 'Event Packages', key: 'nav.packages' },
  { href: '/venues', label: 'Venue Booking', key: 'nav.venues' },
  { href: '/portfolio', label: 'Our Portfolio', key: 'nav.portfolio' },
]

const quickLinks = [
  { href: '/about', label: 'About Us', key: 'nav.about' },
  { href: '/services', label: 'Services', key: 'nav.services' },
  { href: '/portfolio', label: 'Portfolio', key: 'nav.portfolio' },
  { href: '/venues', label: 'Venues', key: 'nav.venues' },
  { href: '/packages', label: 'Packages', key: 'nav.packages' },
  { href: '/contact', label: 'Contact', key: 'nav.contact' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/as.event.management?igsh=MXdmeXljYm9rMWNyeA==', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-50 border-t border-border overflow-hidden">
      <SectionContainer className="py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-4">
              <Image
                src="/clean.png"
                alt="AS Events"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-small leading-relaxed mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="touch-target w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">{t('footer.ourServices')}</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground text-small hover:text-primary transition-colors"
                  >
                    {t(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-small hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/92BBaz8P4wzcxPMK9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-small hover:text-primary transition-colors text-left"
                >
                  {t('footer.address')}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+919510324143" className="text-muted-foreground text-small hover:text-primary transition-colors">
                  +91 95103 24143
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start break-all sm:break-normal">
                <Mail size={20} className="text-primary shrink-0" />
                <a href="mailto:as.eventmanagement2829@gmail.com" className="text-muted-foreground text-small hover:text-primary transition-colors">
                  as.eventmanagement2829@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AS Events. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors min-h-11 inline-flex items-center">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors min-h-11 inline-flex items-center">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  )
}
