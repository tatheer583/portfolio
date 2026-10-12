'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types/project'
import { Card } from '@/components/ui/card'
import { TechChip } from '@/components/shared/TechChip'
import { RealProjectMockup } from '@/components/shared/RealProjectMockup'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

const PROJECT_VISUALS: Record<string, { gradient: string; metric: string; label: string }> = {
  'skardu-spring': {
    gradient: 'from-sky-500/30 via-cyan-400/20 to-blue-600/25',
    metric: 'Luxury commerce',
    label: 'Full-stack brand',
  },
  'khidmat-app': {
    gradient: 'from-teal-500/30 via-amber-400/15 to-emerald-500/25',
    metric: '6 AI agents',
    label: 'Service orchestration',
  },
  'personal-finance-manager': {
    gradient: 'from-emerald-500/30 via-lime-400/15 to-cyan-500/20',
    metric: 'Money clarity',
    label: 'Finance dashboard',
  },
  'medi-connect': {
    gradient: 'from-blue-500/25 via-sky-400/20 to-indigo-500/25',
    metric: 'Care workflow',
    label: 'Healthcare platform',
  },
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
  'e-nose-system': {
    gradient: 'from-fuchsia-500/20 via-teal-500/25 to-rose-500/20',
    metric: 'Air intelligence',
    label: 'IoT + ML sensing',
  },
  'wiwave-motion': {
    gradient: 'from-cyan-500/25 via-blue-500/20 to-violet-500/20',
    metric: 'WiFi sensing',
    label: 'Motion detection',
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
      <Card hoverable variant="glow" className="group flex h-full flex-col overflow-hidden p-0 border border-white/10 bg-[#0c0e15]">
        <Link href={`/projects/${project.slug}`} className="block focus:outline-none">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
            <RealProjectMockup
              slug={project.slug}
              title={project.title}
              category={project.categoryLabel}
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            <h3 className="font-display text-lg font-bold text-white transition-colors hover:text-sky-400">
              {project.title}
            </h3>
          </Link>
          <p className="mt-2 flex-1 text-sm sm:text-base font-medium italic leading-relaxed text-white/95">
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
