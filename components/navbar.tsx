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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { openModal } = useQuoteModal()

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

  const linkClass = cn(
    'text-sm font-semibold transition-colors duration-300 relative group',
    isScrolled
      ? 'text-foreground hover:text-primary'
      : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hover:text-blue-200'
  )

  const underlineClass = cn(
    'absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full',
    isScrolled ? 'bg-primary' : 'bg-blue-200'
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-sm border-b border-slate-200 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="AS Events"
              width={160}
              height={45}
              priority
              className="h-8 w-auto md:h-11 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            <Link href="/" className={linkClass}>
              Home
              <span className={underlineClass} />
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={cn(linkClass, 'flex items-center gap-1')}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', isServicesOpen && 'rotate-180')}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 py-2 bg-white rounded-xl shadow-lg border border-slate-200"
                  >
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-slate-50 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainNavLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
                <span className={underlineClass} />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button
                onClick={openModal}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-6 rounded-xl"
              >
                Get Free Quote
              </Button>
            </div>

            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-foreground hover:text-primary py-3 border-b border-slate-100"
              >
                Home
              </Link>

              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between text-base font-semibold text-foreground hover:text-primary py-3 border-b border-slate-100"
              >
                Services
                <ChevronDown
                  size={16}
                  className={cn('transition-transform', isMobileServicesOpen && 'rotate-180')}
                />
              </button>

              <AnimatePresence>
                {isMobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 flex flex-col gap-1 pb-2"
                  >
                    {servicesDropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsMobileServicesOpen(false)
                        }}
                        className="text-sm text-muted-foreground hover:text-primary py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {mainNavLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-primary py-3 border-b border-slate-100"
                >
                  {link.label}
                </Link>
              ))}

              <Button
                onClick={() => {
                  openModal()
                  setIsMobileMenuOpen(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl mt-4"
              >
                Get Free Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
