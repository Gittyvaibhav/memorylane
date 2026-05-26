import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import FileCard from '../components/FileCard'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [params] = useSearchParams()
  const qParam = params.get('q') || ''
  const { results, loading, error, search } = useSearch()
  const { user } = useAuth()

  useEffect(() => {
    if (qParam) search(qParam)
  }, [qParam, search])

  return (
    <div className="dashboard-layout">
      <section className="dashboard-panel">
        <div className="dashboard-headline">
          <div>
            <h1 className="dashboard-title">Search your memory index</h1>
            <p className="dashboard-subtitle">
              {user ? `Signed in as ${user.email}` : 'Use the query bar below to search indexed files.'}
            </p>
          </div>
          <div className="nav-pill">Private index</div>
        </div>

        <SearchBar onSearch={search} placeholder="Search your files, screenshots, and receipts..." />

        <div className="result-toolbar">
          <span>{loading ? 'Searching...' : `${results.length} results`}</span>
          <span>{qParam ? `Query: ${qParam}` : 'Try a phrase you remember from a file'}</span>
        </div>

        {error && <div className="error-banner">{error}</div>}
        {!loading && results?.length === 0 && <div className="empty-state">No results yet. Try a broader search or check that the indexer has processed files.</div>}

        <div className="results-grid">
          {results.map((f) => (
            <FileCard key={f._id || f.filePath} file={f} />
          ))}
        </div>
      </section>

      <aside className="auth-side">
        <div className="panel-card">
          <h2 className="panel-title">How search works</h2>
          <p className="panel-text">
            Files are extracted, indexed into Meilisearch, and returned here as ranked matches. Use a phrase, a keyword, or a file title.
          </p>
        </div>
        <div className="panel-card">
          <h2 className="panel-title">Suggested queries</h2>
          <div className="tag-row">
            <span className="tag">invoice</span>
            <span className="tag">receipt</span>
            <span className="tag">meeting notes</span>
            <span className="tag">screenshot</span>
          </div>
        </div>
        <div className="panel-card">
          <h2 className="panel-title">Security</h2>
          <p className="panel-text">Search requests go through the backend with JWT auth. Your content stays in your own stack.</p>
        </div>
      </aside>
    </div>
  )
}
