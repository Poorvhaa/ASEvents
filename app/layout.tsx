import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Serif_Devanagari, Noto_Serif_Gujarati } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { QuoteModal } from '@/components/quote-modal'
import { AIChatWidget } from '@/components/ai/chat-widget'
import { LanguageProvider } from '@/src/context/LanguageContext'
import { WhatsAppButton } from '@/components/whatsapp-button'

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

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-devanagari',
  weight: ['400', '500', '600', '700'],
})

const notoGujarati = Noto_Serif_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-noto-gujarati',
  weight: ['400', '500', '600', '700'],
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
      className={`${inter.variable} ${playfair.variable} ${notoDevanagari.variable} ${notoGujarati.variable} bg-background`}
    >
      <body className="font-sans antialiased overflow-x-hidden min-w-0">
        <LanguageProvider defaultLanguage={lang as any}>
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
                email: 'as.eventmanagement2829@gmail.com',
                telephone: '+91-95103-24143',
              }),
            }}
          />
          <Navbar />
          <main className="min-w-0 overflow-x-hidden">{children}</main>
          <Footer />
          <QuoteModal />
          <AIChatWidget />
          {/*<WhatsAppButton />*/}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
