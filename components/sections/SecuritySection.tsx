'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bug, ExternalLink, Radar, ShieldCheck, Terminal } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { TechChip } from '@/components/shared/TechChip'

const SECURITY_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Web Penetration Testing',
    description:
      'Finding vulnerabilities in web applications using Burp Suite workflows: intercepting requests, scanning for SQLi, XSS, IDOR, and authentication flaws.',
  },
  {
    icon: Bug,
    title: 'Bug Hunting',
    description:
      'Identifying security holes in live websites before attackers do, with a professional security researcher mindset and responsible reporting.',
  },
  {
    icon: Radar,
    title: 'Cyber Sathi Project',
    description:
      'Built an AI security tool that scans URLs, QR codes, and messages for phishing or malware risk in real time.',
    href: '/projects/cyber-sathi',
  },
  {
    icon: Terminal,
    title: 'Security Tooling',
    description:
      'Practical familiarity with testing and analysis tools used for web security reviews, traffic inspection, and vulnerability discovery.',
  },
]

const TOOLS = ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Wireshark', 'OWASP Top 10', 'Repeater', 'Intruder']

export function SecuritySection() {
  return (
    <Section id="security">
      <SectionHeader
        eyebrow="Junior Security Analyst"
        title="Security & Ethical Hacking"
        subtitle="Security research focused on web application testing, vulnerability discovery, and AI-assisted threat detection."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {SECURITY_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group rounded-xl border border-line bg-bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:card-hover-glow"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
              <card.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-content-primary">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              {card.description}
            </p>
            {card.href && (
              <Link
                href={card.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
              >
                View project <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-bg-surface p-6">
        <h3 className="font-display text-base font-bold text-content-primary">Tools & Focus Areas</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {TOOLS.map((tool) => (
            <TechChip key={tool} name={tool} />
          ))}
        </div>
      </div>
    </Section>
  )
}