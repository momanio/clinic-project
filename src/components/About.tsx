import {
  ArrowUpRight,
  Check,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  Sprout,
  UsersRound,
} from 'lucide-react'
import { clinic } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { SectionLabel } from './SectionHeading'

export function About() {
  const { language, t } = useLanguage()
  const values = [
    { icon: MessagesSquare, title: t.value1Title, text: t.value1Text },
    { icon: HeartHandshake, title: t.value2Title, text: t.value2Text },
    { icon: UsersRound, title: t.value3Title, text: t.value3Text },
  ]
  return (
    <section
      id="about"
      className="section-pad section-anchor about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="about-grid">
          <div className="about-art" data-reveal>
            <div className="about-art-top">
              <span>{clinic.wordmark}</span>
              <Sprout size={23} strokeWidth={1.4} aria-hidden="true" />
            </div>
            <div className="care-orbits" data-depth="0.075" aria-hidden="true">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />
              <span className="orbit-symbol orbit-heart">
                <HeartPulse size={28} strokeWidth={1.4} />
              </span>
              <span className="orbit-symbol orbit-people">
                <UsersRound size={26} strokeWidth={1.4} />
              </span>
              <span className="orbit-symbol orbit-sprout">
                <Sprout size={26} strokeWidth={1.4} />
              </span>
              <div className="care-orbit-center">
                <HeartHandshake size={55} strokeWidth={1.2} />
              </div>
              <span className="orbit-dot" />
            </div>
            <div className="about-art-caption">
              <p className="about-art-title">{t.aboutVisualTitle}</p>
              <p>{t.aboutVisualDescription}</p>
            </div>
          </div>
          <div className="about-copy" data-reveal>
            <SectionLabel number="01">{t.aboutEyebrow}</SectionLabel>
            <h2 id="about-heading">
              {t.aboutHeading}
              <span className="text-primary">{t.aboutHighlight}</span>
            </h2>
            <p className="body-lead">{clinic.about[language]}</p>
            <p className="body-copy">{clinic.story[language]}</p>
            <h3 className="why-title">{t.whyTitle}</h3>
            <ul className="why-list">
              {[t.why1, t.why2, t.why3].map((item) => (
                <li key={item}>
                  <span>
                    <Check size={14} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a className="text-link" href="#contact">
              {t.aboutLink}
              <ArrowUpRight
                className="directional"
                size={18}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <div className="values-grid">
          {values.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className="value-card"
              data-reveal
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="value-icon">
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
