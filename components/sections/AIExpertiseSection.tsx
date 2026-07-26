'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Bot, Brain, Camera, Cpu, Network, PackageCheck } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

const CARDS = [
  {
    icon: Brain,
    title: 'LLMs & Foundation Models',
    description: 'Prompting, orchestration, evaluation, and integration of language models into practical products.',
    tools: 'GPT - Claude - Llama',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Agents that plan, call tools, automate browser workflows, and assist users through natural language.',
    tools: 'LangChain - Tools - Workflows',
  },
  {
    icon: Network,
    title: 'RAG Systems',
    description: 'Retrieval-augmented generation that grounds model answers in project, document, or business context.',
    tools: 'Embeddings - Vector Search',
  },
  {
    icon: Camera,
    title: 'Computer Vision',
    description: 'Detection, tracking, segmentation, and real-time video analysis for autonomous systems.',
    tools: 'OpenCV - YOLO - PyTorch',
  },
  {
    icon: Cpu,
    title: 'IoT & Robotics',
    description: 'Sensor-driven systems, embedded workflows, telemetry, and intelligent monitoring loops.',
    tools: 'MQTT - Edge - Realtime',
  },
  {
    icon: PackageCheck,
    title: 'Full Stack AI Products',
    description: 'Complete AI-enabled products across UI, APIs, model integration, deployment, and iteration.',
    tools: 'Next.js - FastAPI - Vercel',
  },
]

export function AIExpertiseSection() {
  return (
    <Section id="ai-expertise">
      <SectionHeader
        eyebrow="AI Expertise"
        title="Applied AI Capabilities"
        subtitle="A focused view of the AI systems I can design, build, and connect to real products."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div className="group h-full rounded-xl border border-line bg-bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:card-hover-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-content-primary">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {card.description}
              </p>
              <p className="mt-3 font-mono text-xs text-accent-light">{card.tools}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}