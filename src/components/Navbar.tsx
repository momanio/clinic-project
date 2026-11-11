import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { getWhatsAppUrl } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef<HTMLButtonElement>(null)
  const links = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'contact', label: t.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!('IntersectionObserver' in window)) {
      return () => window.removeEventListener('scroll', onScroll)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )
    document
      .querySelectorAll('main > section[id]')
      .forEach((section) => observer.observe(section))
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Brand onNavigate={() => setOpen(false)} />
        <nav className="desktop-nav" aria-label={t.quickLinks}>
          {links.map((link) => (
            <a
              key={link.id}
              className={active === link.id ? 'active' : ''}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 lg:gap-5">
          <LanguageSwitcher onSwitch={() => setOpen(false)} />
          <a
            className="button button-primary nav-book"
            href={getWhatsAppUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.book}
            <ArrowUpRight
              className="directional"
              size={17}
              aria-hidden="true"
            />
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={open ? t.closeMenu : t.menu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        inert={!open}
      >
        <nav className="container" aria-label={t.menu}>
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => {
                setOpen(false)
                setActive(link.id)
                const destination = document.getElementById(link.id)
                destination?.setAttribute('tabindex', '-1')
                destination?.focus({ preventScroll: true })
              }}
            >
              {link.label}
              <ArrowUpRight
                size={18}
                className="directional"
                aria-hidden="true"
              />
            </a>
          ))}
          <a
            className="button button-primary"
            href={getWhatsAppUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            {t.book}
          </a>
        </nav>
      </div>
    </header>
  )
}
