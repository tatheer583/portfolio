'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, GitFork, Scale, Star } from 'lucide-react'
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
    metric: 'Fully offline',
    label: 'Urdu & English records',
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
  'portfolio': {
    gradient: 'from-violet-500/25 via-sky-500/20 to-indigo-500/25',
    metric: 'Next.js + Motion',
    label: 'This portfolio',
  },
  'psl-sign-learn': {
    gradient: 'from-pink-500/25 via-purple-500/20 to-sky-500/20',
    metric: '37 Urdu letters',
    label: 'On-device sign learning',
  },
  'channel-automation-ai': {
    gradient: 'from-orange-500/25 via-amber-500/20 to-sky-500/20',
    metric: 'Video automation',
    label: 'Open-source YouTube tooling',
  },
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const visual = PROJECT_VISUALS[project.slug] ?? {
    gradient: 'from-accent/25 via-blue-500/20 to-emerald-500/20',
    metric: project.categoryLabel,
    label: 'Case study',
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn('h-full', className)}
    >
      <Card hoverable variant="glow" className="group flex h-full flex-col overflow-hidden p-0 border border-line bg-bg-surface">
        <Link href={`/projects/${project.slug}`} className="block focus:outline-none">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
            <RealProjectMockup
              slug={project.slug}
              title={project.title}
              category={project.categoryLabel}
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              <h3 className="font-display text-lg font-bold text-content-primary transition-colors hover:text-accent">
                {project.title}
              </h3>
            </Link>
            {project.status && (
              <span
                className={cn(
                  'shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide',
                  project.status === 'Live'
                    ? 'border-accent3/40 bg-accent3/10 text-accent3'
                    : project.status === 'Released'
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                )}
              >
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-content-secondary">
            {project.description}
          </p>

          {/* Repo metadata straight from GitHub */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-content-muted">
            {project.language && (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {project.language}
              </span>
            )}
            {typeof project.stars === 'number' && (
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {project.stars}
              </span>
            )}
            {typeof project.forks === 'number' && project.forks > 0 && (
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {project.forks}
              </span>
            )}
            {project.license && (
              <span className="inline-flex items-center gap-1">
                <Scale className="h-3.5 w-3.5" /> {project.license}
              </span>
            )}
          </div>

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
