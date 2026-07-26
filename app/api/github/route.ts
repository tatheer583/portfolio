import { NextResponse } from 'next/server'
import { getCache, setCache } from '@/lib/kv'
import { fetchGitHubFromApi, emptyGitHubData } from '@/lib/github'
import { SITE } from '@/lib/constants'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export async function GET() {
  const cacheKey = `github-data:${SITE.githubUsername}`
  const cached = await getCache(cacheKey)
  if (cached) return NextResponse.json(cached)

  try {
    const { repos, publicRepos, followers, pinned, totalContributions } = await fetchGitHubFromApi()

    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    const languages: Record<string, number> = {}
    for (const r of repos) {
      if (r.language) languages[r.language] = (languages[r.language] || 0) + 1
    }
    const languageBreakdown = Object.entries(languages)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const normalizedRepos = repos.slice(0, 12).map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      topics: r.topics,
      updatedAt: r.updated_at,
      htmlUrl: r.html_url,
    }))

    const data = {
      user: { login: SITE.githubUsername, publicRepos, followers },
      repos: normalizedRepos,
      pinned,
      languages: languageBreakdown,
      totalStars,
      totalContributions,
      lastFetched: new Date().toISOString(),
    }

    await setCache(cacheKey, data, 3600)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(emptyGitHubData())
  }
}