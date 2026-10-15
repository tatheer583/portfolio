'use client'

import * as React from 'react'
import {
  ShoppingCart,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Activity,
  Mic,
  Calendar,
  Layers,
  Terminal,
  FileText,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'

interface RealProjectMockupProps {
  slug: string
  title: string
  category: string
}

export function RealProjectMockup({ slug, title, category }: RealProjectMockupProps) {
  // Real UI mockup for Skardu Spring E-Commerce
  if (slug === 'skardu-spring') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#0b101b] p-4 text-white font-sans select-none">
        {/* Real Browser Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-300">
            skardu-spring.com/store
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Store
          </div>
        </div>

        {/* Real Storefront Interface */}
        <div className="my-auto grid grid-cols-12 gap-3 py-2 items-center">
          <div className="col-span-7 space-y-1.5">
            <span className="inline-block rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
              Karakoram Glacial Water
            </span>
            <p className="font-bold text-sm text-white">Pure Mineral Water (750ml)</p>
            <p className="text-xs italic text-zinc-300">Sourced from 3,500m peaks · 0 additives</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-mono text-xs font-bold text-emerald-400">PKR 180</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200">In Stock</span>
            </div>
          </div>

          <div className="col-span-5 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <ShoppingCart className="h-6 w-6 text-sky-400 mb-1.5" />
            <span className="rounded-lg bg-sky-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
              Add to Cart
            </span>
            <span className="mt-1 text-[10px] text-zinc-400 font-mono">Cart (2 items)</span>
          </div>
        </div>

        {/* Real Backend Status Bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
          <span>API: Next.js 15 + Express</span>
          <span className="text-emerald-400">MongoDB Atlas · 28ms</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for KHIDMAT Agentic AI Mobile App
  if (slug === 'khidmat-app') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#081313] p-4 text-white font-sans select-none">
        {/* Real App Header */}
        <div className="flex items-center justify-between border-b border-teal-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-teal-500/10 px-3 py-0.5 font-mono text-[11px] text-teal-300">
            KHIDMAT · Pakistan AI Booking 🇵🇰
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-mono">
            6 Agents Active
          </span>
        </div>

        {/* Real Interactive Chat & Negotiation Log */}
        <div className="my-auto space-y-2 py-2">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-teal-600/30 border border-teal-500/30 px-3 py-1.5 text-xs text-white">
              <span className="font-semibold block text-[10px] text-teal-300">User (Rawalpindi)</span>
              Electrician required for inverter installation today.
            </div>
          </div>

          {/* AI Agent Match */}
          <div className="flex justify-start">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3 py-2 text-xs text-zinc-200">
              <div className="flex items-center justify-between gap-2 pb-1 text-[10px] text-emerald-400 font-semibold border-b border-white/10">
                <span>⚡ BHAROSA Trust: 98% Verified</span>
                <span>MOL-BHAAV Negotiated</span>
              </div>
              <p className="mt-1 text-[11px] text-white">
                Matched Tariq Electrician · Final price: <strong className="text-emerald-400 font-mono">PKR 1,400</strong> (Market standard: PKR 2,000)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Booking Status */}
        <div className="flex items-center justify-between border-t border-teal-500/20 pt-2 text-[10px] font-mono text-zinc-400">
          <span>Engine: Flutter + Gemini AI</span>
          <span className="text-emerald-400">Status: Booking Confirmed</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for Personal Finance Manager
  if (slug === 'personal-finance-manager') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#081216] p-4 text-white font-sans select-none">
        {/* Real App Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-300">
            finance-tracker.local/dashboard
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <DollarSign className="h-3 w-3" /> Monthly Overview
          </div>
        </div>

        {/* Financial Numbers & Bar Chart */}
        <div className="my-auto grid grid-cols-3 gap-2.5 py-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-center">
            <span className="text-[10px] text-zinc-400 block font-mono">Total Balance</span>
            <span className="font-mono text-sm font-bold text-white">PKR 78,400</span>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-center">
            <span className="text-[10px] text-emerald-300 block font-mono">Monthly In</span>
            <span className="font-mono text-sm font-bold text-emerald-400">+PKR 95,000</span>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-center">
            <span className="text-[10px] text-rose-300 block font-mono">Expenses</span>
            <span className="font-mono text-sm font-bold text-rose-400">-PKR 16,600</span>
          </div>
        </div>

        {/* Real Transaction Items */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1 text-zinc-300">
            <span>Client Web Development</span>
            <span className="font-mono text-emerald-400 font-semibold">+Rs. 45,000</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1 text-zinc-300">
            <span>Cloud Server & Domains</span>
            <span className="font-mono text-rose-400 font-semibold">-Rs. 4,200</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
          <span>React 18 + Vite + Recharts</span>
          <span className="text-sky-400">CSV Export Ready</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for MediConnect Healthcare Platform
  if (slug === 'medi-connect') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#0a0f1d] p-4 text-white font-sans select-none">
        {/* Real App Header */}
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-indigo-500/10 px-3 py-0.5 font-mono text-[11px] text-indigo-300">
            mediconnect.smart/patient-portal
          </div>
          <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] text-sky-300 font-mono">
            Doctor Verified
          </span>
        </div>

        {/* Doctor Appointment Card */}
        <div className="my-auto space-y-2 py-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-white">Dr. Ayesha Malik (Cardiologist)</p>
                <p className="text-xs italic text-zinc-300">Appointment scheduled for Today · 3:30 PM</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 font-mono">
                Confirmed
              </span>
            </div>

            <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2 text-xs text-zinc-300">
              <Activity className="h-3.5 w-3.5 text-sky-400" />
              <span>Digital E-Prescription generated & sent via Appwrite Cloud</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-indigo-500/20 pt-2 text-[10px] font-mono text-zinc-400">
          <span>Flutter Mobile + Node.js API</span>
          <span className="text-emerald-400">HIPAA Compliant Auth</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for Cyber Sathi Security Companion
  if (slug === 'cyber-sathi') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#070e12] p-4 text-white font-mono select-none">
        {/* Real Terminal Bar */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-emerald-500/10 px-3 py-0.5 text-[11px] text-emerald-400">
            cybersathi --inspect --audit
          </div>
          <span className="text-[10px] text-emerald-400">● Realtime Guard</span>
        </div>

        {/* Real Security Audit Terminal Output */}
        <div className="my-auto space-y-1.5 text-xs text-zinc-300 py-2">
          <div className="text-emerald-400">
            [+] TARGET: https://secure-api.gateway/v1
          </div>
          <div className="text-zinc-300">
            [*] Checking SSL/TLS Handshake: TLS 1.3 OK
          </div>
          <div className="text-zinc-300">
            [*] OWASP Top 10 Scan: 0 Critical, 0 High Vulnerabilities
          </div>
          <div className="text-sky-400">
            [✓] Phishing & Malicious Payload Analysis: Clean
          </div>
        </div>

        {/* Terminal status */}
        <div className="flex items-center justify-between border-t border-emerald-500/20 pt-2 text-[10px] text-zinc-400">
          <span>FastAPI + Python + Scikit-Learn</span>
          <span className="text-emerald-400">Status: Protected</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for Jarvis Voice Assistant
  if (slug === 'jarvis-ai-assistant') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#0b0c16] p-4 text-white font-sans select-none">
        {/* Real App Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-300">
            jarvis-engine.py --voice-stream
          </div>
          <span className="flex items-center gap-1 text-[11px] text-sky-400 font-mono">
            <Mic className="h-3 w-3 animate-pulse" /> Listening
          </span>
        </div>

        {/* Voice Visualizer Waveform & Prompt */}
        <div className="my-auto space-y-2.5 py-2 text-center">
          <div className="flex items-center justify-center gap-1 py-1">
            {[18, 32, 48, 24, 60, 42, 28, 52, 38, 20].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}px` }}
                className="w-1.5 rounded-full bg-gradient-to-t from-sky-500 to-indigo-400"
              />
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-left">
            <span className="font-mono text-[10px] text-zinc-400 block">Voice Transcript:</span>
            <p className="text-white font-medium italic">
              &quot;Jarvis, check server deployment status and summarize error logs.&quot;
            </p>
            <p className="mt-1 font-mono text-[11px] text-emerald-400">
              ➜ Done. All 3 microservices healthy. Latency 38ms.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
          <span>Python + OpenAI + SpeechRecognition</span>
          <span className="text-sky-400">Response: 380ms</span>
        </div>
      </div>
    )
  }

  // Clean Default Real UI Inspector Mockup for other projects
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0b0d14] p-4 text-white font-mono select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="rounded-md bg-white/5 px-3 py-0.5 text-[11px] text-zinc-300">
          github.com/tatheer583/{slug}
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold">{category}</span>
      </div>

      <div className="my-auto space-y-1.5 text-xs text-zinc-300 py-3">
        <p className="font-bold text-sm text-white font-sans">{title}</p>
        <p className="text-xs text-zinc-400 font-sans italic">
          Production repository with complete source code, tests, and deployment setup.
        </p>
        <div className="mt-2 rounded-lg bg-white/5 p-2 text-[11px] text-zinc-300 border border-white/5">
          <code>$ git clone https://github.com/tatheer583/{slug}</code>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-zinc-400">
        <span>Verified Developer Build</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> Real Codebase
        </span>
      </div>
    </div>
  )
}
