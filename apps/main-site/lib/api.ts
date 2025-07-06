import { mockCaseStudies, mockNewsArticles } from './mock-data'
import { umbracoClient } from './umbraco-client'
import type { CaseStudy, NewsArticle, AboutPageData, TeamMember, OfficeLocation, CompanyStat, Service, SearchParams, SearchResultsData, SearchResult } from './types'

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    return await umbracoClient.getCaseStudies()
  } catch (error) {
    console.error('Error fetching case studies from Umbraco:', error)
    // Return mock data as fallback
    return mockCaseStudies
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    return await umbracoClient.getCaseStudy(slug)
  } catch (error) {
    console.error('Error fetching case study from Umbraco:', error)
    // Return mock data as fallback
    return mockCaseStudies.find(cs => cs.slug === slug) || null
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    return await umbracoClient.getNewsArticles()
  } catch (error) {
    console.error('Error fetching news articles from Umbraco:', error)
    // Return mock data as fallback
    return mockNewsArticles
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    return await umbracoClient.getNewsArticle(slug)
  } catch (error) {
    console.error('Error fetching news article from Umbraco:', error)
    // Return mock data as fallback
    return mockNewsArticles.find(article => article.slug === slug) || null
  }
}

export async function getLatestCaseStudies(limit: number = 3): Promise<CaseStudy[]> {
  const caseStudies = await getCaseStudies()
  return caseStudies.slice(0, limit)
}

export async function getLatestNews(limit: number = 4): Promise<NewsArticle[]> {
  const news = await getNewsArticles()
  return news.slice(0, limit)
}

// About Page API Functions
export async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const [stats, leadership, locations] = await Promise.all([
      umbracoClient.getCompanyStats(),
      umbracoClient.getLeadershipTeam(),
      umbracoClient.getOfficeLocations()
    ])
    
    return {
      sections: {}, // Will be populated from company info
      stats: stats || [],
      leadership: leadership || [],
      locations: locations || [],
      meta: {
        lastUpdated: new Date(),
        totalSections: 0,
        totalStats: stats?.length || 0,
        totalLeadership: leadership?.length || 0,
        totalLocations: locations?.length || 0
      }
    }
  } catch (error) {
    console.error('Error fetching about page data:', error)
    // Return fallback data
    return {
      sections: {},
      stats: [],
      leadership: [],
      locations: [],
      meta: {
        lastUpdated: new Date(),
        totalSections: 0,
        totalStats: 0,
        totalLeadership: 0,
        totalLocations: 0
      }
    }
  }
}

export async function getTeamMembers(isLeadership?: boolean): Promise<TeamMember[]> {
  try {
    return isLeadership 
      ? await umbracoClient.getLeadershipTeam()
      : await umbracoClient.getTeamMembers()
  } catch (error) {
    console.error('Error fetching team members from Umbraco:', error)
    return []
  }
}

export async function getOfficeLocations(): Promise<OfficeLocation[]> {
  try {
    return await umbracoClient.getOfficeLocations()
  } catch (error) {
    console.error('Error fetching office locations from Umbraco:', error)
    return []
  }
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  try {
    return await umbracoClient.getCompanyStats()
  } catch (error) {
    console.error('Error fetching company stats from Umbraco:', error)
    return []
  }
}

// Contact Page API Functions
export async function getContactPageData(): Promise<{ locations: OfficeLocation[] }> {
  try {
    const locations = await umbracoClient.getOfficeLocations()
    return { locations: locations || [] }
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    
    // Return fallback data
    return { locations: [] }
  }
}

