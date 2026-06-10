'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NAVBAR_SCROLL_OFFSET, scrollToHash } from '@/lib/scroll-to-hash'

/**
 * Scrolls to the URL hash when on a given path.
 * Handles initial load, client-side navigation, and hash changes.
 */
export function useHashScroll(
  pathPrefix = '/services',
  offset = NAVBAR_SCROLL_OFFSET
): void {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname.startsWith(pathPrefix)) return

    const scrollToCurrentHash = () => {
      const hash = window.location.hash
      if (!hash) return

      requestAnimationFrame(() => {
        scrollToHash(hash, { offset })
      })
    }

    scrollToCurrentHash()

    window.addEventListener('hashchange', scrollToCurrentHash)
    return () => window.removeEventListener('hashchange', scrollToCurrentHash)
  }, [pathname, pathPrefix, offset])
}
