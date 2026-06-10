'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'
import { mainNavLinks, servicesDropdownItems } from '@/lib/nav-config'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { openModal } = useQuoteModal()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

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
        <nav className="grid grid-cols-[auto_1fr_auto] items-center min-h-[80px] gap-3 sm:gap-4 lg:gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
          <Image
  src="/clean.png"
  alt="AS Events"
  width={360}
  height={745}
  priority
  className={cn(
    'w-auto object-contain transition-all duration-300',

    isHomePage
      ? (
          isScrolled
            ? 'h-12 lg:h-14'
            : 'h-12 sm:h-14 md:h-18 lg:h-22'
        )
      : 'h-10 lg:h-12'
  )}
/>
          </Link>

          {/* Desktop Navigation — centered */}
          <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 min-w-0">
            <Link href="/" className={linkClass}>
  Home
  <span className={underlineClass} />
</Link>

<Link href="/about" className={linkClass}>
  About
  <span className={underlineClass} />
</Link>

<div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setIsServicesOpen(!isServicesOpen)}
    className={cn(linkClass, 'flex items-center gap-1 touch-target')}
  >
    Services
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
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 text-sm text-foreground hover:bg-slate-50 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainNavLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
                <span className={underlineClass} />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <Button
                onClick={openModal}
                className="min-h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-5 xl:px-6 rounded-xl"
              >
                Get Free Quote
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
              className="fixed inset-y-0 right-0 top-[57px] sm:top-[65px] w-full max-w-sm bg-white border-l border-slate-200 shadow-2xl lg:hidden z-50 overflow-y-auto"
            >
              <div className="flex flex-col p-6 gap-1 min-h-full pb-safe">
                <Link href="/">
  Home
</Link>

<Link
  href="/about"
  onClick={() => setIsMobileMenuOpen(false)}
  className="text-base font-semibold text-foreground hover:text-primary py-3.5 min-h-11 flex items-center border-b border-slate-100"
>
  About
</Link>

<button>
  Services
</button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-1 pb-2 overflow-hidden"
                    >
                      {servicesDropdownItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsMobileServicesOpen(false)
                          }}
                          className="text-sm text-muted-foreground hover:text-primary py-3 min-h-11 flex items-center"
                        >
                          {item.label}
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
                    className="text-base font-semibold text-foreground hover:text-primary py-3.5 min-h-11 flex items-center border-b border-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  onClick={() => {
                    openModal()
                    setIsMobileMenuOpen(false)
                  }}
                  className="min-h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl mt-6 w-full"
                >
                  Get Free Quote
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
