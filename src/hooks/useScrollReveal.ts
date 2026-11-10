import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || !('IntersectionObserver' in window)) return
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    elements.forEach((element) => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    const showAll = () => {
      if (media.matches) {
        elements.forEach((element) => element.classList.add('is-visible'))
        observer.disconnect()
      }
    }
    media.addEventListener('change', showAll)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', showAll)
      elements.forEach((element) => element.classList.remove('reveal-ready'))
    }
  }, [])
}
