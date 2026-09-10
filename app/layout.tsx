import Script from 'next/script'
import { GlobalStructuredData } from '@/components/structured-data'
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
    metadataBase: new URL('https://www.aseventmanagement.com'),
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
    openGraph: {
      title: getTranslationServer(lang, 'seo.default.title'),
      description: getTranslationServer(lang, 'seo.default.description'),
      siteName: 'AS Events',
      locale: lang === 'hi' ? 'hi_IN' : lang === 'gu' ? 'gu_IN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: getTranslationServer(lang, 'seo.default.title'),
      description: getTranslationServer(lang, 'seo.default.description'),
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
      <head>
        <meta name="google-site-verification" content="r_3c8kVeDtn1diqQw1oIrSRDRJZ_lxk7aKdjWz1HwqA" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FJ65Q3DVKB" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ window.dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-FJ65Q3DVKB');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden min-w-0">
        <LanguageProvider defaultLanguage={lang as any}>
          <GlobalStructuredData />
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
