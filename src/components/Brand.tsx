import { clinic } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'

export function Brand({
  light = false,
  onNavigate,
}: {
  light?: boolean
  onNavigate?: () => void
}) {
  const { language } = useLanguage()
  return (
    <a
      href="#home"
      className={`brand ${light ? 'brand-light' : ''}`}
      onClick={onNavigate}
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path
            d="M20 5C12 5 12 15 20 20C28 15 28 5 20 5Z"
            fill="currentColor"
          />
          <path
            d="M35 20C35 12 25 12 20 20C25 28 35 28 35 20Z"
            fill="currentColor"
            opacity=".7"
          />
          <path
            d="M20 35C28 35 28 25 20 20C12 25 12 35 20 35Z"
            fill="currentColor"
          />
          <path
            d="M5 20C5 28 15 28 20 20C15 12 5 12 5 20Z"
            fill="currentColor"
            opacity=".7"
          />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>{clinic.name[language]}</strong>
        <span>{clinic.tagline[language]}</span>
      </span>
    </a>
  )
}
