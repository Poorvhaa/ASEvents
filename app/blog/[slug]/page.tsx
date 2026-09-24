import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  BlogArticleBreadcrumbStructuredData,
  ArticleStructuredData,
} from '@/components/structured-data'
import { ArticleContent } from '@/components/blog/article-content'
import { GenericArticleContent } from '@/components/blog/generic-article-content'
import { CTASection } from '@/components/sections/cta-section'
import { blogPosts, getBlogPostBySlug } from '@/lib/data/blog'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found | AS Events',
      robots: { index: false, follow: false },
    }
  }

  const siteUrl = 'https://www.aseventmanagement.com'
  const articleUrl = `${siteUrl}/blog/${post.slug}`
  const pageTitle = post.seoTitle || `${post.title} | AS Events`
  const metaDesc = post.metaDescription || post.excerpt
  const imageUrl = post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}`

  return {
    title: pageTitle,
    description: metaDesc,
    keywords: [
      post.primaryKeyword || 'event planning',
      ...(post.secondaryKeywords || []),
      'event management',
      'luxury events',
    ],
    alternates: {
      canonical: post.canonicalUrl || articleUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: metaDesc,
      url: articleUrl,
      siteName: 'AS Events',
      type: 'article',
      ...(post.date ? { publishedTime: '2024-03-24T00:00:00+05:30' } : {}),
      authors: [post.author?.name || 'Apurv Shah'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: metaDesc,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = 'https://www.aseventmanagement.com'
  const articleUrl = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`

  return (
    <>
      <BlogArticleBreadcrumbStructuredData
        articleTitle={post.title}
        articleSlug={post.slug}
      />
      <ArticleStructuredData
        title={post.title}
        description={post.metaDescription || post.excerpt}
        url={articleUrl}
        image={post.image}
        datePublished={post.date ? '2024-03-24T00:00:00+05:30' : undefined}
        authorName={post.author?.name || 'Apurv Shah'}
      />
      {post.slug === 'how-to-choose-the-right-event-planner-for-your-event' ? (
        <ArticleContent />
      ) : (
        <GenericArticleContent post={post} />
      )}
      <CTASection />
    </>
  )
}
