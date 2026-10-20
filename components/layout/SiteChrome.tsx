'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

/**
 * The home page renders its own Navigation, Footer and backdrop, so this
 * wrapper only adds the shared chrome to every other route (case studies,
 * redirects, error pages).
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/') return <>{children}</>

  return (
    <div className="relative min-h-screen bg-bg text-content-primary">
      <div className="pointer-events-none fixed inset-0 z-0 grid-pattern opacity-40" />
      <Navigation />
      <div className="relative z-10">{children}</div>
      <Footer />
    </div>
  )
}
