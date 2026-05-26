import React, { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'Search files, receipts, screenshots...' }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!q) return
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border rounded px-3 py-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">Search</button>
    </form>
  )
}
