'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Edges, Line } from '@react-three/drei'
import * as THREE from 'three'

type Point = [number, number, number]
type Props = { slug: string; reducedMotion?: boolean; animationPaused?: boolean }
const C = { ink: '#5e6658', sage: '#a6b99b', gray: '#d1d9d1', cream: '#fff1c8', gold: '#d5b272', coral: '#c9967b' }

export function projectModelLabel(slug: string): string {
  const labels: Record<string, string> = {
    'skardu-spring': 'Water bottle study', 'khidmat-app': 'Connected AI agents',
    'personal-finance-manager': 'Finance dashboard study', 'medi-connect': 'Connected healthcare study',
    'jarvis-ai-assistant': 'Voice & AI core', 'cyber-sathi': 'Security shield study',
    'e-nose-system': 'Five-sensor study', 'wiwave-motion': 'WiFi signal study',
    'drone-ai-system': 'Drone vision study', 'agevee-travel': 'Travel globe study',
    'iot-security-system': 'Connected sensors study', 'mechanical-concept': 'Kinetic gear study',
  }
  return labels[slug] || 'Product concept study'
}

function Block({ position = [0, 0, 0], size, color = C.gray, rotation }: { position?: Point; size: Point; color?: string; rotation?: Point }) {
  return <mesh position={position} rotation={rotation} castShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.63} /><Edges color={C.ink} threshold={28} /></mesh>
}
function Ball({ position = [0, 0, 0], radius = 0.12, color = C.sage }: { position?: Point; radius?: number; color?: string }) {
  return <mesh position={position} castShadow><sphereGeometry args={[radius, 16, 12]} /><meshStandardMaterial color={color} roughness={0.65} /></mesh>
}

function WaveGrid({ paused }: { paused: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const seconds = useRef(0)
  const object = useMemo(() => new THREE.Object3D(), [])
  const invalidate = useThree((state) => state.invalidate)
  const update = (time: number) => {
    if (!mesh.current) return
    for (let i = 0; i < 81; i++) {
      const x = (i % 9 - 4) * 0.17
      const z = (Math.floor(i / 9) - 4) * 0.17
      object.position.set(x, Math.sin(Math.hypot(x, z) * 8 - time * 2.4) * 0.19, z)
      object.updateMatrix()
      mesh.current.setMatrixAt(i, object.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }
  useEffect(() => { update(seconds.current); invalidate() }) // Reapply a static wave after mounting.
  useFrame((_, delta) => {
    if (paused) return
    seconds.current += Math.min(delta, 0.05)
    update(seconds.current)
  })
  return <group>
    <Block size={[1.68, 0.06, 1.68]} position={[0, -0.3, 0]} color={C.cream} />
    <instancedMesh ref={mesh} args={[undefined, undefined, 81]}>
      <sphereGeometry args={[0.034, 8, 6]} /><meshStandardMaterial color={C.sage} roughness={0.5} />
    </instancedMesh>
    {[-0.68, -0.34, 0, 0.34, 0.68].map((x) => <Line key={x} points={[[x, -0.26, -0.7], [x, -0.26, 0.7]]} color="#b9bc9d" lineWidth={0.8} />)}
    <Ball position={[0, 0.48, 0]} radius={0.09} color={C.gold} />
  </group>
}

function AIHeart({ paused, security = false }: { paused: boolean; security?: boolean }) {
  const rings = useRef<THREE.Group>(null)
  const seconds = useRef(0)
  useFrame((_, delta) => {
    if (paused || !rings.current) return
    seconds.current += Math.min(delta, 0.05)
    rings.current.rotation.y = seconds.current * 0.45
    rings.current.rotation.z = Math.sin(seconds.current * 0.7) * 0.15
  })
  return <group>
    <mesh castShadow><icosahedronGeometry args={[0.37, 1]} /><meshStandardMaterial color={security ? C.gray : C.sage} roughness={0.55} /><Edges color={C.ink} /></mesh>
    <group ref={rings}>
      {[0, 1, 2].map((i) => <group key={i} rotation={[i * 0.72, i * 0.62, i * 0.41]}>
        <mesh><torusGeometry args={[0.67 + i * 0.045, 0.014, 6, 48]} /><meshStandardMaterial color={i === 1 ? C.gold : C.gray} /></mesh>
        <Ball position={[0.67 + i * 0.045, 0, 0]} radius={0.065} color={i === 1 ? C.coral : C.gold} />
      </group>)}
    </group>
  </group>
}

function Propeller({ position, paused, direction }: { position: Point; paused: boolean; direction: number }) {
  const blades = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (!paused && blades.current) blades.current.rotation.y += Math.min(delta, 0.05) * direction * 7 })
  return <group position={position}>
    <mesh><cylinderGeometry args={[0.1, 0.09, 0.11, 12]} /><meshStandardMaterial color={C.gray} /></mesh>
    <group ref={blades}><Block size={[0.63, 0.025, 0.075]} position={[0, 0.08, 0]} color={C.sage} /><Block size={[0.075, 0.025, 0.63]} position={[0, 0.08, 0]} color={C.sage} /></group>
  </group>
}
function Drone({ paused }: { paused: boolean }) {
  return <group>
    <Block size={[0.54, 0.17, 0.59]} color={C.cream} />
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => <group key={x + ':' + z}>
      <Line points={[[x * 0.2, 0, z * 0.2], [x * 0.6, 0, z * 0.6]]} color={C.ink} lineWidth={8} />
      <Propeller position={[x * 0.62, 0.02, z * 0.62]} paused={paused} direction={x * z} />
      <Block position={[x * 0.24, -0.22, z * 0.27]} size={[0.045, 0.3, 0.045]} color={C.gray} />
    </group>))}
    <mesh position={[0, -0.15, 0.35]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.1, 0.1, 0.13, 16]} /><meshStandardMaterial color={C.ink} /></mesh>
  </group>
}

