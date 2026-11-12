import { useEffect, useRef } from 'react'

export function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const element = ref.current!
    if (!('IntersectionObserver' in window)) return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const normalized = value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 1632))
    const target = Number(normalized.replace(/[^0-9]/g, ''))
    const format = new Intl.NumberFormat(/[٠-٩]/.test(value) ? 'ar' : 'en')
    const finish = () => { cancelAnimationFrame(frame); element.textContent = value }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      if (media.matches) return
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1100)
        element.textContent = value.replace(/[٠-٩0-9٬,]+/, format.format(Math.round(target * (1 - (1 - progress) ** 3))))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else finish()
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(element)
    media.addEventListener('change', finish)
    return () => { finish(); observer.disconnect(); media.removeEventListener('change', finish) }
  }, [value])
  return <strong aria-label={value}><span ref={ref} aria-hidden="true">{value}</span></strong>
}
