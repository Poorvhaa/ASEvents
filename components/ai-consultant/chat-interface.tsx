'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { generateRecommendation, formatRecommendation } from '@/lib/ai/mock-consultant'
import type { EventType } from '@/lib/ai/types'
import { venueCities } from '@/lib/data/venues'

const eventTypes: EventType[] = ['Wedding', 'Corporate', 'Birthday', 'Festival', 'Other']

const guestOptions = ['50-100', '100-200', '200-500', '500-1000', '1000+']

const budgetOptions = [
  'Under ₹1,00,000',
  '₹1,00,000 - ₹5,00,000',
  '₹5,00,000 - ₹10,00,000',
  '₹10,00,000+',
]

const stepQuestions: Record<string, string> = {
  guests: 'How many guests are you expecting?',
  budget: 'What is your approximate budget?',
  city: 'Which city would you like to host the event in?',
  date: 'Do you have a preferred date? (optional — type or skip)',
}

export function ChatInterface() {
  const {
    messages,
    step,
    answers,
    isTyping,
    addMessage,
    setAnswer,
    setStep,
    setTyping,
  } = useAIConsultant()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const advanceStep = async (
    userMessage: string,
    nextStep: typeof step,
    updatedAnswers?: Partial<typeof answers>
  ) => {
    addMessage('user', userMessage)
    setTyping(true)
    await new Promise((r) => setTimeout(r, 800))
    setTyping(false)

    const finalAnswers = { ...answers, ...updatedAnswers }

    if (nextStep === 'complete') {
      const rec = generateRecommendation(finalAnswers)
      addMessage('assistant', formatRecommendation(rec))
      setStep('complete')
    } else {
      addMessage('assistant', stepQuestions[nextStep] || '')
      setStep(nextStep)
    }
  }

  const handleEventType = (type: EventType) => {
    setAnswer('eventType', type)
    advanceStep(type, 'guests')
  }

  const handleGuests = (guests: string) => {
    setAnswer('guests', guests)
    advanceStep(guests + ' guests', 'budget')
  }

  const handleBudget = (budget: string) => {
    setAnswer('budget', budget)
    advanceStep(budget, 'city')
  }

  const handleCity = (city: string) => {
    setAnswer('city', city)
    advanceStep(city, 'date')
  }

  const handleDate = (date: string) => {
    const value = date || 'Flexible dates'
    setAnswer('date', value)
    advanceStep(value, 'complete', { date: value })
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = inputRef.current?.value.trim()
    if (!value) return
    if (inputRef.current) inputRef.current.value = ''

    if (step === 'date') {
      handleDate(value)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-primary" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-slate-100 text-foreground rounded-bl-md'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Options */}
      {step === 'eventType' && messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleEventType(type)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition-colors"
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {step === 'guests' && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {guestOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleGuests(opt)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {step === 'budget' && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleBudget(opt)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {step === 'city' && !isTyping && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 max-h-24 overflow-y-auto">
          {venueCities.map((city) => (
            <button
              key={city}
              onClick={() => handleCity(city)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white hover:border-primary hover:text-primary transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {step === 'date' && !isTyping && (
        <form onSubmit={handleTextSubmit} className="p-4 border-t border-slate-200 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. December 2025 or skip..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:outline-none"
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground shrink-0">
            <Send size={16} />
          </Button>
        </form>
      )}
    </div>
  )
}
