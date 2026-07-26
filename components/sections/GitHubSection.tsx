'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import { Star, GitFork, BookOpen, Users } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/card'
import { SITE } from '@/lib/constants'

interface RepoStat {
  name: string
  description: string | null
  stars: number
  forks: number
  language: string | null
}

export function GitHubSection() {
  const [stats, setStats] = React.useState<{
    repos: number
    stars: number
    followers: number
    pinned: RepoStat[]
    languages: { name: string; count: number }[]
  } | null>(null)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.user || data?.repos?.length) {
          setStats({
            repos: data.user?.publicRepos ?? data.repos?.length ?? 0,
            stars: data.totalStars ?? 0,
            followers: data.user?.followers ?? 0,
            pinned: (data.pinned ?? []).map((p: any) => ({
              name: p.name,
              description: p.description,
              stars: p.stars,
              forks: p.forks,
              language: p.primaryLanguage?.name ?? null,
            })),
            languages: data.languages ?? [],
          })
        }
      })
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [])

  const fallbackPinned = [
    { name: 'jarvis-ai-assistant', description: 'Voice-powered personal AI assistant', stars: 42, forks: 8, language: 'Python' },
    { name: 'cyber-sathi', description: 'AI cybersecurity assistant', stars: 28, forks: 4, language: 'Python' },
    { name: 'drone-ai-system', description: 'Autonomous drone with computer vision', stars: 31, forks: 5, language: 'Python' },
  ]

  const pinned = stats?.pinned?.length ? stats.pinned : fallbackPinned

  return (
    <Section id="github">
      <SectionHeader
        eyebrow="Open Source"
        title="Open Source Activity"
        subtitle="Live contribution data from GitHub — my work in public."
      />

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          icon={BookOpen}
          value={stats?.repos ?? '—'}
          label="Repositories"
        />
        <StatCard icon={Star} value={stats?.stars ?? '—'} label="Stars" />
        <StatCard icon={Users} value={stats?.followers ?? '—'} label="Followers" />
        <StatCard icon={GitFork} value={pinned.length} label="Pinned" />
      </div>

      <div className="mb-10 overflow-hidden rounded-lg border border-line bg-bg-surface p-4">
        <GitHubCalendar
          username={SITE.githubUsername}
          colorScheme="dark"
          theme={{
            dark: ['#111111', '#3D3580', '#5C4FBF', '#7B6AFF', '#6C63FF'],
            light: ['#f0f0f0', '#ddd6fe', '#c4b5fd', '#a78bfa', '#6C63FF'],
          }}
        />
      </div>

      {stats?.languages && stats.languages.length > 0 && (
        <div className="mb-10 overflow-hidden rounded-lg border border-line bg-bg-surface p-5">
          <h3 className="mb-4 text-sm font-semibold text-content-primary">Top Languages</h3>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-bg-elevated">
            {stats.languages.map((lang, i) => {
              const total = stats.languages.reduce((sum, l) => sum + l.count, 0)
              const percent = (lang.count / total) * 100
              const colors = ['bg-accent', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']
              return (
                <div
                  key={lang.name}
                  style={{ width: `${percent}%` }}
                  className={colors[i % colors.length]}
                  title={`${lang.name}: ${percent.toFixed(1)}%`}
                />
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-content-secondary">
            {stats.languages.map((lang, i) => {
              const total = stats.languages.reduce((sum, l) => sum + l.count, 0)
              const percent = (lang.count / total) * 100
              const textColors = ['text-accent', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-red-500']
              return (
                <span key={lang.name} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${textColors[i % textColors.length].replace('text-', 'bg-')}`} />
                  {lang.name} <span className="text-content-muted">{percent.toFixed(1)}%</span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pinned.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={`https://github.com/${SITE.githubUsername}/${repo.name}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group flex flex-col rounded-lg border border-line bg-bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:card-hover-glow"
          >
            <h3 className="font-mono text-sm font-semibold text-accent group-hover:text-accent-light">
              {repo.name}
            </h3>
            <p className="mt-2 flex-1 text-sm text-content-secondary">{repo.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-content-muted">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {repo.language}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {repo.stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {error && (
        <p className="mt-6 text-center text-sm text-content-muted">
          Live GitHub data temporarily unavailable — showing a snapshot.
        </p>
      )}
    </Section>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number | string
  label: string
}) {
  return (
    <Card variant="glow" padding="md" className="flex flex-col items-center text-center">
      <Icon className="h-5 w-5 text-accent" />
      <p className="mt-2 font-mono text-2xl font-bold text-content-primary">{value}</p>
      <p className="text-xs text-content-muted">{label}</p>
    </Card>
  )
}
