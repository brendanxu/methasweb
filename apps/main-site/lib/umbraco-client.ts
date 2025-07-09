import { 
  CaseStudy, 
  NewsArticle, 
  Service, 
  Industry, 
  Category, 
  TeamMember, 
  OfficeLocation, 
  CompanyInfo, 
  CompanyStat 
} from './types'

const UMBRACO_BASE_URL = process.env.NEXT_PUBLIC_UMBRACO_BASE_URL || 'http://localhost:5001'
const UMBRACO_API_KEY = process.env.NEXT_PUBLIC_UMBRACO_API_KEY || 'methas-api-key-2024'

class UmbracoClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = `${UMBRACO_BASE_URL}/umbraco/delivery/api/v2`
    this.apiKey = UMBRACO_API_KEY
  }

  private async fetchFromUmbraco(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultHeaders = {
      'Api-Key': this.apiKey,
      'Content-Type': 'application/json',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      // 特殊处理 404 - 返回空结果而不是错误
      if (response.status === 404) {
        console.warn(`Content not found for: ${endpoint}`)
        return { items: [], total: 0 }
      }
      
      if (!response.ok) {
        throw new Error(`Umbraco API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Umbraco API Error:', error)
      throw error
    }
  }

  // Case Studies
  async getCaseStudies(take = 50, skip = 0): Promise<CaseStudy[]> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content?contentType=caseStudy&take=${take}&skip=${skip}`
      )
      
      const caseStudyItems = response.items?.filter((item: any) => item.contentType === 'caseStudy') || []
      return caseStudyItems.map((item: any) => this.adaptCaseStudy(item))
    } catch (error) {
      console.error('Failed to get case studies:', error)
      return []
    }
  }

  async getCaseStudy(slug: string): Promise<CaseStudy | null> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content/item/case-studies/${slug}`
      )
      return this.adaptCaseStudy(response)
    } catch (error) {
      console.error(`Case study not found: ${slug}`, error)
      return null
    }
  }

  // News Articles  
  async getNewsArticles(take = 50, skip = 0): Promise<NewsArticle[]> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content?contentType=newsArticle&take=${take}&skip=${skip}`
      )
      
      const newsItems = response.items?.filter((item: any) => item.contentType === 'newsArticle') || []
      return newsItems.map((item: any) => this.adaptNewsArticle(item))
    } catch (error) {
      console.error('Failed to get news articles:', error)
      return []
    }
  }

  async getNewsArticle(slug: string): Promise<NewsArticle | null> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content/item/news/${slug}`
      )
      return this.adaptNewsArticle(response)
    } catch (error) {
      console.error(`News article not found: ${slug}`, error)
      return null
    }
  }

  // Services
  async getServices(take = 100): Promise<Service[]> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content?contentType=sevice&take=${take}`
      )
      
      // Filter only actual service content types (in case API returns all content)
      const serviceItems = response.items?.filter((item: any) => item.contentType === 'sevice') || []
      return serviceItems.map((item: any) => this.adaptService(item))
    } catch (error) {
      console.error('Failed to get services:', error)
      return []
    }
  }

  async getService(slug: string): Promise<Service | null> {
    try {
      const response = await this.fetchFromUmbraco(
        `/content/item/services/${slug}`
      )
      return this.adaptService(response)
    } catch (error) {
      console.error(`Service not found: ${slug}`, error)
      return null
    }
  }

  // Team Members
  async getTeamMembers(take = 100): Promise<TeamMember[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=teamMember&take=${take}`
    )
    
    return response.items?.map((item: any) => this.adaptTeamMember(item)) || []
  }

  async getLeadershipTeam(): Promise<TeamMember[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=teamMember&take=100`
    )
    
    const allMembers = response.items?.map((item: any) => this.adaptTeamMember(item)) || []
    // Client-side filtering for leadership team
    return allMembers.filter((member: any) => member.isLeadership === true)
  }

  // Office Locations
  async getOfficeLocations(take = 100): Promise<OfficeLocation[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=officeLocation&take=${take}`
    )
    
    return response.items?.map((item: any) => this.adaptOfficeLocation(item)) || []
  }

  // Company Information
  async getCompanyInfo(section?: string): Promise<CompanyInfo[]> {
    let endpoint = `/content?contentType=companyInfo&take=100`
    
    // Note: Filter parameter may not be supported in API v2
    // Client-side filtering will be applied after fetch
    
    const response = await this.fetchFromUmbraco(endpoint)
    let items = response.items?.map((item: any) => this.adaptCompanyInfo(item)) || []
    
    // Client-side filtering by section if needed
    if (section) {
      items = items.filter((item: any) => item.section === section)
    }
    
    return items
  }

  // Company Stats
  async getCompanyStats(take = 100): Promise<CompanyStat[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=companyStat&take=${take}`
    )
    
    return response.items?.map((item: any) => this.adaptCompanyStat(item)) || []
  }

  // Industries and Categories
  async getIndustries(): Promise<Industry[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=industry&take=100`
    )
    
    return response.items?.map((item: any) => this.adaptIndustry(item)) || []
  }

  async getCategories(): Promise<Category[]> {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=category&take=100`
    )
    
    return response.items?.map((item: any) => this.adaptCategory(item)) || []
  }

  // Adapter methods to transform Umbraco data to our types
  private adaptCaseStudy(umbracoItem: any): CaseStudy {
    return {
      id: umbracoItem.id,
      title: umbracoItem.properties.title || umbracoItem.name,
      slug: umbracoItem.properties.urlSlug || umbracoItem.route?.path?.split('/').pop() || '',
      clientName: umbracoItem.properties.clientName || '',
      heroImage: this.getMediaUrl(umbracoItem.properties.heroImage),
      summary: umbracoItem.properties.summary || '',
      theGoal: umbracoItem.properties.theGoal || '',
      theChallenge: umbracoItem.properties.theChallenge || '',
      theSolution: umbracoItem.properties.theSolution || '',
      relatedServices: umbracoItem.properties.services?.map((service: any) => this.adaptService(service)) || [],
      relatedIndustry: umbracoItem.properties.industry ? this.adaptIndustry(umbracoItem.properties.industry) : {} as Industry,
      createdAt: umbracoItem.properties.publishedDate || umbracoItem.createDate
    }
  }

  private adaptNewsArticle(umbracoItem: any): NewsArticle {
    return {
      id: umbracoItem.id,
      title: umbracoItem.properties.title || umbracoItem.name,
      slug: umbracoItem.properties.urlSlug || umbracoItem.route?.path?.split('/').pop() || '',
      publishDate: umbracoItem.properties.publishedDate || umbracoItem.createDate,
      heroImage: this.getMediaUrl(umbracoItem.properties.featuredImage),
      content: umbracoItem.properties.content || '',
      category: umbracoItem.properties.category ? this.adaptCategory(umbracoItem.properties.category) : {} as Category,
      summary: umbracoItem.properties.excerpt || umbracoItem.properties.summary || ''
    }
  }

  private adaptService(umbracoItem: any): Service {
    return {
      id: umbracoItem.id,
      name: umbracoItem.properties.serviceBrandName || umbracoItem.name,
      slug: umbracoItem.properties.serviceUrlSlug || umbracoItem.route?.path?.split('/').pop() || '',
      description: umbracoItem.properties.serviceDescription || '',
      icon: this.getMediaUrl(umbracoItem.properties.icon),
      fullDescription: umbracoItem.properties.serviceFullDescription?.markup || umbracoItem.properties.serviceFullDescription || '',
      benefits: umbracoItem.properties.benefits || [],
      features: umbracoItem.properties.features || [],
      process: umbracoItem.properties.process || []
    }
  }

  private adaptTeamMember(umbracoItem: any): TeamMember {
    return {
      id: umbracoItem.id,
      name: umbracoItem.properties.name || umbracoItem.name,
      title: umbracoItem.properties.title || '',
      department: umbracoItem.properties.department,
      bio: umbracoItem.properties.bio,
      imageUrl: this.getMediaUrl(umbracoItem.properties.profileImage),
      linkedinUrl: umbracoItem.properties.linkedinUrl,
      email: umbracoItem.properties.email,
      isLeadership: umbracoItem.properties.isLeadership || false,
      displayOrder: umbracoItem.properties.displayOrder,
      isActive: umbracoItem.properties.isActive !== false,
      createdAt: umbracoItem.createDate,
      updatedAt: umbracoItem.updateDate
    }
  }

  private adaptOfficeLocation(umbracoItem: any): OfficeLocation {
    return {
      id: umbracoItem.id,
      name: umbracoItem.properties.name || umbracoItem.name,
      address: umbracoItem.properties.address || '',
      city: umbracoItem.properties.city || '',
      country: umbracoItem.properties.country || '',
      countryCode: umbracoItem.properties.countryCode,
      phone: umbracoItem.properties.phone,
      email: umbracoItem.properties.email,
      timezone: umbracoItem.properties.timezone,
      coordinates: umbracoItem.properties.coordinates,
      description: umbracoItem.properties.description,
      imageUrl: this.getMediaUrl(umbracoItem.properties.image),
      isHeadquarters: umbracoItem.properties.isHeadquarters || false,
      isActive: umbracoItem.properties.isActive !== false,
      createdAt: umbracoItem.createDate,
      updatedAt: umbracoItem.updateDate
    }
  }

  private adaptCompanyInfo(umbracoItem: any): CompanyInfo {
    return {
      id: umbracoItem.id,
      section: umbracoItem.properties.section || 'HERO',
      title: umbracoItem.properties.title || umbracoItem.name,
      subtitle: umbracoItem.properties.subtitle,
      content: umbracoItem.properties.content || '',
      imageUrl: this.getMediaUrl(umbracoItem.properties.image),
      videoUrl: umbracoItem.properties.videoUrl,
      ctaText: umbracoItem.properties.ctaText,
      ctaUrl: umbracoItem.properties.ctaUrl,
      displayOrder: umbracoItem.properties.displayOrder,
      isActive: umbracoItem.properties.isActive !== false,
      createdAt: umbracoItem.createDate,
      updatedAt: umbracoItem.updateDate,
      author: {
        id: umbracoItem.properties.author?.id || '',
        name: umbracoItem.properties.author?.name || '',
        email: umbracoItem.properties.author?.email || ''
      }
    }
  }

  private adaptCompanyStat(umbracoItem: any): CompanyStat {
    return {
      id: umbracoItem.id,
      label: umbracoItem.properties.label || umbracoItem.name,
      value: umbracoItem.properties.value || '',
      description: umbracoItem.properties.description || '',
      iconUrl: this.getMediaUrl(umbracoItem.properties.icon),
      displayOrder: umbracoItem.properties.displayOrder,
      isActive: umbracoItem.properties.isActive !== false,
      createdAt: umbracoItem.createDate,
      updatedAt: umbracoItem.updateDate
    }
  }

  private adaptIndustry(umbracoItem: any): Industry {
    return {
      id: umbracoItem.id,
      name: umbracoItem.properties.name || umbracoItem.name,
      slug: umbracoItem.properties.urlSlug || umbracoItem.route?.path?.split('/').pop() || '',
      description: umbracoItem.properties.description || ''
    }
  }

  private adaptCategory(umbracoItem: any): Category {
    return {
      id: umbracoItem.id,
      name: umbracoItem.properties.name || umbracoItem.name,
      slug: umbracoItem.properties.urlSlug || umbracoItem.route?.path?.split('/').pop() || ''
    }
  }

  private getMediaUrl(mediaItem: any): string {
    if (!mediaItem) return ''
    
    if (typeof mediaItem === 'string') return mediaItem
    
    if (mediaItem.url) {
      return mediaItem.url.startsWith('http') 
        ? mediaItem.url 
        : `${UMBRACO_BASE_URL}${mediaItem.url}`
    }
    
    return ''
  }
}

export const umbracoClient = new UmbracoClient()
export default umbracoClient