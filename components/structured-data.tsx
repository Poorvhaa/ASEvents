const siteUrl = 'https://www.aseventmanagement.com/'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export function GlobalStructuredData() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Organization', 'LocalBusiness'],
            '@id': siteUrl + '#organization',
            name: 'AS Event Management',
            url: siteUrl,
            logo: siteUrl + 'as-events-logo-navbar.png',
            sameAs: ['https://www.instagram.com/as.event.management/'],
            description:
              'Premium Indian event management — weddings, corporate events, destination celebrations.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '803-804, Blue Chip Complex, Sayajiganj Rd, Near Kala Ghoda, Sarod, Jetalpur',
              addressLocality: 'Vadodara',
              addressRegion: 'Gujarat',
              postalCode: '390007',
              addressCountry: 'IN',
            },
            email: 'as.eventmanagement2829@gmail.com',
            telephone: '+91-95103-24143',
          },
          {
            '@type': 'WebSite',
            '@id': siteUrl + '#website',
            name: 'AS Event Management',
            url: siteUrl,
            publisher: { '@id': siteUrl + '#organization' },
          },
        ],
      }}
    />
  )
}

const breadcrumbPages = {
  about: 'About',
  services: 'Services',
  packages: 'Packages',
  portfolio: 'Portfolio',
  contact: 'Contact',
} as const

export function BreadcrumbStructuredData({ page }: { page: keyof typeof breadcrumbPages }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': siteUrl + page + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbPages[page], item: siteUrl + page },
        ],
      }}
    />
  )
}
