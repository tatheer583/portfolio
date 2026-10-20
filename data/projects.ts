import type { Project } from '@/types/project'

/**
 * Every entry below maps 1:1 to a live public repository on
 * https://github.com/tatheer583 — star counts, languages, licenses and
 * last-push dates were read from the GitHub REST API.
 */
export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'psl-sign-learn',
    title: 'Irssa — Pakistan Sign Language',
    description:
      'Offline Android learning game for deaf children — 37 Urdu PSL letters, 26 English letters, and an on-device MediaPipe hand coach.',
    longDescription:
      'Irssa is a Kotlin and Jetpack Compose app that teaches Pakistan Sign Language to deaf and speech-impaired children. It keeps the two alphabets deliberately separate — 37 Urdu PSL letters taught with real hand photographs and Urdu words a child already knows, and 26 English letters taught as a distinct language — so the two sign systems are never confused. An offline recognition coach uses Google MediaPipe Hand Landmarker to find 21 hand landmarks and a nearest-neighbour classifier trained on real hands from independent signers. Nothing is uploaded: camera frames are processed on the device and discarded. The app ships as a downloadable APK and the repository includes the capture and training scripts so a child can teach the recognizer their own hand.',
    tech: ['Kotlin', 'Jetpack Compose', 'MediaPipe', 'Android', 'Python', 'NumPy'],
    category: ['AI/ML', 'Computer Vision', 'Mobile', 'Real-Time'],
    categoryLabel: 'Android · Sign Language · On-device AI',
    image: '/images/projects/irssa.png',
    links: {
      github: 'https://github.com/tatheer583/psl-sign-learn',
      demo: 'https://tatheer583.github.io/psl-sign-learn/',
    },
    features: [
      '37 Pakistan Sign Language letters and 26 English letters, taught as separate alphabets',
      'Fully offline camera coaching for 37 PSL handshapes and 24 static English letters',
      'MediaPipe Hand Landmarker plus a nearest-neighbour classifier trained on independent signers',
      'Strict acceptance gate tuned on held-out data — it prefers "not yet" over a false success',
      'Numbers 0–50, everyday words, quizzes, camera quests, stickers and a gesture converter',
      'Personal hand capture and hybrid retraining tools so the model learns one specific hand',
      'No accounts, no ads, no analytics — frames never leave the device',
    ],
    challenges:
      'Recognising the same handshape across different signers without producing false successes, and separating genuinely static letters from motion-dependent signs that a single-frame classifier cannot honestly grade.',
    results:
      'A ready-to-install Android APK plus a reproducible capture-and-train pipeline, with English J and Z left as guided practice rather than faked recognition.',
    featured: true,
    order: 1,
    language: 'Kotlin',
    stars: 1,
    license: 'CC BY 4.0 · MIT · CC0 assets',
    topics: ['android', 'sign-language', 'mediapipe', 'on-device-ml', 'education', 'accessibility'],
    status: 'Released',
    updatedAt: '2026-10-20',
  },
  {
    id: '2',
    slug: 'channel-automation-ai',
    title: 'ChannelAI — Open Source Channel Automation',
    description:
      'Free MIT-licensed YouTube channel automation — in-browser reel rendering, caption export, thumbnail capture and scheduled publishing.',
    longDescription:
      'ChannelAI is a fully open-source web app that automates the repetitive parts of running a video channel: planning clips, splitting long footage into reels, rendering them for real in the browser, writing caption files, generating titles and hashtags from templates, and publishing to YouTube on a schedule. Every render happens client-side — canvas crop, MediaRecorder and WebAudio produce a genuine WebM/MP4 file that the user downloads. Files never leave the device; the only account involved is the user’s own free Google OAuth client against the official YouTube Data API v3. Scheduled publishing is enforced by YouTube itself through `publishAt`, so an upload can be scheduled and the tab closed.',
    tech: ['TypeScript', 'React', 'Vite', 'Canvas API', 'MediaRecorder', 'WebAudio', 'YouTube Data API v3', 'Google OAuth'],
    category: ['Web', 'Automation', 'Tooling', 'Full Stack'],
    categoryLabel: 'Video Automation · In-browser Rendering · YouTube API',
    image: '/images/projects/channel-automation-ai.jpg',
    links: {
      github: 'https://github.com/tatheer583/channel-automation-ai',
      demo: 'https://tatheer583.github.io/channel-automation-ai/',
    },
    features: [
      'Real in-browser clip rendering — canvas crop, re-encode, progress and cancel',
      'Local auto-split that turns one footage range into 2–6 equal reel clips',
      'Timed caption line editor with genuine SRT and VTT export',
      'Real frame capture for thumbnails with full-resolution PNG download',
      'Local `{{variable}}` template engine for titles, descriptions and hashtags — no AI metering',
      'Scheduled YouTube publishing through the official Data API using the user’s own OAuth client',
      'In-app and system notifications for daily posting cadence rules',
    ],
    challenges:
      'Doing real video encoding, caption generation and API publishing entirely client-side, while keeping the honest boundary that no static web app can fetch another site’s video bytes.',
    results:
      'A genuinely free, MIT-licensed, self-hostable alternative to paid credit-metered tools — unlimited channels, unlimited usage, and no upload of user footage.',
    featured: true,
    order: 2,
    language: 'TypeScript',
    stars: 2,
    license: 'MIT',
    topics: ['video-automation', 'youtube-api', 'self-hosted', 'mediarecorder', 'open-source'],
    status: 'Live',
    updatedAt: '2026-10-19',
  },
  {
    id: '3',
    slug: 'wiwave-motion',
    title: 'WiWave Motion — WiFi Sensing Workbench',
    description:
      'Turns any Windows laptop into a WiFi sensing instrument — live RSSI monitoring, multi-link fusion, CSI research pipeline and a 3D observatory.',
    longDescription:
      'WiWave is an open-source WiFi radar and wireless sensing workbench for Windows. It reads the WiFi radio already inside the laptop and treats it as a motion sensor — no cameras, no wearables, no extra hardware. The Live Monitor samples RSSI roughly ten times per second through the Windows Native WLAN API and fuses the primary router with visible neighbouring access points as independent environment channels, so single-channel noise does not dominate the signal. A rolling 30-second Welch spectral analysis splits the signal into slow, mid and fast bands with dominant-frequency and entropy statistics. Every sustained change is written to a local event journal with 30 seconds of before-and-after context. Connecting a $5–10 ESP32 CSI receiver unlocks a 52-subcarrier waterfall and a labelled trial lab for room-condition research, alongside an explorable 3D observatory.',
    tech: ['Python', 'FastAPI', 'React', 'Three.js', 'ESP32', 'WiFi CSI', 'SQLite', 'NumPy', 'WebSocket'],
    category: ['IoT', 'Real-Time', 'Signal Processing', 'Full Stack'],
    categoryLabel: 'WiFi Sensing · CSI Research · Real-Time Dashboard',
    image: '/images/projects/wiwave.jpg',
    links: { github: 'https://github.com/tatheer583/WIWAVE-MOTION' },
    features: [
      'Live Windows WiFi RSSI monitoring with multi-link baseline change detection',
      'Welch spectral analysis with dominant-frequency and entropy statistics',
      'Local SQLite event journal capturing before-and-after context for every sustained change',
      'ESP32 CSI waterfall over 52 subcarriers plus a labelled trial collection lab',
      '3D observatory with 12 room scenarios, clearly badged as simulated',
      'Recordings and CSV / JSONL export for offline analysis',
    ],
    challenges:
      'Indoor RF environments change constantly, so detection has to stay adaptive without becoming brittle or overly noisy — and every capability flag has to state honestly what the radio can and cannot measure.',
    results:
      'A local-first sensing tool with genuine hardware readings, a CSI research pipeline, and a strict separation between measured data and simulated scenarios.',
    featured: true,
    order: 3,
    language: 'Python',
    stars: 6,
    topics: [
      'wifi-sensing',
      'csi',
      'esp32',
      'motion-detection',
      'fastapi',
      'threejs',
      'device-free-sensing',
      'real-time',
    ],
    status: 'Live',
    updatedAt: '2026-10-09',
  },
  {
    id: '4',
    slug: 'jarvis-ai-assistant',
    title: 'Jarvis — Local Desktop Assistant',
    description:
      'Offline Windows assistant built with Tauri and a local Python engine — voice commands, app and file control, notes, reminders and audited actions.',
    longDescription:
      'Jarvis is a Windows desktop assistant with a Tauri, React and TypeScript shell over a local Python engine. Core deterministic commands work with no API key and no model downloads: voice activation or typed commands drive applications, keyboard shortcuts, typing, mouse control, window management and volume, while file create / copy / move / rename / recycle operations request confirmation before anything destructive runs. Offline speech recognition and local LLM chat are optional and require their model files to be installed. The runtime adds a validated configuration layer, a centralised policy boundary, registered tools with task and cancellation metadata, a separate audit database and AI provider contracts, shared by both the Tauri shell and the PyQt fallback.',
    tech: ['Tauri', 'Rust', 'React', 'TypeScript', 'Python', 'SQLite', 'Whisper', 'Qwen'],
    category: ['AI/ML', 'Desktop', 'Automation', 'Voice'],
    categoryLabel: 'Desktop · Local AI · Voice Automation',
    image: '/images/projects/jarvis.jpg',
    links: { github: 'https://github.com/tatheer583/jarvis-ai-assistant' },
    features: [
      'Voice activation and typed command execution in a packaged Windows desktop app',
      'Application, window, mouse, keyboard and volume control',
      'File operations with confirmation prompts and an activity history',
      'Local notes, one-time reminders and filename search',
      'Optional offline Whisper speech recognition and local Qwen chat via llama.cpp',
      'Cooperative cancellation (Ctrl+Alt+Esc) across queued work and listening',
      'Separate audit database with allowlisted metadata and tightened file permissions',
    ],
    challenges:
      'Coordinating desktop automation, voice input and a local model runtime behind an explicit policy boundary, with safe cancellation and clearly documented security limits.',
    results:
      'A staged Windows release with a shared local runtime, a documented architecture and a PyQt fallback — and an honest security section stating that owner authentication is not yet configured.',
    featured: true,
    order: 4,
    language: 'Python',
    stars: 7,
    license: 'MIT',
    topics: ['desktop-assistant', 'tauri', 'voice-automation', 'local-llm', 'automation'],
    status: 'Released',
    updatedAt: '2026-09-24',
  },
  {
    id: '5',
    slug: 'khidmat-app',
    title: 'Khidmat — خدمت',
    description:
      'Local-first Flutter app that keeps worker contacts, service appointments and job records on the phone — with full Urdu and English support.',
    longDescription:
      'Khidmat keeps worker contacts, service appointments and work records on the phone in English or Urdu. Users pick one of two roles — Worker, to organise client jobs, or Work giver, to plan services with people they know. Contacts are added by hand with a phone number and service, then searched by name, city, English, Urdu or Roman Urdu service words. From a contact the user can call, send an SMS, share details or plan an appointment; jobs then record the date, address, amount and notes and move through a status as the work progresses. Version 2.0.0 removed the Supabase backend entirely, so no account, server, login or connection setup is needed and every record works without a network. Language choice survives restart and Urdu uses a right-to-left layout.',
    tech: ['Flutter', 'Dart', 'Riverpod', 'go_router', 'Local storage', 'Android', 'iOS'],
    category: ['Mobile', 'Automation', 'Full Stack'],
    categoryLabel: 'Flutter · Local-first · Urdu & English',
    image: '/images/projects/khidmat.jpg',
    links: { github: 'https://github.com/tatheer583/Khidmat-App' },
    features: [
      'Two role modes — Worker and Work giver — each with its own dashboard',
      'Contact search across name, city, English, Urdu and Roman Urdu service terms',
      'One-tap call, SMS and share from any saved contact',
      'Appointment and job records with address, amount, notes and progress status',
      'Full Urdu / English switching with right-to-left layout that persists across restarts',
      'JSON backup and restore with validation and confirmation before replacing records',
      'Queued writes with a previous copy retained for recovery',
    ],
    challenges:
      'Removing a live backend without losing the product: keeping records durable on-device, making writes crash-safe, and giving users a reliable export path before they uninstall.',
    results:
      'A shippable Android APK (ARM64, ARM32 and x86-64) that runs fully offline, with the iOS project included and a clearly documented path to TestFlight distribution.',
    featured: true,
    order: 5,
    language: 'Dart',
    stars: 5,
    forks: 1,
    topics: ['flutter', 'offline-first', 'urdu', 'localization', 'service-booking'],
    status: 'Released',
    updatedAt: '2026-10-10',
  },
  {
    id: '6',
    slug: 'skardu-spring',
    title: 'Skardu Spring — Full-Stack Commerce',
    description:
      'Premium e-commerce ecosystem for Karakoram mineral water — Next.js 15 storefront, Express and MongoDB API, and an OpenAI concierge.',
    longDescription:
      'Skardu Spring is a full-stack e-commerce ecosystem for a premium Pakistani mineral water brand sourced from the Karakoram glaciers. The frontend is a Next.js 15 App Router build with React 19, CSS Modules, Swiper and Framer Motion under a “Digital Purity” design language — glassmorphism surfaces, glacial motion and micro-interactions on every action. The backend is a modular Express API on Node 20 with JWT authentication, bcrypt and Mongoose against MongoDB Atlas, plus service layers for the AI concierge and logistics. The repository is structured as a monorepo with separate `/frontend`, `/backend` and `/logic` layers so UI, API and intelligence scale independently.',
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Express.js', 'MongoDB', 'Mongoose', 'OpenAI', 'JWT', 'Tailwind CSS'],
    category: ['Full Stack', 'Web', 'AI/ML'],
    categoryLabel: 'Full Stack · E-commerce · Next.js 15',
    image: '/images/projects/skardu-spring.jpg',
    links: {
      github: 'https://github.com/tatheer583/Skardu-Spring-',
      demo: 'https://skardu-spring-frontend.vercel.app',
    },
    features: [
      'Next.js 15 App Router storefront tuned for sub-second LCP',
      'Glassmorphism design system with Framer Motion transitions and Swiper carousels',
      'Modular Express API with JWT auth, bcrypt hashing and Mongoose models',
      'OpenAI-powered concierge wired through dedicated service layers',
      'Monorepo separation of frontend, backend and business logic',
      'CI workflow and GitHub Pages deployment notes for the frontend',
    ],
    challenges:
      'Carrying a luxury brand aesthetic through a full commerce stack while keeping the API secure, the data model clean and the frontend fast.',
    results:
      'A flagship full-stack reference that demonstrates end-to-end ownership — UI polish, auth, persistence, payments flow and AI features in one codebase.',
    featured: true,
    order: 6,
    language: 'JavaScript',
    stars: 5,
    forks: 1,
    license: 'MIT',
    topics: ['e-commerce', 'nextjs', 'express', 'mongodb', 'openai', 'monorepo'],
    status: 'Live',
    updatedAt: '2026-10-13',
  },
  {
    id: '7',
    slug: 'cyber-sathi',
    title: 'CyberSathi — Offline AI Security Analyzer',
    description:
      'On-device scam detection for messages, emails, screenshots, QR codes and URLs — powered by a local Gemma model via Ollama.',
    longDescription:
      'CyberSathi analyses suspicious SMS messages, emails, screenshots, QR codes and URLs for phishing, malware and fraud — in English, Urdu or Roman Urdu. No cloud LLM is used for detection: a local Gemma model served by Ollama runs the analysis, and every scan stays on the machine after the initial setup. A deterministic rule engine handles the parts that must never be guessed — sender domain checks, linguistics, malware and OTP-request heuristics, and a blocklist of more than fifty known scam domains — while the model handles free-form reasoning. Scans persist to a local SQLite database through SQLAlchemy, and the React and Tailwind frontend includes a PWA manifest and service worker for offline use.',
    tech: ['Python', 'FastAPI', 'Ollama', 'Gemma 2B', 'React', 'Tailwind CSS', 'SQLite', 'SQLAlchemy', 'jsQR'],
    category: ['Security', 'AI/ML', 'NLP', 'Full Stack'],
    categoryLabel: 'AI · Security · Offline Phishing Detection',
    image: '/images/projects/cyber-sathi.jpg',
    links: { github: 'https://github.com/tatheer583/Cyber-Sathi' },
    features: [
      'Message, email, screenshot, QR code and URL analysis endpoints',
      'Local Ollama runtime with the Gemma 2B model — no cloud LLM in the detection path',
      'Deterministic linguistic, sender, URL, malware and OTP checks alongside model reasoning',
      'Offline QR decoding in the browser with jsQR — no external service',
      'Local SQLite history through SQLAlchemy, with scan review and deletion',
      'Full English, Urdu and Roman Urdu language support',
      'PWA manifest and service worker for offline caching',
    ],
    challenges:
      'Balancing a probabilistic model with deterministic rules so that a scam verdict is explainable, and keeping the whole pipeline usable on a machine with no internet connection.',
    results:
      'A complete offline-first security companion that pairs model judgement with hard rule checks and a blocklist — and says exactly which factors drove each verdict.',
    featured: false,
    order: 7,
    language: 'Python',
    stars: 4,
    license: 'MIT',
    topics: ['cybersecurity', 'phishing', 'ollama', 'local-llm', 'offline-first'],
    status: 'Live',
    updatedAt: '2026-07-20',
  },
  {
    id: '8',
    slug: 'e-nose-system',
    title: 'Smart E-Nose AI — Atmospheric Safety',
    description:
      'Five-sensor gas array with a Random Forest classifier and a live glassmorphism dashboard for real-time hazard detection.',
    longDescription:
      'The Smart E-Nose AI fuses a five-sensor MQ gas array with a Random Forest machine learning model to classify air quality in real time. Instead of threshold alarms, it reads the combined “signature” of each gas across the sensors and distinguishes clean air, smoke and fire, LPG and methane leaks, alcohol vapour, and polluted or stale air. The hardware layer is an Arduino Uno carrying MQ-2, MQ-3, MQ-5, MQ-7 and MQ-135 sensors; the backend is a Python Flask REST API with SQLite persistence, and a multi-threaded bridge syncs hardware readings to the web within milliseconds. The dashboard uses a glassmorphism interface with particle simulations that turn red during hazard detection and Chart.js time-series analytics. A built-in software sensor simulator lets the whole system run with no hardware attached.',
    tech: ['Python', 'Flask', 'Arduino', 'MQ Sensor Array', 'Random Forest', 'Chart.js', 'SQLite'],
    category: ['IoT', 'AI/ML', 'Embedded', 'Real-Time'],
    categoryLabel: 'IoT · Machine Learning · Environmental Safety',
    image: '/images/projects/e-nose.jpg',
    links: { github: 'https://github.com/tatheer583/E-Nose-system-' },
    features: [
      'Five-sensor MQ array with multi-sensor fusion across MQ-2, MQ-3, MQ-5, MQ-7 and MQ-135',
      'Random Forest classifier separating clean air, smoke, gas leaks, alcohol and pollution',
      'Flask REST API with SQLite persistence and a multi-threaded hardware bridge',
      'Glassmorphism dashboard with reactive particle background and live time-series charts',
      'Built-in sensor simulator so the dashboard runs with no hardware attached',
      'One-command launcher that starts the backend, frontend and simulator together',
    ],
    challenges:
      'Sensor noise and overlapping gas signatures make reliable classification far harder than a simple threshold alarm — the model had to learn patterns rather than cut-offs.',
    results:
      'A working IoT safety prototype that turns invisible atmospheric data into actionable, real-time insight for schools, offices and industrial sites.',
    featured: false,
    order: 8,
    language: 'Python',
    stars: 3,
    license: 'MIT',
    topics: ['iot', 'arduino', 'machine-learning', 'air-quality', 'safety'],
    status: 'Live',
    updatedAt: '2026-05-23',
  },
  {
    id: '9',
    slug: 'medi-connect',
    title: 'MediConnect Smart — Healthcare Platform',
    description:
      'AI-assisted healthcare platform — appointment booking, digital prescriptions, medication reminders and AI pre-consultation summaries.',
    longDescription:
      'MediConnect Smart is a healthcare management platform that closes the workflow gap between patients, doctors and clinics. The Flutter mobile app covers the patient side — search doctors by name, specialty or clinic and book instantly, view and download digital prescriptions and lab results, set localised medication and appointment reminders, message providers securely, and ask an AI medical assistant about preliminary queries. The doctor side gives a dynamic daily schedule with a patient queue, OpenAI-generated pre-consultation summaries built from patient history, and digital prescription issuance. Clinic administrators manage profiles, operating hours and staff access, with analytics over daily appointments and doctor load. The backend is a Node.js and TypeScript API on Appwrite, containerised with Docker.',
    tech: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Node.js', 'TypeScript', 'Appwrite', 'OpenAI', 'Docker'],
    category: ['Mobile', 'Full Stack', 'AI/ML'],
    categoryLabel: 'Healthcare · Flutter + Node/TS · AI Assistance',
    image: '/images/projects/medi-connect.jpg',
    links: { github: 'https://github.com/tatheer583/Medi-Connect-' },
    features: [
      'Doctor search and real-time appointment booking by name, specialty or clinic',
      'Secure digital health records with downloadable prescriptions and lab results',
      'Localised automated reminders for daily medication and upcoming appointments',
      'AI-generated pre-consultation patient summaries that cut clinician cognitive load',
      'Secure real-time messaging between patients and assigned providers',
      'Clinic admin console for staff access, operating hours and performance analytics',
      'Containerised backend for reproducible local and hosted deployments',
    ],
    challenges:
      'Healthcare workflows need clarity, trust and careful handling of records while staying fast for both patients and clinicians on a mobile connection.',
    results:
      'A complete healthcare product concept demonstrating genuine mobile and backend delivery with practical AI assistance rather than AI for its own sake.',
    featured: false,
    order: 9,
    language: 'Dart',
    stars: 2,
    topics: ['healthcare', 'flutter', 'appwrite', 'openai', 'docker'],
    status: 'Live',
    updatedAt: '2026-07-06',
  },
  {
    id: '10',
    slug: 'personal-finance-manager',
    title: 'Personal Finance Manager',
    description:
      'Responsive React finance tracker — income and expenses, an analytics dashboard, smart filtering and CSV export for budgeting.',
    longDescription:
      'Personal Finance Manager is a modern, responsive web application for tracking personal income and expenses. Income can be recorded from predefined sources such as family members or from custom senders the user adds, and expenses are logged by category with descriptions. A dashboard presents total income, total expenses, the resulting balance and the trend at a glance, backed by Recharts visual analytics comparing income against expenses. Transaction history supports filtering by type, by date range and by keyword search, and the whole dataset persists to localStorage so it survives a refresh. Everything can be exported to CSV for external analysis.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Lucide React'],
    category: ['Web', 'Full Stack'],
    categoryLabel: 'Full Stack · Finance · React + TypeScript',
    image: '/images/projects/personal-finance.jpg',
    links: {
      github: 'https://github.com/tatheer583/My-personal-finance-manager',
      demo: 'https://tatheer583.github.io/My-personal-finance-manager/',
    },
    features: [
      'Income tracking from predefined and fully custom sources',
      'Expense logging by category with descriptions',
      'Dashboard with total income, expenses, balance and trend summary',
      'Recharts bar charts comparing income against expenses',
      'Advanced filtering by transaction type, date range and keyword',
      'Automatic localStorage persistence with full CSV export',
      'Fully responsive from desktop down to mobile',
    ],
    challenges:
      'Making personal budgeting feel simple and trustworthy while still offering genuinely useful analytics and flexible filtering.',
    results:
      'A practical everyday finance tool that demonstrates clean React state management, typed data modelling and data visualisation.',
    featured: false,
    order: 10,
    language: 'TypeScript',
    stars: 3,
    topics: ['react', 'typescript', 'finance', 'recharts', 'dashboard'],
    status: 'Live',
    updatedAt: '2026-06-20',
  },
  {
    id: '11',
    slug: 'portfolio',
    title: 'This Portfolio — Next.js + Motion',
    description:
      'The site you are reading — a Next.js 14 App Router portfolio with real GitHub data, dual themes, a D3 skill graph and animated sections.',
    longDescription:
      'This portfolio is a Next.js 14 App Router project built with TypeScript, Tailwind CSS and Framer Motion. It is content-driven: all eleven project entries, their star counts, licences, languages and live demos map one-to-one to public GitHub repositories, and the GitHub section fetches the contribution calendar and language breakdown from the API with a typed local fallback. The interface ships a dark graphite theme and a real light theme from the same CSS custom-property tokens, with no flash on load. Motion is used deliberately — an aurora hero, scroll reveals, a dual-direction technology marquee, animated counters and a D3 force-directed skill graph — and every animation respects prefers-reduced-motion. Case studies are generated from a single data file, structured data and a sitemap are emitted at build time, and a GitHub Pages workflow produces a static export with the server-only routes removed.',
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'D3.js', 'GitHub API', 'Resend'],
    category: ['Web', 'Full Stack', 'Real-Time'],
    categoryLabel: 'Portfolio · Next.js · Motion & Data',
    image: '/images/projects/portfolio.jpg',
    links: {
      github: 'https://github.com/tatheer583/portfolio',
      demo: 'https://tatheer583.github.io/portfolio/',
    },
    features: [
      'Eleven project case studies generated from a single typed data file',
      'Live GitHub statistics with a typed fallback when the API is unavailable',
      'Dark graphite and true light themes built from shared CSS custom properties',
      'D3 force-directed skill graph with draggable nodes',
      'Animated hero, counters, marquee and scroll reveals that respect reduced motion',
      'Resend-backed contact API with direct email and WhatsApp fallbacks',
      'Accessible semantics, visible focus rings and AA-contrast text in both themes',
    ],
    challenges:
      'Presenting verified first-party data without overstating it, while keeping a motion-heavy design accessible — with a real light theme, a static export target and no layout jank.',
    results:
      'A portfolio that reports exactly what the repositories contain, backed by one design system and a build that passes type-check, lint and static export.',
    featured: false,
    order: 11,
    language: 'JavaScript',
    stars: 2,
    topics: ['nextjs', 'typescript', 'tailwindcss', 'framer-motion', 'd3', 'portfolio'],
    status: 'Live',
    updatedAt: '2026-10-15',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

/** Aggregate numbers computed from the real project list. */
export const PROJECT_STATS = {
  total: PROJECTS.length,
  featured: PROJECTS.filter((p) => p.featured).length,
  stars: PROJECTS.reduce((sum, p) => sum + (p.stars ?? 0), 0),
  forks: PROJECTS.reduce((sum, p) => sum + (p.forks ?? 0), 0),
  languages: Array.from(new Set(PROJECTS.map((p) => p.language).filter(Boolean))).sort(),
}
