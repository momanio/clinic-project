import { useEffect, useState } from 'react'
import { getWhatsAppUrl } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { WhatsAppIcon } from './WhatsAppIcon'

export function WhatsAppButton() {
  const { language, t } = useLanguage()
  const [nearForm, setNearForm] = useState(false)

  useEffect(() => {
    // On small screens, yield the floating corner to the booking form.
    const form = document.querySelector('.contact-form-wrap')
    if (!form || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setNearForm(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      className={`floating-whatsapp ${nearForm ? 'near-form' : ''}`}
      href={getWhatsAppUrl(language)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappLabel}
    >
      <WhatsAppIcon />
      <span>{t.whatsappText}</span>
    </a>
  )
}
