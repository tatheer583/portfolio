'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Layers } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SKILLS } from '@/data/skills'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

const SkillGraph = dynamic(
  () => import('@/components/features/SkillGraph/SkillGraph').then((mod) => mod.SkillGraph),
  { ssr: false }
)

function ProgressBar({
  value,
  label,
  featured,
}: {
  value: number
  label: string
  featured?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-bg-surface p-4 transition-colors',
        featured ? 'border-accent/35 hover:border-accent/55' : 'border-line hover:border-accent/30'
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-content-primary">{label}</span>
        <span className="font-mono text-xs text-content-muted">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          className={cn(
            'h-full rounded-full',
            featured
              ? 'bg-gradient-to-r from-accent via-cyan-400 to-accent-light'
              : 'bg-gradient-to-r from-accent to-accent-light'
          )}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const defaultTab = SKILLS.find((s) => s.featured)?.id ?? SKILLS[0].id
  const featured = SKILLS.find((s) => s.featured)

  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Skills"
        title="Technical Arsenal"
        subtitle="Niche in full stack development — with strong supporting depth in AI, computer vision, and security."
        align="center"
      />

      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-xl border border-accent/30 bg-accent/5 p-5 md:p-6"
        >
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
              <Layers className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-light">
                Primary niche
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-content-primary">
                Full Stack Developer
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-content-secondary">
                End-to-end product delivery is my core strength: polished React/Next.js frontends,
                reliable Node & FastAPI backends, databases, auth, APIs, and deployment — with AI
                and security used as amplifiers, not distractions.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <Tabs defaultValue={defaultTab} className="w-full">
        <div className="flex justify-center">
          <TabsList>
            {SKILLS.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
                {cat.featured ? (
                  <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                    Niche
                  </span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {SKILLS.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ProgressBar
                    value={skill.level}
                    label={skill.name}
                    featured={cat.featured}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-10 text-center text-sm text-content-muted">
        Full stack first — AI, vision, and security deepen what I can ship.
      </p>

      <SkillGraph />
    </Section>
  )
}
