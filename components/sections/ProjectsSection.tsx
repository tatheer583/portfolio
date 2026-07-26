'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProjectCard } from '@/components/shared/ProjectCard'
import { PROJECTS } from '@/data/projects'
import { cn } from '@/lib/utils'

const FILTERS = [
  'All',
  'Full Stack',
  'AI/ML',
  'Web',
  'Security',
  'Computer Vision',
  'IoT',
] as const

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>('All')
  const filtered = PROJECTS.filter(
    (p) => filter === 'All' || p.category.includes(filter as never)
  ).sort((a, b) => a.order - b.order)

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Projects"
        title="Selected Work"
        subtitle="Full-stack products, mobile apps, AI systems, IoT sensing, and security tools built end-to-end."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
              filter === f
                ? 'border-accent bg-accent text-white accent-glow'
                : 'border-line text-content-secondary hover:border-accent/40 hover:text-content-primary'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://github.com/tatheer583"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
        >
          Explore more on GitHub
        </a>
      </div>
    </Section>
  )
}