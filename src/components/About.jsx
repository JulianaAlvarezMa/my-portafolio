import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import ScrollFillTitle from './ScrollFillTitle'
import { Heart, Flower, Cloud, Drop, EnteringObject } from './shapes/DecorativeShapes'
import { useScrollProgressRef } from '../lib/useScrollProgress'

export default function About() {
  const sectionRef = useRef(null)
  const progress = useScrollProgressRef(sectionRef, { start: 1.05, end: 0.45 })

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="section-3d" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 38 }} dpr={[1, 2]}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[2, 3, 4]} intensity={0.9} />
          <Suspense fallback={null}>
            <EnteringObject progressRef={progress} from={[-5.2, 0.9, 0, -0.6]} to={[-3, 0.9, 0]}>
              <Heart scale={0.85} />
            </EnteringObject>
            <EnteringObject progressRef={progress} from={[5.2, 0.75, -0.5, 0.6]} to={[3.1, 0.85, -0.3]}>
              <Flower scale={0.75} />
            </EnteringObject>
            <EnteringObject progressRef={progress} from={[5.2, -1.2, 0, 0.4]} to={[3, -1.1, 0]}>
              <Cloud scale={0.75} />
            </EnteringObject>
            <EnteringObject progressRef={progress} from={[-5.2, -1.2, -0.4, -0.4]} to={[-3, -1.1, -0.2]}>
              <Drop scale={0.65} />
            </EnteringObject>
          </Suspense>
        </Canvas>
      </div>

      <div className="about-content">
        <ScrollFillTitle text="Sobre mi" className="about-title" />
        <p>
          Experiencia en diseño web y desarrollo frontend, con un 
          enfoque en la creación de interfaces atractivas y funcionales. 
          Me apasiona transformar ideas en experiencias digitales que conecten con los usuarios.
        </p>
        {/* <a href="#contact" className="btn btn-outline about-cta">
          trabajemos juntos
        </a> */}
      </div>
    </section>
  )
}
