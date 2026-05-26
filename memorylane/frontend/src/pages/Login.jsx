import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
        </div>
      </form>
    </div>
  )
}
