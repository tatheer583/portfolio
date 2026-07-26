import 'server-only'

/**
 * Lightweight cache with optional Vercel KV / Upstash Redis REST support.
 * Falls back to in-memory storage when KV env vars are absent.
 */

type CacheValue = unknown

const memory = new Map<string, { value: CacheValue; expires: number }>()

function kvConfig() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN
  if (!url || !token) return null
  return { url: url.replace(/\/$/, ''), token }
}

export async function getCache(key: string): Promise<CacheValue | null> {
  const hit = memory.get(key)
  if (hit && hit.expires > Date.now()) return hit.value

  const kv = kvConfig()
  if (!kv) return null

  try {
    const res = await fetch(`${kv.url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    if (!data?.result) return null
    return typeof data.result === 'string' ? JSON.parse(data.result) : data.result
  } catch {
    return null
  }
}

export async function setCache(key: string, value: CacheValue, ttlSeconds = 3600): Promise<void> {
  memory.set(key, { value, expires: Date.now() + ttlSeconds * 1000 })

  const kv = kvConfig()
  if (!kv || !process.env.KV_REST_API_TOKEN) return

  try {
    await fetch(`${kv.url}/setex/${encodeURIComponent(key)}/${ttlSeconds}/${encodeURIComponent(JSON.stringify(value))}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
      cache: 'no-store',
    })
  } catch {
    // Memory cache is already populated, so KV failures should not break rendering.
  }
}