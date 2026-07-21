import en from '@/src/locales/en.json'
import hi from '@/src/locales/hi.json'
import gu from '@/src/locales/gu.json'

const translations: Record<string, any> = { en, hi, gu }

export function getTranslationServer(lang: string, key: string): string {
  const targetLang = ['en', 'hi', 'gu'].includes(lang) ? lang : 'en'
  const keys = key.split('.')
  let val: any = translations[targetLang]

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
