import { create } from 'zustand'
import type {
  ConsultantAnswers,
  ChatMessage,
  ConsultantStep,
  AIConsultationResult,
} from '@/lib/ai/types'

interface AIConsultantStore {
  isOpen: boolean
  step: ConsultantStep
  answers: ConsultantAnswers
  messages: ChatMessage[]
  isTyping: boolean
  recommendation: AIConsultationResult | null

  openChat: () => void
  openChatWithPackage: (prefill: Partial<ConsultantAnswers>) => void
  closeChat: () => void
  addMessage: (role: 'assistant' | 'user', content: string, recommendation?: AIConsultationResult) => void
  setAnswer: (field: keyof ConsultantAnswers, value: string) => void
  setStep: (step: ConsultantStep) => void
  setTyping: (typing: boolean) => void
  setRecommendation: (rec: AIConsultationResult | null) => void
  reset: () => void
}

const initialAnswers: ConsultantAnswers = {
  eventType: '',
  eventDate: '',
  city: '',
  guestCount: '',
  budget: '',
  venuePreference: '',
  specialRequirements: '',
}

const WELCOME_MESSAGE = `Namaste! I'm your AS Events AI Consultant — a senior event planner here to help you design the perfect celebration.

I'll ask a few quick questions to understand your vision, then recommend packages, venues, and a budget estimate tailored to your needs.

Let's begin — what type of event are you planning?`

export const useAIConsultant = create<AIConsultantStore>((set) => ({
  isOpen: false,
  step: 'eventType',
  answers: { ...initialAnswers },
  messages: [],
  isTyping: false,
  recommendation: null,

  openChat: () =>
    set({
      isOpen: true,
      step: 'eventType',
      answers: { ...initialAnswers },
      recommendation: null,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ],
    }),

  openChatWithPackage: (prefill) => {
    const answers = { ...initialAnswers, ...prefill }
    set({
      isOpen: true,
      step: prefill.eventType ? 'guestCount' : 'eventType',
      answers,
      recommendation: null,
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: prefill.eventType
            ? `Great choice — the **${prefill.eventType}** package! Let me tailor a recommendation. How many guests are you expecting?`
            : WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ],
    })
  },

  closeChat: () => set({ isOpen: false }),

  addMessage: (role, content, recommendation) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          role,
          content,
          timestamp: new Date(),
          recommendation,
        },
      ],
    })),

  setAnswer: (field, value) =>
    set((state) => ({
      answers: { ...state.answers, [field]: value },
    })),

  setStep: (step) => set({ step }),

  setTyping: (typing) => set({ isTyping: typing }),

  setRecommendation: (rec) => set({ recommendation: rec }),

  reset: () =>
    set({
      step: 'eventType',
      answers: { ...initialAnswers },
      messages: [],
      isTyping: false,
      recommendation: null,
    }),
}))
