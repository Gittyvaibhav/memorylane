import meiliClient from '../config/meilisearch.js'
import redis from '../config/redis.js'
import SearchLog from '../models/SearchLog.model.js'

const INDEX_NAME = 'files'

/**
 * Perform a search against Meilisearch, cache in Redis, and log the query
 * @param {string} q
 * @param {object} opts
 */
export async function search(q, opts = {}) {
  const cacheKey = `search:${q}:${JSON.stringify(opts)}`
  try {
    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached)
  } catch (e) {}

  const index = meiliClient.index(INDEX_NAME)
  const res = await index.search(q, { limit: 10, attributesToHighlight: ['extractedText'] })

  const results = (res.hits || []).map(h => ({ ...h }))

  // cache for 5 minutes
  try { await redis.setex(cacheKey, 300, JSON.stringify(results)) } catch (e) {}

  // log (no user context here)
  try { await SearchLog.create({ query: q, resultCount: results.length }) } catch (e) {}

  return results
}
