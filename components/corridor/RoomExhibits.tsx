'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Edges, Html, Line } from '@react-three/drei'
import { ChevronLeft, ChevronRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import * as THREE from 'three'
import { PROJECTS } from '@/data/projects'
import { SKILLS } from '@/data/skills'
import { EDUCATION, EXPERIENCE } from '@/data/experience'
import { SITE } from '@/lib/constants'
import ProjectModel, { projectModelLabel } from './NewProjectModel'

type Room = 'projects' | 'about' | 'journey' | 'contact'
type Point = [number, number, number]
type ExhibitProps = {
  room: Room; reducedMotion?: boolean; labelsVisible?: boolean; animationPaused?: boolean
  projectIndex?: number; onProjectIndexChange?: (index: number) => void; onOpenProject?: (index: number) => void
}
const LabelVisibilityContext = createContext(true)
const AnimationPausedContext = createContext(false)

const COLORS = {
  ink: '#5e6050', paper: '#fff6d8', yellow: '#f4df9a',
  sage: '#a7b397', gray: '#d6dad2', ochre: '#c7a467', clay: '#c89579',
}

function Box({ size, position = [0, 0, 0], color = COLORS.paper, rotation }: {
  size: Point; position?: Point; color?: string; rotation?: Point
}) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow>
    <boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.8} />
    <Edges color={COLORS.ink} threshold={25} />
  </mesh>
}

function Placard({ children, position, className = '', distanceFactor = 3 }: {
  children: ReactNode; position: Point; className?: string; distanceFactor?: number
}) {
  const labelsVisible = useContext(LabelVisibilityContext)
  const invalidate = useThree((state) => state.invalidate)
  const element = useRef<HTMLDivElement | null>(null)
  const warmupFrames = useRef(0)
  const onLabelMount = useCallback((node: HTMLDivElement | null) => {
    element.current = node
    if (node) {
      node.style.visibility = 'hidden'
      warmupFrames.current = 8
      invalidate(8)
    }
  }, [invalidate])
  useEffect(() => {
    if (!labelsVisible) { warmupFrames.current = 0; invalidate(); return }
    // Html attaches a separate DOM root after the canvas can become idle.
    // Give its CSS transform refs bounded opportunities to finish attaching.
    const retry = () => { warmupFrames.current = 8; invalidate(8) }
    retry()
    const firstRetry = setTimeout(retry, 40)
    const finalRetry = setTimeout(retry, 220)
    return () => { clearTimeout(firstRetry); clearTimeout(finalRetry) }
  }, [labelsVisible, invalidate])
  useFrame(() => {
    if (!labelsVisible) return
    const node = element.current
    if (node?.parentElement?.parentElement?.style.transform.includes('matrix3d')) {
      node.style.visibility = 'visible'
    }
    if (warmupFrames.current > 0) { warmupFrames.current -= 1; invalidate() }
  })
  if (!labelsVisible) return null
  return <Html transform center position={position} distanceFactor={distanceFactor} zIndexRange={[7, 1]}>
    <div ref={onLabelMount} style={{ visibility: 'hidden' }} className={'exhibit-label ' + className}>{children}</div>
  </Html>
}

function Floating({ children, position, reducedMotion = false, amplitude = 0.06, speed = 0.7 }: {
  children: ReactNode; position: Point; reducedMotion?: boolean; amplitude?: number; speed?: number
}) {
  const group = useRef<THREE.Group>(null)
  const animationPaused = useContext(AnimationPausedContext)
  const seconds = useRef(0)
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    if (group.current && reducedMotion) {
      group.current.position.set(...position)
      group.current.rotation.z = 0
    }
    invalidate()
  }, [position, reducedMotion, invalidate])
  useFrame((_, delta) => {
    if (!group.current || reducedMotion || animationPaused) return
    seconds.current += Math.min(delta, 0.05)
    group.current.position.y = position[1] + Math.sin(seconds.current * speed) * amplitude
    group.current.rotation.z = Math.sin(seconds.current * speed * 0.6) * 0.017
  })
  return <group ref={group} position={position}>{children}</group>
}

function useArtwork(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let live = true
    setTexture(null)
    setStatus('loading')
    const pending = new THREE.TextureLoader().load(
      '/_next/image?url=' + encodeURIComponent(src) + '&w=1080&q=80',
      (loaded) => {
        if (!live) { loaded.dispose(); return }
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.anisotropy = 4
        setTexture(loaded)
        setStatus('ready')
        invalidate()
      },
      undefined,
      () => {
        if (!live) return
        setStatus('error')
        invalidate()
      },
    )
    return () => { live = false; pending.dispose() }
  }, [src, invalidate])
  return { texture, status }
}

