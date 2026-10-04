import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'skardu-spring',
    title: 'Skardu Spring',
    description:
      'Premium full-stack e-commerce ecosystem for Karakoram mineral water — Next.js storefront, Express API, and AI concierge.',
    longDescription:
      'Skardu Spring is a luxury full-stack e-commerce platform built for a premium Pakistani mineral water brand sourced from the Karakoram. It combines a Next.js 15 storefront with glassmorphism UI and Framer Motion, an Express/MongoDB backend with JWT auth, and an OpenAI-powered concierge for a polished product experience.',
    tech: ['Next.js', 'React', 'Express.js', 'MongoDB', 'Node.js', 'OpenAI', 'Framer Motion', 'JWT'],
    category: ['Web', 'Full Stack', 'AI/ML'],
    categoryLabel: 'Full Stack - E-commerce - Next.js',
    image: '/images/projects/skardu-spring.jpg',
    links: { github: 'https://github.com/tatheer583/Skardu-Spring-' },
    features: [
      'Premium Next.js storefront with glassmorphism and motion design',
      'Express API with JWT authentication and MongoDB persistence',
      'OpenAI-powered AI concierge for customer support flows',
      'Modular monorepo architecture for frontend and backend',
    ],
    challenges:
      'Balancing a luxury brand feel with fast performance, secure commerce flows, and maintainable full-stack architecture.',
    results:
      'A flagship full-stack product showcase that proves end-to-end ownership from UI polish to API, database, and AI features.',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'khidmat-app',
    title: 'KHIDMAT App',
    description:
      'Agentic AI service orchestrator for Pakistan — natural-language booking with multi-agent discovery, trust scoring, and negotiation.',
    longDescription:
      'KHIDMAT is a Flutter mobile app built for the Google Antigravity Hackathon. It automates service requests end-to-end using six AI agents that understand Urdu/Roman Urdu/English, discover providers, score trust (BHAROSA), negotiate prices (MOL-BHAAV), confirm bookings, and handle follow-ups — with full agent trace logs.',
    tech: ['Flutter', 'Dart', 'Google Gemini', 'Provider', 'go_router', 'AI Agents'],
    category: ['AI/ML', 'Full Stack', 'Automation'],
    categoryLabel: 'Flutter - Agentic AI - Mobile',
    image: '/images/projects/khidmat.jpg',
    links: { github: 'https://github.com/tatheer583/Khidmat-App' },
    features: [
      'Six-agent pipeline: intent, discovery, trust, negotiation, booking, follow-up',
      'Natural language chat in Urdu, Roman Urdu, English, and code-switched input',
      'BHAROSA trust scoring and MOL-BHAAV market-aware negotiation',
      'Full agent reasoning traces for transparent decision-making',
    ],
    challenges:
      'Designing a reliable multi-agent workflow that stays understandable across languages while simulating real service bookings.',
    results:
      'A hackathon-ready agentic product that connects users with local service providers through transparent AI automation.',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'personal-finance-manager',
    title: 'Personal Finance Manager',
    description:
      'Modern React finance tracker for income, expenses, dashboards, filtering, and CSV export — built for student money management.',
    longDescription:
      'Personal Finance Manager is a responsive web app for tracking income and expenses with a clear dashboard, charts, transaction history, smart filtering, custom income sources, localStorage persistence, and CSV export. Built with React, TypeScript, Vite, Tailwind CSS, and Recharts.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'],
    category: ['Web', 'Full Stack'],
    categoryLabel: 'Full Stack - Finance - React',
    image: '/images/projects/personal-finance.jpg',
    links: { github: 'https://github.com/tatheer583/My-personal-finance-manager' },
    features: [
      'Income and expense tracking with category-based logging',
      'Dashboard with balance, trends, and visual analytics',
      'Advanced filtering by type, date range, and keywords',
      'Local persistence plus CSV export for external analysis',
    ],
    challenges:
      'Making personal budgeting feel simple and trustworthy while still offering useful analytics and flexible filtering.',
    results:
      'A practical everyday finance tool that showcases clean React UI, state management, and data visualization skills.',
    featured: true,
    order: 3,
  },
  {
    id: '4',
    slug: 'medi-connect',
    title: 'MediConnect Smart',
    description:
      'AI-powered healthcare platform connecting patients and doctors with booking, prescriptions, messaging, and AI summaries.',
    longDescription:
      'MediConnect Smart is a healthcare management platform built with Flutter for mobile and Node.js/TypeScript for backend APIs. It supports appointment booking, digital prescriptions, medication reminders, secure messaging, and OpenAI-assisted patient summaries — with Appwrite and Docker in the architecture.',
    tech: ['Flutter', 'Dart', 'Node.js', 'TypeScript', 'Appwrite', 'OpenAI', 'Docker'],
    category: ['Full Stack', 'AI/ML', 'Web'],
    categoryLabel: 'Healthcare - Flutter - AI',
    image: '/images/projects/medi-connect.jpg',
    links: { github: 'https://github.com/tatheer583/Medi-Connect-' },
    features: [
      'Patient booking, digital records, and medication reminders',
      'Doctor schedule management and AI pre-consultation summaries',
      'Secure messaging between patients and providers',
      'Modern Flutter + Node/TypeScript full-stack architecture',
    ],
    challenges:
      'Healthcare workflows need clarity, trust, and careful handling of records while keeping the experience fast for both patients and doctors.',
    results:
      'A complete healthcare product concept that demonstrates mobile + backend delivery with practical AI assistance.',
    featured: false,
    order: 4,
  },
  {
    id: '5',
    slug: 'jarvis-ai-assistant',
    title: 'Jarvis AI Assistant',
    description:
      'Local Windows desktop assistant for voice commands, applications, files, notes, and reminders.',
    longDescription:
      'Jarvis Local Desktop combines a Tauri, React, and TypeScript interface with a local Python engine. Core deterministic commands work without an API key or model downloads. It supports voice activation and typed commands, application and window control, file operations, local notes, reminders, and activity history. Local Whisper speech recognition and Qwen chat are optional and require installed model files. A centralized policy boundary, confirmation for destructive operations, cancellation, and a separate audit database support the runtime. Owner authentication is not configured in the current release.',
    tech: ['Tauri', 'React', 'TypeScript', 'Python', 'SQLite', 'Whisper', 'Qwen'],
    category: ['AI/ML', 'Voice', 'Automation'],
    categoryLabel: 'Desktop - Local AI - Voice Automation',
    image: '/images/projects/jarvis.jpg',
    links: { github: 'https://github.com/tatheer583/jarvis-ai-assistant' },
    features: [
      'Voice activation and typed commands in a local desktop app',
      'Applications, files, window control, notes, and one-time reminders',
      'Optional local speech recognition and model-powered chat',
      'Destructive-action confirmation, cancellation, and audit metadata',
    ],
    challenges:
      'Coordinating desktop tools and voice input with explicit policy checks, safe cancellation, and clear limits on local control.',
    results:
      'A packaged Windows desktop release with a shared local runtime, documented setup, and a PyQt fallback.',
    featured: false,
    order: 5,
  },
  {
    id: '6',
    slug: 'cyber-sathi',
    title: 'Cyber Sathi - AI Security Tool',
    description:
      'AI security assistant for URL, QR, and message analysis with phishing and malware detection.',
    longDescription:
      'Cyber Sathi helps users understand online risk before they click. It scans URLs, QR codes, and suspicious messages, classifies likely phishing or malware behavior, and explains security verdicts in clear language for non-technical users.',
    tech: ['Python', 'FastAPI', 'Machine Learning', 'NLP', 'React', 'Security'],
    category: ['AI/ML', 'Security', 'NLP', 'Full Stack'],
    categoryLabel: 'AI - Security - NLP - Phishing Detection',
    image: '/images/projects/cyber-sathi.jpg',
    links: { github: 'https://github.com/tatheer583/Cyber-Sathi' },
    features: [
      'URL, QR code, and message scanning for risky indicators',
      'Phishing and malware detection workflow',
      'Plain-language explanations for security decisions',
      'Security-focused full-stack interface',
    ],
    challenges:
      'Security tools need clear output, low false positives, and understandable explanations, especially for users who are not analysts.',
    results:
      'Positioned as a practical AI security companion and the main portfolio bridge between AI engineering and junior security analyst work.',
    featured: false,
    order: 6,
  },
  {
    id: '7',
    slug: 'e-nose-system',
    title: 'Smart E-Nose AI',
    description:
      'IoT + ML atmospheric safety system using multi-gas sensors and Random Forest classification with a live dashboard.',
    longDescription:
      'Smart E-Nose AI fuses a 5-sensor MQ array with a Random Forest model to classify air quality in real time — clean air, smoke/fire, gas leaks, alcohol vapors, and polluted air. An Arduino sensing layer feeds a Python Flask API and glassmorphism dashboard with live charts.',
    tech: ['Python', 'Flask', 'Arduino', 'Random Forest', 'IoT', 'Chart.js', 'SQLite'],
    category: ['IoT', 'AI/ML', 'Embedded', 'Real-Time'],
    categoryLabel: 'IoT - ML - Environmental Safety',
    image: '/images/projects/e-nose.jpg',
    links: { github: 'https://github.com/tatheer583/E-Nose-system-' },
    features: [
      'Multi-gas MQ sensor array with pattern-based classification',
      'Random Forest model for hazard vs clean-air detection',
      'Live glassmorphism dashboard with time-series analytics',
      'Python bridge from hardware sensing to web visualization',
    ],
    challenges:
      'Sensor noise and overlapping gas signatures make reliable classification harder than simple threshold alarms.',
    results:
      'A practical IoT safety prototype that turns atmospheric sensing into actionable real-time insights.',
    featured: false,
    order: 7,
  },
  {
    id: '8',
    slug: 'wiwave-motion',
    title: 'WIWAVE Motion',
    description:
      'Local WiFi sensing workspace with live RSSI monitoring, spectral analysis, an ESP32 CSI pipeline, and a 3D observatory.',
    longDescription:
      'WIWAVE Motion measures live WiFi RSSI through the Windows Native WLAN API and analyzes changes across the primary router and visible neighboring access points. Its Python/FastAPI backend and React interface provide baseline calibration, Welch spectral analysis, a local SQLite event journal, recording and export. An ESP32 hardware path supplies subcarrier-level CSI data for labeled trials and motion research. The interactive 3D Observatory includes explicitly simulated multi-person scenarios; ordinary laptop RSSI does not locate or identify people.',
    tech: ['Python', 'FastAPI', 'React', 'Three.js', 'ESP32', 'WiFi CSI', 'SQLite', 'Signal Processing'],
    category: ['IoT', 'AI/ML', 'Real-Time'],
    categoryLabel: 'IoT - WiFi Sensing - Real-Time',
    image: '/images/projects/wiwave.jpg',
    links: { github: 'https://github.com/tatheer583/WIWAVE-MOTION' },
    features: [
      'Live Windows WiFi RSSI and multi-link baseline change detection',
      'Spectral analytics, event journal, recordings, and CSV/JSONL export',
      'ESP32 CSI waterfall, labeled trial collection, and analysis',
      '3D Observatory with clearly labeled simulated scenarios',
    ],
    challenges:
      'Indoor RF environments change constantly, so detection has to adapt without becoming brittle or overly noisy.',
    results:
      'A local-first sensing tool with genuine hardware readings, a CSI research pipeline, and clear separation between measured and simulated data.',
    featured: false,
    order: 8,
  },
  {
    id: '9',
    slug: 'drone-ai-system',
    title: 'Drone AI Vision System',
    description:
      'Computer-vision system for real-time object detection, tracking, and autonomous drone navigation.',
    longDescription:
      'The Drone AI Vision System connects camera input, YOLO-based perception, real-time object detection, and navigation logic into an autonomous vision pipeline. It demonstrates applied computer vision under practical latency and hardware constraints.',
    tech: ['Python', 'OpenCV', 'YOLO', 'PyTorch', 'Computer Vision', 'ROS'],
    category: ['Computer Vision', 'AI/ML', 'IoT', 'Real-Time'],
    categoryLabel: 'Computer Vision - YOLO - Autonomous',
    image: '/images/projects/drone-ai.jpg',
    links: { github: 'https://github.com/tatheer583' },
    features: [
      'Real-time object detection and tracking',
      'YOLO-based perception pipeline',
      'Autonomous navigation logic',
      'Telemetry-ready architecture for robotics workflows',
    ],
    challenges:
      'Real-time video analysis requires balancing model accuracy, frame rate, and hardware limits without making the control loop unstable.',
    results:
      'Demonstrates a complete computer-vision workflow from camera input to autonomous system behavior.',
    featured: false,
    order: 9,
  },
  {
    id: '10',
    slug: 'agevee-travel',
    title: 'Agevee Four Star Travel',
    description:
      'Full-stack travel platform with polished React UI, booking-oriented flows, and MongoDB-backed content.',
    longDescription:
      'Agevee Four Star Travel is a full-stack travel website focused on presenting travel packages clearly and guiding users toward inquiries or bookings. The project emphasizes clean UI, responsive layouts, and a practical business-facing web experience.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Node.js'],
    category: ['Web', 'Full Stack'],
    categoryLabel: 'Full Stack - React - MongoDB',
    image: '/images/projects/agevee.jpg',
    links: { github: 'https://github.com/tatheer583' },
    features: [
      'Responsive travel landing and package views',
      'Booking-focused calls to action',
      'Reusable React component structure',
      'Database-ready full-stack architecture',
    ],
    challenges:
      'The main product challenge was making the site feel polished and trustworthy while keeping the user journey simple.',
    results:
      'Built a business-ready web platform that supports portfolio proof for full-stack product development.',
    featured: false,
    order: 10,
  },
  {
    id: '11',
    slug: 'iot-security-system',
    title: '10-in-1 Smart IoT Security',
    description:
      'Embedded IoT security system with multiple sensors, live monitoring, and real-time alert workflows.',
    longDescription:
      'The 10-in-1 Smart IoT Security project combines motion, sound, heat, and monitoring signals into a connected security workflow. It is designed around real-time awareness, event detection, and practical smart-space protection.',
    tech: ['IoT', 'Python', 'MQTT', 'Embedded Systems', 'React', 'Real-Time'],
    category: ['IoT', 'Embedded', 'Real-Time', 'Full Stack'],
    categoryLabel: 'IoT - Embedded - Real-Time',
    image: '/images/projects/iot-security.jpg',
    links: { github: 'https://github.com/tatheer583' },
    features: [
      'Multi-sensor security monitoring',
      'Real-time alerts and event flow',
      'Embedded device integration',
      'Dashboard-ready data model',
    ],
    challenges:
      'Sensor-driven systems need careful handling of noisy input, false positives, and alert timing.',
    results:
      'Shows end-to-end thinking across embedded sensing, backend processing, and monitoring UX.',
    featured: false,
    order: 11,
  },
  {
    id: '12',
    slug: 'irssa-psl',
    title: 'Irssa — PSL Sign Learn',
    description: 'An offline Android learning game for Pakistan Sign Language, with 37 Urdu letters, English alphabet practice, and an on-device camera coach.',
    longDescription: 'Irssa is a Kotlin and Jetpack Compose learning app for deaf and speech-impaired children. It separates Pakistan Sign Language and English ASL learning, uses real hand photographs, and includes an offline MediaPipe hand-landmark recognition coach. Practice includes letters, numbers, everyday words, quizzes, camera quests, and gesture conversion, with progress tools for parents and teachers. Camera frames stay on the device. English J and Z remain guided practice because a static recognizer cannot grade their motion.',
    tech: ['Kotlin', 'Jetpack Compose', 'MediaPipe', 'Android', 'Python', 'On-device ML'],
    category: ['AI/ML', 'Computer Vision', 'Real-Time'],
    categoryLabel: 'Android · Sign Language · On-device AI',
    image: '/images/projects/irssa.png',
    links: { github: 'https://github.com/tatheer583/psl-sign-learn' },
    features: ['37 Urdu PSL letters and 26 English ASL letters, taught separately', 'Offline camera coaching for supported static handshapes', 'Quizzes, camera quests, numbers, words, and progress tracking', 'Personal hand-data capture and model training tools', 'On-device processing without accounts, ads, or analytics'],
    challenges: 'Recognizing handshapes across independent signers while avoiding false success and distinguishing static letters from motion-dependent signs.',
    results: 'A ready-to-install Android APK and a reproducible recognition-training pipeline are available in the repository.',
    featured: true,
    order: 12,
  },
  {
    id: '13',
    slug: 'interactive-portfolio',
    title: 'Interactive Portfolio Studio',
    description: 'An illustrated 3D portfolio with animated doors, a project gallery, monitor studio, interactive map, and a contact office.',
    longDescription: 'This portfolio combines an existing Next.js application with an adapted illustrated Three.js and React Three Fiber experience. It connects real project data to interactive exhibits, keeps individual case-study pages, offers map navigation and optional audio, and provides email and WhatsApp contact. The reference scene implementation and artwork are credited in the repository’s third-party notices.',
    tech: ['Next.js', 'React', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP'],
    category: ['Web', 'Full Stack'],
    categoryLabel: '3D Web · Next.js · Creative Development',
    image: '/reference/portfolio/project-13.webp',
    links: { github: 'https://github.com/tatheer583/portfolio', demo: '/' },
    features: ['Animated entrance and room doors', 'Project exhibits connected to detailed case studies', 'Interactive map, mouse parallax, and optional audio', 'A contact office with WhatsApp and email access'],
    challenges: 'Integrating a large illustrated scene into an existing application while keeping the content accurate and waiting for graphics before revealing rooms.',
    results: 'An immersive portfolio experience alongside the original project pages and contact API.',
    featured: false,
    order: 13,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
