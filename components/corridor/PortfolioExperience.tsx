'use client'

import { Component, memo, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowRight, ArrowUpRight, Footprints, Hand, Maximize2, Minimize2, Music, Pause, Play, RotateCcw, SkipForward, Volume2, VolumeX, X } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { PROJECTS } from '@/data/projects'
import RoomContent from './RoomContent'
import ProjectDetails from './ProjectDetails'
import StudioNavigationMap from './StudioNavigationMap'
import { FallbackExterior, FallbackHallway } from './SceneFallback'

export type Room = 'outside' | 'hallway' | 'projects' | 'about' | 'journey' | 'contact'
type Mode = 'auto' | 'manual'
type CameraAction = 'forward' | 'back' | 'left' | 'right' | 'turn-left' | 'turn-right' | 'face-left' | 'face-right' | 'reset' | 'seat'
const ROOMS = [
  { id: 'projects' as const, number: '01', title: 'The project studio', short: 'Projects', subtitle: 'Products, experiments & ideas made real' },
  { id: 'about' as const, number: '02', title: 'The maker’s studio', short: 'About me', subtitle: 'Full stack at the core. AI & security in the details.' },
  { id: 'journey' as const, number: '03', title: 'The reading room', short: 'My journey', subtitle: 'Experience, education & the story so far' },
  { id: 'contact' as const, number: '04', title: 'The meeting room', short: 'Say hello', subtitle: 'Good things start with a conversation' },
]
const HASH_ROOMS: Record<string, Room> = {
  outside: 'outside', home: 'outside', main: 'outside', hallway: 'hallway',
  projects: 'projects', about: 'about', skills: 'about', security: 'about', ai: 'about', 'ai-expertise': 'about', github: 'about',
  journey: 'journey', experience: 'journey', education: 'journey', achievements: 'journey', contact: 'contact',
}
type TourStep = { room: Room; title: string; caption: string; seconds: number; project?: number; seat?: boolean }
const TOUR: TourStep[] = [
  { room: 'outside', title: 'A studio on the street', caption: 'A little curiosity. A whole world of ideas inside.', seconds: 2.5 },
  { room: 'hallway', title: 'Come on in', caption: 'The door opens. Follow the corridor into my work.', seconds: 2.5 },
  { room: 'about', title: 'Meet the maker', caption: 'Full stack development, artificial intelligence and security.', seconds: 5 },
  { room: 'journey', title: 'The story so far', caption: 'Explore my education, experience and milestones.', seconds: 5 },
  { room: 'contact', title: 'Room for a conversation', caption: 'Have an idea? This is where the next chapter starts.', seconds: 4 },
  { room: 'projects', title: 'Take a seat', caption: 'Settle into the project studio. The work takes centre stage.', seconds: 3.5, seat: true },
  ...PROJECTS.map((project, index) => ({ room: 'projects' as const, title: project.title, caption: project.description, seconds: 6, project: index, seat: true })),
  { room: 'outside', title: 'Thanks for looking around', caption: 'Replay the tour, explore freely, or open a project for a closer look.', seconds: 3 },
]
function SceneLoading() {
  return <div className="scene-loading" role="status"><span className="drawing-spinner" /> Setting the scene…</div>
}
const CorridorScene = memo(dynamic(() => import('./CorridorScene'), { ssr: false, loading: SceneLoading }))
const HandTrackingControls = dynamic(() => import('./HandTrackingControls'), { ssr: false })
class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

