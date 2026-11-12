import { useEffect, useRef } from 'react'
import type { Language } from '../data/clinic'

/** Keep the final localized value available to assistive technology throughout. */
export function AnimatedStat({ value, language }: { value: string; language: Language }) {
  const visual = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = visual.current
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || media.matches || !('IntersectionObserver' in window)) return
    const digits = value.replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    const target = Number(digits.replace(/[^0-9]/g, ''))
    const formatter = new Intl.NumberFormat(language === 'ar' ? 'ar' : 'en')
    let frame = 0
    const restore = () => { cancelAnimationFrame(frame); element.textContent = value }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1100, 1)
        const number = formatter.format(Math.round(target * (1 - (1 - progress) ** 3)))
        element.textContent = language === 'ar' ? `+${number}` : `${number}+`
        if (progress < 1 && !media.matches) frame = requestAnimationFrame(tick)
        else restore()
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    observer.observe(element)
    media.addEventListener('change', restore)
    return () => { observer.disconnect(); restore(); media.removeEventListener('change', restore) }
  }, [value, language])
  return <strong><span className="sr-only">{value}</span><span ref={visual} aria-hidden="true">{value}</span></strong>
}
