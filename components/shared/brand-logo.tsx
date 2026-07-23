import Image from 'next/image'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  variant?: 'navbar' | 'footer' | 'light' | 'gold' | 'monogram'
  isScrolled?: boolean
  isHomePage?: boolean
  className?: string
  priority?: boolean
}

export function BrandLogo({
  variant = 'navbar',
  isScrolled = false,
  isHomePage = false,
  className,
  priority = false,
}: BrandLogoProps) {
  if (variant === 'navbar') {
    // Transparent navbar state: on homepage and not scrolled
    const isTransparent = isHomePage && !isScrolled

    return (
      <div
        className={cn(
          'relative w-[96px] h-[60px] sm:w-[110px] sm:h-[68px] lg:w-[145px] lg:h-[88px] transition-all duration-300',
          className
        )}
      >
        {/* Light Logo (visible when transparent on homepage) */}
        <Image
          src="/as-event-logo-light.png"
          alt="AS Events Logo"
          fill
          priority={priority}
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 110px, 145px"
          className={cn(
            'object-contain transition-opacity duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]',
            isTransparent ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          aria-hidden={!isTransparent}
        />

        {/* Dark/Navbar Logo (visible when scrolled on homepage or on other pages) */}
        <Image
          src="/as-events-logo-navbar.png"
          alt="AS Events Logo"
          fill
          priority={priority}
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 110px, 145px"
          className={cn(
            'object-contain transition-opacity duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]',
            isTransparent ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
          aria-hidden={isTransparent}
        />
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div
        className={cn(
          'relative w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] lg:w-[150px] lg:h-[150px] transition-all duration-300',
          className
        )}
      >
        <Image
          src="/as-event-logo-light.png"
          alt="AS Events Logo"
          fill
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 130px, 150px"
          className="object-contain"
        />
      </div>
    )
  }

  const logoSrc = {
    navbar: '/as-events-logo-navbar.png',
    light: '/as-event-logo-light.png',
    gold: '/as-event-logo-gold.png',
    monogram: '/as-events-monogram-gold.png',
  }[variant]

  return (
    <Image
      src={logoSrc}
      alt="AS Events Logo"
      width={400}
      height={300}
      priority={priority}
      className={cn('w-auto object-contain', className)}
    />
  )
}
