'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const delay = prefersReduced ? 400 : 1800
    const t = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.4] }}
            transition={{ duration: 1.8, times: [0, 0.1, 0.55, 1], ease: 'easeInOut' }}
            className="relative font-display text-6xl font-extrabold text-gradient"
            style={{ filter: 'drop-shadow(0 0 24px rgba(108,99,255,0.6))' }}
          >
            MT
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
