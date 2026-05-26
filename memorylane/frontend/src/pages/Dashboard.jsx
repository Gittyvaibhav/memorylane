import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import FileCard from '../components/FileCard'

export default function Dashboard() {
  const [params] = useSearchParams()
  const qParam = params.get('q') || ''
  const { results, loading, error, search } = useSearch()

  useEffect(() => {
    if (qParam) search(qParam)
  }, [qParam])

  return (
    <div className="space-y-6">
      <div className="max-w-2xl">
        <SearchBar onSearch={search} placeholder="Search your files..." />
      </div>

      <div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && results?.length === 0 && <div className="text-gray-600">No results</div>}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {results.map((f) => (
            <FileCard key={f._id || f.filePath} file={f} />
          ))}
        </div>
      </div>
    </div>
  )
}
