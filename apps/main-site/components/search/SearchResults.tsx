'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchResult {
  id: string
  type: 'service' | 'case-study' | 'news' | 'team' | 'location'
  title: string
  excerpt: string
  url: string
  metadata?: {
    date?: string
    author?: string
    category?: string
    location?: string
    department?: string
  }
  imageUrl?: string
}

interface SearchResultsData {
  results: SearchResult[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

interface SearchResultsProps {
  results: SearchResultsData | null
  query: string
  currentPage: number
}

export default function SearchResults({ results, query, currentPage }: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`/search?${params.toString()}`)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'case-study':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'news':
        return (
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        )
      case 'team':
        return (
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'location':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'service': return 'Service'
      case 'case-study': return 'Case Study'
      case 'news': return 'News'
      case 'team': return 'Team'
      case 'location': return 'Location'
      default: return 'Content'
    }
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Start your search
        </h3>
        <p className="text-gray-600">
          Enter keywords to search through our climate solutions, case studies, and content.
        </p>
      </div>
    )
  }

  if (!results || results.results.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No results found
        </h3>
        <p className="text-gray-600 mb-4">
          We couldn't find any content matching "{query}". Try adjusting your search terms or filters.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Suggestions:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try broader keywords</li>
            <li>• Remove some filters</li>
            <li>• Search for related terms</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {results.total.toLocaleString()} results found
          </h2>
          <p className="text-sm text-gray-600">
            Page {currentPage} of {results.totalPages}
          </p>
        </div>
        
        {/* Sort Options */}
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="relevance">Sort by relevance</option>
          <option value="date">Sort by date</option>
          <option value="title">Sort by title</option>
        </select>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {results.results.map((result) => (
          <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Type Icon */}
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(result.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Type and Metadata */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getTypeLabel(result.type)}
                  </span>
                  
                  {result.metadata?.category && (
                    <span className="text-xs text-gray-500">
                      in {result.metadata.category}
                    </span>
                  )}
                  
                  {result.metadata?.date && (
                    <span className="text-xs text-gray-500">
                      • {new Date(result.metadata.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <Link href={result.url} className="hover:text-blue-600 transition-colors">
                    {result.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {result.excerpt}
                </p>

                {/* Additional Metadata */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {result.metadata?.author && (
                    <span>By {result.metadata.author}</span>
                  )}
                  {result.metadata?.location && (
                    <span>📍 {result.metadata.location}</span>
                  )}
                  {result.metadata?.department && (
                    <span>🏢 {result.metadata.department}</span>
                  )}
                  
                  <Link 
                    href={result.url}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View details →
                  </Link>
                </div>
              </div>

              {/* Image */}
              {result.imageUrl && (
                <div className="flex-shrink-0 hidden sm:block">
                  <img 
                    src={result.imageUrl}
                    alt={result.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {results.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * 12) + 1} to {Math.min(currentPage * 12, results.total)} of {results.total} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, results.totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(results.totalPages - 4, currentPage - 2)) + i
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= results.totalPages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}