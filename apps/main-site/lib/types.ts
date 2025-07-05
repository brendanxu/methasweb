export interface CaseStudy {
  id: string
  title: string
  slug: string
  clientName: string
  heroImage: string
  summary: string
  theGoal: string
  theChallenge: string
  theSolution: string
  relatedServices: Service[]
  relatedIndustry: Industry
  createdAt: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  publishDate: string
  heroImage: string
  content: string
  category: Category
  summary: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  fullDescription?: string
  benefits?: string[]
  features?: ServiceFeature[]
  process?: ProcessStep[]
  caseStudies?: string[]
  pricing?: string
  targetAudience?: string[]
}

export interface ServiceFeature {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  id: string
  step: number
  title: string
  description: string
  duration?: string
}

export interface Report {
  id: string
  title: string
  slug: string
  publishDate: string
  downloadUrl: string
  summary: string
  coverImage: string
}

export interface Project {
  id: string
  name: string
  slug: string
  location: string
  description: string
  images: string[]
  impact: string
}

export interface Industry {
  id: string
  name: string
  slug: string
  description: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

// Company and Team Types
export interface CompanyStat {
  id: string
  label: string
  value: string
  description: string
  iconUrl?: string
  displayOrder?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  department?: string
  bio?: string
  imageUrl?: string
  linkedinUrl?: string
  email?: string
  isLeadership: boolean
  displayOrder?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OfficeLocation {
  id: string
  name: string
  address: string
  city: string
  country: string
  countryCode?: string
  phone?: string
  email?: string
  timezone?: string
  coordinates?: string
  description?: string
  imageUrl?: string
  isHeadquarters: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CompanyInfo {
  id: string
  section: 'HERO' | 'MISSION' | 'VALUES' | 'HISTORY' | 'COMMITMENT' | 'IMPACT'
  title: string
  subtitle?: string
  content: string
  imageUrl?: string
  videoUrl?: string
  ctaText?: string
  ctaUrl?: string
  displayOrder?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
  }
}

export interface AboutPageData {
  sections: {
    [key: string]: CompanyInfo[]
  }
  stats: CompanyStat[]
  leadership: TeamMember[]
  locations: OfficeLocation[]
  meta: {
    lastUpdated: Date
    totalSections: number
    totalStats: number
    totalLeadership: number
    totalLocations: number
  }
}

// Search Types
export interface SearchResult {
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

export interface SearchResultsData {
  results: SearchResult[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

export interface SearchParams {
  query: string
  type?: string
  category?: string
  location?: string
  page?: number
  limit?: number
}