function usePrintedTexture(title: string, subtitle: string, dark = false) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 900
    canvas.height = 600
    const context = canvas.getContext('2d')
    if (!context) return null
    context.fillStyle = dark ? '#586052' : '#f3e6b9'
    context.fillRect(0, 0, 900, 600)
    context.strokeStyle = dark ? '#bbc7a7' : '#b6a574'
    context.lineWidth = 2
    for (let i = 0; i < 9; i++) {
      context.beginPath()
      context.ellipse(450, 300, 80 + i * 38, 45 + i * 22, -0.22, 0, Math.PI * 2)
      context.stroke()
    }
    context.fillStyle = dark ? '#586052' : '#f3e6b9'
    context.fillRect(80, 238, 740, 125)
    context.fillStyle = dark ? '#fff4cf' : '#5e5d49'
    context.textAlign = 'center'
    context.font = '39px Georgia, serif'
    context.fillText(title, 450, 292, 740)
    context.font = '18px Arial, sans-serif'
    context.fillText(subtitle, 450, 337, 720)
    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [title, subtitle, dark])
  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

function OfficeChair() {
  return <group position={[0, 0, 2.03]}>
    <mesh position={[0, 0.56, 0]} castShadow><boxGeometry args={[0.77, 0.14, 0.77]} /><meshStandardMaterial color="#879482" roughness={0.92} /><Edges color={COLORS.ink} /></mesh>
    <Box size={[0.74, 0.64, 0.11]} position={[0, 0.99, 0.31]} color={COLORS.sage} rotation={[-0.08, 0, 0]} />
    <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.055, 0.055, 0.47, 12]} /><meshStandardMaterial color={COLORS.gray} metalness={0.2} /></mesh>
    {[-1, 1].map((x) => <group key={x}><Box size={[0.055, 0.32, 0.055]} position={[x * 0.43, 0.73, 0]} color={COLORS.gray} /><Box size={[0.12, 0.06, 0.44]} position={[x * 0.43, 0.91, 0]} color={COLORS.sage} /></group>)}
    {[0, 1, 2, 3, 4].map((i) => <group key={i} rotation={[0, i * Math.PI * 2 / 5, 0]}>
      <Box size={[0.055, 0.04, 0.53]} position={[0, 0.09, 0.25]} color={COLORS.gray} />
      <mesh position={[0, 0.067, 0.51]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.065, 0.065, 0.055, 10]} /><meshStandardMaterial color={COLORS.ink} /></mesh>
    </group>)}
  </group>
}

function useLiveCodeTexture(lines: string[], accent: string) {
  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 720
    canvas.height = 480
    const context = canvas.getContext('2d')
    if (!context) return null

    context.fillStyle = '#1f2b27'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#2c3a34'
    context.fillRect(0, 0, canvas.width, 58)
    context.fillStyle = accent
    context.fillRect(24, 25, 14, 14)
    context.fillStyle = '#d8e2c9'
    context.font = '600 22px ui-monospace, SFMono-Regular, Menlo, monospace'
    context.fillText('LIVE BUILD RELAY', 58, 36)
    context.fillStyle = '#94a58f'
    context.font = '18px ui-monospace, SFMono-Regular, Menlo, monospace'
    context.fillText('stream://studio/projects', 454, 36)

    context.font = '20px ui-monospace, SFMono-Regular, Menlo, monospace'
    lines.forEach((line, index) => {
      const y = 98 + index * 33
      context.fillStyle = '#68796d'
      context.fillText(String(index + 1).padStart(2, '0'), 24, y)
      context.fillStyle = index % 4 === 0 ? accent : '#c6d2bd'
      context.fillText(line, 76, y)
    })

    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    result.wrapS = THREE.ClampToEdgeWrapping
    result.wrapT = THREE.RepeatWrapping
    result.minFilter = THREE.LinearFilter
    result.magFilter = THREE.LinearFilter
    result.generateMipmaps = false
    return result
  }, [accent, lines])

  useEffect(() => () => texture?.dispose(), [texture])
  return texture
}

