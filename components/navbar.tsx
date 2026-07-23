'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BrandLogo } from './shared/brand-logo'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Mail, Phone, MapPin, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { mainNavLinks, servicesDropdownItems } from '@/lib/nav-config'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { parseHashHref, scrollToHash } from '@/lib/scroll-to-hash'
import { useTranslation } from '@/src/hooks/useTranslation'
import { Language } from '@/src/context/LanguageContext'
import { ENABLE_CINEMATIC_INTRO } from '@/src/config/features'

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

const getFontClass = (lang: string, type: 'serif' | 'sans' = 'serif') => {
  if (type === 'serif') {
    if (lang === 'hi') return 'font-noto-devanagari'
    if (lang === 'gu') return 'font-noto-gujarati'
    return 'font-serif'
  }
  return 'font-sans'
}

const getContactLabel = (key: string, lang: string) => {
  const translations: Record<string, Record<string, string>> = {
    address: {
      en: 'Office Address',
      hi: 'कार्यालय का पता',
      gu: 'ઓફિસ સરનામું'
    },
    phone: {
      en: 'Direct Line',
      hi: 'सीधा संपर्क',
      gu: 'ડાયરેક્ટ લાઇન'
    },
    email: {
      en: 'Inquiries',
      hi: 'पूछताछ',
      gu: 'પૂછપરછ'
    }
  }
  return translations[key]?.[lang] || translations[key]?.['en'] || key
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

  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const { openModal } = useQuoteModal()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const [isIntroActive, setIsIntroActive] = useState(isHomePage && ENABLE_CINEMATIC_INTRO)

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

  // Lock body scroll, manage focus and dispatch custom events when overlay is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.dispatchEvent(new CustomEvent('menu-state', { detail: { isOpen: true } }))
      
      // Shift focus to the overlay
      setTimeout(() => {
        menuRef.current?.focus()
      }, 50)
    } else {
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('menu-state', { detail: { isOpen: false } }))
      
      // Return focus to trigger button
      hamburgerRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('menu-state', { detail: { isOpen: false } }))
    }
  }, [isMenuOpen])

  // Escape key event listener to close menu overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/as.event.management?igsh=MXdmeXljYm9rMWNyeA==',
      icon: Instagram
    }
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
          <Link
            href="/"
            onClick={closeAllMenus}
            aria-label="AS Events home"
            className={cn(
              "relative flex items-center shrink-0 transition-all duration-500 hover:opacity-90 focus-visible:outline-none pointer-events-auto js-navbar-fade-in",
              isIntroActive && "opacity-0 pointer-events-none"
            )}
          >
            <BrandLogo
              variant="navbar"
              isScrolled={isScrolled}
              isHomePage={isHomePage}
              priority
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
              ref={hamburgerRef}
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
            ref={menuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0B1325]/98 backdrop-blur-2xl z-50 overflow-y-auto overflow-x-hidden flex flex-col menu-overlay-scroll outline-none"
          >
            <div className="mx-auto flex flex-col justify-between w-full max-w-[1600px] min-h-dvh px-6 py-6 md:px-12 lg:px-16 lg:py-8 select-none">
              
              {/* Header section in overlay */}
              <div className="flex items-center justify-between w-full border-b border-white/10 pb-4 lg:pb-6 shrink-0">
                <Link href="/" onClick={closeAllMenus} className="focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
                  <BrandLogo
                    variant="light"
                    className="h-auto w-[100px] sm:w-[120px] md:w-[130px] lg:w-[155px] object-contain"
                  />
                </Link>
                
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Language Switcher inside overlay */}
                  <div className="flex items-center gap-1 border border-white/10 rounded-full p-1 bg-white/5">
                    {[
                      { code: 'en', label: 'EN' },
                      { code: 'hi', label: 'हि' },
                      { code: 'gu', label: 'ગુ' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as Language)}
                        className={cn(
                          'text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 touch-target min-h-8 min-w-8 md:min-h-9 md:min-w-9 flex items-center justify-center',
                          language === lang.code
                            ? 'bg-primary text-foreground font-bold shadow-sm'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        )}
                        aria-label={`Switch to ${lang.label}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="touch-target p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.2fr_0.9fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-start my-auto py-8 lg:py-10">
                
                {/* Column 1: Primary Navigation */}
                <motion.div
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-3 md:gap-4 lg:gap-5 justify-center"
                >
                  {[
                    { label: 'Home', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Services', href: '/services' },
                    { label: 'Packages', href: '/packages' },
                    { label: 'Portfolio', href: '/portfolio' },
                    { label: 'Contact', href: '/contact' }
                  ].map((link) => {
                    const translationKey = getNavLinkTranslationKey(link.label)
                    return (
                      <motion.div key={link.href} variants={menuItemVariants}>
                        <Link
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={cn(
                            "group relative flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 hover:text-[#C5A880] transition-all duration-300 hover:translate-x-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] rounded px-1 pt-1 pb-2 leading-[1.1]",
                            getFontClass(language, 'serif')
                          )}
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base md:text-lg text-primary select-none">
                            &#8212;
                          </span>
                          <span>{t(translationKey) || link.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Column 2: Services & Packages */}
                <div className="flex flex-col gap-8 md:gap-10">
                  {/* Services Group */}
                  <div>
                    <h4 className="text-[11px] font-bold tracking-widest text-[#C5A880] uppercase mb-4">
                      {t('nav.services')}
                    </h4>
                    <ul className="space-y-3">
                      {servicesDropdownItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="group flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-white/70 hover:text-[#C5A880] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded py-0.5 px-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                            <span className={getFontClass(language, 'sans')}>
                              {t(getServiceTranslationKey(item.label))}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Packages Group */}
                  <div>
                    <h4 className="text-[11px] font-bold tracking-widest text-[#C5A880] uppercase mb-4">
                      {t('nav.packages')}
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { id: 'complete-wedding', label: 'Complete Wedding Package', href: '/packages?category=weddings' },
                        { id: 'corporate-conference', label: 'Corporate Conference', href: '/packages?category=corporate' },
                        { id: 'birthday', label: 'Birthday Celebration', href: '/packages?category=social-events' },
                        { id: 'anniversary', label: 'Anniversary Celebration', href: '/packages?category=social-events' }
                      ].map((pkg) => (
                        <li key={pkg.id}>
                          <Link
                            href={pkg.href}
                            onClick={(e) => handleLinkClick(e, pkg.href)}
                            className="group flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-white/70 hover:text-[#C5A880] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded py-0.5 px-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                            <span className={getFontClass(language, 'sans')}>
                              {t(`packages.${pkg.id}.title`) || pkg.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Column 3: Contact panel */}
                <div className="flex flex-col gap-8 md:gap-10 md:col-span-2 lg:col-span-1 lg:pl-10 xl:pl-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
                  <div>
                    <h4 className="text-[11px] font-bold tracking-widest text-[#C5A880] uppercase mb-5">
                      {t('footer.contactUs')}
                    </h4>
                    
                    <ul className="space-y-5">
                      {/* Address */}
                      <li className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-white/5">
                          <MapPin size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold tracking-wider text-[#C5A880]/80 uppercase mb-1">
                            {getContactLabel('address', language)}
                          </span>
                          <a
                            href="https://maps.app.goo.gl/92BBaz8P4wzcxPMK9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-[#C5A880] text-sm leading-relaxed transition-colors block break-words"
                          >
                            {t('footer.address')}
                          </a>
                        </div>
                      </li>

                      {/* Phone */}
                      <li className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-white/5">
                          <Phone size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold tracking-wider text-[#C5A880]/80 uppercase mb-1">
                            {getContactLabel('phone', language)}
                          </span>
                          <a
                            href="tel:+919510324143"
                            className="text-white/80 hover:text-[#C5A880] text-base font-semibold transition-colors block"
                          >
                            +91 95103 24143
                          </a>
                        </div>
                      </li>

                      {/* Email */}
                      <li className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-white/5">
                          <Mail size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold tracking-wider text-[#C5A880]/80 uppercase mb-1">
                            {getContactLabel('email', language)}
                          </span>
                          <a
                            href="mailto:as.eventmanagement2829@gmail.com"
                            className="text-white/80 hover:text-[#C5A880] text-sm transition-colors block break-all leading-normal"
                          >
                            as.eventmanagement2829@gmail.com
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Actions & Social */}
                  <div className="flex flex-col gap-5 mt-auto">
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false)
                        openModal()
                      }}
                      className="w-full min-h-11 bg-primary hover:bg-[#EADBC8] hover:text-[#0B1325] text-foreground font-semibold rounded-xl shadow-lg transition-all duration-300 active:scale-[0.98] border border-border/20 cursor-pointer"
                    >
                      {t('nav.getQuote')}
                    </Button>

                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          aria-label={social.name}
                          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-foreground hover:scale-105 transition-all duration-300 border border-white/5"
                        >
                          <social.icon size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer section in overlay */}
              <div className="w-full border-t border-white/10 pt-4 lg:pt-6 mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/40 shrink-0">
                <p>&copy; {new Date().getFullYear()} AS Events. All rights reserved.</p>
                <div className="flex gap-6">
                  <Link href="/privacy-policy" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">
                    {t('footer.privacy') || 'Privacy Policy'}
                  </Link>
                  <Link href="/terms-of-service" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">
                    {t('footer.terms') || 'Terms of Service'}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
