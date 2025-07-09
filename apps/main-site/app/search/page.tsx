import { Suspense } from 'react'
import SearchInterface from '@/components/search/SearchInterface'
import SearchResults from '@/components/search/SearchResults'
import SearchFilters from '@/components/search/SearchFilters'
import { performSearch } from '@/lib/api'

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    category?: string
    location?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const type = params.type || 'all'
  const category = params.category || ''
  const location = params.location || ''
  const page = parseInt(params.page || '1')

  const searchResults = query ? await performSearch({
    query,
    type,
    category,
    location,
    page,
    limit: 12
  }) : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Search Our Content
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find climate solutions, case studies, news, and insights from our global expertise.
            </p>
          </div>
          
          <SearchInterface 
            initialQuery={query}
            initialType={type}
            initialCategory={category}
            initialLocation={location}
          />
        </div>
      </section>

      {/* Search Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters 
              currentType={type}
              currentCategory={category}
              currentLocation={location}
              query={query}
            />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            <Suspense fallback={
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            }>
              <SearchResults 
                results={searchResults}
                query={query}
                currentPage={page}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  
  return {
    title: query ? `Search Results for "${query}" | 碳智METHAS` : 'Search | 碳智METHAS',
    description: 'Search through 碳智METHAS\'s climate solutions, case studies, news, and insights to find the information you need.',
  }
}