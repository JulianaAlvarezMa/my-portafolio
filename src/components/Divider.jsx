/**
 * Curva decorativa que "corta" el fondo de una sección hacia el color de
 * la siguiente. Se coloca al final de la sección anterior.
 */
export default function Divider({ fill = '#F6EFE3', flip = false }) {
  return (
    <div className={`divider ${flip ? 'divider-flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,110 1440,56 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
