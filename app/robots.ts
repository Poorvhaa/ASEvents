import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin$', '/admin/', '/api$', '/api/', '/sign-in', '/sign-up'],
    },
    sitemap: 'https://www.aseventmanagement.com/sitemap.xml',
  }
}
