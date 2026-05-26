import React, { useState } from 'react'
import api from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex justify-end">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
