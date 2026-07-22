'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ErrorMessageProps {
  message?: any
  id?: string
}

export function ErrorMessage({ message, id }: ErrorMessageProps) {
  // Gracefully extract string messages from react-hook-form FieldError objects
  const displayMessage = typeof message === 'string'
    ? message
    : (message && typeof message === 'object' && 'message' in message && typeof message.message === 'string')
      ? message.message
      : undefined

  return (
    <AnimatePresence mode="wait">
      {displayMessage && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="text-[11px] font-medium text-red-500 mt-1 select-none leading-normal tracking-wide"
          role="alert"
        >
          {displayMessage}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
