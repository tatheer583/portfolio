'use client'

import * as React from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 80 }: { count?: number }) {
  const points = React.useRef<THREE.Points>(null)
  const lines = React.useRef<THREE.LineSegments>(null)
  const { size } = useThree()

  const [positions, colors] = React.useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color('#6C63FF')
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return [positions, colors]
  }, [count])

  const velocities = React.useMemo(
    () => Array.from({ length: count }, () => (Math.random() - 0.5) * 0.003),
    [count]
  )

  const lineGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const maxConnections = count * 3
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxConnections * 6), 3))
    return geo
  }, [count])

  useFrame(() => {
    if (!points.current) return
    const pos = points.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += velocities[i]
      if (arr[i * 3 + 1] > 4 || arr[i * 3 + 1] < -4) velocities[i] *= -1
    }
    pos.needsUpdate = true

    if (lines.current) {
      const lpos = lines.current.geometry.attributes.position as THREE.BufferAttribute
      const larr = lpos.array as Float32Array
      let idx = 0
      const maxDist = 2.2
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (idx >= larr.length) break
          const dx = arr[i * 3] - arr[j * 3]
          const dy = arr[i * 3 + 1] - arr[j * 3 + 1]
          const dz = arr[i * 3 + 2] - arr[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < maxDist) {
            larr[idx++] = arr[i * 3]
            larr[idx++] = arr[i * 3 + 1]
            larr[idx++] = arr[i * 3 + 2]
            larr[idx++] = arr[j * 3]
            larr[idx++] = arr[j * 3 + 1]
            larr[idx++] = arr[j * 3 + 2]
          }
        }
      }
      lines.current.geometry.setDrawRange(0, idx / 3)
      lpos.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} />
      </points>
      <lineSegments ref={lines}>
        <primitive object={lineGeometry} attach="geometry" />
        <lineBasicMaterial color="#6C63FF" transparent opacity={0.18} />
      </lineSegments>
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
