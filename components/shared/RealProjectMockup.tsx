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
        {/* App header */}
        <div className="flex items-center justify-between border-b border-teal-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-teal-500/10 px-3 py-0.5 font-mono text-[11px] text-teal-300">
            KHIDMAT · خدمت
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300 font-mono">
            Offline
          </span>
        </div>

        {/* Role switch */}
        <div className="mt-2 flex gap-1 rounded-lg bg-white/5 p-0.5 text-[10px] font-semibold">
          <span className="flex-1 rounded-md bg-teal-500/25 py-1 text-center text-teal-200">Worker</span>
          <span className="flex-1 py-1 text-center text-zinc-400">Work giver</span>
          <span className="rounded-md px-2 py-1 font-mono text-zinc-400">اردو</span>
        </div>

        {/* Contact + job records */}
        <div className="my-auto space-y-2 py-2">
          <div className="rounded-xl border border-teal-500/25 bg-white/5 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Tariq Mehmood</p>
                <p className="mt-0.5 text-[10px] text-teal-300">
                  Electrician · Rawalpindi · 0301 2345678
                </p>
              </div>
              <div className="flex gap-1">
                <span className="rounded-md bg-teal-500/20 px-2 py-1 text-[9px] text-teal-200">Call</span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] text-zinc-300">SMS</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[10px]">
              <span className="font-semibold text-emerald-400">Inverter installation</span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">Confirmed</span>
            </div>
            <p className="mt-1.5 text-[10px] text-zinc-300">
              Today · 4:00 PM · House 14, Satellite Town
            </p>
            <p className="mt-0.5 text-[10px] text-zinc-400">
              PKR <strong className="font-mono text-white">1,400</strong> · Advance PKR 500
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-teal-500/20 pt-2 text-[10px] font-mono text-zinc-400">
          <span>Flutter · Local storage · No account</span>
          <span className="text-emerald-400">Urdu / English</span>
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
          <span className="text-emerald-400">Appwrite Backend</span>
        </div>
      </div>
    )
  }

  // Real UI mockup for CyberSathi — offline scam analysis
  if (slug === 'cyber-sathi') {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#070e12] p-4 text-white font-mono select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="rounded-md bg-emerald-500/10 px-3 py-0.5 text-[11px] text-emerald-400">
            cybersathi --scan message
          </div>
          <span className="text-[10px] text-emerald-400">● Local · Offline</span>
        </div>

        {/* Scam verdict */}
        <div className="my-auto space-y-2 py-2 text-xs">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-zinc-300">
            <span className="text-[10px] text-zinc-500">INPUT · SMS</span>
            <p className="mt-1 text-white">
              &quot;Your HBL account is blocked. Verify within 24h:
              <span className="text-sky-400"> hbl-secure-verify.pk</span>&quot;
            </p>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between text-rose-400">
              <span>[!] Verdict: PHISHING</span>
              <span className="font-bold">96% confidence</span>
            </div>
            <div className="text-zinc-400">[✓] Sender domain not in bank allowlist</div>
            <div className="text-zinc-400">[✓] Urgency + credential request detected</div>
            <div className="text-zinc-400">[✓] Domain matched blocklist (52 entries)</div>
            <div className="text-sky-400">[i] Local Gemma 2B · no data left device</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-emerald-500/20 pt-2 text-[10px] text-zinc-400">
          <span>FastAPI · Ollama · SQLite · React</span>
          <span className="text-emerald-400">Saved to local history</span>
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
            jarvis --local --voice
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
            <p className="text-white font-medium">
              &quot;Jarvis, open VS Code and set a timer for 25 minutes.&quot;
            </p>
            <p className="mt-1 font-mono text-[11px] text-emerald-400">
              ➜ Opened VS Code. Timer set for 25:00.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
          <span>Tauri + Rust + local Python</span>
          <span className="text-emerald-400">On-device · No API key</span>
        </div>
      </div>
    )
  }

  // Clean Default Real UI Inspector Mockup for other projects
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0b0d14] p-4 text-white font-mono select-none">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-300">
          github.com/tatheer583/{slug}
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-emerald-400">● Public</span>
      </div>

      <div className="my-auto space-y-1.5 py-3 text-xs text-zinc-300">
        <p className="font-display text-sm font-bold text-white">{title}</p>
        <p className="text-[10px] uppercase tracking-wider text-sky-400">{category}</p>
        <p className="text-xs font-sans text-zinc-400">
          Open-source repository — full source, setup notes and a working download or demo where
          available.
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-white/5 bg-white/5 p-2 text-[11px] text-zinc-300">
          <code className="block truncate">$ git clone https://github.com/tatheer583/{slug}</code>
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
