'use client'

import { useEffect, useRef, useState } from 'react'
import type { HandLandmarker } from '@mediapipe/tasks-vision'
import { Camera, Hand, Loader2, X } from 'lucide-react'
import { handNavigationInput, RESTING_HAND_INPUT, type HandNavigationInput } from '@/lib/hand-navigation'

interface HandTrackingControlsProps {
  enabled: boolean
  onClose: () => void
  onInput: (input: HandNavigationInput) => void
}

type CameraStatus = 'idle' | 'permission' | 'loading' | 'tracking' | 'paused' | 'error'

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
]

function cameraError(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError' || error.name === 'SecurityError') {
      return 'Camera access was declined. Mouse, keyboard, and touch controls still work.'
    }
    if (error.name === 'NotFoundError') return 'No camera was found. You can continue with the regular controls.'
    if (error.name === 'NotReadableError') return 'Your camera is busy. Close the app using it and try again.'
  }
  return 'Hand tracking could not start. Your camera has been stopped; regular navigation still works.'
}

/** Camera access and the MediaPipe download both begin only after the Start camera button. */
export default function HandTrackingControls({ enabled, onClose, onInput }: HandTrackingControlsProps) {
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [message, setMessage] = useState('')
  const [handFound, setHandFound] = useState(false)
  const [walking, setWalking] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const modelRef = useRef<HandLandmarker | null>(null)
  const frameRef = useRef(0)
  const generationRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)
  const busyRef = useRef(false)
  const callbacksRef = useRef({ onClose, onInput })
  callbacksRef.current = { onClose, onInput }

  const stopResources = () => {
    generationRef.current += 1
    busyRef.current = false
    cancelAnimationFrame(frameRef.current)
    abortRef.current?.abort()
    abortRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }
    try { modelRef.current?.close() } catch { /* A failed runtime may already be closed. */ }
    modelRef.current = null
    callbacksRef.current.onInput({ ...RESTING_HAND_INPUT })
  }
  const stopRef = useRef(stopResources)
  stopRef.current = stopResources

  useEffect(() => {
    if (!enabled) return
    setStatus('idle')
    setMessage('')
    const visibility = () => {
      if (!document.hidden) return
      stopRef.current()
      setHandFound(false)
      setWalking(false)
      setStatus('paused')
      setMessage('Camera stopped while this tab was hidden. Start it again when you are ready.')
    }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      document.removeEventListener('visibilitychange', visibility)
      stopRef.current()
    }
  }, [enabled])

  const start = async () => {
    if (!enabled || busyRef.current || document.hidden) return
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setStatus('error')
      setMessage('Camera controls need HTTPS or localhost and a browser with webcam support.')
      return
    }
    busyRef.current = true
    const generation = ++generationRef.current
    setMessage('')
    setStatus('permission')
    let localModel: HandLandmarker | null = null

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: { ideal: 320 }, height: { ideal: 240 }, frameRate: { ideal: 15, max: 20 }, facingMode: 'user' },
      })
      if (generation !== generationRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }
      streamRef.current = stream
      stream.getVideoTracks().forEach((track) => {
        track.onended = () => {
          if (generation !== generationRef.current) return
          stopRef.current()
          setStatus('paused')
          setMessage('Camera access ended. Start the camera again to use hand controls.')
        }
      })
      const video = videoRef.current
      if (!video) throw new Error('Preview unavailable')
      video.srcObject = stream
      await video.play()
      if (generation !== generationRef.current) return
      setStatus('loading')

      // Neither this module nor the ~8 MB model is requested during the ordinary tour.
      const { FilesetResolver, HandLandmarker: HandModel } = await import('@mediapipe/tasks-vision')
      if (generation !== generationRef.current) return
      const abort = new AbortController()
      abortRef.current = abort
      const [vision, response] = await Promise.all([
        FilesetResolver.forVisionTasks('/hand-tracking/wasm'),
        fetch('/hand-tracking/hand_landmarker.task', { signal: abort.signal }),
      ])
      if (!response.ok) throw new Error('Hand model unavailable')
      const modelAssetBuffer = new Uint8Array(await response.arrayBuffer())
      if (generation !== generationRef.current) return
      const options = {
        baseOptions: { modelAssetBuffer, delegate: 'GPU' as const },
        runningMode: 'VIDEO' as const,
        numHands: 1,
        minHandDetectionConfidence: 0.65,
        minHandPresenceConfidence: 0.65,
        minTrackingConfidence: 0.65,
      }
      try {
        localModel = await HandModel.createFromOptions(vision, options)
      } catch {
        if (generation !== generationRef.current) return
        localModel = await HandModel.createFromOptions(vision, {
          ...options, baseOptions: { modelAssetBuffer, delegate: 'CPU' },
        })
      }
      if (generation !== generationRef.current) {
        localModel.close()
        return
      }
      modelRef.current = localModel
      setStatus('tracking')
      let lastFrame = -Infinity
      let lastVideoTime = -1
      let pinched = false
      let smoothed: HandNavigationInput = { ...RESTING_HAND_INPUT }
      let frameInterval = 1000 / 12

      const detect = (now: number) => {
        if (generation !== generationRef.current || document.hidden) return
        if (now - lastFrame >= frameInterval && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
          lastFrame = now
          lastVideoTime = video.currentTime
          const started = performance.now()
          try {
            const result = localModel!.detectForVideo(video, now)
            const points = result.landmarks[0]
            const next = points ? handNavigationInput(points, pinched) : { ...RESTING_HAND_INPUT }
            pinched = next.forward > 0
            // No hand always stops movement immediately. Look is gently damped while a hand is present.
            smoothed = points ? {
              lookX: smoothed.lookX * 0.65 + next.lookX * 0.35,
              lookY: smoothed.lookY * 0.65 + next.lookY * 0.35,
              forward: next.forward,
            } : { ...RESTING_HAND_INPUT }
            callbacksRef.current.onInput(smoothed)
            setHandFound(Boolean(points))
            setWalking(pinched)
            const canvas = canvasRef.current
            const context = canvas?.getContext('2d')
            if (canvas && context) {
              context.clearRect(0, 0, canvas.width, canvas.height)
              if (points) {
                context.strokeStyle = pinched ? '#9bd2ab' : '#fff2bd'
                context.fillStyle = '#ffffff'
                context.lineWidth = 2
                CONNECTIONS.forEach(([from, to]) => {
                  context.beginPath()
                  context.moveTo((1 - points[from].x) * canvas.width, points[from].y * canvas.height)
                  context.lineTo((1 - points[to].x) * canvas.width, points[to].y * canvas.height)
                  context.stroke()
                })
                points.forEach((point) => {
                  context.beginPath()
                  context.arc((1 - point.x) * canvas.width, point.y * canvas.height, 2.4, 0, Math.PI * 2)
                  context.fill()
                })
              }
            }
            // Slow laptops get more breathing room between inference calls.
            frameInterval = Math.max(1000 / 12, Math.min(250, (performance.now() - started) * 3))
          } catch {
            stopRef.current()
            setStatus('error')
            setMessage('Hand tracking stopped. Your camera is off; use the regular tour controls.')
            return
          }
        }
        frameRef.current = requestAnimationFrame(detect)
      }
      frameRef.current = requestAnimationFrame(detect)
    } catch (error) {
      if (generation !== generationRef.current) return
      stopRef.current()
      setStatus('error')
      setMessage(cameraError(error))
    }
  }

  if (!enabled) return null
  const loading = status === 'permission' || status === 'loading'
  const active = status === 'tracking'

  return (
    <aside className="hand-tracking-panel" aria-label="Optional hand navigation" style={{
      position: 'absolute', right: 20, bottom: 154, width: 'min(280px, calc(100vw - 32px))',
      maxHeight: 'calc(100svh - 185px)', overflowY: 'auto',
      border: '1px solid rgba(109,91,59,.3)', borderRadius: 18, background: 'rgba(255,248,222,.96)',
      color: '#39392f', padding: 16, zIndex: 35, boxShadow: '0 16px 50px rgba(47,40,23,.13)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, fontWeight: 600 }}><Hand size={16} /> Hand navigation</span>
        <button type="button" aria-label="Close hand controls and stop camera" onClick={() => {
          stopResources()
          callbacksRef.current.onClose()
        }} style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: '50%', border: '1px solid #cec6aa', background: 'transparent' }}><X size={14} /></button>
      </div>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#292f29', borderRadius: 10, overflow: 'hidden', display: active || loading ? 'block' : 'none' }}>
        <video ref={videoRef} autoPlay playsInline muted aria-label="Local camera preview" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
        <canvas ref={canvasRef} width={320} height={240} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>
      <p role="status" aria-live="polite" style={{ fontSize: 12, lineHeight: 1.5, margin: '10px 0' }}>
        {message || (status === 'permission' ? 'Waiting for camera permission…' : status === 'loading' ? 'Preparing hand controls…' : active ? handFound ? walking ? 'Pinch held · walking forward' : 'Hand found · release pinch to stop' : 'Show one hand to your camera.' : 'Move your hand to look around. Hold a thumb/index pinch to walk; release to stop.')}
      </p>
      <p style={{ fontSize: 10, lineHeight: 1.5, opacity: .75, marginBottom: 12 }}>Optional camera controls. Video is processed on this device and is never uploaded. Closing this panel or hiding the tab stops the camera.</p>
      <button type="button" disabled={loading} onClick={() => {
        if (active) {
          stopResources()
          setStatus('idle')
          setHandFound(false)
          setWalking(false)
        } else void start()
      }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '10px 12px', borderRadius: 9, background: '#454b3e', color: '#fff7dc', fontSize: 12, opacity: loading ? .7 : 1 }}>
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
        {active ? 'Stop camera' : loading ? 'Starting…' : 'Start camera'}
      </button>
    </aside>
  )
}
