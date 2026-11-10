import { ArrowUpRight, MapPin, Navigation } from 'lucide-react'
import { clinic } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { SectionLabel } from './SectionHeading'

export function LocationMap() {
  const { language, t } = useLanguage()
  return (
    <section
      id="location"
      className="location-section section-anchor"
      aria-labelledby="location-heading"
    >
      <div className="container">
        <div className="location-header" data-reveal>
          <div>
            <SectionLabel number="04">{t.mapEyebrow}</SectionLabel>
            <h2 id="location-heading">{t.mapHeading}</h2>
            <p>{t.mapDescription}</p>
          </div>
          <a
            className="button button-outline"
            href={clinic.map.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={18} className="directional" aria-hidden="true" />
            {t.directions}
            <ArrowUpRight
              className="directional"
              size={18}
              aria-hidden="true"
            />
          </a>
        </div>
        <div className="map-wrap" data-reveal>
          <iframe
            src={clinic.map.embedUrl}
            title={t.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-caption">
            <span className="map-pin">
              <MapPin size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>{clinic.name[language]}</strong>
              <span>{clinic.contact.address[language]}</span>
            </div>
            <a
              href={clinic.map.directionsUrl}
              aria-label={t.mapFallback}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                className="directional"
                size={23}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
