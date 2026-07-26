'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Folder, Code2, ArrowRight, ShieldCheck } from 'lucide-react'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import { PROJECTS } from '@/data/projects'
import { SKILLS } from '@/data/skills'

const searchData = [
  ...PROJECTS.map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    type: 'project' as const,
    icon: p.category.includes('Security') ? ShieldCheck : Folder,
  })),
  ...SKILLS.flatMap((cat) =>
    cat.skills.map((s) => ({
      id: s.name,
      title: s.name,
      description: `Skill in ${cat.label} (${s.level}%)`,
      type: 'skill' as const,
      icon: cat.id === 'security' ? ShieldCheck : Code2,
    }))
  ),
]

const fuse = new Fuse(searchData, {
  keys: ['title', 'description', 'type'],
  threshold: 0.35,
})

export function SearchModal() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((current) => !current)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const openSearch = () => setOpen(true)
    document.addEventListener('keydown', down)
    window.addEventListener('portfolio:open-search', openSearch)
    return () => {
      document.removeEventListener('keydown', down)
      window.removeEventListener('portfolio:open-search', openSearch)
    }
  }, [])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [open])

  const results = query ? fuse.search(query).map((res) => res.item).slice(0, 6) : searchData.slice(0, 6)

  const openResult = (item: (typeof searchData)[number]) => {
    if (item.type === 'project') {
      router.push(`/projects/${item.id}`)
      return
    }
    router.push(item.description.includes('Security') ? '/#security' : '/#skills')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/80 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search portfolio"
          >
            <div className="flex items-center border-b border-line px-4">
              <Search className="mr-3 h-5 w-5 text-content-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, security..."
                className="h-14 w-full bg-transparent text-content-primary placeholder:text-content-muted focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-content-muted hover:bg-bg-elevated hover:text-content-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="py-10 text-center text-sm text-content-muted">
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {results.map((item, index) => (
                    <button
                      key={`${item.id}-${index}`}
                      type="button"
                      onClick={() => {
                        openResult(item)
                        setOpen(false)
                      }}
                      className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-bg-elevated"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-content-secondary group-hover:border-accent/40 group-hover:text-accent">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium text-content-primary">
                              {item.title}
                            </span>
                            <span className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-content-muted group-hover:bg-accent/10 group-hover:text-accent">
                              {item.type}
                            </span>
                          </div>
                          <p className="line-clamp-1 text-xs text-content-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-content-muted opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-accent" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 border-t border-line bg-bg-elevated/50 px-4 py-3 text-xs text-content-muted">
              <span>Press</span>
              <kbd className="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-content-secondary">esc</kbd>
              <span>to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}