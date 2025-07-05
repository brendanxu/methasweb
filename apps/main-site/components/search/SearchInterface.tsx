'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchInterfaceProps {
  initialQuery: string
  initialType: string
  initialCategory: string
  initialLocation: string
}

export default function SearchInterface({ 
  initialQuery, 
  initialType, 
  initialCategory, 
  initialLocation 
}: SearchInterfaceProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', query.trim())
    params.delete('page') // Reset to first page
    
    router.push(`/search?${params.toString()}`)
    setTimeout(() => setIsSearching(false), 500)
  }

  const handleQuickSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', searchQuery)
    params.delete('page')
    router.push(`/search?${params.toString()}`)
  }

  const quickSearches = [
    'Carbon offsetting',
    'Net zero strategy',
    'Renewable energy',
    'Forest conservation',
    'Climate finance',
    'Sustainability consulting'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for climate solutions, case studies, news..."
            className="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      {!initialQuery && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-4">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleQuickSearch(suggestion)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Stats */}
      {initialQuery && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Search results for "{initialQuery}"
              </h3>
              <p className="text-sm text-gray-600">
                Showing results across all content types
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setQuery('')
                  router.push('/search')
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Clear search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {!initialQuery && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What you can search:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Climate solutions and services</li>
                <li>• Case studies and success stories</li>
                <li>• News articles and insights</li>
                <li>• Team members and experts</li>
                <li>• Office locations worldwide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Search examples:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "carbon offsetting projects"</li>
                <li>• "renewable energy solutions"</li>
                <li>• "net zero strategy consulting"</li>
                <li>• "forest conservation Brazil"</li>
                <li>• "climate finance Asia"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}