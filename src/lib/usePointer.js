import { useEffect, useRef } from 'react'

/**
 * Devuelve un ref con la posición normalizada del cursor (-1 a 1),
 * actualizado en toda la ventana — no solo cuando el mouse está sobre
 * el canvas. Así el avatar puede "mirar" el cursor sin bloquear clics
 * en el texto o los botones que están debajo/encima visualmente.
 */
export function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return pointer
}
