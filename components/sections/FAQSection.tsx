'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

const FAQS = [
  {
    question: 'What services do you provide as a Full Stack Developer?',
    answer:
      'I offer end-to-end software development: building modern responsive frontends with React and Next.js, designing reliable backend RESTful and GraphQL APIs with Node.js/Express and FastAPI/Python, architecting database models (MongoDB, PostgreSQL), setting up authentication and security controls, and handling production deployments.',
  },
  {
    question: 'How do you incorporate AI into your projects?',
    answer:
      'I build practical, production-ready AI solutions rather than superficial wrappers. My work includes multi-agent orchestration systems (like the KHIDMAT App), Retrieval-Augmented Generation (RAG) pipelines, conversational concierge interfaces with Google Gemini and OpenAI, and computer vision models (YOLO, OpenCV) for image recognition and automation.',
  },
  {
    question: 'What is your core tech stack?',
    answer:
      'My primary frontend stack is Next.js, React, TypeScript, and Tailwind CSS. For backend services, I specialize in Node.js, Express, and FastAPI (Python). For data storage, I use MongoDB and PostgreSQL. For mobile development, I build with Flutter and Dart.',
  },
  {
    question: 'Are you available for full-time employment or freelance contracts?',
    answer:
      'Yes, I am actively available for full-time engineering roles, remote positions, and select freelance or consulting projects. I am comfortable working across different time zones and collaborating in agile team environments.',
  },
  {
    question: 'Can you work on an existing codebase or only build from scratch?',
    answer:
      'Both! I am experienced in taking greenfield concepts from design to launch, as well as diving into existing codebases to add new features, refactor legacy code, optimize performance, fix security vulnerabilities, or modernize tech stacks.',
  },
  {
    question: 'How can we get started or discuss a project?',
    answer:
      'You can reach out directly via the Contact section below, send an email to mtatheer11@gmail.com, or message me on WhatsApp at +92 344 8901377. I usually respond within 24 hours to schedule an initial discussion.',
  },
]

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof FAQS)[number]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-line bg-bg-surface transition-all duration-200 hover:border-accent/30"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-bold text-white transition-colors hover:text-cyan-400 sm:p-6 sm:text-xl"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 shrink-0 text-cyan-400" />
          <span>{item.question}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="border-t border-line/60 px-5 pt-3 pb-5 text-base font-medium italic leading-relaxed text-white sm:px-6 sm:pb-6">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <Section id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Quick answers about my background, work process, technical expertise, and availability."
        align="center"
      />

      <div className="mx-auto max-w-3xl space-y-3.5">
        {FAQS.map((faq, index) => (
          <FAQItem
            key={faq.question}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
            index={index}
          />
        ))}
      </div>
    </Section>
  )
}
