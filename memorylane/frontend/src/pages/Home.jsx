import React from 'react'
import SearchBar from '../components/SearchBar'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const onSearch = (q) => {
    navigate(`/dashboard?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="hero">
      <section className="hero-copy">
        <div className="eyebrow">
          <Sparkles size={16} />
          {user ? 'Welcome back' : 'Sign in first, then search everything'}
        </div>

        <h1 className="hero-title">Find anything you&apos;ve ever saved instantly.</h1>
        <p className="hero-lead">
          MemoryLane turns your device into a searchable memory layer. Sign in, connect your folders, and search screenshots,
          PDFs, notes, and receipts with natural language.
        </p>

        <div className="hero-actions">
          {user ? (
            <button className="primary-button" onClick={() => navigate('/dashboard')} type="button">
              Open dashboard <ArrowRight size={16} />
            </button>
          ) : (
            <>
              <button className="primary-button" onClick={() => navigate('/login')} type="button">
                Login to continue <Lock size={16} />
              </button>
              <button className="ghost-button" onClick={() => navigate('/register')} type="button">
                Create account
              </button>
            </>
          )}
        </div>

        <div className="hero-metrics">
          <div className="metric">
            <span className="metric-value">OCR + PDF</span>
            <span className="metric-label">Reads images and documents</span>
          </div>
          <div className="metric">
            <span className="metric-value">Meilisearch</span>
            <span className="metric-label">Fast natural-language search</span>
          </div>
          <div className="metric">
            <span className="metric-value">MongoDB</span>
            <span className="metric-label">Stores files and activity logs</span>
          </div>
        </div>

        <div className="search-panel">
          <SearchBar onSearch={onSearch} />
        </div>
      </section>

      <aside className="hero-panel">
        <div className="panel-card">
          <h2 className="panel-title">What it does</h2>
          <p className="panel-text">
            Watches folders, extracts text, indexes content, and gives you a single place to search across your saved files.
          </p>
        </div>
        <div className="panel-card">
          <h2 className="panel-title">Best first step</h2>
          <p className="panel-text">
            Login, then go to the dashboard and type a phrase you remember from a file. MemoryLane will surface matching results.
          </p>
        </div>
        <div className="panel-card">
          <h2 className="panel-title">Connected stack</h2>
          <p className="panel-text">
            React frontend, Express API, MongoDB, Redis, Meilisearch, and file extraction services working together.
          </p>
        </div>
      </aside>
    </div>
  )
}
