import { useEffect, useState } from 'react'

/** Track the story card in the reading band without intercepting native scrolling. */
export function useActiveStep() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(Number((entry.target as HTMLElement).dataset.service))
        }
      })
    }, { rootMargin: '-25% 0px -45% 0px', threshold: 0 })
    document.querySelectorAll('[data-service]').forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])
  return active
}
