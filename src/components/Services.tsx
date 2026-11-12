import { useActiveStep } from '../hooks/useActiveStep'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { clinic, getWhatsAppUrl } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { SectionLabel } from './SectionHeading'

export function Services() {
  const { language, t } = useLanguage()
  const active = useActiveStep()
  return (
    <section
      id="services"
      className="section-pad section-anchor services-section"
      aria-labelledby="services-heading"
    >
      <div className="section-orb" data-depth="-0.07" aria-hidden="true" />
      <div className="container services-story">
        <div className="section-heading-row services-sticky">
          <div>
            <SectionLabel number="02">{t.servicesEyebrow}</SectionLabel>
            <h2 id="services-heading">
              {t.servicesHeading}
              <span className="text-primary">{t.servicesHighlight}</span>
            </h2>
          </div>
          <p className="section-intro">{t.servicesDescription}</p>
          <div className="story-orbit" aria-hidden="true">
            <span className="story-core">{String(active + 1).padStart(2, '0')}</span>
            {clinic.services.map((service, index) => <span key={service.id} className={`story-dot ${index <= active ? 'is-active' : ''}`} style={{ rotate: `${index * 60}deg` }} />)}
          </div>
          <div className="story-progress" aria-hidden="true">{clinic.services.map((service, index) => <span key={service.id} className={index <= active ? 'is-active' : ''} />)}</div>
        </div>
        <div className="services-grid">
          {clinic.services.map(
            ({ id, icon: Icon, title, description }, index) => (
              <article
                key={id}
                className="service-card"
                data-service={index}
                data-reveal
              >
                <div className="service-top">
                  <span className="service-icon">
                    <Icon size={30} strokeWidth={1.35} aria-hidden="true" />
                  </span>
                  <span className="service-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3>{title[language]}</h3>
                <p>{description[language]}</p>
                <a
                  className="service-link"
                  href={getWhatsAppUrl(
                    language,
                    `${t.serviceMessage} ${title[language]}`,
                  )}
                  aria-label={`${t.serviceAction}: ${title[language]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.serviceAction}</span>
                  <span className="service-arrow">
                    <ArrowUpRight
                      className="directional"
                      size={19}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </article>
            ),
          )}
        </div>
        <div className="services-footnote" data-reveal>
          <MessageCircle size={19} aria-hidden="true" />
          <span>{t.servicesNote}</span>
          <a href="#contact">
            {t.servicesNoteLink}
            <ArrowUpRight
              size={16}
              className="directional"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
