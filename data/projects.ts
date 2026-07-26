import type { Project } from '@/types/project'

const GITHUB = 'https://github.com/tatheer583'

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'jarvis-ai-assistant',
    title: 'Jarvis AI Assistant',
    description:
      'Voice-powered AI assistant for automation, browser control, NLP workflows, and LLM task execution.',
    longDescription:
      'Jarvis is a voice-first personal AI assistant that combines speech recognition, LLM reasoning, browser automation, and task orchestration. It is designed to turn natural language requests into practical computer actions while keeping the interaction fast and conversational.',
    tech: ['Python', 'LLM', 'LangChain', 'OpenAI', 'Speech Recognition', 'FastAPI', 'RAG'],
    category: ['AI/ML', 'Voice', 'Automation'],
    categoryLabel: 'AI - Voice - Automation - LLM',
    image: '/images/projects/jarvis.jpg',
    links: { github: GITHUB },
    features: [
      'Voice commands with speech-to-text and text-to-speech flow',
      'LLM-powered planning for multi-step user tasks',
      'Browser automation for repetitive workflows',
      'RAG-style answers over personal or project context',
    ],
    challenges:
      'The hard part was coordinating voice input, LLM responses, and external actions without letting stale context trigger the wrong automation.',
    results:
      'Created a flagship AI assistant concept that demonstrates agentic automation, natural-language UX, and practical LLM integration.',
    featured: true,
    order: 1,
  },
  {
    id: '2',
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
    links: { github: GITHUB },
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
    featured: true,
    order: 2,
  },
  {
    id: '3',
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
    links: { github: GITHUB },
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
    order: 3,
  },
  {
    id: '4',
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
    links: { github: GITHUB },
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
    order: 4,
  },
  {
    id: '5',
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
    links: { github: GITHUB },
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
    order: 5,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}