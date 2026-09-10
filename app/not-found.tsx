import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="text-primary font-medium tracking-widest uppercase text-sm">404</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-4 mb-6">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for could not be found.
        </p>
        <Button asChild>
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </section>
  )
}
