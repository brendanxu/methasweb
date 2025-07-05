import { mockCaseStudies, mockNewsArticles } from './mock-data'
import type { CaseStudy, NewsArticle, AboutPageData, TeamMember, OfficeLocation, CompanyStat, Service, SearchParams, SearchResultsData, SearchResult } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/case-studies`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch case studies')
    }
    
    const data = await response.json()
    
    // Transform API data to match our CaseStudy interface
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      heroImage: item.heroImageUrl,
      summary: item.summary,
      theGoal: item.theGoal,
      theChallenge: item.theChallenge,
      theSolution: item.theSolution,
      relatedServices: item.services || [],
      relatedIndustry: item.industry,
      createdAt: item.publishedAt || item.createdAt
    }))
  } catch (error) {
    console.error('Error fetching case studies:', error)
    // Return mock data as fallback
    return mockCaseStudies
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/case-studies/${slug}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch case study')
    }
    
    const data = await response.json()
    const item = data.data
    
    // Transform API data to match our CaseStudy interface
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      clientName: item.clientName,
      heroImage: item.heroImageUrl,
      summary: item.summary,
      theGoal: item.theGoal,
      theChallenge: item.theChallenge,
      theSolution: item.theSolution,
      relatedServices: item.services || [],
      relatedIndustry: item.industry,
      createdAt: item.publishedAt || item.createdAt
    }
  } catch (error) {
    console.error('Error fetching case study:', error)
    // Return mock data as fallback
    return mockCaseStudies.find(cs => cs.slug === slug) || null
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch news articles')
    }
    
    const data = await response.json()
    
    // Transform API data to match our NewsArticle interface
    return data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishDate: item.publishedAt || item.createdAt,
      heroImage: item.featuredImageUrl,
      content: item.content,
      category: item.category,
      summary: item.excerpt
    }))
  } catch (error) {
    console.error('Error fetching news articles:', error)
    // Return mock data as fallback
    return mockNewsArticles
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${slug}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch news article')
    }
    
    const data = await response.json()
    const item = data.data
    
    // Transform API data to match our NewsArticle interface
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishDate: item.publishedAt || item.createdAt,
      heroImage: item.featuredImageUrl,
      content: item.content,
      category: item.category,
      summary: item.excerpt
    }
  } catch (error) {
    console.error('Error fetching news article:', error)
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
    const response = await fetch(`${API_BASE_URL}/company/about`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch about page data')
    }
    
    const data = await response.json()
    return data.data
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
    const url = isLeadership 
      ? `${API_BASE_URL}/team/leadership`
      : `${API_BASE_URL}/team`
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch team members')
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getOfficeLocations(): Promise<OfficeLocation[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch office locations')
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching office locations:', error)
    return []
  }
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/company/stats`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch company stats')
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching company stats:', error)
    return []
  }
}

// Contact Page API Functions
export async function getContactPageData(): Promise<{ locations: OfficeLocation[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch contact page data')
    }
    
    const data = await response.json()
    return { locations: data.data || [] }
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    
    // Return fallback data
    return { locations: [] }
  }
}

export async function submitContactForm(formData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit contact form')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

// Services API Functions
export async function getServicesPageData(): Promise<{ services: Service[], solutions: any[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch services data')
    }
    
    const data = await response.json()
    return { 
      services: data.data || [], 
      solutions: data.solutions || []
    }
  } catch (error) {
    console.error('Error fetching services data:', error)
    
    // Return fallback data
    return { 
      services: [], 
      solutions: []
    }
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${slug}`, {
      next: { revalidate: 3600 }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch service')
    }
    
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error fetching service:', error)
    
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
    const [statsResponse, leadershipResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/company/stats`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE_URL}/team/leadership`, { next: { revalidate: 3600 } })
    ])
    
    const statsData = statsResponse.ok ? await statsResponse.json() : { data: [] }
    const leadershipData = leadershipResponse.ok ? await leadershipResponse.json() : { data: [] }
    
    return { 
      stats: statsData.data || [],
      leadership: leadershipData.data || [],
      departments: [] // Will be populated later when departments API is available
    }
  } catch (error) {
    console.error('Error fetching team page data:', error)
    
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
    const servicesResponse = await fetch(`${API_BASE_URL}/services`, { next: { revalidate: 3600 } })
    
    const servicesData = servicesResponse.ok ? await servicesResponse.json() : { data: [] }
    
    return { 
      services: servicesData.data || []
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    
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
        const servicesResponse = await fetch(`${API_BASE_URL}/services`, {
          next: { revalidate: 3600 }
        })
        
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json()
          const services = servicesData.data || []
          
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
        }
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