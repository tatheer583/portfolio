'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_NAME = 'MUHAMMAD TATHEER'

export function AnimatedName() {
  const [displayedCount, setDisplayedCount] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [activeCycle, setActiveCycle] = React.useState(0)

  React.useEffect(() => {
    let timer: NodeJS.Timeout

    if (!isDeleting) {
      if (displayedCount < FULL_NAME.length) {
        // Typing each letter one by one (120ms rhythm)
        timer = setTimeout(() => {
          setDisplayedCount((prev) => prev + 1)
        }, 120)
      } else {
        // When fully written, pause for 3.5 seconds in full glory, then delete and repeat
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 3500)
      }
    } else {
      if (displayedCount > 0) {
        // Smooth deleting
        timer = setTimeout(() => {
          setDisplayedCount((prev) => prev - 1)
        }, 50)
      } else {
        // Start next typing cycle
        setIsDeleting(false)
        setActiveCycle((prev) => prev + 1)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedCount, isDeleting, activeCycle])

  return (
    <div className="relative inline-flex items-center flex-wrap select-none py-1">
      <span className="sr-only">{FULL_NAME}</span>
      <div className="flex items-center flex-wrap gap-x-1 tracking-wider" aria-hidden="true">
        {FULL_NAME.split('').map((char, index) => {
          const isVisible = index < displayedCount
          const isSpace = char === ' '
          const isJustTyped = index === displayedCount - 1 && !isDeleting

          if (isSpace) {
            return (
              <span key={`space-${index}`} className="inline-block w-3 sm:w-5">
                &nbsp;
              </span>
            )
          }

          return (
            <AnimatePresence key={`char-${index}-${activeCycle}`} mode="wait">
              {isVisible && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.4, y: 10 }}
                  animate={{
                    opacity: 1,
                    scale: isJustTyped ? [1.3, 1] : 1,
                    y: 0,
                    textShadow: [
                      '0 0 12px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.3)',
                      '0 0 20px rgba(255, 255, 255, 0.9), 0 0 36px rgba(255, 255, 255, 0.5)',
                      '0 0 12px rgba(255, 255, 255, 0.6), 0 0 24px rgba(255, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 0.3,
                    textShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="inline-block font-extrabold uppercase text-white"
                  style={{
                    color: '#ffffff',
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                  }}
                >
                  {char}
                </motion.span>
              )}
            </AnimatePresence>
          )
        })}

        {/* Clean Glowing White Typing Cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
          className="ml-1.5 inline-block h-8 w-1 sm:h-12 sm:w-1.5 rounded-full bg-white shadow-[0_0_14px_#ffffff]"
        />
      </div>
    </div>
  )
}
