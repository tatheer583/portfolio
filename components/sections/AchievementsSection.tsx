'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Star, Shield, Cpu, Rocket } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ACHIEVEMENTS } from '@/data/achievements'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Award,
  Star,
  Shield,
  Cpu,
  Rocket,
}

export function AchievementsSection() {
  return (
    <Section id="achievements" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.07),transparent_50%)]" />

      <SectionHeader
        eyebrow="Achievements"
        title="Milestones & Recognition"
        subtitle="Highlights from shipping applied AI systems, security tools, and full-stack products."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((ach, i) => {
          const Icon = ICONS[ach.icon] || Star
          return (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group flex items-start gap-4 rounded-xl border border-line bg-bg-surface/90 p-5 backdrop-blur-sm transition-colors hover:border-accent/40 hover:card-hover-glow"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-content-primary">
                  {ach.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
