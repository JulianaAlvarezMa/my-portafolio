import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function glossyMaterial(color) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    metalness: 0,
  })
}

function useExtrudedShape(buildShape, depth) {
  return useMemo(() => {
    const shape = buildShape()
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: depth * 0.35,
      bevelSize: depth * 0.3,
      bevelSegments: 6,
      curveSegments: 24,
    })
    geometry.center()
    return geometry
  }, [buildShape, depth])
}

function buildHeartShape() {
  const shape = new THREE.Shape()
  const x = 0
  const y = 0
  shape.moveTo(x, y)
  shape.bezierCurveTo(x, y - 0.35, x - 0.7, y - 0.35, x - 0.7, y + 0.1)
  shape.bezierCurveTo(x - 0.7, y + 0.5, x - 0.3, y + 0.75, x, y + 1)
  shape.bezierCurveTo(x + 0.3, y + 0.75, x + 0.7, y + 0.5, x + 0.7, y + 0.1)
  shape.bezierCurveTo(x + 0.7, y - 0.35, x, y - 0.35, x, y)
  return shape
}

function buildDropShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.95)
  shape.bezierCurveTo(0.58, 0.38, 0.58, -0.38, 0, -0.8)
  shape.bezierCurveTo(-0.58, -0.38, -0.58, 0.38, 0, 0.95)
  return shape
}

export function Heart({ color = '#5C1A26', scale = 1 }) {
  const geometry = useExtrudedShape(buildHeartShape, 0.35)
  const material = useMemo(() => glossyMaterial(color), [color])
  return <mesh geometry={geometry} material={material} scale={scale} rotation={[0, 0, Math.PI]} />
}

export function Drop({ color = '#B37B4A', scale = 1 }) {
  const geometry = useExtrudedShape(buildDropShape, 0.32)
  const material = useMemo(() => glossyMaterial(color), [color])
  return <mesh geometry={geometry} material={material} scale={scale} rotation={[0, 0, -0.45]} />
}

export function Flower({ color = '#8C4A56', centerColor = '#EDE3D1', scale = 1 }) {
  const petalMaterial = useMemo(() => glossyMaterial(color), [color])
  const centerMaterial = useMemo(() => glossyMaterial(centerColor), [centerColor])
  const petals = 6
  return (
    <group scale={scale}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / petals
        const r = 0.5
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}
            rotation={[0, 0, angle]}
            material={petalMaterial}
          >
            <sphereGeometry args={[0.4, 20, 20]} />
          </mesh>
        )
      })}
      <mesh material={centerMaterial}>
        <sphereGeometry args={[0.32, 20, 20]} />
      </mesh>
    </group>
  )
}

export function Cloud({ color = '#EDE3D1', scale = 1 }) {
  const material = useMemo(() => glossyMaterial(color), [color])
  const puffs = [
    { pos: [-0.5, -0.05, 0], r: 0.42 },
    { pos: [0, 0.14, 0], r: 0.52 },
    { pos: [0.52, -0.02, 0], r: 0.4 },
    { pos: [-0.16, -0.24, 0], r: 0.36 },
    { pos: [0.3, -0.26, 0], r: 0.34 },
  ]
  return (
    <group scale={scale}>
      {puffs.map((p, i) => (
        <mesh key={i} position={p.pos} material={material}>
          <sphereGeometry args={[p.r, 22, 22]} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Wrapper genérico: el objeto entra desde `from` (fuera de pantalla) y se
 * asienta en `to` a medida que `progressRef.current` avanza de 0 a 1 con
 * el scroll (ver useScrollProgressRef). Al llegar a 1 sigue flotando y
 * rotando suavemente en su lugar final.
 */
export function EnteringObject({ progressRef, from, to, speed = 0.4, children }) {
  const group = useRef(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const p = progressRef?.current ?? 1
    const ease = p >= 1 ? 1 : 1 - Math.pow(1 - p, 3)

    g.position.x = THREE.MathUtils.lerp(from[0], to[0], ease)
    g.position.y = THREE.MathUtils.lerp(from[1], to[1], ease)
    g.position.z = THREE.MathUtils.lerp(from[2], to[2], ease)
    g.rotation.z = THREE.MathUtils.lerp(from[3] ?? 0, 0, ease)

    if (p >= 1) {
      const time = state.clock.elapsedTime * speed
      g.position.y = to[1] + Math.sin(time) * 0.08
      g.rotation.y = time * 0.4
      g.rotation.x = Math.sin(time * 0.7) * 0.15
    }
  })

  return <group ref={group}>{children}</group>
}
