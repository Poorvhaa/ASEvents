import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}

/** Standard page section with responsive vertical padding */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24 overflow-hidden', className)}>
      {children}
    </section>
  )
}

/** Centered max-width container — use inside every section */
export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <div className={cn('container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

/** Page hero top padding accounting for fixed navbar */
export function PageHero({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        'relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-slate-50 overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  )
}
