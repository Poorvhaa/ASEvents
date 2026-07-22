'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { MessageBubble } from '@/components/ai/message-bubble'
import { LeadForm } from '@/components/ai/lead-form'
import { EVENT_TYPES } from '@/lib/ai/types'
import { venueCities } from '@/lib/data/venues'
import { getVenueTypeSuggestions } from '@/lib/venue-engine'
import { generateWhatsAppUrl } from '@/services/whatsappService'
import { generateConsultation, formatConsultationMessage } from '@/lib/ai/consultant-engine'
import { useTranslation } from '@/src/hooks/useTranslation'
import { ErrorMessage } from '@/components/ui/error-message'
import {
  futureDateField,
  locationField,
  guestCountInputSchema,
  aiPlannerPromptField,
} from '@/lib/validations/schemas'
import { cn } from '@/lib/utils'

const BUDGET_OPTIONS = [
  'Under ₹3,00,000',
  '₹3,00,000 - ₹8,00,000',
  '₹8,00,000 - ₹15,00,000',
  '₹15,00,000 - ₹30,00,000',
  '₹30,00,000+',
]

const GUEST_OPTIONS = ['50-100', '100-200', '200-500', '500-1000', '1000+']

export function ChatWindow() {
  const { t, language } = useTranslation()
  const {
    messages,
    step,
    answers,
    isTyping,
    recommendation,
    addMessage,
    setAnswer,
    setStep,
    setTyping,
    setRecommendation,
  } = useAIConsultant()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputError, setInputError] = useState<string | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, step])

  const advance = useCallback(
    async (userMsg: string, nextStep: typeof step, updates?: Partial<typeof answers>) => {
      const merged = { ...answers, ...updates }
      addMessage('user', userMsg)
      setTyping(true)

      if (nextStep === 'generating') {
        setStep('generating')
        try {
          let recommendation = generateConsultation(merged)
          let message = formatConsultationMessage(recommendation, t)

          try {
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...merged, language }),
            })
            const data = await res.json()
            if (data.success && data.recommendation) {
              recommendation = data.recommendation
              message = formatConsultationMessage(recommendation, t)
            }
          } catch {
            // Use local engine recommendation
          }

          setRecommendation(recommendation)
          addMessage('assistant', message, recommendation)
          setStep('complete')
        } catch {
          const fallback = generateConsultation(merged)
          setRecommendation(fallback)
          addMessage('assistant', formatConsultationMessage(fallback, t), fallback)
          setStep('complete')
        } finally {
          setTyping(false)
        }
        return
      }

      await new Promise((r) => setTimeout(r, 600))
      setTyping(false)
      addMessage('assistant', t('aiPlanner.prompts.' + nextStep) || '')
      setStep(nextStep)
    },
    [answers, addMessage, setStep, setTyping, setRecommendation, t, language]
  )

  const handleEventType = (type: string) => {
    setAnswer('eventType', type)
    const key = `quoteModal.step1.types.${type}`
    const translated = t(key)
    const userMsg = translated === key ? type : translated
    advance(userMsg, 'eventDate', { eventType: type as typeof answers.eventType })
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInputError(null)
    const value = inputRef.current?.value.trim() || ''

    if (!value) {
      if (step === 'specialRequirements') {
        setInputError('Please describe your event.')
      } else {
        setInputError('This field is required.')
      }
      return
    }

    // Validate based on the current step
    let validationResult
    if (step === 'eventDate') {
      validationResult = futureDateField.safeParse(value)
    } else if (step === 'location') {
      validationResult = locationField.safeParse(value)
    } else if (step === 'guestCount') {
      validationResult = guestCountInputSchema.safeParse(value)
    } else if (step === 'specialRequirements') {
      validationResult = aiPlannerPromptField.safeParse(value)
    } else {
      validationResult = { success: true, data: value }
    }

    if (!validationResult.success) {
      setInputError((validationResult as any).error?.errors[0]?.message || 'Invalid input')
      return
    }

    if (inputRef.current) inputRef.current.value = ''

    const flow: Record<string, { next: typeof step; field: keyof typeof answers }> = {
      eventDate: { next: 'location', field: 'eventDate' },
      location: { next: 'guestCount', field: 'location' },
      guestCount: { next: 'venueType', field: 'guestCount' },
      venueType: { next: 'specialRequirements', field: 'venueType' },
      specialRequirements: { next: 'generating', field: 'specialRequirements' },
    }

    const current = flow[step]
    if (!current) return

    const finalValue = String(validationResult.data)
    setAnswer(current.field, finalValue)
    advance(finalValue, current.next, { [current.field]: finalValue })
  }

  const venueSuggestions =
    answers.eventType ? getVenueTypeSuggestions(answers.eventType) : []

  const whatsappUrl =
    recommendation ? generateWhatsAppUrl(answers, recommendation) : null

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MessageBubble message={msg} />
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

        {(step === 'complete' || step === 'leadCapture') && (
          <div className="mt-4">
            {whatsappUrl && (
              <div className="mb-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-colors"
                >
                  {t('aiPlanner.chatOnWhatsApp')}
                </a>
              </div>
            )}

            <LeadForm />
          </div>
        )}
      </div>

      {/* Quick replies */}
      {step === 'eventType' && !isTyping && (
        <QuickReplies options={[...EVENT_TYPES]} onSelect={handleEventType} t={t} step={step} language={language} />
      )}

      {step === 'location' && !isTyping && (
        <QuickReplies
          options={[...venueCities]}
          onSelect={(c) => {
            setAnswer('location', c)
            const key = `cities.${c}`
            const translated = t(key)
            const userMsg = translated === key ? c : translated
            advance(userMsg, 'guestCount', { location: c })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {step === 'guestCount' && !isTyping && (
        <QuickReplies
          options={GUEST_OPTIONS}
          onSelect={(g) => {
            setAnswer('guestCount', g)
            const normalizedG = g.replace(/(\d+)-(\d+)/, '$1 - $2')
            const key = `packagesPage.builder.counts.${normalizedG}`
            const translatedG = t(key)
            const displayG = translatedG === key ? g : translatedG
            advance(`${displayG} ${t('packagesPage.guests')}`, 'venueType', { guestCount: g })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {step === 'venueType' && !isTyping && venueSuggestions.length > 0 && (
        <QuickReplies
          options={venueSuggestions}
          onSelect={(v) => {
            setAnswer('venueType', v)
            const key = `aiPlanner.venuePreferences.${v}`
            const translated = t(key)
            const userMsg = translated === key ? v : translated
            advance(userMsg, 'specialRequirements', { venueType: v })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {/* Text input for open-ended steps */}
      {['eventDate', 'location', 'guestCount', 'venueType', 'specialRequirements'].includes(step) && !isTyping && (
        <div className="flex flex-col border-t border-slate-100 pt-3 bg-slate-50/50">
          <div className="px-4">
            <ErrorMessage message={inputError || undefined} />
          </div>
          <form onSubmit={handleTextSubmit} noValidate className="px-4 pb-3 flex gap-2 pt-1">
            <input
              ref={inputRef}
              type="text"
              onChange={() => setInputError(null)}
              placeholder={
                step === 'eventDate' ? t('aiPlanner.datePlaceholder') :
                step === 'specialRequirements' ? t('aiPlanner.specialPlaceholder') :
                t('aiPlanner.inputPlaceholder')
              }
              className={cn(
                'flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-white transition-colors duration-200',
                inputError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-primary'
              )}
            />
            <Button type="submit" size="icon" className="bg-primary text-primary-foreground shrink-0 rounded-xl">
              <Send size={16} />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

function QuickReplies({
  options,
  onSelect,
  t,
  step,
  language,
}: {
  options: string[]
  onSelect: (v: string) => void
  t: (key: string) => string
  step: string
  language: string
}) {
  const translateOption = (opt: string) => {
    if (step === 'eventType') {
      const key = `quoteModal.step1.types.${opt}`
      const translated = t(key)
      return translated === key ? opt : translated
    }
    if (step === 'location') {
      const key = `cities.${opt}`
      const translated = t(key)
      return translated === key ? opt : translated
    }
    if (step === 'guestCount') {
      const normalizedG = opt.replace(/(\d+)-(\d+)/, '$1 - $2')
      const key = `packagesPage.builder.counts.${normalizedG}`
      const translated = t(key)
      return translated === key ? opt : translated
    }
    if (step === 'venueType') {
      const key = `aiPlanner.venuePreferences.${opt}`
      const translated = t(key)
      return translated === key ? opt : translated
    }
    return opt
  }

  return (
    <div className="flex flex-wrap gap-2 p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-full border border-slate-200 shadow-sm transition-colors cursor-pointer"
        >
          {translateOption(opt)}
        </button>
      ))}
    </div>
  )
}
