import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Avatar3D from './Avatar3D'
import { usePointerRef } from '../lib/usePointer'
import { useMediaQuery } from '../lib/useMediaQuery'

export default function Hero() {
  const pointerRef = usePointerRef()
  const isMobile = useMediaQuery('(max-width: 720px)')

  return (
    <section id="hero" className="hero">
      <div className="hero-copy">
        <h1 className="hero-title">Hola, soy Juliana</h1>
        <p className="hero-sub">
          Desarrolladora frontend, construo interfaces con carácter propio - de la idea al código.
          {/* Diseño identidades visuales, experiencias digitales, con */}
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">Ver proyectos</a>
        </div>
      </div>

      <div className="hero-stage" aria-hidden="true">
        <Canvas
          key={isMobile ? 'mobile' : 'desktop'}
          camera={{ position: [0, 0.1, isMobile ? 5.4 : 6.8], fov: isMobile ? 30 : 28 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} />
          <directionalLight position={[-4, 1, -2]} intensity={0.35} color="#B37B4A" />
          <Suspense fallback={null}>
            <Avatar3D
              pointerRef={pointerRef}
              targetHeight={isMobile ? 1.55 : 2.3}
              position={[0, isMobile ? 0.05 : -0.2, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-fade" aria-hidden="true" />
    </section>
  )
}
