'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types/project'
import { Card } from '@/components/ui/card'
import { TechChip } from '@/components/shared/TechChip'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

const PROJECT_VISUALS: Record<string, { gradient: string; metric: string; label: string }> = {
  'jarvis-ai-assistant': {
    gradient: 'from-indigo-500/30 via-cyan-500/20 to-violet-500/25',
    metric: 'Voice + LLM',
    label: 'Agent workflow',
  },
  'cyber-sathi': {
    gradient: 'from-emerald-500/25 via-cyan-500/20 to-blue-500/25',
    metric: 'Threat AI',
    label: 'Security scan',
  },
  'drone-ai-system': {
    gradient: 'from-sky-500/25 via-zinc-500/20 to-amber-500/20',
    metric: 'Real-time CV',
    label: 'Autonomous vision',
  },
  'agevee-travel': {
    gradient: 'from-rose-500/20 via-purple-500/20 to-amber-500/20',
    metric: 'Travel UX',
    label: 'Full-stack platform',
  },
  'iot-security-system': {
    gradient: 'from-teal-500/25 via-lime-500/15 to-orange-500/20',
    metric: '10-in-1',
    label: 'Smart monitoring',
  },
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const visual = PROJECT_VISUALS[project.slug] ?? {
    gradient: 'from-accent/25 via-blue-500/20 to-emerald-500/20',
    metric: project.categoryLabel,
    label: 'Case study',
  }
  const [imgFailed, setImgFailed] = React.useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('h-full', className)}
    >
      <Card hoverable variant="glow" className="group flex h-full flex-col overflow-hidden p-0">
        <Link href={`/projects/${project.slug}`} className="block focus:outline-none">
          <div className={cn('relative aspect-[16/10] overflow-hidden bg-gradient-to-br', visual.gradient)}>
            {!imgFailed && (
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImgFailed(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                {visual.label}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">{visual.metric}</p>
            </div>
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              {project.categoryLabel}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <h3 className="font-display text-xl font-bold text-content-primary transition-colors hover:text-accent-light">
              {project.title}
            </h3>
          </Link>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-content-secondary">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 5).map((t) => (
              <TechChip key={t} name={t} />
            ))}
            {project.tech.length > 5 && (
              <span className="text-xs text-content-muted">+{project.tech.length - 5} more</span>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2"
            >
              View Case Study
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="text-content-muted transition-colors hover:text-content-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} GitHub`}
                  className="text-content-muted transition-colors hover:text-content-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
