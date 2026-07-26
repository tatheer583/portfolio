'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { EXPERIENCE } from '@/data/experience'
import { cn } from '@/lib/utils'

export function ExperienceSection() {
  return (
    <Section id="experience" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,99,255,0.08),transparent_55%)]" />

      <SectionHeader
        eyebrow="Journey"
        title="Experience & Growth"
        subtitle="A 2-year journey focused on becoming a strong full stack developer — with AI and security as supporting strengths."
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-1/2" />

        {EXPERIENCE.map((item, i) => {
          const left = i % 2 === 0
          return (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={cn(
                'relative mb-8',
                left ? 'md:flex md:justify-start' : 'md:flex md:justify-end'
              )}
            >
              <div className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent accent-glow ring-4 ring-accent/15 md:left-1/2" />
              <div
                className={cn(
                  'ml-10 rounded-xl border border-line bg-bg-surface/90 p-6 backdrop-blur-sm transition-all hover:border-accent/40 hover:card-hover-glow md:ml-0 md:w-[calc(50%-2rem)]',
                  left ? 'md:mr-auto' : 'md:ml-auto'
                )}
              >
                <span className="font-mono text-xs text-accent-light">{item.period}</span>
                <h3 className="mt-1 font-display text-lg font-bold text-content-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-bg-elevated px-2.5 py-0.5 text-xs text-content-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
