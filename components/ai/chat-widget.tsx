'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot } from 'lucide-react'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { ChatWindow } from '@/components/ai/chat-window'
import { useTranslation } from '@/src/hooks/useTranslation'

export function AIChatWidget() {
  const { isOpen, openChat, closeChat } = useAIConsultant()
  const { t } = useTranslation()

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
            onClick={openChat}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 min-h-11 px-4 sm:px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-colors duration-300 max-w-[calc(100vw-2rem)]"
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
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[min(400px,calc(100vw-2rem))] h-[min(800px,calc(100dvh-1rem))] sm:h-[min(850px,calc(100vh-2rem))] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[95vh]"
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
