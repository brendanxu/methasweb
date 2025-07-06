/**
 * 数据源管理器
 * 根据环境变量决定使用Umbraco API还是Mock数据
 */

import { umbracoClient } from './umbraco-client'
import { mockCaseStudies, mockNewsArticles, mockServices } from './mock-data'
import type { CaseStudy, NewsArticle, Service } from './types'

const USE_UMBRACO = process.env.NEXT_PUBLIC_USE_UMBRACO === 'true'

export const dataSource = {
  async getCaseStudies(): Promise<CaseStudy[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getCaseStudies()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockCaseStudies
  },

  async getCaseStudy(slug: string): Promise<CaseStudy | null> {
    if (USE_UMBRACO) {
      try {
        return await umbracoClient.getCaseStudy(slug)
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockCaseStudies.find(cs => cs.slug === slug) || null
  },

  async getNewsArticles(): Promise<NewsArticle[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getNewsArticles()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockNewsArticles
  },

  async getNewsArticle(slug: string): Promise<NewsArticle | null> {
    if (USE_UMBRACO) {
      try {
        return await umbracoClient.getNewsArticle(slug)
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockNewsArticles.find(article => article.slug === slug) || null
  },

  async getServices(): Promise<Service[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getServices()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockServices
  }
}
