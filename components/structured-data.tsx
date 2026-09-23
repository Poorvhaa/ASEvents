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
  blog: 'Blog',
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

export function BlogArticleBreadcrumbStructuredData({
  articleTitle,
  articleSlug,
}: {
  articleTitle: string
  articleSlug: string
}) {
  const articleUrl = `${siteUrl}blog/${articleSlug}`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}blog` },
          { '@type': 'ListItem', position: 3, name: articleTitle, item: articleUrl },
        ],
      }}
    />
  )
}

export function ArticleStructuredData({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = 'Apurv Shah',
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}) {
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl.replace(/\/$/, '')}${image}`

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: title,
        description: description,
        url: url,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        image: [fullImageUrl],
        datePublished: datePublished || '2024-03-24T00:00:00+05:30',
        dateModified: dateModified || datePublished || '2024-03-24T00:00:00+05:30',
        author: {
          '@type': 'Person',
          name: authorName,
          jobTitle: 'Lead Event Director & Founder',
          worksFor: {
            '@type': 'Organization',
            name: 'AS Event Management',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'AS Event Management',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}as-events-logo-navbar.png`,
          },
        },
      }}
    />
  )
}
