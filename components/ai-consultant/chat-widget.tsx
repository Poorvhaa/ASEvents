'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Bot } from 'lucide-react'
import { useAIConsultant } from '@/hooks/use-ai-consultant'
import { ChatInterface } from '@/components/ai-consultant/chat-interface'
import { Button } from '@/components/ui/button'
import { useQuoteModal } from '@/hooks/use-quote-modal'

export function AIConsultantWidget() {
  const { isOpen, openChat, closeChat, step } = useAIConsultant()
  const { openModal } = useQuoteModal()

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
            aria-label="Ask Event Planner AI"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-semibold hidden sm:inline">Ask Event Planner AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <div>
                  <p className="text-sm font-semibold">Event Planner AI</p>
                  <p className="text-xs opacity-80">Powered by AS Events</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <ChatInterface />

            {step === 'complete' && (
              <div className="p-4 border-t border-slate-200">
                <Button
                  onClick={() => {
                    openModal()
                    closeChat()
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-blue-700 font-semibold"
                >
                  Get Free Quote
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
