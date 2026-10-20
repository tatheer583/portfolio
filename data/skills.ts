export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
  featured?: boolean
}

/**
 * Every skill below is backed by shipped code in one of the public
 * repositories under github.com/tatheer583.
 */
export const SKILLS: SkillCategory[] = [
  {
    id: 'full-stack',
    label: 'Full Stack',
    featured: true,
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 94 },
      { name: 'TypeScript', level: 92 },
      { name: 'JavaScript', level: 93 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'FastAPI', level: 88 },
      { name: 'Flask', level: 84 },
      { name: 'REST APIs', level: 92 },
      { name: 'MongoDB / Mongoose', level: 88 },
      { name: 'JWT Authentication', level: 86 },
      { name: 'Responsive UI / UX', level: 92 },
      { name: 'Vite Build Tooling', level: 90 },
      { name: 'Framer Motion', level: 86 },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Desktop',
    skills: [
      { name: 'Flutter', level: 82 },
      { name: 'Dart', level: 82 },
      { name: 'Riverpod', level: 78 },
      { name: 'go_router', level: 76 },
      { name: 'Jetpack Compose', level: 80 },
      { name: 'Kotlin', level: 80 },
      { name: 'Android Development', level: 82 },
      { name: 'Tauri / Rust', level: 76 },
      { name: 'Local-first Architecture', level: 84 },
      { name: 'Offline Storage', level: 82 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    skills: [
      { name: 'Local LLM Integration', level: 88 },
      { name: 'Ollama', level: 88 },
      { name: 'Gemma', level: 84 },
      { name: 'OpenAI API', level: 86 },
      { name: 'Prompt Engineering', level: 88 },
      { name: 'Random Forest', level: 82 },
      { name: 'Scikit-Learn', level: 78 },
      { name: 'MediaPipe', level: 86 },
      { name: 'Hand Landmark Classification', level: 82 },
      { name: 'Model Retraining Pipelines', level: 80 },
    ],
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    skills: [
      { name: 'MediaPipe Hand Landmarker', level: 88 },
      { name: 'On-device Inference', level: 86 },
      { name: 'Nearest-Neighbour Classifiers', level: 84 },
      { name: 'NumPy / Data Pipelines', level: 86 },
      { name: 'Signal & Spectral Analysis', level: 82 },
      { name: 'Welch Spectral Estimation', level: 80 },
    ],
  },
  {
    id: 'iot',
    label: 'IoT & Embedded',
    skills: [
      { name: 'ESP32', level: 84 },
      { name: 'WiFi CSI Sensing', level: 82 },
      { name: 'RSSI Analysis', level: 84 },
      { name: 'Arduino', level: 84 },
      { name: 'MQ Sensor Arrays', level: 80 },
      { name: 'Windows Native WLAN API', level: 78 },
      { name: 'Hardware / Web Bridge', level: 80 },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    skills: [
      { name: 'Phishing & Malware Detection', level: 84 },
      { name: 'Threat Analysis Rules', level: 82 },
      { name: 'Domain Blocklisting', level: 80 },
      { name: 'OWASP Top 10', level: 80 },
      { name: 'Security Audit Logging', level: 78 },
      { name: 'Permission Boundaries', level: 76 },
      { name: 'Burp Suite', level: 76 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'JavaScript', level: 93 },
      { name: 'TypeScript', level: 92 },
      { name: 'Python', level: 92 },
      { name: 'SQL', level: 86 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 94 },
      { name: 'Dart', level: 82 },
      { name: 'Kotlin', level: 80 },
      { name: 'SQL / Bash', level: 80 },
    ],
  },
  {
    id: 'databases-devops',
    label: 'Data & DevOps',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'SQLite / SQLAlchemy', level: 86 },
      { name: 'Git', level: 93 },
      { name: 'GitHub Actions', level: 88 },
      { name: 'Docker', level: 80 },
      { name: 'Vercel', level: 90 },
      { name: 'GitHub Pages', level: 88 },
      { name: 'CI/CD Pipelines', level: 86 },
      { name: 'Linux / Windows Tooling', level: 82 },
    ],
  },
  {
    id: 'creative',
    label: 'Creative & 3D',
    skills: [
      { name: 'Three.js', level: 82 },
      { name: 'React Three Fiber', level: 80 },
      { name: 'GSAP', level: 84 },
      { name: 'Framer Motion', level: 86 },
      { name: 'D3.js', level: 78 },
      { name: 'Recharts', level: 82 },
      { name: 'Design Systems', level: 84 },
      { name: 'Accessibility (WCAG)', level: 80 },
    ],
  },
]

export interface SkillNode {
  id: string
  group: string
}

export const SKILL_GRAPH_NODES: SkillNode[] = [
  { id: 'React', group: 'frontend' },
  { id: 'Next.js', group: 'frontend' },
  { id: 'TypeScript', group: 'frontend' },
  { id: 'Tailwind', group: 'frontend' },
  { id: 'Flutter', group: 'mobile' },
  { id: 'Kotlin', group: 'mobile' },
  { id: 'Tauri', group: 'mobile' },
  { id: 'Node.js', group: 'backend' },
  { id: 'Express', group: 'backend' },
  { id: 'FastAPI', group: 'backend' },
  { id: 'MongoDB', group: 'backend' },
  { id: 'SQLite', group: 'backend' },
  { id: 'Python', group: 'core' },
  { id: 'Local LLM', group: 'ai' },
  { id: 'Ollama', group: 'ai' },
  { id: 'MediaPipe', group: 'cv' },
  { id: 'Random Forest', group: 'cv' },
  { id: 'ESP32', group: 'iot' },
  { id: 'WiFi CSI', group: 'iot' },
  { id: 'Phishing Detection', group: 'security' },
  { id: 'OWASP', group: 'security' },
  { id: 'Docker', group: 'devops' },
  { id: 'Vercel', group: 'devops' },
]

export const SKILL_GRAPH_LINKS = [
  ['TypeScript', 'React'],
  ['TypeScript', 'Next.js'],
  ['React', 'Next.js'],
  ['React', 'Tailwind'],
  ['Next.js', 'Vercel'],
  ['Next.js', 'Node.js'],
  ['Node.js', 'Express'],
  ['Node.js', 'MongoDB'],
  ['Express', 'MongoDB'],
  ['FastAPI', 'SQLite'],
  ['FastAPI', 'MongoDB'],
  ['Python', 'FastAPI'],
  ['Python', 'Local LLM'],
  ['Python', 'Random Forest'],
  ['Python', 'MediaPipe'],
  ['Local LLM', 'Ollama'],
  ['MediaPipe', 'Random Forest'],
  ['Python', 'ESP32'],
  ['ESP32', 'WiFi CSI'],
  ['Python', 'Phishing Detection'],
  ['Phishing Detection', 'OWASP'],
  ['Docker', 'Node.js'],
  ['Flutter', 'TypeScript'],
  ['Kotlin', 'MediaPipe'],
  ['Tauri', 'Python'],
]
