import { createContext } from 'react'
import type { Language } from '../data/clinic'
import type { Translations } from './translations'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
