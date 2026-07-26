'use client'

import * as React from 'react'

export function GlowCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null)
  const glowRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (prefersReduced || isTouch) return

    let dotX = 0
    let dotY = 0
    let glowX = 0
    let glowY = 0

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]')
      if (glowRef.current) {
        glowRef.current.style.opacity = interactive ? '1' : '0.4'
        glowRef.current.style.width = interactive ? '40px' : '24px'
        glowRef.current.style.height = interactive ? '40px' : '24px'
      }
    }

    let raf = 0
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`
      }
      glowX += (dotX - glowX) * 0.15
      glowY += (dotY - glowY) * 0.15
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[200] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[199] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-md transition-all duration-200 md:block"
        aria-hidden
      />
    </>
  )
}
