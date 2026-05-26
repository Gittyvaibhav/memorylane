import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">MemoryLane</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-sm text-gray-600">Home</Link>
          <Link to="/dashboard" className="text-sm text-gray-600">Dashboard</Link>
          {!user ? (
            <Link to="/login" className="text-sm text-blue-600">Login</Link>
          ) : (
            <>
              <span className="text-sm text-gray-700">{user.email}</span>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
