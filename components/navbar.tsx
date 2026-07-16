'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
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
    //case 'Product Launches': return 'nav.dropdown.products'
    //case 'Exhibitions': return 'nav.dropdown.exhibitions'
    case 'Birthday Celebrations': return 'nav.dropdown.birthdays'
    case 'Anniversary Events': return 'nav.dropdown.anniversaries'
    //case 'Entertainment Management': return 'nav.dropdown.entertainment'
    default: return 'nav.services'
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { t, language, setLanguage } = useTranslation()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const { openModal } = useQuoteModal()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const closeAllMenus = () => {
    setIsServicesOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }

  const handleServiceLinkClick = (
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const linkClass = cn(
  'text-sm xl:text-base font-semibold transition-colors duration-300 relative group whitespace-nowrap',
  isHomePage
    ? (
        isScrolled || isMobileMenuOpen
          ? 'text-slate-900 hover:text-primary'
          : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hover:text-blue-200'
      )
    : 'text-slate-900 hover:text-primary'
)

  const underlineClass = cn(
  'absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full',
  isHomePage && !isScrolled
    ? 'bg-blue-200'
    : 'bg-primary'
)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
  'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
  isHomePage
    ? (
        isScrolled || isMobileMenuOpen
          ? 'bg-white shadow-sm border-b border-slate-200 py-3'
          : 'bg-transparent py-2 sm:py-3'
      )
    : 'bg-white shadow-sm border-b border-slate-200 py-3'
)}
    >
      <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center min-h-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
          <Image
  src="/as.png"
  alt="AS Events"
  width={560}
  height={745}
  priority
  className={cn(
  'w-auto object-contain transition-all duration-300',
  isHomePage
    ? (
        isScrolled
          ? 'h-12'
          : 'h-16 sm:h-20'
      )
    : 'h-16 sm:h-20'
)}
/>
          </Link>

          {/* Desktop Navigation — centered */}
          <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 min-w-0">
            <Link href="/" className={linkClass}>
              {t('nav.home')}
              <span className={underlineClass} />
            </Link>

            <Link href="/about" className={linkClass}>
              {t('nav.about')}
              <span className={underlineClass} />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={cn(linkClass, 'flex items-center gap-1 touch-target')}
              >
                {t('nav.services')}
                <ChevronDown
                  size={14}
                  className={cn(
                    'transition-transform duration-200',
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 py-2 bg-white rounded-xl shadow-lg border border-slate-200 z-50"
                  >
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleServiceLinkClick(e, item.href)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-slate-50 hover:text-primary transition-colors"
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

          {/* CTA + Language Selector + Mobile Toggle */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/* Language Switcher Dropdown (Desktop) */}
            <div className="hidden lg:block relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  'flex items-center gap-1.5 touch-target px-3 py-2 rounded-lg border border-transparent transition-all font-semibold text-sm',
                  isHomePage && !isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
                aria-label={t('nav.selectLanguage')}
              >
                <Globe size={16} />
                <span className="uppercase">{language}</span>
                <ChevronDown size={12} className={cn('transition-transform duration-200', isLangOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 py-1 bg-white rounded-xl shadow-lg border border-slate-200 z-[60]"
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
                          'w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50',
                          language === lang.code ? 'text-primary font-semibold' : 'text-slate-700'
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:block">
              <Button
                onClick={openModal}
                className="min-h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-5 xl:px-6 rounded-xl"
              >
                {t('nav.getQuote')}
              </Button>
            </div>

            <button
              className={cn(
                'lg:hidden touch-target p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-white'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[57px] sm:top-[65px] bg-black/40 lg:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 top-[70px] w-[85%] max-w-[320px] bg-white border-l border-slate-200 shadow-2xl lg:hidden z-50 overflow-y-auto"
            >
              <div className="flex flex-col p-6 gap-1 min-h-full">
                {/* Language Selector (Mobile Drawer) */}
                <div className="py-4 border-b border-slate-100 flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Globe size={14} /> Language / भाषा / ભાષા
                  </span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'hi', label: 'हिन्दी' },
                      { code: 'gu', label: 'ગુજરાતી' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as Language)}
                        className={cn(
                          'py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all',
                          language === lang.code
                            ? 'bg-blue-50 border-primary text-primary shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary py-4 border-b border-slate-100"
                >
                  {t('nav.home')}
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary py-4 border-b border-slate-100"
                >
                  {t('nav.about')}
                </Link>

                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between text-base font-semibold text-foreground hover:text-primary py-4 border-b border-slate-100 w-full text-left"
                >
                  {t('nav.services')}
                  <ChevronDown
                    size={18}
                    className={cn(
                      'transition-transform',
                      isMobileServicesOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 overflow-hidden"
                    >
                      {servicesDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleServiceLinkClick(e, item.href)}
                          className="block py-3 text-sm text-slate-600 hover:text-primary"
                        >
                          {t(getServiceTranslationKey(item.label))}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {mainNavLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-semibold text-foreground hover:text-primary py-4 border-b border-slate-100"
                  >
                    {t(getNavLinkTranslationKey(link.label))}
                  </Link>
                ))}

                <Button
                  onClick={() => {
                    openModal()
                    setIsMobileMenuOpen(false)
                  }}
                  className="min-h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl mt-6 w-full"
                >
                  {t('nav.getQuote')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
