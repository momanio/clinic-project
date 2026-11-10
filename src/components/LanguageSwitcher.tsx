import { Globe2 } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

export function LanguageSwitcher({ onSwitch }: { onSwitch?: () => void }) {
  const { language, setLanguage, t } = useLanguage()
  return (
    <button
      className="language-switch"
      type="button"
      aria-label={t.switchLanguage}
      lang={language === 'ar' ? 'en' : 'ar'}
      onClick={() => {
        setLanguage(language === 'ar' ? 'en' : 'ar')
        onSwitch?.()
      }}
    >
      <Globe2 size={17} aria-hidden="true" />
      <span>{t.languageName}</span>
    </button>
  )
}
