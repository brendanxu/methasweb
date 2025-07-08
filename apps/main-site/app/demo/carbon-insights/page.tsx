import React from 'react'
import { CarbonInsightsV2 } from '@/components/carbon-insights'
import { mockArticles } from '@/lib/mock-data/carbon-insights-data'

export default function CarbonInsightsDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-0">
      {/* 标准版本 */}
      <CarbonInsightsV2 articles={mockArticles} />
      
      {/* 自动播放版本 */}
      <div className="bg-neutral-100">
        <CarbonInsightsV2 
          articles={mockArticles}
          title="最新资讯"
          subtitle="了解碳市场的最新动态和行业趋势"
          autoplay={true}
          autoplayInterval={3000}
        />
      </div>
      
      {/* 少量文章测试 */}
      <CarbonInsightsV2 
        articles={mockArticles.slice(0, 3)}
        title="精选文章"
        subtitle="我们为您精心挑选的优质内容"
        loop={false}
      />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: '碳智观察 - 组件演示',
    description: '展示现代化的碳智观察新闻资讯板块组件',
  }
}