function RelayPulse({ side, sideX, reducedMotion }: { side: number; sideX: number; reducedMotion: boolean }) {
  const pulse = useRef<THREE.Mesh>(null)
  const animationPaused = useContext(AnimationPausedContext)
  const from = useMemo(() => new THREE.Vector3(0, 1.58, -2.42), [])
  const to = useMemo(() => new THREE.Vector3(side * sideX, 1.56, -1.16), [side, sideX])
  useFrame((state) => {
    if (!pulse.current || reducedMotion || animationPaused) return
    const cycle = (state.clock.elapsedTime * 0.34 + (side === 1 ? 0.52 : 0)) % 1
    pulse.current.position.lerpVectors(from, to, cycle)
    pulse.current.scale.setScalar(0.7 + Math.sin(cycle * Math.PI) * 0.45)
  })
  useEffect(() => {
    if (reducedMotion && pulse.current) {
      pulse.current.position.copy(from)
      pulse.current.scale.setScalar(0.7)
    }
  }, [from, reducedMotion])
  return <mesh ref={pulse} position={from.toArray() as Point}>
    <sphereGeometry args={[0.045, 10, 8]} />
    <meshBasicMaterial color={side === -1 ? '#f4df9a' : '#b8c7aa'} transparent opacity={0.9} />
  </mesh>
}

function LiveTerminal({
  side, sideX, lines, accent, reducedMotion, onOpenProject, labelsVisible,
}: {
  side: number; sideX: number; lines: string[]; accent: string; reducedMotion: boolean
  onOpenProject: () => void; labelsVisible: boolean
}) {
  const lift = useRef<THREE.Group>(null)
  const scanline = useRef<THREE.Mesh>(null)
  const animationPaused = useContext(AnimationPausedContext)
  const texture = useLiveCodeTexture(lines, accent)
  const gl = useThree((state) => state.gl)

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const phase = side === -1 ? 0 : Math.PI
    if (!reducedMotion && !animationPaused) {
      if (lift.current) {
        const bob = Math.sin(elapsed * 1.08 + phase) * 0.075
        lift.current.position.y = THREE.MathUtils.damp(lift.current.position.y, 0.16 + bob, 8, Math.min(delta, 0.05))
        lift.current.rotation.z = THREE.MathUtils.damp(lift.current.rotation.z, Math.sin(elapsed * 0.72 + phase) * 0.012, 8, Math.min(delta, 0.05))
      }
      if (scanline.current) {
        const scan = (elapsed * 0.42 + (side === 1 ? 0.5 : 0)) % 1
        scanline.current.position.y = 0.35 + scan * 0.62
      }
      if (texture) {
        const travel = (elapsed * 0.085 + (side === 1 ? 0.3 : 0)) % 1
        texture.offset.y = side === -1 ? -travel : travel
      }
    }
  })

  useEffect(() => {
    if (reducedMotion) {
      lift.current?.position.set(0, 0.16, 0)
      lift.current?.rotation.set(0, 0, 0)
      scanline.current?.position.set(0, 0.66, 0.102)
      if (texture) texture.offset.y = 0
    }
  }, [reducedMotion, texture])

  return <group position={[side * sideX, 0.93, -1.15]}
    onClick={(event) => { if (event.delta > 5) return; event.stopPropagation(); onOpenProject() }}
    onPointerOver={(event) => { event.stopPropagation(); if (labelsVisible) gl.domElement.style.cursor = 'pointer' }}
    onPointerOut={() => { gl.domElement.style.cursor = '' }}>
    <Box size={[0.64, 0.045, 0.36]} position={[0, 0.025, 0]} color={COLORS.gray} />
    <Box size={[0.035, 0.28, 0.035]} position={[0, 0.18, -0.025]} color={accent} />
    <group ref={lift} position={[0, 0.16, 0]}>
      <Box size={[0.07, 0.25, 0.06]} position={[0, 0, 0]} color={COLORS.gray} />
      <Box size={[1.17, 0.83, 0.08]} position={[0, 0.5, 0]} color={COLORS.gray} />
      <mesh position={[0, 0.5, 0.05]}>
        <planeGeometry args={[1.06, 0.705]} />
        <meshBasicMaterial map={texture ?? undefined} toneMapped={false} />
      </mesh>
      <Box size={[1.02, 0.035, 0.025]} position={[0, 0.11, 0.06]} color={accent} />
      {[-0.43, -0.35, -0.27].map((x, index) => <mesh key={x} position={[x, 0.86, 0.06]}>
        <sphereGeometry args={[0.025, 8, 6]} />
        <meshBasicMaterial color={index === 0 ? accent : '#9ba99a'} />
      </mesh>)}
      <mesh ref={scanline} position={[0, 0.66, 0.102]}>
        <planeGeometry args={[1.02, 0.012]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <pointLight color={accent} intensity={0.22} distance={1.7} position={[0, 0.5, 0.2]} />
    </group>
  </group>
}

