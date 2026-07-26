import { cn } from '@/lib/utils'

const COLORS: Record<string, string> = {
  Python: '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  React: '#61DAFB',
  'Next.js': '#ffffff',
  FastAPI: '#009688',
  PostgreSQL: '#336791',
  MongoDB: '#47A248',
  PyTorch: '#EE4C2C',
  TensorFlow: '#FF6F00',
  OpenCV: '#5C3EE8',
  LangChain: '#1C3C3C',
  HuggingFace: '#FFD21E',
  LLMs: '#a78bfa',
  RAG: '#6C63FF',
  Docker: '#2496ED',
  Vercel: '#ffffff',
  ROS: '#22314E',
  YOLO: '#FF6F00',
  SQL: '#336791',
  'C++': '#00599C',
  Linux: '#FCC624',
  MQTT: '#660066',
  ReactNative: '#61DAFB',
}

export function TechChip({ name, className }: { name: string; className?: string }) {
  const color = COLORS[name] || '#6C63FF'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-surface px-3 py-1 text-xs font-medium text-content-secondary transition-colors hover:border-accent/40 hover:text-content-primary',
        className
      )}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {name}
    </span>
  )
}
