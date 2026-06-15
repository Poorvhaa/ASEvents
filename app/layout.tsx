import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { QuoteModal } from '@/components/quote-modal'
import { AIChatWidget } from '@/components/ai/chat-widget'
import { LanguageProvider } from '@/src/context/LanguageContext'

import { cookies } from 'next/headers'
import { getTranslationServer } from '@/lib/i18n-server'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'
  return {
    title: getTranslationServer(lang, 'seo.default.title'),
    description: getTranslationServer(lang, 'seo.default.description'),
    keywords: ['event management', 'luxury weddings', 'corporate events', 'destination weddings', 'event planning'],
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('as-events-language')?.value || 'en'

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${playfair.variable} bg-background`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased overflow-x-hidden min-w-0">
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'EventPlanner',
                name: 'AS Events',
                url: 'https://asevents.in',
                description:
                  'Premium Indian event management — weddings, corporate events, destination celebrations.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Vadodara',
                  addressRegion: 'Gujarat',
                  addressCountry: 'IN',
                },
                email: 'sales@asevents.in',
                telephone: '+91-95103-24143',
              }),
            }}
          />
          <Navbar />
          <main className="min-w-0 overflow-x-hidden">{children}</main>
          <Footer />
          <QuoteModal />
          <AIChatWidget />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
