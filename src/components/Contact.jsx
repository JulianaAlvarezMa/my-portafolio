import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function DynamicAccent() {
  const ref = useRef(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.35
    ref.current.rotation.y = t * 0.5
    ref.current.position.y = Math.sin(t * 0.6) * 0.25
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.1, 0.34, 180, 24]} />
      <meshPhysicalMaterial color="#5C1A26" roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  )
}

function LinkedInIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-3d contact-3d" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 4]} intensity={1} />
          <Suspense fallback={null}>
            <DynamicAccent />
          </Suspense>
        </Canvas>
      </div>

      <div className="contact-content">
        <h2 className="contact-title">Mantengamonos en contacto</h2>
        <a
          className="contact-email"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=almalagonjuliana%40gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir a almalagonjuliana@gmail.com"
        >
          almalagonjuliana@gmail.com
        </a>

        <div className="contact-socials">
          <a
            href="https://linkedin.com/in/juliana-alvarez-malagon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="social-icon"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/JulianaAlvarezMa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-icon"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
