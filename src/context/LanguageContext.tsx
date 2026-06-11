'use client'

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
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // We default to 'en' so that the server renders English.
  // Once mounted, we check localStorage and update if needed.
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language
      if (savedLang && ['en', 'hi', 'gu'].includes(savedLang)) {
        setLanguageState(savedLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
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

    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
