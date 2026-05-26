import { useState } from 'react'
import api from '../api/axiosInstance'

/**
 * Hook to perform search requests to the backend
 * @returns {{ results: any[], loading: boolean, error: string|null, search: (q: string, opts?: object) => Promise<void> }}
 */
export default function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async (q, opts = {}) => {
    setLoading(true)
    setError(null)
    try {
      const params = { q, ...opts }
      const res = await api.get('/search', { params })
      if (res?.data?.success) {
        setResults(res.data.data.results || [])
      } else {
        setError(res?.data?.message || 'Search failed')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, search }
}
