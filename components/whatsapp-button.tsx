'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/src/hooks/useTranslation'

export function WhatsAppButton() {
  const { t } = useTranslation()
  const [shouldRender, setShouldRender] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Show after 1.5 seconds delay
    const timer = setTimeout(() => setShouldRender(true), 1500)
    
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    
    return () => {
      clearTimeout(timer)
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  if (!shouldRender) return null

  const whatsappUrl = 'https://wa.me/919510324143?text=Hi%20AS%20Events%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20event%20planning%20services.'

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 50 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-40 group"
    >
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-950/95 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-800">
        {t('footer.whatsapp') || t('nav.dropdown.whatsapp') || 'Chat on WhatsApp'}
      </div>
      
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AS Events on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgb(37,211,102,0.6)] border-2 border-white hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 touch-target"
      >
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.774 9.774 0 0 0-6.976-2.855C6.18 1.985 1.758 6.356 1.754 11.787c-.001 1.685.454 3.327 1.32 4.773L2.095 20.39l4.552-1.236zM17.7 14.59c-.31-.156-1.84-.91-2.126-1.01-.287-.104-.496-.156-.705.157-.21.31-.81.102-.99.15-.224-.135-.386-.298-.445-.4-.055-.098-.004-.15.044-.197.045-.042.1-.115.15-.174.05-.06.067-.1.1-.167.034-.066.017-.125-.008-.175-.025-.05-.207-.5-.285-.687-.076-.182-.153-.158-.21-.162-.054-.002-.116-.003-.177-.003a.343.343 0 0 0-.25.116c-.084.1-.324.318-.324.776 0 .458.333.9.38.963.046.063.654.997 1.584 1.4 1.13.488 1.637.391 1.93.363.31-.03.997-.407 1.138-.801.14-.393.14-.73.097-.8-.041-.07-.166-.112-.476-.268z" />
        </svg>
      </a>
    </motion.div>
  )
}
