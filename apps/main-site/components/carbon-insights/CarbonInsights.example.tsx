import React from 'react'
import { CarbonInsightsV2 } from './CarbonInsights'
import { mockArticles } from '@/lib/mock-data/carbon-insights-data'

export function CarbonInsightsExample() {
  return (
    <>
      {/* 基础用法 */}
      <CarbonInsightsV2 articles={mockArticles} />

      {/* 自动播放版本 */}
      <CarbonInsightsV2 
        articles={mockArticles}
        autoplay={true}
        autoplayInterval={5000}
      />

      {/* 自定义标题和不循环 */}
      <CarbonInsightsV2 
        articles={mockArticles}
        title="行业洞察"
        subtitle="获取最新的碳市场资讯和行业动态"
        loop={false}
      />

      {/* 少量文章（测试响应式） */}
      <CarbonInsightsV2 
        articles={mockArticles.slice(0, 3)}
      />
    </>
  )
}