import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { clinic } from '../data/clinic'
import type { Language } from '../data/clinic'
import { LanguageContext } from './LanguageContext'
import { translations } from './translations'

function initialLanguage(): Language {
  try {
    return localStorage.getItem('nawa-language') === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.title = `${clinic.name[language]} | ${clinic.tagline[language]}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', clinic.about[language])
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', document.title)
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', clinic.about[language])
    }
    try {
      localStorage.setItem('nawa-language', language)
    } catch {
      // Language switching remains usable when storage is unavailable.
    }
  }, [language])

  return (
    <LanguageContext
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext>
  )
}
