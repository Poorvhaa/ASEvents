/** Fixed navbar offset — matches scroll-mt-24 / scroll-padding-top */
export const NAVBAR_SCROLL_OFFSET = 96

let isScrolling = false

export function parseHashHref(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) {
    return { path: href, hash: '' }
  }
  return {
    path: href.slice(0, hashIndex) || '/',
    hash: href.slice(hashIndex),
  }
}

/**
 * Smooth-scroll to a hash target with navbar offset.
 * Retries until the element exists (handles async page/layout paint).
 */
export function scrollToHash(
  hash: string,
  options?: {
    offset?: number
    maxRetries?: number
    retryDelay?: number
    behavior?: ScrollBehavior
  }
): void {
  const id = hash.replace(/^#/, '')
  if (!id) return

  const offset = options?.offset ?? NAVBAR_SCROLL_OFFSET
  const maxRetries = options?.maxRetries ?? 30
  const retryDelay = options?.retryDelay ?? 80
  const behavior = options?.behavior ?? 'smooth'

  const performScroll = (attempt = 0) => {
    const el = document.getElementById(id)
    if (el) {
      if (isScrolling) return
      isScrolling = true

      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: Math.max(0, top), behavior })

      window.setTimeout(() => {
        isScrolling = false
      }, 600)
      return
    }

    if (attempt < maxRetries) {
      window.setTimeout(() => performScroll(attempt + 1), retryDelay)
    }
  }

  performScroll()
}
