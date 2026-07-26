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
      { name: 'FastAPI', level: 86 },
      { name: 'REST APIs', level: 92 },
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Authentication & Auth Flows', level: 86 },
      { name: 'Framer Motion', level: 84 },
      { name: 'Responsive UI / UX', level: 92 },
      { name: 'Vercel Deployment', level: 90 },
      { name: 'WebSockets', level: 80 },
      { name: 'Flutter', level: 74 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    skills: [
      { name: 'LLMs', level: 88 },
      { name: 'AI Agents', level: 86 },
      { name: 'RAG Systems', level: 86 },
      { name: 'LangChain', level: 84 },
      { name: 'Prompt Engineering', level: 88 },
      { name: 'HuggingFace', level: 80 },
      { name: 'PyTorch', level: 78 },
      { name: 'TensorFlow', level: 76 },
      { name: 'Scikit-Learn', level: 74 },
      { name: 'Model Fine-Tuning', level: 72 },
    ],
  },
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    skills: [
      { name: 'OpenCV', level: 84 },
      { name: 'YOLO', level: 82 },
      { name: 'Object Detection', level: 82 },
      { name: 'Real-Time Video Analysis', level: 80 },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'JavaScript', level: 93 },
      { name: 'TypeScript', level: 92 },
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 84 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 94 },
      { name: 'Java', level: 74 },
      { name: 'C++', level: 68 },
    ],
  },
  {
    id: 'databases-cloud',
    label: 'Databases & Cloud',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 78 },
      { name: 'Firebase', level: 78 },
      { name: 'Git', level: 92 },
      { name: 'GitHub', level: 92 },
      { name: 'Docker', level: 78 },
      { name: 'Vercel', level: 90 },
      { name: 'Render', level: 76 },
      { name: 'Railway', level: 76 },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    skills: [
      { name: 'Web Application Penetration Testing', level: 76 },
      { name: 'Burp Suite', level: 78 },
      { name: 'Vulnerability Discovery', level: 76 },
      { name: 'Bug Hunting', level: 74 },
      { name: 'Phishing & Malware Detection', level: 82 },
      { name: 'OWASP Top 10', level: 78 },
      { name: 'Junior Security Analyst', level: 76 },
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
  { id: 'Node.js', group: 'backend' },
  { id: 'Express', group: 'backend' },
  { id: 'FastAPI', group: 'backend' },
  { id: 'MongoDB', group: 'backend' },
  { id: 'PostgreSQL', group: 'backend' },
  { id: 'Python', group: 'core' },
  { id: 'LLMs', group: 'ai' },
  { id: 'RAG', group: 'ai' },
  { id: 'LangChain', group: 'ai' },
  { id: 'OpenCV', group: 'cv' },
  { id: 'YOLO', group: 'cv' },
  { id: 'Burp Suite', group: 'security' },
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
  ['FastAPI', 'MongoDB'],
  ['FastAPI', 'PostgreSQL'],
  ['Python', 'FastAPI'],
  ['Python', 'LLMs'],
  ['Python', 'OpenCV'],
  ['LLMs', 'LangChain'],
  ['LLMs', 'RAG'],
  ['LangChain', 'RAG'],
  ['OpenCV', 'YOLO'],
  ['Burp Suite', 'OWASP'],
  ['OWASP', 'Next.js'],
  ['Docker', 'Node.js'],
]
