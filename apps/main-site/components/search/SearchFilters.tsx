'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface SearchFiltersProps {
  currentType: string
  currentCategory: string
  currentLocation: string
  query: string
}

export default function SearchFilters({ 
  currentType, 
  currentCategory, 
  currentLocation, 
  query 
}: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to first page
    router.push(`/search?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    router.push(`/search?${params.toString()}`)
  }

  const hasActiveFilters = currentType !== 'all' || currentCategory || currentLocation

  const contentTypes = [
    { value: 'all', label: 'All Content', count: null },
    { value: 'services', label: 'Services', count: 6 },
    { value: 'case-studies', label: 'Case Studies', count: 150 },
    { value: 'news', label: 'News & Insights', count: 300 },
    { value: 'team', label: 'Team Members', count: 800 },
    { value: 'locations', label: 'Locations', count: 20 }
  ]

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'carbon-markets', label: 'Carbon Markets' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'forest-conservation', label: 'Forest Conservation' },
    { value: 'climate-finance', label: 'Climate Finance' },
    { value: 'sustainability', label: 'Sustainability' },
    { value: 'technology', label: 'Technology' }
  ]

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia-Pacific' },
    { value: 'americas', label: 'Americas' },
    { value: 'africa', label: 'Africa' },
    { value: 'global', label: 'Global' }
  ]

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Content Type Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Content Type</h4>
        <div className="space-y-2">
          {contentTypes.map((type) => (
            <label key={type.value} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="contentType"
                  value={type.value}
                  checked={currentType === type.value}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                  {type.label}
                </span>
              </div>
              {type.count && (
                <span className="text-xs text-gray-500">
                  {type.count}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Category</h4>
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Location</h4>
        <select
          value={currentLocation}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('type', 'case-studies')}
            className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
          >
            Browse Case Studies
          </button>
          <button
            onClick={() => updateFilter('type', 'news')}
            className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
          >
            Latest News
          </button>
          <button
            onClick={() => updateFilter('type', 'services')}
            className="w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
          >
            Our Services
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
        <p className="text-sm text-gray-600 mb-3">
          Can't find what you're looking for? Our team is here to help.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Contact Support
          <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}