// import { Button, Card } from "@repo/ui"
import { getCaseStudies, getCompanyStats } from "../../lib/api"
import { Suspense } from 'react'
import FilterablePortfolio from '@/components/portfolio/FilterablePortfolio'

async function WorkHero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-h1 text-white mb-6">Our Work</h1>
          <p className="text-lead text-white/90 max-w-3xl mx-auto">
            Discover how we&apos;ve helped organizations around the world achieve their climate goals 
            through innovative solutions and strategic partnerships.
          </p>
        </div>
      </div>
    </section>
  )
}

async function CaseStudiesGrid() {
  const caseStudies = await getCaseStudies()

  return (
    <Suspense fallback={
      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <FilterablePortfolio caseStudies={caseStudies} />
    </Suspense>
  )
}

async function StatsSection() {
  try {
    const stats = await getCompanyStats()
    
    // Filter stats relevant to portfolio/work page
    const portfolioStats = stats.filter(stat => 
      stat.label.toLowerCase().includes('project') ||
      stat.label.toLowerCase().includes('impact') ||
      stat.label.toLowerCase().includes('client') ||
      stat.label.toLowerCase().includes('solution') ||
      stat.label.toLowerCase().includes('co2') ||
      stat.label.toLowerCase().includes('carbon')
    ).slice(0, 4)

    // Fallback stats if no relevant stats found in API
    const fallbackStats = [
      { value: "500+", label: "Projects Delivered", description: "Climate projects completed worldwide" },
      { value: "50M+", label: "Tonnes CO₂ Avoided", description: "Total carbon impact achieved" },
      { value: "100+", label: "Countries Served", description: "Global reach and presence" },
      { value: "15+", label: "Years Experience", description: "Leading climate action" }
    ]

    const displayStats = portfolioStats.length >= 4 ? portfolioStats : fallbackStats

    return (
      <section className="py-16 lg:py-24 bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-dark mb-4">Our Impact</h2>
            <p className="text-lead text-gray max-w-2xl mx-auto">
              Measurable results from our climate action initiatives worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray font-medium mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-sm text-gray/70">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading stats:', error)
    
    // Fallback stats on error
    const fallbackStats = [
      { value: "500+", label: "Projects Delivered" },
      { value: "50M+", label: "Tonnes CO₂ Avoided" },
      { value: "100+", label: "Countries Served" },
      { value: "15+", label: "Years Experience" }
    ]

    return (
      <section className="py-16 lg:py-24 bg-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-dark mb-4">Our Impact</h2>
            <p className="text-lead text-gray max-w-2xl mx-auto">
              Measurable results from our climate action initiatives worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {fallbackStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export const metadata = {
  title: 'Our Work | Climate Solutions Case Studies | South Pole',
  description: 'Explore our portfolio of climate action projects and case studies. See how we\'ve helped organizations worldwide achieve their sustainability and net-zero goals.',
  openGraph: {
    title: 'Our Work | Climate Solutions Case Studies | South Pole',
    description: 'Explore our portfolio of climate action projects and case studies. See how we\'ve helped organizations worldwide achieve their sustainability and net-zero goals.',
    type: 'website',
  },
}

export default async function WorkPage() {
  return (
    <div>
      <WorkHero />
      <CaseStudiesGrid />
      <StatsSection />
    </div>
  )
}