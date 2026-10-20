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
  | 'Signal Processing'
  | 'Mobile'
  | 'Desktop'
  | 'DevOps'
  | 'Tooling'

export type ProjectStatus = 'Live' | 'Released' | 'In progress'

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
  /** Primary language reported by the GitHub API. */
  language?: string
  /** Live star count on GitHub. */
  stars?: number
  /** Live fork count on GitHub. */
  forks?: number
  /** SPDX license identifier when GitHub reports one. */
  license?: string
  /** Repository topics published on GitHub. */
  topics?: string[]
  /** Release / availability state of the project. */
  status?: ProjectStatus
  /** ISO date of the last push to the repository. */
  updatedAt?: string
}