export default function PortfolioExperience() {
  const [activeRoom, setActiveRoom] = useState<Room>('outside')
  const [arrivedRoom, setArrivedRoom] = useState<Room>('outside')
  const [navigationId, setNavigationId] = useState(0)
  const [navigationStyle, setNavigationStyle] = useState<'walk' | 'instant'>('walk')
  const [travelling, setTravelling] = useState(false)
  const [entered, setEntered] = useState(false)
  const [mode, setMode] = useState<Mode>('manual')
  const [countdown, setCountdown] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [projectIndex, setProjectIndex] = useState(0)
  const [seated, setSeated] = useState(false)
  const [entranceOpen, setEntranceOpen] = useState(false)
  const [autoWalk, setAutoWalk] = useState(false)
  const [cameraCommand, setCameraCommand] = useState<{ id: number; action: CameraAction }>()
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailProject, setDetailProject] = useState<number | null>(null)
  const [handEnabled, setHandEnabled] = useState(false)
  const [webgl, setWebgl] = useState<boolean | null>(null)
  const [sceneReady, setSceneReady] = useState(false)
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [preferredReducedMotion, setPreferredReducedMotion] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [fullscreenAvailable, setFullscreenAvailable] = useState(false)
  const reducedMotion = preferredReducedMotion || !motionEnabled
  const dialogRef = useRef<HTMLDialogElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const requestedRef = useRef<Room>('outside')
  const requestIdRef = useRef(0)
  const pendingMode = useRef<Mode>('manual')
  const elapsedRef = useRef(0)
  const seatRequestRef = useRef(-1)
  const handInputRef = useRef({ lookX: 0, lookY: 0, forward: 0 })
  const audioRef = useRef<AudioContext | null>(null)
  const musicStopRef = useRef<(() => void) | null>(null)
  const selected = ROOMS.find(room => room.id === arrivedRoom)
  const step = TOUR[stepIndex]
  const isAuto = mode === 'auto' && entered
  const ready = sceneReady || webgl === false
  const onSceneReady = useCallback(() => setSceneReady(true), [])
  const onSceneFailure = useCallback(() => setWebgl(false), [])
  const onSeated = useCallback(() => setSeated(true), [])
  const stopAutoWalk = useCallback(() => setAutoWalk(false), [])
  const openEntrance = useCallback(() => setEntranceOpen(true), [])
  const closeEntrance = useCallback(() => setEntranceOpen(false), [])
  const onHandInput = useCallback((input: { lookX: number; lookY: number; forward: number }) => { handInputRef.current = input }, [])
  const focusScene = useCallback(() => {
    const focus = () => stageRef.current?.querySelector<HTMLCanvasElement>('canvas')?.focus({ preventScroll: true })
    focus()
    window.setTimeout(focus, 0)
  }, [])
  const toggleEntrance = useCallback(() => {
    setAutoWalk(false)
    if (!entered) {
      pendingMode.current = 'manual'
      setMode('manual')
      setCountdown(3)
      setEntranceOpen(true)
    } else setEntranceOpen(value => !value)
    focusScene()
  }, [entered, focusScene])
  const command = useCallback((action: CameraAction) => {
    setAutoWalk(false)
    setCameraCommand(previous => ({ id: (previous?.id || 0) + 1, action }))
    focusScene()
  }, [focusScene])

  const navigate = useCallback((room: Room, preserveTour = false, writeHistory = true, instant = false) => {
    setEntered(true)
    setDetailsOpen(false)
    setHandEnabled(false)
    setAutoWalk(false)
    setSeated(false)
    setNavigationStyle(instant ? 'instant' : 'walk')
    if (!preserveTour) { setMode('manual'); setPlaying(true); setCompleted(false); setCountdown(null) }
    // Open the exterior door for either direction of travel. Arrival closes
    // it behind the visitor, while an initial sidewalk view stays closed.
    if (room === 'outside') setEntranceOpen(activeRoom !== 'outside')
    else if (activeRoom === 'outside') setEntranceOpen(true)
    requestedRef.current = room
    requestIdRef.current += 1
    setNavigationId(requestIdRef.current)
    setActiveRoom(room)
    setTravelling(true)
    if (writeHistory) {
      const hash = room === 'outside' ? '' : '#' + room
      if (window.location.hash !== hash) window.history.pushState({ ...window.history.state }, '', window.location.pathname + window.location.search + hash)
    }
  }, [activeRoom])
  const navigateRef = useRef(navigate)
  navigateRef.current = navigate
  const jumpTo = useCallback((room: Room) => {
    navigate(room, false, true, true)
    focusScene()
  }, [navigate, focusScene])
  const onArrival = useCallback((room: Room, id?: number) => {
    if (room !== requestedRef.current || (id !== undefined && id !== requestIdRef.current)) return
    setArrivedRoom(room)
    setTravelling(false)
    setEntranceOpen(false)
  }, [])
  const onManualLocation = useCallback((room: Room) => {
    requestedRef.current = room
    setActiveRoom(room)
    setArrivedRoom(room)
    setTravelling(false)
    // A location update happens as the camera crosses the door centre.
    // The scene closes it only after the camera clears the whole threshold.
    const hash = room === 'outside' ? '' : '#' + room
    if (window.location.hash !== hash) window.history.replaceState({ ...window.history.state }, '', window.location.pathname + window.location.search + hash)
  }, [])
  const enterStudio = useCallback(() => navigate('hallway'), [navigate])
  function startAuto() {
    setHandEnabled(false)
    setMode('auto')
    setPlaying(true)
    setCompleted(false)
    setSeated(false)
    seatRequestRef.current = -1
    elapsedRef.current = 0
    setProgress(0)
    setStepIndex(0)
    // A replay starts a fresh route even when the first step is already selected.
    navigate('outside', true, false)
  }
  function chooseExperience(choice: Mode) {
    pendingMode.current = choice
    setMode(choice)
    setCountdown(3)
    setHandEnabled(false)
    if (soundEnabled) {
      try { audioRef.current ||= new AudioContext(); void audioRef.current.resume() } catch { /* Audio is optional. */ }
    }
  }
  function switchMode(choice: Mode) {
    if (!entered) { chooseExperience(choice); return }
    if (choice === 'auto') startAuto()
    else {
      setMode('manual'); setPlaying(true); setTravelling(false); setHandEnabled(false)
      command('reset')
    }
  }
  const openDetails = useCallback((index: number | null = null) => {
    if (!selected || travelling) return
    if (document.activeElement instanceof HTMLElement) openerRef.current = document.activeElement
    setDetailProject(index)
    setDetailsOpen(true)
    setHandEnabled(false)
    setAutoWalk(false)
  }, [selected, travelling])
  const changeProject = useCallback((index: number) => {
    setProjectIndex(index)
    if (mode === 'auto' && entered) {
      const projectStep = TOUR.findIndex(stop => stop.project === index)
      if (projectStep >= 0) setStepIndex(projectStep)
      setPlaying(false); elapsedRef.current = 0; setProgress(0)
    }
  }, [mode, entered])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPreferredReducedMotion(preference.matches)
    sync(); preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])
  useEffect(() => {
    let enabled = false
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
      enabled = Boolean(context); context?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch { enabled = false }
    setWebgl(enabled)
    setFullscreenAvailable(Boolean(document.fullscreenEnabled))
    try { setMotionEnabled(localStorage.getItem('tatheer-motion') !== 'paused') } catch { /* Storage is optional. */ }
    const syncRoom = () => {
      if (window.location.hash === '#room-navigation') return
      navigateRef.current(HASH_ROOMS[window.location.hash.slice(1)] || 'outside', false, false)
    }
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    if (window.location.hash) syncRoom()
    window.addEventListener('hashchange', syncRoom)
    window.addEventListener('popstate', syncRoom)
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => {
      window.removeEventListener('hashchange', syncRoom); window.removeEventListener('popstate', syncRoom)
      document.removeEventListener('fullscreenchange', syncFullscreen)
    }
  }, [])
  useEffect(() => {
    if (webgl === false) { onArrival(activeRoom, navigationId); if (activeRoom === 'projects') setSeated(true) }
  }, [webgl, activeRoom, navigationId, onArrival])
  useEffect(() => {
    const target = stageRef.current
    const lost = (event: Event) => { event.preventDefault(); setWebgl(false) }
    target?.addEventListener('webglcontextlost', lost, true)
    return () => target?.removeEventListener('webglcontextlost', lost, true)
  }, [])
  useEffect(() => {
    if (countdown === null) return
    if (soundEnabled && audioRef.current && countdown > 0) {
      try {
        const context = audioRef.current, oscillator = context.createOscillator(), gain = context.createGain()
        oscillator.type = 'sine'; oscillator.frequency.value = countdown === 1 ? 440 : 220
        gain.gain.setValueAtTime(0, context.currentTime); gain.gain.linearRampToValueAtTime(.055, context.currentTime + .015)
        gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .22)
        oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .24)
      } catch { /* Continue silently if audio is unavailable. */ }
    }
    if (countdown === 0 && !ready) return
    const timer = window.setTimeout(() => {
      if (countdown > 0) setCountdown(countdown - 1)
      else {
        setCountdown(null); setEntered(true)
        if (pendingMode.current === 'auto') startAuto()
        else { setMode('manual'); setPlaying(true); command('reset') }
      }
    }, countdown === 0 ? 450 : preferredReducedMotion ? 250 : 800)
    return () => window.clearTimeout(timer)
    // startAuto only executes at the end of this countdown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, ready, preferredReducedMotion, soundEnabled, command])
  useEffect(() => {
    if (!isAuto) return
    elapsedRef.current = 0; setProgress(0)
    if (step.project !== undefined) setProjectIndex(step.project)
    // Auto stops are internal camera moves; avoid a hashchange round-trip
    // that would be interpreted as a fresh manual navigation.
    if (requestedRef.current !== step.room) navigate(step.room, true, false)
  }, [isAuto, stepIndex, step, navigate])
  useEffect(() => {
    if (!isAuto || !step.seat || travelling || arrivedRoom !== 'projects' || seated || !playing) return
    if (webgl === false) { setSeated(true); return }
    if (seatRequestRef.current !== navigationId) { seatRequestRef.current = navigationId; command('seat') }
  }, [isAuto, step, travelling, arrivedRoom, seated, playing, navigationId, webgl, command])
  useEffect(() => {
    if (!isAuto || !playing || completed || travelling || detailsOpen || !ready || (step.seat && !seated)) return
    let frame = 0, last = performance.now(), sample = last
    const tick = (now: number) => {
      if (!document.hidden) elapsedRef.current += Math.min((now - last) / 1000, .25) * speed
      last = now
      if (now - sample > 80) { sample = now; setProgress(Math.min(elapsedRef.current / step.seconds, 1)) }
      if (elapsedRef.current >= step.seconds) {
        if (stepIndex === TOUR.length - 1) { setCompleted(true); setPlaying(false); setProgress(1) }
        else setStepIndex(index => index + 1)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isAuto, playing, completed, travelling, detailsOpen, ready, step, stepIndex, speed, seated])
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (detailsOpen && selected && !travelling) {
      if (!dialog.open) dialog.showModal()
      scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    } else if (dialog.open) { dialog.close(); openerRef.current?.focus({ preventScroll: true }) }
  }, [detailsOpen, selected, travelling, detailProject])
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || dialogRef.current?.open || !entered || countdown !== null) return
      event.preventDefault()
      navigate('outside')
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [navigate, entered, countdown])
  useEffect(() => () => {
    musicStopRef.current?.()
    musicStopRef.current = null
    void audioRef.current?.close()
  }, [])

  function stopPeacefulMusic() {
    musicStopRef.current?.()
    musicStopRef.current = null
  }

  function startPeacefulMusic() {
    try {
      const context = audioRef.current || (audioRef.current = new AudioContext())
      void context.resume()
      const master = context.createGain()
      const now = context.currentTime
      master.gain.setValueAtTime(0.0001, now)
      master.gain.exponentialRampToValueAtTime(0.032, now + 1.8)
      master.connect(context.destination)
      const voices = [130.81, 196, 261.63].map((frequency, index) => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = index === 2 ? 'triangle' : 'sine'
        oscillator.frequency.value = frequency
        gain.gain.value = 0.16 / (index + 1)
        oscillator.connect(gain); gain.connect(master); oscillator.start(now)
        return oscillator
      })
      const lfo = context.createOscillator()
      const lfoGain = context.createGain()
      lfo.frequency.value = 0.045; lfoGain.gain.value = 0.006
      lfo.connect(lfoGain); lfoGain.connect(master.gain); lfo.start(now)
      musicStopRef.current = () => {
        const stopAt = context.currentTime
        master.gain.cancelScheduledValues(stopAt)
        master.gain.setTargetAtTime(0.0001, stopAt, 0.35)
        window.setTimeout(() => {
          voices.forEach(voice => { try { voice.stop() } catch { /* already stopped */ } })
          try { lfo.stop() } catch { /* already stopped */ }
          master.disconnect()
        }, 1400)
      }
      return true
    } catch {
      return false
    }
  }

  function togglePeacefulMusic() {
    if (musicEnabled) {
      stopPeacefulMusic()
      setMusicEnabled(false)
    } else if (startPeacefulMusic()) {
      setMusicEnabled(true)
    }
  }

  function toggleMotion() {
    const enabled = !motionEnabled; setMotionEnabled(enabled)
    try { localStorage.setItem('tatheer-motion', enabled ? 'playing' : 'paused') } catch { /* Storage is optional. */ }
  }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setFullscreenAvailable(false) }
  }
  const isOutside = activeRoom === 'outside'
  const fallback = isOutside ? <FallbackExterior /> : <FallbackHallway />
  const controlsEnabled = entered && countdown === null && !detailsOpen
  const scenePlaying = controlsEnabled && (!isAuto || playing)
  const caption = isAuto ? step.title : travelling ? 'Walking to your destination' : selected?.title || (isOutside ? 'The studio entrance' : 'The front hall')
  return (
    <main id="main" className={'portfolio-experience virtual-tour immersive-studio' + (selected ? ' is-in-room' : '') + (travelling ? ' is-travelling' : '')} data-location={activeRoom} data-arrived={arrivedRoom} data-travelling={travelling} data-mode={mode} data-entered={entered} data-step={stepIndex} data-playing={playing} data-seated={seated}>
      <a className="corridor-skip" href="#room-navigation" onClick={event => {
        event.preventDefault()
        const target = document.getElementById('room-navigation') || document.querySelector<HTMLElement>('.studio-choice')
        target?.focus({ preventScroll: true })
      }}>Skip to tour controls</a>
      <header className="corridor-header">
        <button type="button" className="corridor-brand" onClick={() => navigate('outside')} aria-label="Muhammad Tatheer, return to the entrance"><span className="brand-monogram">mt<span>.</span></span><span className="brand-caption">MUHAMMAD TATHEER<span>THE INTERACTIVE STUDIO</span></span></button>
        <nav className="corridor-top-nav" aria-label="Portfolio destinations">
          <button type="button" onClick={() => navigate('outside')} aria-current={arrivedRoom === 'outside' ? 'page' : undefined}>The entrance</button>
          {ROOMS.map(room => <button key={room.id} type="button" onClick={() => navigate(room.id)} aria-current={arrivedRoom === room.id ? 'page' : undefined}>{room.short}</button>)}
        </nav>
        <a className="corridor-resume" href={SITE.resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} aria-hidden="true" /></a>
      </header>
      <div className="corridor-stage" ref={stageRef}>
        <div className="corridor-scene" data-ready={ready}>
          {webgl ? <SceneBoundary fallback={fallback} onFailure={onSceneFailure}>
            <CorridorScene activeRoom={activeRoom} navigationId={navigationId} navigationStyle={navigationStyle} onSelectRoom={navigate} onJumpTo={jumpTo} onEnterStudio={enterStudio} onArrival={onArrival} reducedMotion={reducedMotion} onReady={onSceneReady}
              mode={mode} playing={scenePlaying} speed={isAuto ? speed : 1} manualEnabled={controlsEnabled && mode === 'manual' && !travelling}
              entranceOpen={entranceOpen} onToggleEntrance={toggleEntrance} onOpenEntrance={openEntrance} onCloseEntrance={closeEntrance} onManualLocation={onManualLocation} cameraCommand={cameraCommand} handInputRef={handInputRef}
              autoWalk={autoWalk} onAutoWalkStop={stopAutoWalk}
              onSeated={onSeated} projectIndex={projectIndex} onProjectIndexChange={changeProject} onOpenProject={openDetails} />
          </SceneBoundary> : fallback}
        </div>
        <div className="corridor-grain" aria-hidden="true" />
        {!entered && countdown === null && <section className="tour-entry-copy studio-welcome" aria-labelledby="studio-welcome-title">
          <p className="corridor-eyebrow"><span /> A WALK THROUGH MY WORK</p>
          <h1 id="studio-welcome-title">Good ideas<br /> start <em>inside.</em></h1>
          <p>Welcome to my studio. I’m <strong>{SITE.name}</strong>, a {SITE.role.toLowerCase()} with AI and security depth.</p>
          <div className="studio-experience-choice">
            <button type="button" className="studio-choice" onClick={() => chooseExperience('auto')}><span>01 / AUTO TOUR</span><strong>Show me around <ArrowRight size={17} /></strong><small>Relax and watch. Pause or skip any time.</small></button>
            <button type="button" className="studio-choice" onClick={() => chooseExperience('manual')}><span>02 / MANUAL TOUR</span><strong>Explore at my own pace <Footprints size={17} /></strong><small>Click a room point, or open the door and walk.</small></button>
          </div>
          <div className="studio-audio-options">
            <button type="button" className="studio-sound" aria-pressed={soundEnabled} onClick={() => setSoundEnabled(value => !value)}>{soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}Countdown sound {soundEnabled ? 'on' : 'off'}</button>
            <button type="button" className="studio-sound" aria-pressed={musicEnabled} onClick={togglePeacefulMusic}><Music size={14} />Peaceful music {musicEnabled ? 'on' : 'off'}</button>
          </div>
        </section>}
        {countdown !== null && <div className="studio-countdown" role="status" aria-live="assertive">
          <span className="studio-countdown-eyebrow">MUHAMMAD TATHEER / THE INTERACTIVE STUDIO</span>
          <strong key={countdown} className="studio-countdown-number">{countdown || "LET’S GO!"}</strong>
          <span>{countdown ? 'Your curiosity is the only ticket.' : ready ? 'Welcome to the studio.' : 'Preparing the studio…'}</span>
          <button type="button" onClick={() => setCountdown(0)} disabled={countdown === 0}>Skip countdown <SkipForward size={14} /></button>
        </div>}
        {entered && countdown === null && <>
          <div className="studio-mode-switch" role="group" aria-label="Tour mode">
            <button type="button" aria-pressed={isAuto} onClick={() => switchMode('auto')}><Play size={12} /> Auto tour</button>
            <button type="button" aria-pressed={!isAuto} onClick={() => switchMode('manual')}><Footprints size={13} /> Manual tour</button>
            <button type="button" onClick={() => navigate('outside')} title="Return to the entrance"><RotateCcw size={13} /><span>Entrance</span></button>
          </div>
          <div className="studio-telemetry" aria-hidden="true">
            <span className="studio-telemetry-dot" />
            <span>{isAuto ? 'GUIDED SESSION' : 'OPEN EXPLORATION'}</span>
            <b>{scenePlaying ? 'LIVE' : 'PAUSED'}</b>
          </div>
          <StudioNavigationMap location={arrivedRoom} onSelect={jumpTo} onOpen={stopAutoWalk} travelling={travelling} reducedMotion={reducedMotion} />
          <div className="tour-location-copy studio-location-copy">
            <p className="corridor-eyebrow">{isAuto ? 'AUTO TOUR / ' + String(stepIndex + 1).padStart(2, '0') + ' OF ' + TOUR.length : 'EXPLORE AT YOUR OWN PACE'}</p>
            <h1>{caption}</h1>
            <p>{isAuto ? step.caption : selected?.subtitle || (isOutside ? entranceOpen ? 'The door is open. Press ↑ or Auto walk to step inside.' : 'First, click the door or press Open entrance below.' : 'Click a glowing room point, or open a door and walk through.')}</p>
            {!isAuto && <small>Move your mouse to look around. Click a glowing point to go there. Use ↑ / ↓ to walk, or press Auto walk.</small>}
          </div>
          {!isAuto && webgl !== false && <div className="studio-manual-controls" aria-label="Movement controls">
            <div className="studio-direction-pad">
              <button type="button" disabled={travelling} onClick={() => command('turn-left')} aria-label="Turn left" title="Turn a little left">↶</button>
              <button type="button" disabled={travelling} onClick={() => command('forward')} aria-label="Move forward" title="Walk forward">↑</button>
              <button type="button" disabled={travelling} onClick={() => command('turn-right')} aria-label="Turn right" title="Turn a little right">↷</button>
              <button type="button" disabled={travelling} onClick={() => command('face-left')} aria-label="Face left" title="Face left">←</button>
              <button type="button" disabled={travelling} onClick={() => command('back')} aria-label="Move backward" title="Walk backward">↓</button>
              <button type="button" disabled={travelling} onClick={() => command('face-right')} aria-label="Face right" title="Face right">→</button>
            </div>
            <button type="button" className="studio-auto-walk" disabled={travelling} aria-pressed={autoWalk} aria-label={autoWalk ? 'Stop auto walk' : 'Start auto walk'} onClick={() => { setHandEnabled(false); setAutoWalk(value => !value); focusScene() }}>{autoWalk ? <Pause size={14} /> : <Play size={14} />}{autoWalk ? 'Stop walking' : 'Auto walk'}</button>
            <button type="button" className="studio-hand-toggle" disabled={travelling} aria-pressed={handEnabled} title="Optional: control the view with webcam hand gestures" onClick={() => { setAutoWalk(false); setHandEnabled(value => !value) }}><Hand size={14} />Hand controls</button>
            {arrivedRoom === 'projects' && !seated && <button type="button" className="studio-hand-toggle" disabled={travelling} onClick={() => { setSeated(false); command('seat') }}>Take a seat</button>}
          </div>}
          <div id="room-navigation" tabIndex={-1} className="tour-control-dock studio-dock">
            <nav className="tour-room-map" aria-label="Walk to a room"><span className="tour-map-label">THE ROOMS</span>{ROOMS.map(room => <button type="button" key={room.id} aria-current={arrivedRoom === room.id ? 'location' : undefined} onClick={() => navigate(room.id)} aria-label={'Walk to ' + room.title}><span>{room.number}</span>{room.short}</button>)}</nav>
            {isAuto ? <div className="studio-auto-player">
              <div className="studio-tour-progress" role="progressbar" aria-label="Current tour stop" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><span style={{ width: progress * 100 + '%' }} /></div>
              <button type="button" onClick={() => { if (completed) startAuto(); else setPlaying(value => !value) }} aria-label={completed ? 'Replay auto tour' : playing ? 'Pause auto tour' : 'Resume auto tour'}>{playing && !completed ? <Pause size={16} /> : completed ? <RotateCcw size={16} /> : <Play size={16} />}<span>{completed ? 'Replay' : playing ? 'Pause' : 'Resume'}</span></button>
              <button type="button" disabled={completed} onClick={() => { if (stepIndex < TOUR.length - 1) { setPlaying(true); setStepIndex(value => value + 1) } else { setCompleted(true); setPlaying(false) } }} aria-label="Skip tour stop"><SkipForward size={16} /><span>Skip</span></button>
              <label className="studio-speed">Speed<select aria-label="Tour speed" value={speed} onChange={event => setSpeed(Number(event.target.value))}><option value={.5}>0.5×</option><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></label>
              {selected && <button type="button" className="studio-player-details" disabled={travelling} onClick={() => openDetails(step.project ?? null)}>Open details <ArrowUpRight size={14} /></button>}
              <button type="button" className="studio-replay" onClick={startAuto} aria-label="Restart auto tour"><RotateCcw size={15} /></button>
            </div> : <div className="tour-dock-actions">
              {isOutside ? <><button type="button" className="tour-secondary" aria-pressed={entranceOpen} onClick={toggleEntrance}>{entranceOpen ? 'Close entrance' : 'Open entrance'}</button><button type="button" className="tour-primary" disabled={travelling} onClick={() => navigate('hallway')}>Walk inside <ArrowRight size={16} /></button></> :
                <><button type="button" className="tour-secondary" onClick={() => navigate(arrivedRoom === 'hallway' ? 'outside' : 'hallway')}><ArrowLeft size={15} />{arrivedRoom === 'hallway' ? 'Entrance' : 'Corridor'}</button>{selected ? <button type="button" className="tour-primary" disabled={travelling} onClick={() => openDetails()}>{arrivedRoom === 'projects' ? 'Open the collection' : arrivedRoom === 'contact' ? 'Write a message' : 'Read the full story'} <ArrowUpRight size={15} /></button> : <span className="studio-dock-hint">Choose a room, or walk freely.</span>}</>}
            </div>}
          </div>
          <HandTrackingControls enabled={handEnabled && mode === 'manual' && !detailsOpen} onClose={() => setHandEnabled(false)} onInput={onHandInput} />
        </>}
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{entered ? (travelling ? 'Moving to your selected destination.' : caption + '.') : 'Choose an automatic or manual studio tour.'}</p>
        {webgl === false && <p className="studio-fallback-note">3D is unavailable in this browser. All rooms and project details are still accessible.</p>}
      </div>
      <footer className="corridor-footer">
        <p className="corridor-location"><span className="availability-dot" />{SITE.location}<span className="footer-separator">/</span><span>Open to opportunities</span></p>
        <p className="corridor-hint">{PROJECTS.length} projects · Four rooms · Your curiosity</p>
        <div className="corridor-controls">
          <button type="button" onClick={toggleMotion} disabled={preferredReducedMotion} aria-label={preferredReducedMotion ? 'Reduced motion enabled by your device' : motionEnabled ? 'Pause scene motion' : 'Resume scene motion'}>{reducedMotion ? <Play size={14} /> : <Pause size={14} />}<span>{preferredReducedMotion ? 'Reduced motion' : motionEnabled ? 'Motion on' : 'Motion off'}</span></button>
          <button type="button" onClick={togglePeacefulMusic} aria-pressed={musicEnabled} aria-label={musicEnabled ? 'Turn peaceful music off' : 'Play peaceful music'}><Music size={14} /><span>{musicEnabled ? 'Music on' : 'Music off'}</span></button>
          {fullscreenAvailable && <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}</button>}
        </div>
      </footer>
      <dialog ref={dialogRef} className="corridor-room-dialog" aria-labelledby="room-title" onCancel={event => { event.preventDefault(); setDetailsOpen(false) }} onClick={event => { if (event.target === event.currentTarget) setDetailsOpen(false) }}>
        <div className="room-panel-top"><button type="button" className="room-return" onClick={() => setDetailsOpen(false)}><ArrowLeft size={15} />Back to the 3D room</button><span>{detailProject === null ? selected?.number + ' / 04' : 'PROJECT ' + (detailProject + 1)}</span><button type="button" className="room-close" onClick={() => setDetailsOpen(false)} aria-label="Close details"><X size={19} strokeWidth={1.3} /></button></div>
        <nav className="room-panel-nav" aria-label="Walk to another room">{ROOMS.map(room => <button type="button" key={room.id} className={room.id === arrivedRoom ? 'is-active' : ''} aria-current={room.id === arrivedRoom ? 'page' : undefined} onClick={() => { if (room.id !== arrivedRoom) navigate(room.id); else setDetailProject(null) }}>{room.short}</button>)}</nav>
        <div ref={scrollRef} className="room-panel-scroll">{detailsOpen && selected && (detailProject !== null ? <ProjectDetails index={detailProject} /> : <RoomContent key={selected.id} room={selected.id} onClose={() => setDetailsOpen(false)} />)}</div>
        <div className="room-panel-foot"><span>{SITE.name}</span><span>A closer look at the story.</span></div>
      </dialog>
      <noscript><div className="corridor-noscript">Explore <a href="/projects">all projects</a>, <a href="/resume">download my résumé</a>, or <a href={'mailto:' + SITE.email}>email {SITE.email}</a>. Enable JavaScript for the virtual tour.</div></noscript>
    </main>
  )
}

