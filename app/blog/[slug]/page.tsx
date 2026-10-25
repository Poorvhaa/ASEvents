import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  BlogArticleBreadcrumbStructuredData,
  ArticleStructuredData,
  FaqStructuredData,
} from '@/components/structured-data'
import { ArticleContent } from '@/components/blog/article-content'
import { BookingTimelineContent } from '@/components/blog/booking-timeline-content'
import { ChecklistArticleContent } from '@/components/blog/checklist-article-content'
import { EventBudgetContent } from '@/components/blog/event-budget-content'
import { EventCostIndiaContent } from '@/components/blog/event-cost-india-content'
import { EventPlannerRoleContent } from '@/components/blog/event-planner-role-content'
import { GenericArticleContent } from '@/components/blog/generic-article-content'
import { PlannerVsManagerContent } from '@/components/blog/planner-vs-manager-content'
import { WeddingPlanningContent } from '@/components/blog/wedding-planning-content'
import { WeddingPlannerVsDiyContent } from '@/components/blog/wedding-planner-vs-diy-content'
import { DestinationWeddingPlanningContent } from '@/components/blog/destination-wedding-planning-content'
import { CTASection } from '@/components/sections/cta-section'
import {
  blogPosts,
  getBlogPostBySlug,
  toArticleIsoDate,
  plannerVsManagerFaqs,
  bookingTimelineFaqs,
  eventBudgetFaqs,
  weddingPlanningFaqs,
  eventCostIndiaFaqs,
  weddingPlannerVsDiyFaqs,
} from '@/lib/data/blog'

const CENTRAL_DATE_SLUGS = new Set([
  'destination-wedding-planning-complete-guide',
  'wedding-planner-vs-diy-wedding-planning',
  'how-much-does-event-planning-cost-in-india',
  'how-to-plan-a-successful-wedding',
  'how-to-create-an-event-budget',
  'how-early-should-you-hire-an-event-planner',
  'event-planner-vs-event-manager',
  'complete-event-planning-checklist',
  'what-does-an-event-planner-do',
  'how-to-choose-the-right-event-planner-for-your-event',
])

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
  const usesCentralDate = CENTRAL_DATE_SLUGS.has(post.slug)
  const publishedIso = usesCentralDate
    ? toArticleIsoDate(post.date)
    : post.date
      ? '2024-03-24T00:00:00+05:30'
      : undefined

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
      ...(usesCentralDate && publishedIso
        ? { publishedTime: publishedIso, modifiedTime: publishedIso }
        : post.date
          ? { publishedTime: '2024-03-24T00:00:00+05:30' }
          : {}),
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
  const usesCentralDate = CENTRAL_DATE_SLUGS.has(post.slug)
  const publishedIso = usesCentralDate
    ? toArticleIsoDate(post.date)
    : post.date
      ? '2024-03-24T00:00:00+05:30'
      : undefined

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
        datePublished={publishedIso}
        dateModified={usesCentralDate ? publishedIso : undefined}
        authorName={post.author?.name || 'Apurv Shah'}
      />
      {post.slug === 'wedding-planner-vs-diy-wedding-planning' && (
        <FaqStructuredData faqs={weddingPlannerVsDiyFaqs} />
      )}
      {post.slug === 'how-much-does-event-planning-cost-in-india' && (
        <FaqStructuredData faqs={eventCostIndiaFaqs} />
      )}
      {post.slug === 'how-to-plan-a-successful-wedding' && (
        <FaqStructuredData faqs={weddingPlanningFaqs} />
      )}
      {post.slug === 'how-to-create-an-event-budget' && (
        <FaqStructuredData faqs={eventBudgetFaqs} />
      )}
      {post.slug === 'how-early-should-you-hire-an-event-planner' && (
        <FaqStructuredData faqs={bookingTimelineFaqs} />
      )}
      {post.slug === 'event-planner-vs-event-manager' && (
        <FaqStructuredData faqs={plannerVsManagerFaqs} />
      )}
      {post.slug === 'destination-wedding-planning-complete-guide' ? (
        <DestinationWeddingPlanningContent />
      ) : post.slug === 'wedding-planner-vs-diy-wedding-planning' ? (
        <WeddingPlannerVsDiyContent />
      ) : post.slug === 'how-much-does-event-planning-cost-in-india' ? (
        <EventCostIndiaContent />
      ) : post.slug === 'how-to-plan-a-successful-wedding' ? (
        <WeddingPlanningContent />
      ) : post.slug === 'how-to-create-an-event-budget' ? (
        <EventBudgetContent />
      ) : post.slug === 'how-early-should-you-hire-an-event-planner' ? (
        <BookingTimelineContent />
      ) : post.slug === 'event-planner-vs-event-manager' ? (
        <PlannerVsManagerContent />
      ) : post.slug === 'complete-event-planning-checklist' ? (
        <ChecklistArticleContent />
      ) : post.slug === 'how-to-choose-the-right-event-planner-for-your-event' ? (
        <ArticleContent />
      ) : post.slug === 'what-does-an-event-planner-do' ? (
        <EventPlannerRoleContent />
      ) : (
        <GenericArticleContent post={post} />
      )}
      <CTASection />
    </>
  )
}