function Gear({ radius, teeth = 16, position, paused, direction = 1 }: { radius: number; teeth?: number; position: Point; paused: boolean; direction?: number }) {
  const group = useRef<THREE.Group>(null)
  const shape = useMemo(() => {
    const path = new THREE.Shape()
    for (let i = 0; i <= teeth * 4; i++) {
      const angle = i / (teeth * 4) * Math.PI * 2
      const r = radius * (i % 4 === 0 || i % 4 === 3 ? 0.84 : 1)
      const x = Math.cos(angle) * r, y = Math.sin(angle) * r
      if (i === 0) path.moveTo(x, y); else path.lineTo(x, y)
    }
    const hole = new THREE.Path()
    hole.absarc(0, 0, radius * 0.2, 0, Math.PI * 2, true)
    path.holes.push(hole)
    return path
  }, [radius, teeth])
  useFrame((_, delta) => { if (!paused && group.current) group.current.rotation.z += Math.min(delta, 0.05) * 0.35 * direction })
  return <group ref={group} position={position}>
    <mesh castShadow><extrudeGeometry args={[shape, { depth: 0.09, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 1 }]} /><meshStandardMaterial color={direction === 1 ? C.gold : C.sage} roughness={0.58} /><Edges color={C.ink} threshold={40} /></mesh>
  </group>
}
function GearStudy({ paused }: { paused: boolean }) {
  return <group>
    <Gear radius={0.52} teeth={20} position={[-0.31, 0.08, 0]} paused={paused} />
    <Gear radius={0.36} teeth={14} position={[0.48, 0.06, 0]} paused={paused} direction={-1.43} />
    <Block size={[1.48, 0.07, 0.42]} position={[0.05, -0.55, 0]} color={C.gray} />
  </group>
}

