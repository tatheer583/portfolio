export type ProjectCategory =
  | 'AI/ML'
  | 'Computer Vision'
  | 'Web'
  | 'IoT'
  | 'Full Stack'
  | 'Automation'
  | 'Security'
  | 'Voice'
  | 'NLP'
  | 'Embedded'
  | 'Real-Time'

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  category: ProjectCategory[]
  categoryLabel: string
  image: string
  links: { github?: string; demo?: string }
  features: string[]
  challenges: string
  results: string
  featured: boolean
  order: number
}