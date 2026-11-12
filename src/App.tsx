import { useEffect } from 'react'
import { clinic } from './data/clinic'
import { useLanguage } from './i18n/useLanguage'
import { useSceneMotion } from './hooks/useSceneMotion'
import { useScrollReveal } from './hooks/useScrollReveal'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Contact } from './components/Contact'
import { LocationMap } from './components/LocationMap'
import { Footer } from './components/Footer'
import { WhatsAppButton } from './components/WhatsAppButton'

export default function App() {
  const { t } = useLanguage()
  useScrollReveal()
  useSceneMotion()

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--clinic-primary', clinic.brand.primary)
    root.style.setProperty('--clinic-accent', clinic.brand.accent)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', clinic.brand.primary)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Contact />
        <LocationMap />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
