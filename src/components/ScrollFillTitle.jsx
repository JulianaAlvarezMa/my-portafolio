import { useEffect, useRef, useState } from 'react'

/**
 * Título que empieza como solo el contorno (delineado) y se va
 * "rellenando" de color sólido a medida que entra en pantalla con el
 * scroll. Úsalo con text="..." — el texto debe ser corto (una línea),
 * porque el relleno usa un pseudo-elemento con el mismo texto duplicado.
 */
export default function ScrollFillTitle({ text, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    function update() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      // Empieza a rellenarse cuando el título entra por abajo del viewport,
      // termina de rellenarse cuando llega a la mitad de la pantalla.
      const start = vh * 0.92
      const end = vh * 0.42
      const raw = (start - rect.top) / (start - end)
      setFill(Math.min(1, Math.max(0, raw)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`fill-title ${className}`}
      data-text={text}
      style={{ '--fill': fill }}
    >
      {text}
    </Tag>
  )
}
