'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current = theme === 'system' ? resolvedTheme : theme

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-surface text-content-secondary transition-colors hover:border-accent/40 hover:text-accent',
        className
      )}
    >
      {mounted && current === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