function GalleryExhibit({ reducedMotion, projectIndex, onProjectIndexChange, onOpenProject }: {
  reducedMotion: boolean; projectIndex?: number
  onProjectIndexChange?: (index: number) => void; onOpenProject?: (index: number) => void
}) {
  const [localIndex, setLocalIndex] = useState(0)
  const controlled = typeof projectIndex === 'number' && Number.isFinite(projectIndex)
  const index = controlled ? ((Math.trunc(projectIndex) % PROJECTS.length) + PROJECTS.length) % PROJECTS.length : localIndex
  const project = PROJECTS[index]
  const { texture, status } = useArtwork(project.image)
  const placeholder = usePrintedTexture(project.title, project.categoryLabel)
  const leftCode = useMemo(() => [
    'const project = "' + project.slug + '";',
    'const motion = await buildScene();',
    ...project.tech.slice(0, 3).map((tech) => '  use("' + tech + '");'),
    'relay.emit("main-display");',
    'camera.easeTo("hero");',
    'return portfolio.ready;',
    '// keep exploring →',
  ], [project])
  const rightCode = useMemo(() => [
    '// signal monitor / current focus',
    'const exhibit = {',
    '  title: "' + project.title.slice(0, 22) + '",',
    '  category: "' + project.category[0].slice(0, 18) + '",',
    '  state: "interactive",',
    '};',
    'sync(exhibit, "studio");',
    'pulse("next-project");',
  ], [project])
  const invalidate = useThree((state) => state.invalidate)
  const gl = useThree((state) => state.gl)
  const size = useThree((state) => state.size)
  const portrait = size.width / Math.max(size.height, 1) < 0.85
  const animationPaused = useContext(AnimationPausedContext)
  const labelsVisible = useContext(LabelVisibilityContext)
  const changeProject = (direction: number) => {
    const next = (index + direction + PROJECTS.length) % PROJECTS.length
    if (!controlled) setLocalIndex(next)
    onProjectIndexChange?.(next)
    invalidate(8)
  }
  const openProject = () => {
    if (!labelsVisible) return
    if (onOpenProject) onOpenProject(index)
    else window.location.assign('/projects/' + project.slug)
  }
  useEffect(() => () => { gl.domElement.style.cursor = '' }, [gl])
  const sideX = portrait ? 1.55 : 1.94
  const deskWidth = portrait ? 4.5 : 5.2

  return <group>
    {/* An actual workspace around the project display, with space for a seated camera. */}
    <Box size={[deskWidth, 0.13, 1.74]} position={[0, 0.86, -0.83]} color={COLORS.ochre} />
    {[-1, 1].flatMap((x) => [-1.5, -0.18].map((z) => <Box key={x + ':' + z} size={[0.12, 0.79, 0.12]} position={[x * (deskWidth / 2 - 0.23), 0.43, z]} color={COLORS.gray} />))}
    <Box size={[deskWidth - 0.35, 0.11, 0.07]} position={[0, 0.43, -1.5]} color={COLORS.gray} />
    <OfficeChair />

    {/* Keyboard, trackpad, notebook, and cup remain below the camera sightline. */}
    <Box size={[1.4, 0.06, 0.43]} position={[0, 0.963, -0.13]} color={COLORS.gray} />
    {[-0.24, -0.13, -0.02].map((z) => <Line key={z} points={[[-0.6, 0.998, z], [0.6, 0.998, z]]} color="#899383" lineWidth={1.2} />)}
    <Box size={[0.49, 0.014, 0.47]} position={[1.08, 0.939, -0.12]} color={COLORS.sage} />
    <mesh position={[1.07, 0.997, -0.16]} scale={[0.9, 0.45, 1.25]} castShadow><sphereGeometry args={[0.12, 16, 10]} /><meshStandardMaterial color={COLORS.gray} roughness={0.5} /></mesh>
    <Box size={[0.57, 0.045, 0.67]} position={[-1.25, 0.956, -0.16]} color={COLORS.sage} rotation={[0, -0.17, 0]} />
    <Box size={[0.51, 0.018, 0.61]} position={[-1.25, 0.988, -0.16]} color={COLORS.paper} rotation={[0, -0.17, 0]} />
    <mesh position={[-2.01, 1.08, -0.18]} castShadow><cylinderGeometry args={[0.11, 0.1, 0.27, 16]} /><meshStandardMaterial color={COLORS.paper} /></mesh>
    <mesh position={[-1.88, 1.08, -0.18]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.08, 0.018, 6, 20]} /><meshStandardMaterial color={COLORS.paper} /></mesh>

    {/* Two desk monitors flank a large project monitor on the back wall. */}
    {[-1, 1].map((side) => <group key={side} rotation={[0, side * -0.18, 0]}>
      <LiveTerminal
        side={side}
        sideX={sideX}
        lines={side === -1 ? leftCode : rightCode}
        accent={side === -1 ? '#f4df9a' : '#b8c7aa'}
        reducedMotion={reducedMotion}
        labelsVisible={labelsVisible}
        onOpenProject={openProject}
      />
      <Line points={[[0, 1.58, -2.42], [side * sideX, 1.56, -1.16]]} color={side === -1 ? '#e5ce77' : '#adbea1'} lineWidth={1.05} transparent opacity={0.28} />
      <RelayPulse side={side} sideX={sideX} reducedMotion={reducedMotion} />
    </group>)}
    <group position={[0, 2.08, -2.5]}
      onClick={(event) => { if (event.delta > 5) return; event.stopPropagation(); openProject() }}
      onPointerOver={(event) => { event.stopPropagation(); if (labelsVisible) gl.domElement.style.cursor = 'pointer' }}
      onPointerOut={() => { gl.domElement.style.cursor = '' }}>
      <Box size={[3.02, 2.075, 0.14]} color={COLORS.gray} />
      <Box size={[2.86, 1.94, 0.06]} position={[0, 0, 0.085]} color={COLORS.paper} />
      <mesh position={[0, 0.015, 0.123]}><planeGeometry args={[2.68, 1.786]} /><meshBasicMaterial map={texture || placeholder} color="#ffffff" toneMapped={false} /></mesh>
      {status !== 'ready' && <Placard position={[0, -0.72, 0.145]} distanceFactor={1.3} className="exhibit-status">
        <span role="status">{status === 'loading' ? 'Opening project artwork…' : 'Artwork unavailable · project details are available'}</span>
      </Placard>}
    </group>
    <Box size={[0.17, 0.98, 0.15]} position={[0, 0.57, -2.55]} color={COLORS.gray} />
    <Box size={[1.07, 0.055, 0.53]} position={[0, 0.105, -2.5]} color={COLORS.gray} />

    <Floating position={[0, 3.82, -2.58]} reducedMotion={reducedMotion} amplitude={0.035}>
      <group scale={0.68}><ProjectModel key={project.slug} slug={project.slug} reducedMotion={reducedMotion} animationPaused={animationPaused} /></group>
    </Floating>
    <Placard position={[0, 4.48, -2.3]} className="exhibit-model-caption" distanceFactor={1.8}>
      <span>Concept visualization · {projectModelLabel(project.slug)}</span>
    </Placard>
    {!portrait && <group position={[3.05, 0, -2.7]}>
      <Box size={[0.65, 1.18, 0.65]} position={[0, 0.59, 0]} color={COLORS.gray} />
      <group position={[0, 1.6, 0]} scale={0.42}><ProjectModel slug="mechanical-concept" reducedMotion={reducedMotion} animationPaused={animationPaused} /></group>
      <Placard position={[0, 2.3, 0.1]} className="exhibit-model-caption" distanceFactor={1.7}><span>Kinetic study<br />Concept model</span></Placard>
    </group>}

    <Placard position={[0, 1.19, -1.88]} className="exhibit-project-info exhibit-workspace-title" distanceFactor={2.25}>
      <p className="exhibit-eyebrow">THE PROJECT WORKSPACE / {project.category[0]}</p>
      <h2 className="exhibit-title" aria-live="polite">{project.title}</h2>
      <div className="exhibit-project-controls" role="group" aria-label="Browse portfolio projects">
        <button type="button" onClick={() => changeProject(-1)} aria-label="Previous project"><ChevronLeft size={18} aria-hidden="true" /></button>
        <span className="exhibit-counter">{String(index + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {PROJECTS.length}</span>
        <button type="button" onClick={() => changeProject(1)} aria-label="Next project"><ChevronRight size={18} aria-hidden="true" /></button>
        <a href={'/projects/' + project.slug} aria-label={'Read the ' + project.title + ' case study'} onClick={(event) => {
          if (onOpenProject) { event.preventDefault(); onOpenProject(index) }
        }}>Case study <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </Placard>
  </group>
}

function OrbitCore({ reducedMotion }: { reducedMotion: boolean }) {
  const ring = useRef<THREE.Group>(null)
  const animationPaused = useContext(AnimationPausedContext)
  const seconds = useRef(0)
  useFrame((_, delta) => {
    if (reducedMotion || animationPaused || !ring.current) return
    seconds.current += Math.min(delta, 0.05)
    ring.current.rotation.y = seconds.current * 0.14
    ring.current.rotation.z = Math.sin(seconds.current * 0.35) * 0.1
  })
  useEffect(() => {
    if (reducedMotion && ring.current) ring.current.rotation.set(0, 0, 0)
  }, [reducedMotion])
  return <group ref={ring}>
    <mesh castShadow><icosahedronGeometry args={[0.43, 1]} /><meshStandardMaterial color={COLORS.sage} roughness={0.65} /><Edges color={COLORS.ink} /></mesh>
    {[0, 1, 2].map((i) => <group key={i} rotation={[i * 0.55, i * 0.7, i * 0.45]}>
      <mesh><torusGeometry args={[0.84 + i * 0.07, 0.016, 6, 64]} /><meshStandardMaterial color={i === 1 ? COLORS.ochre : COLORS.gray} /></mesh>
      <mesh position={[0.84 + i * 0.07, 0, 0]} castShadow><sphereGeometry args={[0.07, 12, 10]} /><meshStandardMaterial color={i === 1 ? COLORS.clay : COLORS.ochre} /></mesh>
    </group>)}
  </group>
}

function AboutExhibit({ reducedMotion }: { reducedMotion: boolean }) {
  const screen = usePrintedTexture('React. Next.js. FastAPI.', 'Full stack · AI · Security', true)
  const categories = ['full-stack', 'ai-ml', 'security'].map((id) => SKILLS.find((category) => category.id === id)!)
  const nodes: { position: Point; label: string; tools: string; color: string }[] = [
    { position: [-2.12, 2.94, -2.5], label: categories[0].label, tools: 'React · Next.js · FastAPI', color: COLORS.ochre },
    { position: [0, 4.05, -2.5], label: categories[1].label, tools: 'Agents · RAG · Computer vision', color: COLORS.sage },
    { position: [2.12, 2.94, -2.5], label: categories[2].label, tools: 'Burp Suite · OWASP Top 10', color: COLORS.gray },
  ]
  return <group>
    <Box size={[2.9, 0.74, 1.22]} position={[0, 0.49, -2.0]} color={COLORS.gray} />
    <Box size={[3.15, 0.12, 1.42]} position={[0, 0.92, -2.0]} color={COLORS.ochre} />
    <Floating position={[0, 1.03, -2.02]} reducedMotion={reducedMotion} amplitude={0.035}>
      <Box size={[2.13, 0.075, 1.05]} position={[0, 0.02, 0.2]} color={COLORS.gray} />
      <Box size={[2.09, 1.35, 0.1]} position={[0, 0.68, -0.31]} color={COLORS.gray} />
      <mesh position={[0, 0.7, -0.251]}><planeGeometry args={[1.87, 1.18]} /><meshBasicMaterial map={screen} color="#ffffff" toneMapped={false} /></mesh>
      {[-0.03, 0.14, 0.31, 0.48].map((z) => <Line key={z} points={[[-0.76, 0.064, z], [0.76, 0.064, z]]} color="#929b8c" lineWidth={1.3} />)}
      <Box size={[0.5, 0.008, 0.2]} position={[0, 0.067, 0.63]} color={COLORS.sage} />
    </Floating>
    <Floating position={[0, 2.95, -2.5]} reducedMotion={reducedMotion} amplitude={0.07}>
      <OrbitCore reducedMotion={reducedMotion} />
    </Floating>
    {nodes.map((node) => <group key={node.label}>
      <Line points={[[0, 2.95, -2.5], node.position]} color="#b4a778" lineWidth={1.1} dashed dashSize={0.08} gapSize={0.06} />
      <mesh position={node.position} castShadow><sphereGeometry args={[0.13, 16, 12]} /><meshStandardMaterial color={node.color} roughness={0.8} /><Edges color={COLORS.ink} threshold={40} /></mesh>
      <Placard position={[node.position[0], node.position[1] - 0.4, -2.24]} className="exhibit-capability-label" distanceFactor={2.35}>
        <h3>{node.label}</h3><p>{node.tools}</p>
      </Placard>
    </group>)}
    <Placard position={[0, 4.4, -2.5]} className="exhibit-project-info" distanceFactor={2.4}>
      <p className="exhibit-eyebrow">THE PERSON BEHIND THE WORK</p><h2 className="exhibit-title">{SITE.name}</h2><p className="exhibit-subtitle">{SITE.role} · {SITE.location}</p>
    </Placard>
  </group>
}

function MilestoneSculpture({ variant, color, reducedMotion }: { variant: number; color: string; reducedMotion: boolean }) {
  const sculpture = useRef<THREE.Group>(null)
  const animationPaused = useContext(AnimationPausedContext)
  const seconds = useRef(0)
  useFrame((_, delta) => {
    if (reducedMotion || animationPaused || !sculpture.current) return
    seconds.current += Math.min(delta, 0.05)
    sculpture.current.rotation.y = Math.sin(seconds.current * 0.45 + variant) * 0.24
    sculpture.current.position.y = Math.sin(seconds.current * 0.8 + variant) * 0.025
  })
  useEffect(() => {
    if (reducedMotion && sculpture.current) { sculpture.current.rotation.y = 0; sculpture.current.position.y = 0 }
  }, [reducedMotion])
  return <group ref={sculpture}>
    {variant === 0 ? <group rotation={[0, 0, -0.12]}>
      <Box size={[0.61, 0.13, 0.48]} color={color} /><Box size={[0.55, 0.07, 0.45]} position={[0, 0.07, 0]} />
      <Line points={[[0, 0.11, -0.21], [0, 0.11, 0.21]]} color={COLORS.ink} lineWidth={1.4} />
    </group> : variant === 1 ? <mesh castShadow rotation={[0.15, 0.3, 0.12]}><boxGeometry args={[0.44, 0.44, 0.44]} /><meshStandardMaterial color={color} /><Edges color={COLORS.ink} /></mesh>
      : variant === 2 ? <mesh castShadow rotation={[0.2, 0.4, 0.15]}><torusKnotGeometry args={[0.24, 0.065, 64, 8, 2, 3]} /><meshStandardMaterial color={color} roughness={0.72} /></mesh>
        : <group>{[-0.16, 0, 0.16].map((y, i) => <Box key={y} size={[0.49, 0.1, 0.49]} position={[0, y, 0]} rotation={[0, i * 0.3, 0]} color={i === 1 ? COLORS.sage : color} />)}</group>}
  </group>
}

function JourneyExhibit({ reducedMotion }: { reducedMotion: boolean }) {
  const size = useThree((state) => state.size)
  const portrait = size.width / Math.max(size.height, 1) < 0.85
  const spacing = portrait ? 1.25 : 1.8
  const milestones = [
    { title: EDUCATION.institution, period: EDUCATION.period, note: EDUCATION.degree, height: 0.64, color: COLORS.ochre },
    ...[...EXPERIENCE].reverse().map((entry, i) => ({ title: entry.title, period: entry.period, note: entry.technologies.slice(0, 3).join(' · '), height: 0.84 + i * 0.22, color: [COLORS.gray, COLORS.sage, COLORS.yellow][i] })),
  ]
  const positions = milestones.map((entry, i) => [(i - 1.5) * spacing, entry.height, -2.65 + Math.abs(1.5 - i) * 0.16] as Point)
  return <group>
    <Placard position={[0, 4.0, -2.8]} className="exhibit-project-info" distanceFactor={3}>
      <p className="exhibit-eyebrow">EXPERIENCE & EDUCATION</p><h2 className="exhibit-title">Learning, then building.</h2>
    </Placard>
    <Line points={positions.map(([x, y, z]) => [x, y + 0.06, z - 0.06] as Point)} color={COLORS.ochre} lineWidth={2} />
    <Line points={[[-(spacing * 1.5 + 0.7), 0.045, -2.55], [spacing * 1.5 + 0.7, 0.045, -2.55]]} color={COLORS.ink} lineWidth={1.2} />
    {milestones.map((entry, i) => <group key={entry.title} position={[positions[i][0], 0, positions[i][2]]}>
      <Box size={[portrait ? 1.05 : 1.3, entry.height, 0.93]} position={[0, entry.height / 2, 0]} color={entry.color} />
      <Box size={[portrait ? 1.14 : 1.4, 0.08, 1.03]} position={[0, entry.height + 0.05, 0]} color={COLORS.paper} />
      <group position={[0, entry.height + 0.4, 0]}><MilestoneSculpture variant={i} color={entry.color} reducedMotion={reducedMotion} /></group>
      <Placard position={[0, 2.08 + i * 0.12, 0.56]} className="exhibit-timeline-label" distanceFactor={2.35}>
        <span className="exhibit-eyebrow">{entry.period}</span><h3>{entry.title}</h3><p>{entry.note}</p>
      </Placard>
    </group>)}
  </group>
}

function ContactExhibit({ reducedMotion }: { reducedMotion: boolean }) {
  return <group>
    <Box size={[3.65, 0.19, 1.25]} position={[0, 0.71, -2.25]} color={COLORS.ochre} />
    {[-1.45, 1.45].map((x) => <Box key={x} size={[0.2, 0.63, 0.9]} position={[x, 0.34, -2.25]} color={COLORS.gray} />)}
    <Floating position={[0, 2.75, -2.28]} reducedMotion={reducedMotion} amplitude={0.09} speed={0.8}>
      <Box size={[2.95, 1.79, 0.08]} color={COLORS.paper} rotation={[0, 0, -0.045]} />
      <Line points={[[-1.44, 0.86, 0.048], [0, -0.11, 0.053], [1.44, 0.86, 0.048]]} color={COLORS.ink} lineWidth={1.6} />
      <Line points={[[-1.44, -0.86, 0.05], [-0.56, 0.06, 0.05]]} color="#b8a375" lineWidth={1.2} />
      <Line points={[[1.44, -0.86, 0.05], [0.56, 0.06, 0.05]]} color="#b8a375" lineWidth={1.2} />
      <mesh position={[0, -0.09, 0.09]} scale={[1, 1, 0.22]} castShadow><sphereGeometry args={[0.17, 24, 12]} /><meshStandardMaterial color={COLORS.clay} roughness={0.75} /></mesh>
      <mesh position={[1.1, 0.55, 0.06]}><planeGeometry args={[0.38, 0.42]} /><meshStandardMaterial color={COLORS.sage} /><Edges color={COLORS.ink} /></mesh>
      <Line points={[[0.98, 0.49, 0.08], [1.21, 0.61, 0.08]]} color={COLORS.paper} lineWidth={2} />
    </Floating>
    <Placard position={[0, 4.35, -2.4]} className="exhibit-project-info" distanceFactor={2.6}>
      <p className="exhibit-eyebrow">THE MEETING ROOM</p><h2 className="exhibit-title">Good things start with hello.</h2>
    </Placard>
    <Placard position={[0, 1.4, -1.44]} className="exhibit-contact-label" distanceFactor={2.4}>
      <p className="exhibit-subtitle">A note for {SITE.name}</p>
      <a className="exhibit-email" href={'mailto:' + SITE.email}><Mail size={18} aria-hidden="true" />{SITE.email}<ArrowUpRight size={14} aria-hidden="true" /></a>
      <div className="exhibit-contact-links">
        <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" />GitHub</a>
        <a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn</a>
      </div>
    </Placard>
    <mesh position={[-2.44, 1.05, -2.62]} castShadow><cylinderGeometry args={[0.26, 0.33, 0.71, 16]} /><meshStandardMaterial color={COLORS.gray} /><Edges color={COLORS.ink} /></mesh>
    {[0, 1, 2].map((i) => <Box key={i} size={[0.45, 0.015, 0.35]} position={[-2.47 + i * 0.02, 1.45 + i * 0.038, -2.61]} rotation={[0, i * 0.22, 0]} color={i === 1 ? COLORS.yellow : COLORS.paper} />)}
  </group>
}

export default function RoomExhibits({ room, reducedMotion = false, labelsVisible = true, animationPaused = false, projectIndex, onProjectIndexChange, onOpenProject }: ExhibitProps) {
  return <LabelVisibilityContext.Provider value={labelsVisible}><AnimationPausedContext.Provider value={animationPaused}>
    {room === 'projects' ? <GalleryExhibit reducedMotion={reducedMotion} projectIndex={projectIndex} onProjectIndexChange={onProjectIndexChange} onOpenProject={onOpenProject} />
      : room === 'about' ? <AboutExhibit reducedMotion={reducedMotion} />
        : room === 'journey' ? <JourneyExhibit reducedMotion={reducedMotion} />
          : <ContactExhibit reducedMotion={reducedMotion} />}
  </AnimationPausedContext.Provider></LabelVisibilityContext.Provider>
}







