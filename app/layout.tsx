import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { QuoteModal } from '@/components/quote-modal'
import { AIConsultantWidget } from '@/components/ai-consultant/chat-widget'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'AS Events | Luxury Event Management',
  description: 'Creating extraordinary events that last forever. Luxury weddings, corporate events, destination celebrations, and unforgettable experiences.',
  keywords: ['event management', 'luxury weddings', 'corporate events', 'destination weddings', 'event planning'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
  lang="en"
  className={`${inter.variable} ${playfair.variable} bg-background`}
  data-scroll-behavior="smooth"
>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <QuoteModal />
        <AIConsultantWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
