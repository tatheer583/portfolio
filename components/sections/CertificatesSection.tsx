'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { CERTIFICATES } from '@/data/certificates'

export function CertificatesSection() {
  return (
    <Section id="certificates">
      <SectionHeader
        eyebrow="Credentials"
        title="Certifications & Honors"
        subtitle="Verified professional certifications and technical achievements from accredited platforms and competitive events."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:card-hover-glow"
          >
            {/* Certificate Image Preview */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-bg-elevated border-b border-line/60">
              {cert.image ? (
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-bg-elevated text-content-muted">
                  <Award className="h-12 w-12 text-accent/50" />
                </div>
              )}
              
              {/* Verified Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 shadow-md backdrop-blur-md border border-line">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-accent">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Credential</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm font-medium italic text-zinc-200">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-5 border-t border-line/60 pt-4">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent-light"
                >
                  Verify Certificate <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
