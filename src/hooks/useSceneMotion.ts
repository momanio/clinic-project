import { useEffect } from 'react'

/** One scheduled frame for all scene layers; geometry is cached on resize. */
export function useSceneMotion() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const layers = [...document.querySelectorAll<HTMLElement>('[data-depth]')]
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let width = innerWidth
    let height = innerHeight
    let positions: number[] = []
    const measure = () => {
      width = innerWidth
      height = innerHeight
      layers.forEach((layer) => layer.style.removeProperty('transform'))
      positions = layers.map((layer) => layer.getBoundingClientRect().top + scrollY)
    }
    const render = () => {
      frame = 0
      const direction = document.documentElement.dir === 'rtl' ? -1 : 1
      layers.forEach((layer, index) => {
        if (media.matches) {
          layer.style.removeProperty('transform')
          return
        }
        const distance = scrollY - positions[index]
        if (distance < -height * 1.5 || distance > height * 1.5) return
        const depth = Number(layer.dataset.depth)
        const intensity = width < 768 ? 0.35 : 1
        const y = Math.max(-90, Math.min(90, distance * depth)) * intensity
        layer.style.transform = `translate3d(${pointerX * depth * 65 * direction}px, ${y + pointerY * depth * 45}px, 0)`
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render) }
    const resize = () => { measure(); schedule() }
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || media.matches) return
      pointerX = event.clientX / width - 0.5
      pointerY = event.clientY / height - 0.5
      schedule()
    }
    const reset = () => { pointerX = 0; pointerY = 0; schedule() }
    measure()
    schedule()
    document.fonts.ready.then(resize)
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', resize)
    document.addEventListener('pointermove', pointer, { passive: true })
    document.addEventListener('pointerleave', reset)
    media.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', schedule)
      removeEventListener('resize', resize)
      document.removeEventListener('pointermove', pointer)
      document.removeEventListener('pointerleave', reset)
      media.removeEventListener('change', schedule)
      layers.forEach((layer) => layer.style.removeProperty('transform'))
    }
  }, [])
}
