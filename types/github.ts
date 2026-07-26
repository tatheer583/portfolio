export interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  location: string | null
  htmlUrl: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  topics: string[]
  updatedAt: string
  htmlUrl: string
}

export interface PinnedRepo {
  name: string
  description: string | null
  stars: number
  forks: number
  primaryLanguage: { name: string; color: string } | null
  url: string
}

export interface ContributionDay {
  date: string
  count: number
  color: string
}

export interface LanguageBreakdown {
  name: string
  percentage: number
  color: string
}

export interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  pinned: PinnedRepo[]
  languages: LanguageBreakdown[]
  totalStars: number
  totalContributions: number
  lastFetched: string
}
