'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot } from 'lucide-react'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { ChatWindow } from '@/components/ai/chat-window'
import { useTranslation } from '@/src/hooks/useTranslation'

export function AIChatWidget() {
  const { isOpen, openChat, closeChat } = useAIConsultant()
  const { t } = useTranslation()

  const [isIntroActive, setIsIntroActive] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMenuState = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsMenuOpen(customEvent.detail.isOpen)
    }

    window.addEventListener('menu-state', handleMenuState)
    return () => {
      window.removeEventListener('menu-state', handleMenuState)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if we are on the homepage and intro container is present and not completed
    const isHomePage = window.location.pathname === '/'
    const completed = !!(window as any).__introCompleted || !document.getElementById('intro-experience-container')
    
    if (isHomePage && !completed) {
      setIsIntroActive(true)
    }

    const handleIntroComplete = () => {
      setIsIntroActive(false)
    }

    window.addEventListener('intro-complete', handleIntroComplete)
    return () => {
      window.removeEventListener('intro-complete', handleIntroComplete)
    }
  }, [])

  if (isIntroActive || isMenuOpen) {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openChat(t('aiPlanner.welcome'))}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 min-h-11 px-4 sm:px-5 py-3 rounded-full border border-transparent transition-all duration-300 ease-out max-w-[calc(100vw-2rem)] bg-[#C9B9AA] text-[#0B1633] shadow-lg hover:bg-[#BFAE9E] hover:text-[#0B1633] hover:border-[#B89A63] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:bg-[#B5A392] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B89A63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817]"
            aria-label={t('aiPlanner.askAI')}
          >
            <MessageCircle size={20} className="shrink-0" />
            <span className="text-sm font-semibold hidden sm:inline truncate">{t('aiPlanner.askAI')}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[min(400px,calc(100vw-2rem))] h-[min(800px,calc(100dvh-1rem))] sm:h-[min(850px,calc(100vh-2rem))] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[95dvh]"
          >
            <div className="flex items-center justify-between px-4 py-3.5 bg-primary text-primary-foreground shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate">{t('aiPlanner.askAI')}</p>
                  <p className="text-[11px] opacity-80 truncate">{t('aiPlanner.aiConsultant')}</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="touch-target p-1.5 rounded-lg hover:bg-white/20 transition-colors shrink-0"
                aria-label={t('aiPlanner.closeChat')}
              >
                <X size={18} />
              </button>
            </div>

            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
