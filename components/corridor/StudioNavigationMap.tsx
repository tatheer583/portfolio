'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Map } from 'lucide-react'

type StudioLocation = 'outside' | 'hallway' | 'projects' | 'about' | 'journey' | 'contact'

type StudioNavigationMapProps = {
  location: StudioLocation
  onSelect: (location: StudioLocation) => void
  onOpen?: () => void
  travelling: boolean
  reducedMotion?: boolean
}

const DESTINATIONS: { location: StudioLocation; label: string; number: string; x: number; y: number }[] = [
  { location: 'projects', label: 'Projects', number: '01', x: 23, y: 50 },
  { location: 'about', label: 'About me', number: '02', x: 77, y: 50 },
  { location: 'journey', label: 'My journey', number: '03', x: 23, y: 21 },
  { location: 'contact', label: 'Say hello', number: '04', x: 77, y: 21 },
  { location: 'hallway', label: 'Front hall', number: '', x: 50, y: 72 },
  { location: 'outside', label: 'Entrance', number: '', x: 50, y: 92 },
]

export default function StudioNavigationMap({ location, onSelect, onOpen, travelling, reducedMotion = false }: StudioNavigationMapProps) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const mapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!expanded) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !mapRef.current?.contains(event.target)) setExpanded(false)
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      setExpanded(false)
      mapRef.current?.querySelector<HTMLButtonElement>('.studio-map-toggle')?.focus({ preventScroll: true })
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeWithEscape, true)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeWithEscape, true)
    }
  }, [expanded])

  return (
    <nav ref={mapRef} className="studio-navigation-map" aria-label="Studio destinations" data-expanded={expanded} data-reduced-motion={reducedMotion}>
      <button
        type="button"
        className="studio-map-toggle"
        aria-label="Studio map"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => { if (!expanded) onOpen?.(); setExpanded((current) => !current) }}
      >
        <Map size={14} aria-hidden="true" />
        <span className="studio-map-toggle-label">Studio map</span>
        <span className="studio-map-toggle-short" aria-hidden="true">Map</span>
        <ChevronDown className="studio-map-chevron" size={12} aria-hidden="true" />
      </button>

      {expanded && (
        <div className="studio-map-panel" id={panelId}>
          <p className="studio-map-eyebrow">EXPLORE THE STUDIO</p>
          <p className="studio-map-heading">Tap a point to go there</p>
          <div className="studio-map-floor">
            <svg viewBox="0 0 240 224" aria-hidden="true" focusable="false" className="studio-map-drawing">
              <rect x="9" y="8" width="94" height="75" rx="9" />
              <rect x="137" y="8" width="94" height="75" rx="9" />
              <rect x="9" y="90" width="94" height="53" rx="9" />
              <rect x="137" y="90" width="94" height="53" rx="9" />
              <path className="studio-map-corridor" d="M103 43H137M103 116H137M120 43V201" />
              <path className="studio-map-route" d="M120 201V43M120 43H56M120 43H184M120 116H56M120 116H184" />
              <path className="studio-map-entry" d="M100 214H140M105 210V202M135 210V202" />
            </svg>
            {DESTINATIONS.map((destination) => (
              <button
                type="button"
                key={destination.location}
                className="studio-map-point"
                style={{ left: `${destination.x}%`, top: `${destination.y}%` }}
                aria-label={`Go directly to ${destination.label}`}
                aria-current={location === destination.location ? 'location' : undefined}
                onClick={() => {
                  onSelect(destination.location)
                  setExpanded(false)
                }}
              >
                <span className="studio-map-marker" aria-hidden="true">{destination.number || <span />}</span>
                <span className="studio-map-point-label">{destination.label}</span>
              </button>
            ))}
          </div>
          <p className="studio-map-instruction">{travelling ? 'Choose another room at any time.' : 'Every room is one tap away.'}</p>
        </div>
      )}
    </nav>
  )
}
