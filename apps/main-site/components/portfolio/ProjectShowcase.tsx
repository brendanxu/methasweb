'use client'

import { useState } from 'react'
import { Button } from "@repo/ui"
import Image from 'next/image'
import Link from 'next/link'
import { CaseStudy } from '../../lib/types'

interface ProjectShowcaseProps {
  projects: CaseStudy[]
  title?: string
  description?: string
  showFilters?: boolean
  limit?: number
  columns?: 2 | 3 | 4
}

export default function ProjectShowcase({ 
  projects, 
  title = "Featured Projects",
  description = "Discover our latest climate action initiatives and success stories.",
  showFilters = false,
  limit,
  columns = 3
}: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Get unique industries if filters are enabled
  const industries = showFilters ? Array.from(new Set(projects.map(p => p.relatedIndustry.name))).sort() : []
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.relatedIndustry.name === activeFilter)
  
  // Apply limit if specified
  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects
  
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-h2 text-dark mb-4">{title}</h2>
          <p className="text-gray max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Filters */}
        {showFilters && industries.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={activeFilter === industry ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {displayProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-secondary px-3 py-1 text-xs font-medium text-white rounded-full">
                    {project.relatedIndustry.name}
                  </span>
                </div>

                {/* View Project Button (appears on hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/work/${project.slug}`}>
                      View Project
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  <Link href={`/work/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="text-gray text-sm line-clamp-3 mb-4">
                  {project.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray font-medium">
                    Client: {project.clientName}
                  </span>
                  <Link 
                    href={`/work/${project.slug}`}
                    className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displayProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray">
              No projects match the selected filter.
            </p>
          </div>
        )}

        {/* View All Button */}
        {limit && filteredProjects.length > limit && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/work">
                View All Projects ({filteredProjects.length})
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}