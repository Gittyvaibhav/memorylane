import React, { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch, placeholder = 'Search files, receipts, screenshots...' }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!q) return
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="search-bar">
      <div className="search-icon" aria-hidden="true">
        <Search size={18} />
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  )
}
