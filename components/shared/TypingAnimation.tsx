'use client'

import * as React from 'react'

interface TypingAnimationProps {
  words: readonly string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
}

export function TypingAnimation({
  words,
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1500,
}: TypingAnimationProps) {
  const [text, setText] = React.useState('')
  const [wordIndex, setWordIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setText(words[0])
      return
    }

    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText((t) => t.slice(0, -1))
        if (text === current.slice(0, 1)) {
          setIsDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
        }
      }, deletingSpeed)
    } else {
      timeout = setTimeout(() => {
        setText((t) => current.slice(0, t.length + 1))
        if (text === current) {
          timeout = setTimeout(() => setIsDeleting(true), pause)
        }
      }, typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-accent" aria-hidden>
        &nbsp;
      </span>
    </span>
  )
}
