'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/') return <>{children}</>
  return <>
    <header className="document-header">
      <Link href="/" aria-label="Muhammad Tatheer home"><span className="brand-monogram">mt<span>.</span></span><span>{SITE.name}</span></Link>
      <nav aria-label="Portfolio"><Link href="/#projects"><ArrowLeft size={13} aria-hidden="true" /> The gallery</Link><Link href="/#contact">Say hello</Link><a href={SITE.resumeUrl}>Résumé <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
    </header>
    {children}
    <footer className="document-footer"><span>© {new Date().getFullYear()} {SITE.name}</span><Link href="/">Back to the corridor ↗</Link><a href={'mailto:' + SITE.email}>{SITE.email}</a></footer>
  </>
}

