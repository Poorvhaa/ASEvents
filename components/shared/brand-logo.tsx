import Image from 'next/image'
import { cn } from '@/lib/utils'

type BrandLogoProps = {
  variant?: 'navbar' | 'light' | 'gold' | 'monogram'
  className?: string
  priority?: boolean
}

export function BrandLogo({ variant = 'navbar', className, priority = false }: BrandLogoProps) {
  const logoSrc = {
    navbar: '/as-events-logo-navbar.png',
    light: '/as-events-logo-light.png',
    gold: '/as-events-logo-gold.png',
    monogram: '/as-events-monogram-gold.png',
  }[variant]

  return (
    <Image
      src={logoSrc}
      alt="AS Events Logo"
      width={400}
      height={300}
      priority={priority}
      sizes={
        variant === 'navbar'
          ? '(max-width: 640px) 72px, (max-width: 1024px) 88px, 104px'
          : undefined
      }
      className={cn('w-auto object-contain', className)}
    />
  )
}
