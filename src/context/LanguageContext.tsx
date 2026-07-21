'use client'
// Touched to invalidate next.js json bundle cache

import React, { createContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import hi from '../locales/hi.json'
import gu from '../locales/gu.json'

export type Language = 'en' | 'hi' | 'gu'

const translations: Record<Language, any> = {
  en,
  hi,
  gu,
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translateWithFallback: (key: string, fallback: string) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
}: {
  children: React.ReactNode
  defaultLanguage?: Language
}) {
  // Initialize with server-provided defaultLanguage
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('as-events-language') as Language
      if (savedLang && ['en', 'hi', 'gu'].includes(savedLang)) {
        setLanguageState(savedLang)
        document.cookie = `as-events-language=${savedLang};path=/;max-age=31536000`
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('as-events-language', lang)
      document.cookie = `as-events-language=${lang};path=/;max-age=31536000`
    }
  }

  // Update HTML document lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let val: any = translations[language]

    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k]
      } else {
        val = undefined
        break
      }
    }

    if (val !== undefined && typeof val === 'string') {
      return val
    }

    // Fallback to English
    let fallbackVal: any = translations['en']
    for (const k of keys) {
      if (fallbackVal && typeof fallbackVal === 'object' && k in fallbackVal) {
        fallbackVal = fallbackVal[k]
      } else {
        fallbackVal = undefined
        break
      }
    }

    if (fallbackVal !== undefined && typeof fallbackVal === 'string') {
      return fallbackVal
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing translation: ${key}`)
    }

    return key
  }

  const translateWithFallback = (key: string, fallback: string): string => {
    const value = t(key)
    return !value || value === key ? fallback : value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateWithFallback }}>
      {children}
    </LanguageContext.Provider>
  )
}
