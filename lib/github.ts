import { SITE } from '@/lib/constants'

const GITHUB_USERNAME = SITE.githubUsername

interface GitHubApiRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  html_url: string
}

interface PinnedRepo {
  name: string
  description: string | null
  stars: number
  forks: number
  primaryLanguage: { name: string; color: string } | null
  url: string
}

interface RateLimiter {
  [ip: string]: { count: number; reset: number }
}

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 3
const limits: RateLimiter = {}

export function rateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = limits[ip]
  if (!entry || entry.reset < now) {
    limits[ip] = { count: 1, reset: now + WINDOW_MS }
    return { success: true, remaining: MAX_PER_WINDOW - 1 }
  }
  if (entry.count >= MAX_PER_WINDOW) return { success: false, remaining: 0 }
  entry.count += 1
  return { success: true, remaining: MAX_PER_WINDOW - entry.count }
}

async function fetchGitHubGraphQL(token: string): Promise<{ pinned: PinnedRepo[]; totalContributions: number }> {
  const query = `
    query PortfolioGitHub($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar { totalContributions }
        }
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              url
              primaryLanguage { name color }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`)

  const json = await res.json()
  const user = json?.data?.user
  const nodes = Array.isArray(user?.pinnedItems?.nodes) ? user.pinnedItems.nodes : []

  return {
    totalContributions: user?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0,
    pinned: nodes.map((node: any) => ({
      name: node.name,
      description: node.description,
      stars: node.stargazerCount ?? 0,
      forks: node.forkCount ?? 0,
      primaryLanguage: node.primaryLanguage ?? null,
      url: node.url,
    })),
  }
}

export async function fetchGitHubFromApi(): Promise<{
  repos: GitHubApiRepo[]
  publicRepos: number
  followers: number
  pinned: PinnedRepo[]
  totalContributions: number
}> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const [userRes, reposRes, graphQL] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers, cache: 'no-store' }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers,
      cache: 'no-store',
    }),
    token ? fetchGitHubGraphQL(token).catch(() => ({ pinned: [], totalContributions: 0 })) : Promise.resolve({ pinned: [], totalContributions: 0 }),
  ])

  if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`)

  const repos: GitHubApiRepo[] = await reposRes.json()
  let publicRepos = repos.length
  let followers = 0
  if (userRes.ok) {
    const user = await userRes.json()
    publicRepos = user.public_repos ?? repos.length
    followers = user.followers ?? 0
  }

  return { repos, publicRepos, followers, pinned: graphQL.pinned, totalContributions: graphQL.totalContributions }
}

export function emptyGitHubData() {
  return {
    user: null,
    repos: [],
    pinned: [],
    languages: [],
    totalStars: 0,
    totalContributions: 0,
    lastFetched: new Date().toISOString(),
  }
}