import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/auth/register', { email, password })
      if (res?.data?.success && res.data?.data?.token) {
        localStorage.setItem('token', res.data.data.token)
        navigate('/dashboard')
      } else {
        setError(res?.data?.message || 'Registration failed')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="auth-layout">
      <section className="hero-copy">
        <div className="eyebrow">
          <Sparkles size={16} />
          Create your MemoryLane account
        </div>
        <h1 className="hero-title">Set up your private search workspace.</h1>
        <p className="hero-lead">
          Register once and use the dashboard to search your saved files, receipts, images, and notes across your own device.
        </p>

        <div className="hero-panel" style={{ marginTop: '1.5rem' }}>
          <div className="panel-card">
            <h2 className="panel-title">After registration</h2>
            <p className="panel-text">You&apos;ll land in the dashboard and can start searching immediately.</p>
          </div>
          <div className="panel-card">
            <h2 className="panel-title">Stored securely</h2>
            <p className="panel-text">Your credentials are hashed and your access token stays in the browser session.</p>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <h2>Create account</h2>
        <p>Register to start indexing and searching your files.</p>
        <form onSubmit={submit} className="auth-form">
          <label className="field-stack">
            <span className="field-label">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="field-input" />
          </label>
          <label className="field-stack">
            <span className="field-label">Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Choose a strong password" className="field-input" />
          </label>
          {error && <div className="error-banner">{error}</div>}
          <button className="auth-submit" type="submit">
            Register <ArrowRight size={16} />
          </button>
        </form>
      </section>
    </div>
  )
}
