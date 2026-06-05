import { create } from 'zustand'
import type { ConsultantAnswers, ChatMessage, ConsultantStep } from '@/lib/ai/types'

interface AIConsultantStore {
  isOpen: boolean
  step: ConsultantStep
  answers: ConsultantAnswers
  messages: ChatMessage[]
  isTyping: boolean

  openChat: () => void
  closeChat: () => void
  addMessage: (role: 'assistant' | 'user', content: string) => void
  setAnswer: (field: keyof ConsultantAnswers, value: string) => void
  setStep: (step: ConsultantStep) => void
  setTyping: (typing: boolean) => void
  reset: () => void
}

const initialAnswers: ConsultantAnswers = {
  eventType: '',
  guests: '',
  budget: '',
  city: '',
  date: '',
}

export const useAIConsultant = create<AIConsultantStore>((set) => ({
  isOpen: false,
  step: 'eventType',
  answers: { ...initialAnswers },
  messages: [],
  isTyping: false,

  openChat: () =>
    set({
      isOpen: true,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content:
            "Hello! I'm your AI Event Planner. I'll help you find the perfect package for your celebration. Let's get started!\n\nWhat type of event are you planning?",
          timestamp: new Date(),
        },
      ],
      step: 'eventType',
      answers: { ...initialAnswers },
    }),

  closeChat: () => set({ isOpen: false }),

  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: `${Date.now()}`, role, content, timestamp: new Date() },
      ],
    })),

  setAnswer: (field, value) =>
    set((state) => ({
      answers: { ...state.answers, [field]: value },
    })),

  setStep: (step) => set({ step }),

  setTyping: (typing) => set({ isTyping: typing }),

  reset: () =>
    set({
      step: 'eventType',
      answers: { ...initialAnswers },
      messages: [],
      isTyping: false,
    }),
}))
