'use client'

import * as React from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>(
  ref: React.RefObject<T>,
  { threshold = 0.2, rootMargin = '0px', once = false }: Options = {}
) {
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, once])

  return inView
}
