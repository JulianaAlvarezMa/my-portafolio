import { useEffect, useRef } from 'react'

/**
 * Progreso continuo (0 a 1) de qué tan "adentro" de la pantalla está un
 * elemento, actualizado en cada scroll (sin causar re-render: es un ref).
 * start/end son fracciones del alto del viewport: en `start` el progreso
 * es 0, en `end` es 1.
 */
export function useScrollProgressRef(targetRef, { start = 0.95, end = 0.4 } = {}) {
  const progress = useRef(0)

  useEffect(() => {
    function update() {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const startPx = vh * start
      const endPx = vh * end
      const raw = (startPx - rect.top) / (startPx - endPx)
      progress.current = Math.min(1, Math.max(0, raw))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetRef, start, end])

  return progress
}
