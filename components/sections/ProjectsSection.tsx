'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { PROJECTS, PROJECT_STATS } from '@/data/projects'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

const FILTERS = [
  'All',
  'Full Stack',
  'Mobile',
  'AI/ML',
  'Web',
  'IoT',
  'Security',
  'Computer Vision',
  'Automation',
] as const

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>('All')
  const filtered = PROJECTS.filter(
    (p) => filter === 'All' || p.category.includes(filter as never)
  ).sort((a, b) => a.order - b.order)

  return (
    <Section id="projects" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[24rem] w-[24rem] rounded-full aurora animate-aurora opacity-50" aria-hidden />

      <SectionHeader
        eyebrow="Projects"
        title="Every Project, Publicly Shipped"
        subtitle="Each card below maps to a live repository on GitHub — with its real language, star count, licence and live deployment where one exists."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f === 'All'
              ? PROJECTS.length
              : PROJECTS.filter((p) => p.category.includes(f as never)).length
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
                filter === f
                  ? 'border-accent bg-accent text-white accent-glow'
                  : 'border-line text-content-secondary hover:-translate-y-0.5 hover:border-accent/40 hover:text-content-primary'
              )}
            >
              {f}
              <span className="ml-1.5 font-mono text-[11px] opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        {filtered.map((project, i) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <a
          href={SITE.githubReposUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-surface px-5 py-2.5 text-sm font-medium text-content-primary transition-all hover:border-accent/40 hover:bg-bg-elevated"
        >
          <Github className="h-4 w-4 text-accent" />
          See all {PROJECT_STATS.total} repositories on GitHub
        </a>
        <p className="text-xs text-content-muted">
          {PROJECT_STATS.total} repositories · {PROJECT_STATS.stars} stars ·{' '}
          {PROJECT_STATS.languages.length} primary languages
        </p>
      </div>
    </Section>
  )
}
