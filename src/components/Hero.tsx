import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { clinic, getWhatsAppUrl } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { AnimatedStat } from './AnimatedStat'
import { ClinicIllustration } from './ClinicIllustration'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Hero() {
  const { language, t } = useLanguage()
  const statLabels = [t.experience, t.patients, t.specialists]
  return (
    <section
      id="home"
      className="hero section-anchor"
      aria-labelledby="hero-heading"
    >
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="scene-orb orb-sage" data-depth="0.18" />
        <div className="scene-orb orb-sand" data-depth="-0.12" />
        <div className="scene-orbit" data-depth="0.09" />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy entrance" data-depth="0.025">
          <div className="eyebrow">
            <span className="status-dot" />
            {t.heroEyebrow}
          </div>
          <h1 id="hero-heading">
            {t.heroHeading}
            <span>
              {t.heroHighlight}
              <svg
                className="headline-line"
                viewBox="0 0 350 17"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 12C88 1 234 1 346 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-description">{t.heroDescription}</p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={getWhatsAppUrl(language)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              {t.bookWhatsapp}
              <ArrowUpRight
                className="directional ms-2"
                size={18}
                aria-hidden="true"
              />
            </a>
            <a className="button button-outline" href="#services">
              {t.viewServices}
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-reassurance">
            <ShieldCheck size={16} aria-hidden="true" />
            {t.heroReassurance}
          </p>
          <div className="hero-stats">
            {clinic.stats.map((stat, index) => (
              <div className="stat" key={stat.id}>
                <AnimatedStat value={stat.value[language]} language={language} />
                <span>{statLabels[index]}</span>
              </div>
            ))}
          </div>
          <p className="demo-stat-note">{t.demoStats}</p>
        </div>
        <div
          className="hero-visual entrance"
          style={{ animationDelay: '130ms' }}
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-dot-grid" aria-hidden="true" />
          <div className="illustration-panel">
            <div className="visual-overline">
              <span className="tiny-cross" aria-hidden="true">
                ✦
              </span>
              <span>
                {clinic.wordmark} / {clinic.tagline[language]}
              </span>
            </div>
            <div data-depth="-0.065"><ClinicIllustration /></div>
            <div className="visual-caption">
              <strong>{t.visualTitle}</strong>
              <span>{t.visualDescription}</span>
            </div>
            <span className="visual-corner" aria-hidden="true">
              <ArrowUpRight size={21} className="directional" />
            </span>
          </div>
          <div className="floating-card care-card" data-depth="0.045">
            <span className="icon-box warm">
              <Heart size={23} aria-hidden="true" />
            </span>
            <div>
              <strong>{t.careBadge}</strong>
              <span>{t.careBadgeSmall}</span>
            </div>
            <Sparkles className="card-sparkle" size={17} aria-hidden="true" />
          </div>
          <div className="floating-card appointment-card" data-depth="-0.045">
            <span className="icon-box">
              <CalendarDays size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>{t.appointmentBadge}</strong>
              <span>{t.appointmentBadgeSmall}</span>
            </div>
            <span className="card-check" aria-hidden="true">
              ✓
            </span>
          </div>
          <span className="floating-plus plus-one" aria-hidden="true">
            +
          </span>
          <span className="floating-plus plus-two" aria-hidden="true">
            +
          </span>
        </div>
      </div>
      <div className="container">
        <div className="care-principles">
          {[t.trust1, t.trust2, t.trust3, t.trust4].map((item, i) => (
            <div key={item}>
              {i % 2 ? (
                <Sparkles size={19} aria-hidden="true" />
              ) : (
                <Heart size={19} aria-hidden="true" />
              )}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
