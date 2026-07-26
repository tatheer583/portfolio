'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Card } from '@/components/ui/card'
import { EDUCATION } from '@/data/experience'

export function EducationSection() {
  return (
    <Section id="education">
      <SectionHeader
        eyebrow="Education"
        title="Academic Background"
        subtitle="Where I laid the foundation for intelligent systems, engineering, and applied AI."
      />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card
            variant="glass"
            padding="lg"
            className="relative overflow-hidden border-accent/20"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-content-primary">
                    {EDUCATION.institution}
                  </h3>
                  <p className="mt-1 text-sm text-content-secondary">
                    {EDUCATION.degree}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-content-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    Pakistan
                  </p>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-light">
                  {EDUCATION.period}
                </span>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-content-secondary sm:ml-auto">
                  {EDUCATION.note}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  )
}
