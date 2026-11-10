import { ArrowUpRight, Sprout } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { Brand } from './Brand'
import { SocialIcon } from './SocialIcon'

export function Footer() {
  const { language, t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand light />
            <p>{t.footerDescription}</p>
            <div className="social-links">
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.instagram}
              >
                <SocialIcon network="instagram" />
              </a>
              <a
                href={clinic.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.facebook}
              >
                <SocialIcon network="facebook" />
              </a>
              <span>{t.followUs}</span>
            </div>
          </div>
          <div className="footer-column">
            <h2>{t.quickLinks}</h2>
            <nav aria-label={t.quickLinks}>
              {[
                { id: 'home', label: t.home },
                { id: 'about', label: t.about },
                { id: 'services', label: t.services },
                { id: 'contact', label: t.contact },
              ].map(({ id, label }) => (
                <a href={`#${id}`} key={id}>
                  {label}
                  <ArrowUpRight
                    className="directional"
                    size={14}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>
          <div className="footer-column">
            <h2>{t.findUs}</h2>
            <p>{clinic.contact.address[language]}</p>
            <a
              className="footer-contact-link"
              href={`tel:${clinic.contact.phoneHref}`}
              dir="ltr"
            >
              {clinic.contact.phone}
            </a>
            <a
              className="footer-contact-link"
              href={`mailto:${clinic.contact.email}`}
              dir="ltr"
            >
              {clinic.contact.email}
            </a>
          </div>
          <div className="footer-column">
            <h2>{t.hours}</h2>
            <p>{clinic.contact.workingHours[language]}</p>
            <p>{clinic.contact.closed[language]}</p>
            <div className="footer-tagline">
              <Sprout size={19} aria-hidden="true" />
              <span>{clinic.tagline[language]}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{' '}
            <a
              className="inline-flex min-h-11 items-center underline decoration-white/40 underline-offset-4 hover:text-white"
              href={clinic.copyright.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {clinic.copyright.name[language]}
            </a>
            . {t.copyright}
          </p>
          <span>
            <i aria-hidden="true" />
            {t.demoNote}
          </span>
        </div>
      </div>
    </footer>
  )
}