function Bottle() {
  return <group>
    <mesh castShadow><cylinderGeometry args={[0.26, 0.29, 1.06, 24]} /><meshStandardMaterial color="#c5dccd" roughness={0.32} metalness={0.06} /><Edges color={C.ink} threshold={50} /></mesh>
    <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.12, 0.25, 0.18, 24]} /><meshStandardMaterial color="#c5dccd" roughness={0.32} /></mesh>
    <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.13, 0.13, 0.18, 24]} /><meshStandardMaterial color={C.gold} /></mesh>
    <mesh><cylinderGeometry args={[0.295, 0.295, 0.3, 24]} /><meshStandardMaterial color={C.cream} /></mesh>
    <mesh position={[0, -0.57, 0]}><cylinderGeometry args={[0.38, 0.38, 0.08, 24]} /><meshStandardMaterial color={C.gray} /></mesh>
  </group>
}
function Agents() {
  const positions = Array.from({ length: 6 }, (_, i) => [Math.cos(i * Math.PI / 3) * 0.7, Math.sin(i * Math.PI / 3) * 0.7, Math.sin(i * 2) * 0.2] as Point)
  return <group><Ball radius={0.23} color={C.gold} />{positions.map((position, i) => <group key={i}><Line points={[[0, 0, 0], position]} color={C.ink} lineWidth={1.1} /><Ball position={position} radius={0.14} color={i % 2 ? C.gray : C.sage} /></group>)}</group>
}
function Dashboard() {
  return <group><Block size={[1.62, 0.1, 0.76]} position={[0, -0.46, 0]} color={C.gray} />{[0.32, 0.58, 0.42, 0.82, 0.65].map((height, i) => <Block key={i} size={[0.2, height, 0.3]} position={[-0.6 + i * 0.3, height / 2 - 0.38, 0]} color={i % 2 ? C.gold : C.sage} />)}</group>
}
function Sensors({ house = false }: { house?: boolean }) {
  return <group>
    <Block size={[1.5, 0.12, 0.8]} position={[0, -0.23, 0]} color={C.gray} />
    {[-0.56, -0.28, 0, 0.28, 0.56].map((x, i) => <group key={x}><mesh position={[x, i % 2 * 0.08, 0]}><cylinderGeometry args={[0.105, 0.105, 0.35, 16]} /><meshStandardMaterial color={i % 2 ? C.gold : C.sage} /><Edges color={C.ink} threshold={35} /></mesh></group>)}
    {house && <Line points={[[-0.62, 0.32, 0.08], [-0.62, 0.75, 0.08], [0, 1.08, 0.08], [0.62, 0.75, 0.08], [0.62, 0.32, 0.08]]} color={C.ink} lineWidth={2} />}
  </group>
}
function Healthcare() {
  return <group><Block size={[0.32, 1.25, 0.26]} color={C.sage} /><Block size={[1.25, 0.32, 0.26]} color={C.sage} />{[-0.69, 0.69].map((x) => <Ball key={x} position={[x, -0.54, 0]} radius={0.11} color={C.gold} />)}<Line points={[[-0.69, -0.54, 0], [0, -0.8, 0], [0.69, -0.54, 0]]} color={C.ink} lineWidth={1.2} /></group>
}
function Globe() {
  return <group><mesh><sphereGeometry args={[0.6, 24, 20]} /><meshStandardMaterial color={C.sage} roughness={0.72} wireframe /></mesh><mesh rotation={[0.2, 0, -0.3]}><torusGeometry args={[0.68, 0.023, 6, 64]} /><meshStandardMaterial color={C.gold} /></mesh><Ball position={[0.5, 0.26, 0.15]} radius={0.075} color={C.coral} /></group>
}
function Shield() {
  const shape = useMemo(() => {
    const result = new THREE.Shape()
    result.moveTo(0, 0.72)
    result.lineTo(0.56, 0.48)
    result.lineTo(0.43, -0.32)
    result.lineTo(0, -0.72)
    result.lineTo(-0.43, -0.32)
    result.lineTo(-0.56, 0.48)
    result.closePath()
    return result
  }, [])
  return <group>
    <mesh castShadow><extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1 }]} /><meshStandardMaterial color={C.sage} roughness={0.58} /><Edges color={C.ink} /></mesh>
    <Line points={[[-0.23, 0.02, 0.14], [-0.04, -0.17, 0.14], [0.3, 0.2, 0.14]]} color={C.cream} lineWidth={4} />
  </group>
}

export default function ProjectModel({ slug, reducedMotion = false, animationPaused = false }: Props) {
  const group = useRef<THREE.Group>(null)
  const seconds = useRef(0)
  const paused = reducedMotion || animationPaused
  useFrame((_, delta) => {
    if (paused || !group.current) return
    seconds.current += Math.min(delta, 0.05)
    group.current.rotation.y = seconds.current * 0.2
  })
  return <group ref={group} rotation={[0.09, -0.18, 0]}>
    {slug === 'wiwave-motion' ? <WaveGrid paused={paused} />
      : slug === 'drone-ai-system' ? <Drone paused={paused} />
        : slug === 'skardu-spring' ? <Bottle />
          : slug === 'khidmat-app' ? <Agents />
            : slug === 'personal-finance-manager' ? <Dashboard />
              : slug === 'medi-connect' ? <Healthcare />
                : slug === 'e-nose-system' ? <Sensors />
                  : slug === 'iot-security-system' ? <Sensors house />
                    : slug === 'agevee-travel' ? <Globe />
                      : slug === 'cyber-sathi' ? <Shield />
                        : slug === 'mechanical-concept' ? <GearStudy paused={paused} />
                        : <AIHeart paused={paused} security={slug === 'cyber-sathi'} />}
  </group>
}

