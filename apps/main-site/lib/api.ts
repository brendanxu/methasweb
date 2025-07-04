import { mockCaseStudies, mockNewsArticles } from './mock-data'
import type { CaseStudy, NewsArticle } from './types'

export async function getCaseStudies(): Promise<CaseStudy[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockCaseStudies
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockCaseStudies.find(cs => cs.slug === slug) || null
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockNewsArticles
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockNewsArticles.find(article => article.slug === slug) || null
}

export async function getLatestCaseStudies(limit: number = 3): Promise<CaseStudy[]> {
  const caseStudies = await getCaseStudies()
  return caseStudies.slice(0, limit)
}

export async function getLatestNews(limit: number = 4): Promise<NewsArticle[]> {
  const news = await getNewsArticles()
  return news.slice(0, limit)
}