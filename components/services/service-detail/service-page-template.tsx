import { ServiceDetailData } from '@/lib/data/services-data'
import {
  ServiceStructuredData,
  ServiceBreadcrumbStructuredData,
  FAQStructuredData,
} from '@/components/structured-data'
import { ServiceBreadcrumbs } from './service-breadcrumbs'
import { ServiceHero } from './service-hero'
import { ServiceIntro } from './service-intro'
import { ServiceWhatWeHandle } from './service-what-we-handle'
import { ServiceWhyChooseUs } from './service-why-choose-us'
import { ServiceProcess } from './service-process'
import { ServiceOptions } from './service-options'
import { ServiceGallery } from './service-gallery'
import { ServiceFAQ } from './service-faq'
import { RelatedServices } from './related-services'
import { CTASection } from '@/components/sections/cta-section'

interface ServicePageTemplateProps {
  data: ServiceDetailData
}

export function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  return (
    <>
      {/* Schema.org Structured Data */}
      <ServiceStructuredData
        name={data.title}
        description={data.metaDescription}
        url={data.canonicalUrl}
        serviceType={data.serviceType}
        image={data.heroImage.src}
      />
      <ServiceBreadcrumbStructuredData
        serviceName={data.quoteEventType + ' Services'}
        serviceUrl={data.canonicalUrl}
      />
      <FAQStructuredData faqs={data.faqs} url={data.canonicalUrl} />

      {/* Visible Breadcrumbs */}
      <ServiceBreadcrumbs serviceName={data.quoteEventType + ' Services'} />

      {/* Hero Section */}
      <ServiceHero
        eyebrow={data.eyebrow}
        h1={data.h1}
        description={data.heroDescription}
        quoteEventType={data.quoteEventType}
        image={data.heroImage}
      />

      {/* Introduction Section */}
      <ServiceIntro
        whatIsIt={data.intro.whatIsIt}
        whoIsItFor={data.intro.whoIsItFor}
        whyItMatters={data.intro.whyItMatters}
        ourApproach={data.intro.ourApproach}
      />

      {/* What We Handle Section */}
      <ServiceWhatWeHandle items={data.whatWeHandle} />

      {/* Why Choose Us Section */}
      <ServiceWhyChooseUs items={data.whyChooseUs} />

      {/* Planning Process Section */}
      <ServiceProcess steps={data.processSteps} />

      {/* Service-Specific Options Section */}
      <ServiceOptions
        heading={data.serviceOptionsHeading}
        description={data.serviceOptionsDescription}
        options={data.serviceOptions}
      />

      {/* Portfolio / Visual Inspiration Gallery */}
      <ServiceGallery
        heading={data.galleryHeading}
        description={data.galleryDescription}
        images={data.galleryImages}
      />

      {/* Service FAQs with Accordion */}
      <ServiceFAQ faqs={data.faqs} />

      {/* Related Services Links */}
      <RelatedServices services={data.relatedServices} />

      {/* Final Conversion CTA */}
      <CTASection />
    </>
  )
}
