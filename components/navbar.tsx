'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BrandLogo } from './shared/brand-logo'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { mainNavLinks, servicesDropdownItems } from '@/lib/nav-config'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { parseHashHref, scrollToHash } from '@/lib/scroll-to-hash'
import { useTranslation } from '@/src/hooks/useTranslation'
import { Language } from '@/src/context/LanguageContext'

const getNavLinkTranslationKey = (label: string): string => {
  switch (label.toLowerCase()) {
    case 'home': return 'nav.home'
    case 'about': return 'nav.about'
    case 'packages': return 'nav.packages'
    case 'venues': return 'nav.venues'
    case 'portfolio': return 'nav.portfolio'
    case 'contact': return 'nav.contact'
    default: return `nav.${label.toLowerCase()}`
  }
}

const getServiceTranslationKey = (label: string): string => {
  switch (label) {
    case 'Wedding Planning': return 'nav.dropdown.wedding'
    case 'Destination Weddings': return 'nav.dropdown.destination'
    case 'Corporate Events': return 'nav.dropdown.corporate'
    case 'Birthday Celebrations': return 'nav.dropdown.birthdays'
    case 'Anniversary Events': return 'nav.dropdown.anniversaries'
    default: return 'nav.services'
  }
}

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { t, language, setLanguage } = useTranslation()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const { openModal } = useQuoteModal()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const [isIntroActive, setIsIntroActive] = useState(isHomePage)

  useEffect(() => {
    if (!isHomePage) {
      setIsIntroActive(false)
      return
    }

    // Check if the intro has already been completed/skipped previously
    if (typeof window !== 'undefined') {
      const introCompleted = (window as any).__introCompleted || !document.getElementById('intro-experience-container');
      if (introCompleted) {
        setIsIntroActive(false)
        return
      }
    }

    const handleIntroComplete = () => {
      setIsIntroActive(false)
      if (typeof window !== 'undefined') {
        (window as any).__introCompleted = true;
      }
    }

    window.addEventListener('intro-complete', handleIntroComplete)
    return () => {
      window.removeEventListener('intro-complete', handleIntroComplete)
    }
  }, [isHomePage])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  const closeAllMenus = () => {
    setIsServicesOpen(false)
    setIsMenuOpen(false)
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    closeAllMenus()

    const { path, hash } = parseHashHref(href)

    if (pathname === path && hash) {
      e.preventDefault()
      window.history.pushState(null, '', href)
      scrollToHash(hash)
      return
    }

    if (hash) {
      e.preventDefault()
      router.push(href)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const linkClass = cn(
    'text-sm font-semibold transition-colors duration-300 relative group whitespace-nowrap',
    isHomePage
      ? (
          isScrolled
            ? 'text-slate-900 hover:text-primary'
            : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:text-gold-light'
        )
      : 'text-slate-900 hover:text-primary'
  )

  const underlineClass = cn(
    'absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full',
    isHomePage && !isScrolled
      ? 'bg-gold-light'
      : 'bg-primary'
  )

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/as.event.management?igsh=MXdmeXljYm9rMWNyeA==', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  // Stagger configurations for fullscreen menu
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full py-3',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-2'
          : 'bg-transparent py-4',
        isIntroActive && 'pointer-events-none'
      )}
    >
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeAllMenus}
            aria-label="AS Events home"
            className="flex items-center shrink-0 py-2 transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none pointer-events-auto"
          >
            <BrandLogo
              variant="navbar"
              priority
              className={cn(
                "transition-all duration-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]",
                isScrolled
                  ? "h-12 sm:h-14"
                  : "h-14 sm:h-16 lg:h-[68px]"
              )}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className={cn(
            "hidden lg:flex items-center gap-6 xl:gap-8 js-navbar-fade-in pointer-events-auto",
            isIntroActive && "opacity-0 pointer-events-none"
          )}>
            <Link href="/" className={linkClass}>
              {t('nav.home')}
              <span className={underlineClass} />
            </Link>

            <Link href="/about" className={linkClass}>
              {t('nav.about')}
              <span className={underlineClass} />
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={cn(linkClass, 'flex items-center gap-1 py-1')}
              >
                {t('nav.services')}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-300',
                    isServicesOpen && 'rotate-180'
                  )}
                />
                <span className={underlineClass} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 py-2 bg-white rounded-xl shadow-lg border border-border z-50"
                  >
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {t(getServiceTranslationKey(item.label))}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainNavLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {t(getNavLinkTranslationKey(link.label))}
                <span className={underlineClass} />
              </Link>
            ))}
          </div>

          {/* Languages, CTA & Hamburger */}
          <div className={cn(
            "flex items-center gap-3 js-navbar-fade-in pointer-events-auto",
            isIntroActive && "opacity-0 pointer-events-none"
          )}>
            {/* Language Switcher (Desktop) */}
            <div className="hidden md:block relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-lg border border-transparent transition-all font-semibold text-xs uppercase',
                  isHomePage && !isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-foreground hover:bg-muted'
                )}
                aria-label={t('nav.selectLanguage')}
              >
                <Globe size={14} />
                <span>{language}</span>
                <ChevronDown size={10} className={cn('transition-transform duration-200', isLangOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 py-1 bg-white rounded-xl shadow-lg border border-border z-[60]"
                  >
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिन्दी' },
                      { code: 'gu', label: 'ગુજરાતી' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language)
                          setIsLangOpen(false)
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-xs transition-colors hover:bg-muted',
                          language === lang.code ? 'text-primary font-semibold' : 'text-foreground'
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              onClick={() => openModal()}
              className="hidden sm:inline-flex min-h-10 bg-primary hover:bg-primary/95 text-foreground border border-border font-semibold px-5 rounded-xl shadow-sm transition-all duration-300"
            >
              {t('nav.getQuote')}
            </Button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                'touch-target p-2 rounded-xl transition-all duration-300 focus-visible:outline-none',
                isScrolled
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]'
              )}
              aria-label="Open Navigation Overlay"
              aria-expanded={isMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Editorial Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0B1325]/98 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 sm:p-10 md:p-16 text-white overflow-y-auto"
          >
            {/* Header section in overlay */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto border-b border-white/10 pb-6">
              <BrandLogo
                variant="light"
                className="h-10 w-auto"
              />
              
              <div className="flex items-center gap-4">
                {/* Language Switcher inside overlay */}
                <div className="flex gap-2">
                  {[
                    { code: 'en', label: 'EN' },
                    { code: 'hi', label: 'हि' },
                    { code: 'gu', label: 'ગુ' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as Language)}
                      className={cn(
                        'text-xs font-semibold px-2 py-1 rounded transition-colors',
                        language === lang.code ? 'bg-primary text-foreground' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="touch-target p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Close Navigation Overlay"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 my-auto py-10">
              {/* Left Column: Stacked Links */}
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-4 md:gap-6 align-start"
              >
                <motion.div variants={menuItemVariants} className="overflow-hidden">
                  <Link
                    href="/"
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="text-4xl md:text-6xl font-serif font-bold text-white hover:text-primary transition-colors inline-block"
                  >
                    {t('nav.home')}
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants} className="overflow-hidden">
                  <Link
                    href="/about"
                    onClick={(e) => handleLinkClick(e, '/about')}
                    className="text-4xl md:text-6xl font-serif font-bold text-white hover:text-primary transition-colors inline-block"
                  >
                    {t('nav.about')}
                  </Link>
                </motion.div>

                {/* Expanded services listing inside overlay */}
                <motion.div variants={menuItemVariants} className="overflow-hidden">
                  <div className="text-sm font-semibold tracking-wider text-primary uppercase mb-2">
                    {t('nav.services')}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 pl-2">
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="text-lg md:text-xl font-medium text-white/80 hover:text-primary transition-colors"
                      >
                        • {t(getServiceTranslationKey(item.label))}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {mainNavLinks.slice(2).map((link) => (
                  <motion.div key={link.href} variants={menuItemVariants} className="overflow-hidden">
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-4xl md:text-6xl font-serif font-bold text-white hover:text-primary transition-colors inline-block"
                    >
                      {t(getNavLinkTranslationKey(link.label))}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Column: Contact info & metadata */}
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-16 gap-10"
              >
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                    {t('footer.contactUs')}
                  </h4>
                  
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                      <MapPin size={20} className="text-primary shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Office Address</span>
                        <a
                          href="https://maps.app.goo.gl/92BBaz8P4wzcxPMK9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-white text-sm sm:text-base leading-relaxed transition-colors block"
                        >
                          {t('footer.address')}
                        </a>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <Phone size={20} className="text-primary shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Direct Line</span>
                        <a
                          href="tel:+919510324143"
                          className="text-white/80 hover:text-white text-lg font-semibold transition-colors block"
                        >
                          +91 95103 24143
                        </a>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <Mail size={20} className="text-primary shrink-0 mt-1" />
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Inquiries</span>
                        <a
                          href="mailto:as.eventmanagement2829@gmail.com"
                          className="text-white/80 hover:text-white text-sm sm:text-base transition-colors block break-all"
                        >
                          as.eventmanagement2829@gmail.com
                        </a>
                        <a
                          href="mailto:as.eventmanagement2829@gmail.com"
                          className="text-white/50 hover:text-white text-xs transition-colors block break-all mt-1"
                        >
                          as.eventmanagement2829@gmail.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-6">
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false)
                      openModal()
                    }}
                    className="w-full min-h-12 bg-primary hover:bg-primary/95 text-foreground font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98]"
                  >
                    {t('nav.getQuote')}
                  </Button>

                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-foreground hover:scale-105 transition-all duration-300"
                      >
                        <social.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer section in overlay */}
            <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
              <p>&copy; {new Date().getFullYear()} AS Events. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
