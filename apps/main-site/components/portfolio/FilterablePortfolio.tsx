'use client'

import { useState, useMemo } from 'react'
import { Button, Card } from "@repo/ui"
import { CaseStudy } from '../../lib/types'

interface FilterablePortfolioProps {
  caseStudies: CaseStudy[]
}

export default function FilterablePortfolio({ caseStudies }: FilterablePortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(9)

  // Get unique industries for filters
  const industries = useMemo(() => {
    const uniqueIndustries = new Set(caseStudies.map(study => study.relatedIndustry.name))
    return Array.from(uniqueIndustries).sort()
  }, [caseStudies])

  // Filter case studies based on active filter
  const filteredCaseStudies = useMemo(() => {
    if (activeFilter === 'all') {
      return caseStudies
    }
    return caseStudies.filter(study => study.relatedIndustry.name === activeFilter)
  }, [caseStudies, activeFilter])

  // Get visible case studies based on pagination
  const visibleCaseStudies = filteredCaseStudies.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCaseStudies.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setVisibleCount(9) // Reset visible count when filter changes
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-h2 text-dark mb-4">Case Studies</h2>
          <p className="text-gray max-w-2xl mx-auto">
            Real-world examples of climate action and sustainability transformation across industries.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('all')}
          >
            All ({caseStudies.length})
          </Button>
          {industries.map((industry) => {
            const count = caseStudies.filter(study => study.relatedIndustry.name === industry).length
            return (
              <Button
                key={industry}
                variant={activeFilter === industry ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(industry)}
              >
                {industry} ({count})
              </Button>
            )
          })}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray">
            Showing {visibleCaseStudies.length} of {filteredCaseStudies.length} case studies
            {activeFilter !== 'all' && ` in ${activeFilter}`}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleCaseStudies.map((study, index) => (
            <div 
              key={study.id}
              className="opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <Card
                imageUrl={study.heroImage}
                category={study.relatedIndustry.name}
                title={study.title}
                description={study.summary}
                href={`/work/${study.slug}`}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No case studies found
            </h3>
            <p className="text-gray">
              No case studies match the selected filter. Try selecting a different industry.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={handleLoadMore}>
              Load More Case Studies
            </Button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}