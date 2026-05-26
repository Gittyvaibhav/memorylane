import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Sparkles } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="brand" aria-label="MemoryLane home">
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>MemoryLane</span>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          {!user ? (
            <Link to="/login" className="nav-link active">Login</Link>
          ) : (
            <div className="nav-user">
              <span className="nav-pill">Signed in</span>
              <span className="nav-user-email">{user.email}</span>
              <button onClick={handleLogout} className="nav-button" type="button" aria-label="Logout">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
