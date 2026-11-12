import { useEffect } from 'react'

/** One scheduled paint per input event; geometry is cached on resize, never per scroll. */
export function useParallax() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(pointer: fine)')
    const elements = [...document.querySelectorAll<HTMLElement>('[data-depth]')]
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let geometry: { element: HTMLElement; top: number; height: number; depth: number }[] = []
    const paint = () => {
      frame = 0
      if (reduced.matches) return
      const mobile = innerWidth < 768 ? 0.25 : 1
      const direction = document.documentElement.dir === 'rtl' ? -1 : 1
      geometry.forEach(({ element, top, height, depth }) => {
        const offset = scrollY - top
        if (offset < -innerHeight || offset > height + innerHeight) return
        const y = Math.max(-100, Math.min(100, offset * depth * mobile))
        element.style.transform = `translate3d(${pointerX * depth * direction}px, ${y + pointerY * depth}px, 0)`
      })
    }
    const schedule = () => {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(paint)
    }
    const measure = () => {
      geometry = elements.map(element => {
        const parent = element.closest('section')!
        const box = parent.getBoundingClientRect()
        return { element, top: box.top + scrollY, height: box.height, depth: Number(element.dataset.depth) }
      })
      schedule()
    }
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return
      pointerX = (event.clientX / innerWidth - 0.5) * 90
      pointerY = (event.clientY / innerHeight - 0.5) * 60
      schedule()
    }
    const resetPointer = () => { pointerX = 0; pointerY = 0; schedule() }
    const preference = () => {
      cancelAnimationFrame(frame)
      frame = 0
      elements.forEach(element => element.style.removeProperty('transform'))
      if (!reduced.matches) measure()
    }
    const resize = new ResizeObserver(measure)
    document.querySelectorAll('main > section').forEach(section => resize.observe(section))
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', resetPointer)
    reduced.addEventListener('change', preference)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', resetPointer)
      reduced.removeEventListener('change', preference)
      elements.forEach(element => element.style.removeProperty('transform'))
    }
  }, [])
}
