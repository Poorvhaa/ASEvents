'use client'

import { useRef, useEffect, useCallback } from 'react'
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

const STEP_PROMPTS: Record<string, string> = {
  eventDate: 'Wonderful choice! When is your event planned? (e.g. December 2025, or type a specific date)',
  city: 'Which city would you like to host the event in?',
  guestCount: 'How many guests are you expecting?',
  budget: 'What is your approximate budget range?',
  venuePreference: 'Do you have a venue preference? (e.g. Banquet Hall, Resort, Palace, Farmhouse)',
  specialRequirements: 'Any special requirements or vision for your event? (Type your ideas or "None")',
}

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
              body: JSON.stringify(merged),
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
    [answers, addMessage, setAnswer, setStep, setTyping, setRecommendation, t]
  )

  const handleEventType = (type: string) => {
    setAnswer('eventType', type)
    advance(type, 'eventDate', { eventType: type as typeof answers.eventType })
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = inputRef.current?.value.trim()
    if (!value) return
    if (inputRef.current) inputRef.current.value = ''

    const flow: Record<string, { next: typeof step; field: keyof typeof answers }> = {
      eventDate: { next: 'city', field: 'eventDate' },
      city: { next: 'guestCount', field: 'city' },
      guestCount: { next: 'budget', field: 'guestCount' },
      budget: { next: 'venuePreference', field: 'budget' },
      venuePreference: { next: 'specialRequirements', field: 'venuePreference' },
      specialRequirements: { next: 'generating', field: 'specialRequirements' },
    }

    const current = flow[step]
    if (!current) return

    setAnswer(current.field, value)
    advance(value, current.next, { [current.field]: value })
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

      {step === 'city' && !isTyping && (
        <QuickReplies
          options={[...venueCities]}
          onSelect={(c) => {
            setAnswer('city', c)
            advance(c, 'guestCount', { city: c })
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
            advance(`${g} ${t('packagesPage.guests')}`, 'budget', { guestCount: g })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {step === 'budget' && !isTyping && (
        <QuickReplies
          options={BUDGET_OPTIONS}
          onSelect={(b) => {
            setAnswer('budget', b)
            advance(b, 'venuePreference', { budget: b })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {step === 'venuePreference' && !isTyping && venueSuggestions.length > 0 && (
        <QuickReplies
          options={venueSuggestions}
          onSelect={(v) => {
            setAnswer('venuePreference', v)
            advance(v, 'specialRequirements', { venuePreference: v })
          }}
          t={t}
          step={step}
          language={language}
        />
      )}

      {/* Text input for open-ended steps */}
      {['eventDate', 'city', 'guestCount', 'budget', 'venuePreference', 'specialRequirements'].includes(step) && !isTyping && (
        <form onSubmit={handleTextSubmit} className="px-4 pb-3 flex gap-2 border-t border-slate-100 pt-3">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              step === 'eventDate' ? t('aiPlanner.datePlaceholder') :
              step === 'specialRequirements' ? t('aiPlanner.specialPlaceholder') :
              t('aiPlanner.inputPlaceholder')
            }
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none bg-white"
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground shrink-0 rounded-xl">
            <Send size={16} />
          </Button>
        </form>
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
      const val = t(key)
      return val === key ? opt : val
    }
    if (step === 'city') {
      const key = `cities.${opt}`
      const val = t(key)
      return val === key ? opt : val
    }
    if (step === 'budget') {
      const key = `quoteModal.step4.ranges.${opt}`
      const val = t(key)
      return val === key ? opt : val
    }
    if (step === 'venuePreference') {
      const hiMap: Record<string, string> = {
        'Banquet Hall': 'बैंक्वेट हॉल',
        'Resort': 'रिसॉर्ट',
        'Palace': 'महल (पैलेस)',
        'Farmhouse': 'फार्महाउस',
        'Convention Center': 'कन्वेंशन सेंटर',
        'Hotel Ballroom': 'होटल बॉलरूम',
        'Exhibition Hall': 'प्रदर्शनी हॉल',
        'Open Lawn': 'खुला लॉन',
      }
      const guMap: Record<string, string> = {
        'Banquet Hall': 'બેન્ક્વેટ હોલ',
        'Resort': 'રિસોર્ટ',
        'Palace': 'મહેલ (પેલેસ)',
        'Farmhouse': 'ફાર્મહાઉસ',
        'Convention Center': 'કન્વેન્શન સેન્ટર',
        'Hotel Ballroom': 'હોટેલ બોલરૂમ',
        'Exhibition Hall': 'પ્રદર્શન હોલ',
        'Open Lawn': 'ખુલ્લું લોન',
      }
      if (language === 'hi') return hiMap[opt] || opt
      if (language === 'gu') return guMap[opt] || opt
      return opt
    }
    return opt
  }

  return (
    <div className="px-4 pb-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition-colors"
        >
          {translateOption(opt)}
        </button>
      ))}
    </div>
  )
}
