import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Placeholders geométricos con el material "inflable" de la marca.
// Cuando tengas tus objetos (corazón, moño, flor, estrella) modelados y
// exportados como .glb, reemplaza <Shape /> por <primitive object={gltf.scene} />
// manteniendo el mismo wrapper de flotación + rotación.
function Shape({ type, color, size, speed }) {
  const ref = useRef(null)
  const offset = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset.current
    ref.current.position.y += Math.sin(t) * 0.0015
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.y = t * 0.22
  })

  const material = (
    <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} metalness={0} />
  )

  return (
    <mesh ref={ref}>
      {type === 'sphere' && <sphereGeometry args={[size, 32, 32]} />}
      {type === 'box' && <boxGeometry args={[size, size, size]} />}
      {type === 'torus' && <torusGeometry args={[size, size * 0.4, 16, 48]} />}
      {material}
    </mesh>
  )
}

export default function FloatingShapes({ shapes }) {
  return (
    <group>
      {shapes.map((s, i) => (
        <group key={i} position={s.position}>
          <Shape type={s.type} color={s.color} size={s.size} speed={s.speed} />
        </group>
      ))}
    </group>
  )
}
