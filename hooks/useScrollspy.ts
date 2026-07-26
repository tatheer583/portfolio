'use client'

import * as React from 'react'

export function useScrollspy(ids: string[], offset = 80) {
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const handler = () => {
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) {
          current = id
        }
      }
      setActiveId(current)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [ids, offset])

  return activeId
}
