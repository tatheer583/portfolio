'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Download, Menu, Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { useScrollspy } from '@/hooks/useScrollspy'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const ids = NAV_LINKS.map((l) => l.href.replace('#', ''))
  const activeId = useScrollspy(ids)
  const onHome = pathname === '/'

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sectionHref = (href: string) => (onHome ? href : `/${href}`)
  const openSearch = () => window.dispatchEvent(new Event('portfolio:open-search'))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-line' : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Muhammad Tatheer home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-display text-sm font-extrabold text-gradient">
            MT
          </span>
          <span className="hidden font-display text-base font-bold text-content-primary sm:block">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const active = onHome && activeId === id
            return (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-content-primary',
                  active ? 'text-content-primary' : 'text-content-secondary'
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent"
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search portfolio"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-content-secondary transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
            <a href={SITE.resumeUrl}>
              <Download className="h-4 w-4" /> Resume
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-content-secondary lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] glass lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-display text-base font-bold text-content-primary">
                {SITE.name}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-content-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-7 pt-12">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl font-bold text-content-primary"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex gap-4">
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-content-secondary hover:text-content-primary"
                >
                  GitHub
                </a>
                <a
                  href={SITE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-content-secondary hover:text-content-primary"
                >
                  LinkedIn
                </a>
              </div>
              <Button asChild variant="primary">
                <a href={SITE.resumeUrl} onClick={() => setOpen(false)}>
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}