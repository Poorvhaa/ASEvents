'use client'

import { useTranslation } from '@/src/hooks/useTranslation'
import { SectionContainer } from '@/components/layout/section-container'

const sections = [
  'acceptance',
  'services',
  'bookings',
  'cancellations',
  'clientResponsibilities',
  'intellectualProperty',
  'limitationOfLiability',
  'thirdPartyServices',
  'privacy',
  'changes',
  'contact',
]

const getFontClass = (lang: string, type: 'serif' | 'sans' = 'serif') => {
  if (type === 'serif') {
    if (lang === 'hi') return 'font-noto-devanagari'
    if (lang === 'gu') return 'font-noto-gujarati'
    return 'font-serif'
  }
  return 'font-sans'
}

export function TermsOfServiceContent() {
  const { t, language } = useTranslation()
  const fontSerif = getFontClass(language, 'serif')
  const fontSans = getFontClass(language, 'sans')

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <SectionContainer>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`${fontSerif} text-4xl sm:text-5xl lg:text-6xl text-foreground font-bold tracking-wide mb-4`}>
              {t('termsOfService.title')}
            </h1>
            <div className="w-24 h-0.5 bg-primary/40 mx-auto mb-4" />
            <p className={`${fontSans} text-sm sm:text-base text-muted-foreground font-light tracking-wide mb-6`}>
              {t('termsOfService.lastUpdated')}
            </p>
            {t('termsOfService.intro') && t('termsOfService.intro') !== 'termsOfService.intro' && (
              <p className={`${fontSans} text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto font-light leading-relaxed`}>
                {t('termsOfService.intro')}
              </p>
            )}
          </div>

          {/* Content Sections */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 space-y-10 leading-relaxed">
            {sections.map((sectionKey) => {
              const headingKey = `termsOfService.sections.${sectionKey}.title`
              const contentKey = `termsOfService.sections.${sectionKey}.content`

              return (
                <div key={sectionKey} className="border-b border-border/20 pb-8 last:border-b-0 last:pb-0">
                  <h2 className={`${fontSerif} text-xl sm:text-2xl text-foreground font-semibold mb-4 tracking-wide`}>
                    {t(headingKey)}
                  </h2>
                  <p className={`${fontSans} text-sm sm:text-base font-light text-foreground/80 whitespace-pre-line leading-relaxed`}>
                    {t(contentKey)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
