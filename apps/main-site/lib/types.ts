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