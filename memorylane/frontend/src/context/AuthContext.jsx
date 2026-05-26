import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axiosInstance'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // try to fetch profile
      api.get('/auth/me').then(res => {
        if (res?.data?.success) setUser(res.data.data.user)
      }).catch(() => {
        // ignore — user stays null
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    if (res?.data?.success && res.data?.data?.token) {
      const token = res.data.data.token
      localStorage.setItem('token', token)
      // fetch profile
      try {
        const me = await api.get('/auth/me')
        if (me?.data?.success) setUser(me.data.data.user)
      } catch (e) {
        setUser({ email })
      }
      return { success: true }
    }
    return { success: false, message: res?.data?.message }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
