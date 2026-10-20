'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Coffee, Heart, MessageCircle, MapPin, Sparkles, Terminal, Code2, Send } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'

const HUMAN_STORIES = [
  {
    icon: Coffee,
    tag: 'Daily Routine',
    title: 'Chai, Late Nights & Deep Focus',
    description:
      'My best work happens when the world is quiet. With a hot cup of Karak Chai and calm music, I love breaking down complex bugs and designing clean architectures line by line.',
  },
  {
    icon: Code2,
    tag: 'Philosophy',
    title: 'Real Products > Flashy Hype',
    description:
      'Technology should serve people, not buzzwords. Whether it is an e-commerce platform, a finance dashboard, or an automated service, I build software that solves actual everyday problems.',
  },
  {
    icon: MapPin,
    tag: 'Background',
    title: 'Building from Pakistan for the World',
    description:
      'Proudly based in Pakistan, collaborating with global teams and international clients. I practice disciplined async communication, transparent updates, and honest deadlines.',
  },
  {
    icon: Heart,
    tag: 'Work Culture',
    title: 'Zero Ego, High Empathy',
    description:
      'I believe great engineering comes from kindness and curiosity. I welcome constructive code reviews, respect teammates, and prioritize maintainable code over clever hacks.',
  },
]

export function HumanTouchSection() {
  return (
    <Section id="human-side" className="relative">
      <SectionHeader
        eyebrow="Human Touch"
        title="Behind the Code"
        subtitle="A quick glimpse into who I am, how I approach software, and the human values I bring to every team."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {HUMAN_STORIES.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="flex flex-col justify-between rounded-2xl border border-line bg-bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-accent/40 hover:card-hover-glow"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-line bg-bg-elevated px-2.5 py-0.5 text-[11px] font-mono text-content-secondary">
                  {item.tag}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-bold text-content-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base font-medium leading-relaxed text-content-secondary">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Friendly Chat Invite Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 rounded-2xl border border-line bg-gradient-to-r from-sky-500/10 via-bg-elevated to-emerald-500/10 p-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-6"
      >
        <div>
          <h3 className="font-display text-lg font-bold text-content-primary flex items-center justify-center sm:justify-start gap-2">
            <span>👋 Want to have a quick, friendly chat?</span>
          </h3>
          <p className="mt-1 text-sm sm:text-base font-medium text-content-secondary">
            No robotic contact forms required — feel free to drop a message on WhatsApp or email me directly.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Button asChild size="sm" variant="primary" className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-md">
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4 mr-1.5" /> WhatsApp Chat
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-line text-content-primary hover:bg-bg-elevated">
            <a href={`mailto:${SITE.email}`}>
              <Send className="h-4 w-4 mr-1.5" /> Send Email
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
