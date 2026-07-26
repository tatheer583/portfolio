'use client'

import * as React from 'react'
import { useInView } from '@/hooks/useInView'

interface AnimatedCounterProps {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1600,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, threshold: 0.4 })
  const [value, setValue] = React.useState(from)

  React.useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, from, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}
