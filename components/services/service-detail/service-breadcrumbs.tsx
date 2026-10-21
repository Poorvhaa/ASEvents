import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface ServiceBreadcrumbsProps {
  serviceName: string
}

export function ServiceBreadcrumbs({ serviceName }: ServiceBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full py-4 text-xs sm:text-sm text-muted-foreground border-b border-border/40 bg-white/50 backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              <Home size={14} className="text-muted-foreground" />
              <span>Home</span>
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/50">
            <ChevronRight size={14} />
          </li>
          <li className="inline-flex items-center">
            <Link
              href="/services"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              Services
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/50">
            <ChevronRight size={14} />
          </li>
          <li className="inline-flex items-center">
            <span
              className="text-foreground font-semibold truncate max-w-[220px] sm:max-w-none"
              aria-current="page"
            >
              {serviceName}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  )
}
