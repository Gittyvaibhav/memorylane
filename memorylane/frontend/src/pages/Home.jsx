import React from 'react'
import SearchBar from '../components/SearchBar'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const onSearch = (q) => {
    navigate(`/dashboard?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="space-y-6">
      <section className="text-center py-12">
        <h1 className="text-3xl font-bold">Find anything you've ever saved instantly.</h1>
        <p className="text-gray-600 mt-2">Search screenshots, PDFs, notes, and receipts with natural language.</p>
      </section>

      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  )
}
