import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRight, Shield, Sparkles } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await login(email, password)
      if (res?.success) {
        navigate(from, { replace: true })
      } else {
        setError(res?.message || 'Login failed')
      }
    } catch (err) {
      setError(err?.message || 'Network error')
    }
  }

  return (
    <div className="auth-layout">
      <section className="hero-copy">
        <div className="eyebrow">
          <Sparkles size={16} />
          Secure access to your memory index
        </div>
        <h1 className="hero-title">Sign in to search your files.</h1>
        <p className="hero-lead">
          MemoryLane helps you find screenshots, receipts, PDFs, and notes after login so your personal archive stays private.
        </p>

        <div className="hero-actions">
          <button className="ghost-button" type="button" onClick={() => navigate('/register')}>
            Create an account <ArrowRight size={16} />
          </button>
        </div>

        <div className="hero-panel" style={{ marginTop: '1.5rem' }}>
          <div className="panel-card">
            <h2 className="panel-title">Why login first?</h2>
            <p className="panel-text">
              Search results, folder access, and activity logs are tied to your account. Sign in once and keep your index synced.
            </p>
          </div>
          <div className="panel-card">
            <h2 className="panel-title">Privacy by design</h2>
            <p className="panel-text">
              Passwords are hashed, API requests are authenticated with JWT, and your data lives in your own stack.
            </p>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <h2>Welcome back</h2>
        <p>Sign in to open your dashboard and search instantly.</p>
        <form onSubmit={submit} className="auth-form">
          <label className="field-stack">
            <span className="field-label">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="field-input" />
          </label>
          <label className="field-stack">
            <span className="field-label">Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Your password" className="field-input" />
          </label>
          {error && <div className="error-banner">{error}</div>}
          <button className="auth-submit" type="submit">
            Sign in <ArrowRight size={16} />
          </button>
        </form>
      </section>
    </div>
  )
}