export async function submitContactForm(formData: any) {
  try {
    // For now, return a success response
    // This would need to be implemented in Umbraco or handled by a separate service
    console.log('Contact form submitted:', formData)
    return { success: true, message: 'Form submitted successfully' }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

// Services API Functions
export async function getServicesPageData(): Promise<{ services: Service[], solutions: any[] }> {
  try {
    const services = await umbracoClient.getServices()
    return { 
      services: services || [], 
      solutions: [] // Solutions not implemented yet
    }
  } catch (error) {
    console.error('Error fetching services data from Umbraco:', error)
    
    // Return fallback data
    return { 
      services: [], 
      solutions: []
    }
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await umbracoClient.getService(slug)
  } catch (error) {
    console.error('Error fetching service from Umbraco:', error)
    
    // Return fallback data for common services
    const fallbackServices: Record<string, Service> = {
      'carbon-offsetting': {
        id: '1',
        name: 'Carbon Offsetting',
        slug: 'carbon-offsetting',
        description: 'High-quality carbon credits and offset solutions to neutralize your unavoidable emissions.',
        fullDescription: 'Our carbon offsetting solutions help organizations neutralize their unavoidable emissions through high-quality, verified carbon credits. We offer a diverse portfolio of projects including renewable energy, forest conservation, and community development initiatives.',
        benefits: [
          'Immediate climate impact',
          'Portfolio diversification',
          'Co-benefits for communities',
          'Transparent reporting'
        ],
        features: [
          {
            id: '1',
            title: 'Verified Credits',
            description: 'All credits are verified to international standards'
          }
        ],
        process: [
          {
            id: '1',
            step: 1,
            title: 'Assessment',
            description: 'Calculate your carbon footprint'
          }
        ]
      }
    }
    
    return fallbackServices[slug] || null
  }
}

// Team API Functions
export async function getTeamPageData(): Promise<{ 
  stats: CompanyStat[], 
  leadership: TeamMember[], 
  departments: any[] 
}> {
  try {
    const [stats, leadership] = await Promise.all([
      umbracoClient.getCompanyStats(),
      umbracoClient.getLeadershipTeam()
    ])
    
    return { 
      stats: stats || [],
      leadership: leadership || [],
      departments: [] // Will be populated later when departments API is available
    }
  } catch (error) {
    console.error('Error fetching team page data from Umbraco:', error)
    
    // Return fallback data
    return { 
      stats: [],
      leadership: [],
      departments: []
    }
  }
}

// Homepage API Functions
export async function getHomepageData(): Promise<{
  services: Service[]
}> {
  try {
    const services = await umbracoClient.getServices()
    
    return { 
      services: services || []
    }
  } catch (error) {
    console.error('Error fetching homepage data from Umbraco:', error)
    
    // Return fallback data
    return { 
      services: []
    }
  }
}

// Search API Functions
export async function performSearch(params: SearchParams): Promise<SearchResultsData> {
  const { query, type = 'all', category, location, page = 1, limit = 12 } = params
  
  try {
    // For now, we'll search through our existing data
    // In production, this would call a dedicated search API endpoint
    const searchResults: SearchResult[] = []
    
    // Search through services
    if (type === 'all' || type === 'services') {
      try {
        const services = await umbracoClient.getServices()
        
        services.forEach((service: Service) => {
          if (
            service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()) ||
            service.fullDescription?.toLowerCase().includes(query.toLowerCase())
          ) {
            searchResults.push({
              id: service.id,
              type: 'service',
              title: service.name,
              excerpt: service.description,
              url: `/what-we-do/${service.slug}`,
              metadata: {
                category: service.slug
              }
            })
          }
        })
      } catch (error) {
        console.error('Error searching services:', error)
      }
    }
    
    // Search through case studies
    if (type === 'all' || type === 'case-studies') {
      const caseStudies = await getCaseStudies()
      caseStudies.forEach((caseStudy) => {
        if (
          caseStudy.title.toLowerCase().includes(query.toLowerCase()) ||
          caseStudy.summary.toLowerCase().includes(query.toLowerCase()) ||
          caseStudy.clientName.toLowerCase().includes(query.toLowerCase())
        ) {
          searchResults.push({
            id: caseStudy.id,
            type: 'case-study',
            title: caseStudy.title,
            excerpt: caseStudy.summary,
            url: `/case-studies/${caseStudy.slug}`,
            imageUrl: caseStudy.heroImage,
            metadata: {
              date: caseStudy.createdAt,
              category: caseStudy.relatedIndustry?.name
            }
          })
        }
      })
    }
    
    // Search through news articles
    if (type === 'all' || type === 'news') {
      const newsArticles = await getNewsArticles()
      newsArticles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.summary.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase())
        ) {
          searchResults.push({
            id: article.id,
            type: 'news',
            title: article.title,
            excerpt: article.summary,
            url: `/news/${article.slug}`,
            imageUrl: article.heroImage,
            metadata: {
              date: article.publishDate,
              category: article.category?.name
            }
          })
        }
      })
    }
    
    // Search through team members
    if (type === 'all' || type === 'team') {
      try {
        const teamMembers = await getTeamMembers()
        teamMembers.forEach((member) => {
          if (
            member.name.toLowerCase().includes(query.toLowerCase()) ||
            member.title.toLowerCase().includes(query.toLowerCase()) ||
            member.department?.toLowerCase().includes(query.toLowerCase()) ||
            member.bio?.toLowerCase().includes(query.toLowerCase())
          ) {
            searchResults.push({
              id: member.id,
              type: 'team',
              title: member.name,
              excerpt: `${member.title}${member.department ? ` • ${member.department}` : ''}`,
              url: `/team#${member.id}`,
              imageUrl: member.imageUrl,
              metadata: {
                department: member.department,
                location: 'Global'
              }
            })
          }
        })
      } catch (error) {
        console.error('Error searching team members:', error)
      }
    }
    
    // Search through locations
    if (type === 'all' || type === 'locations') {
      try {
        const locations = await getOfficeLocations()
        locations.forEach((location) => {
          if (
            location.name.toLowerCase().includes(query.toLowerCase()) ||
            location.city.toLowerCase().includes(query.toLowerCase()) ||
            location.country.toLowerCase().includes(query.toLowerCase()) ||
            location.description?.toLowerCase().includes(query.toLowerCase())
          ) {
            searchResults.push({
              id: location.id,
              type: 'location',
              title: location.name,
              excerpt: `${location.city}, ${location.country}${location.description ? ` • ${location.description}` : ''}`,
              url: `/contact#${location.id}`,
              imageUrl: location.imageUrl,
              metadata: {
                location: `${location.city}, ${location.country}`
              }
            })
          }
        })
      } catch (error) {
        console.error('Error searching locations:', error)
      }
    }
    
    // Apply additional filters
    let filteredResults = searchResults
    
    if (category) {
      filteredResults = filteredResults.filter(result => 
        result.metadata?.category?.toLowerCase().includes(category.toLowerCase())
      )
    }
    
    if (location && location !== 'global') {
      filteredResults = filteredResults.filter(result => 
        result.metadata?.location?.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    // Sort by relevance (simple title match first, then content match)
    filteredResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
      return bTitle - aTitle
    })
    
    // Pagination
    const total = filteredResults.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedResults = filteredResults.slice(offset, offset + limit)
    
    return {
      results: paginatedResults,
      total,
      page,
      totalPages,
      hasMore: page < totalPages
    }
  } catch (error) {
    console.error('Error performing search:', error)
    
    // Return empty results on error
    return {
      results: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasMore: false
    }
  }
}