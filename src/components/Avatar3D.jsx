import { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MATERIAL_BY_PREFIX = [
  { prefix: 'Clothe', color: '#5C1A26', roughness: 0.15, clearcoat: 1 },
  { prefix: 'Hair', color: '#3B1A20', roughness: 0.22, clearcoat: 0.85 },
  { prefix: 'Fleco', color: '#3B1A20', roughness: 0.22, clearcoat: 0.85 },
  { prefix: 'Eyebrow', color: '#33191C', roughness: 0.25, clearcoat: 0.7 },
  { prefix: 'eye', color: '#241512', roughness: 0.05, clearcoat: 1 },
  { prefix: 'Mouth', color: '#5C2320', roughness: 0.18, clearcoat: 0.85 },
  { prefix: 'Body', color: '#C99674', roughness: 0.32, clearcoat: 0.45 },
  { prefix: 'Face', color: '#C99674', roughness: 0.32, clearcoat: 0.45 },
  { prefix: 'Ear', color: '#C99674', roughness: 0.32, clearcoat: 0.45 },
  { prefix: 'Nose', color: '#C99674', roughness: 0.32, clearcoat: 0.45 },
]

const DEFAULT_MATERIAL = { color: '#C99674', roughness: 0.32, clearcoat: 0.45 }

function materialFor(name) {
  const match = MATERIAL_BY_PREFIX.find((m) => name?.startsWith(m.prefix))
  return match || DEFAULT_MATERIAL
}

export default function Avatar3D({
  position = [0, -0.35, 0],
  targetHeight = 2.9,
  pointerRef,
  ...props
}) {
  const { scene } = useGLTF('/models/avatar.glb')
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const eyeRefs = useRef([])
  const initialized = useRef(false)
  const [fit, setFit] = useState({ scale: 1, offset: [0, 0, 0] })

  // Estado del parpadeo: cuándo ocurre el próximo, y en qué punto de la
  // animación (0 = ojos abiertos, 1 = ojos cerrados) va ahora mismo.
  const blink = useRef({ next: 1.4 + Math.random() * 1.8, phase: 0, closing: false })

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    scene.traverse((child) => {
      if (child.isMesh) {
        const cfg = materialFor(child.name)
        child.material = new THREE.MeshPhysicalMaterial({
          color: cfg.color,
          roughness: cfg.roughness,
          clearcoat: cfg.clearcoat,
          clearcoatRoughness: 0.15,
          metalness: 0,
        })
        child.castShadow = false
        child.receiveShadow = false
      }
      if (child.name === 'Face' && child.isMesh && !headRef.current) {
        headRef.current = child
      }
      if (child.name === 'Body' && !child.isMesh && !bodyRef.current) {
        bodyRef.current = child
      }
      if (child.isMesh && child.name?.startsWith('eye')) {
        eyeRefs.current.push(child)
      }
    })

    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const scaleFactor = size.y > 0 ? targetHeight / size.y : 1
    setFit({
      scale: scaleFactor,
      offset: [-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor],
    })
  }, [scene, targetHeight])

  useFrame((state, delta) => {
    // Cursor global si se pasó un pointerRef; si no, cae de vuelta al
    // cursor sobre el canvas (comportamiento anterior).
    const px = pointerRef?.current?.x ?? state.pointer.x
    const py = pointerRef?.current?.y ?? state.pointer.y

    // Movimiento de cabeza/cuerpo bien notorio, tipo "look at".
    const maxYaw = 0.85
    const maxPitch = 0.32

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, px * maxYaw, 0.09)
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -py * maxPitch, 0.09)
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(
        bodyRef.current.rotation.y,
        px * maxYaw * 0.35,
        0.06
      )
    }

    // Parpadeo: no muy seguido, con una animación rápida de cierre/apertura.
    const b = blink.current
    if (!b.closing) {
      b.next -= delta
      if (b.next <= 0) {
        b.closing = true
        b.phase = 0
      }
    } else {
      b.phase += delta / 0.12 // ~120ms por medio parpadeo
      const t = b.phase <= 1 ? b.phase : 2 - b.phase
      const squash = 1 - Math.min(1, Math.max(0, t)) * 0.9
      eyeRefs.current.forEach((eye) => {
        eye.scale.y = squash
      })
      if (b.phase >= 2) {
        b.closing = false
        b.phase = 0
        eyeRefs.current.forEach((eye) => {
          eye.scale.y = 1
        })
        b.next = 1.8 + Math.random() * 2.2
      }
    }
  })

  return (
    <group position={position} {...props}>
      <primitive object={scene} scale={fit.scale} position={fit.offset} />
    </group>
  )
}

useGLTF.preload('/models/avatar.glb')
