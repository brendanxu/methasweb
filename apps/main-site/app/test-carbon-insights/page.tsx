'use client'

import React from 'react'
import { CarbonInsightsV2 } from '@/components/carbon-insights'
import { CarbonInsightsGrid } from '@/components/carbon-insights/CarbonInsightsGrid'
import { CarbonInsightsSimple } from '@/components/carbon-insights/CarbonInsightsSimple'
import { mockArticles } from '@/lib/mock-data/carbon-insights-data'

export default function TestCarbonInsightsPage() {
  return (
    <div className="min-h-screen bg-neutral-0">
      {/* 版本1: Grid布局（最稳定） */}
      <div className="border-b-4 border-primary">
        <h2 className="text-2xl font-bold text-center py-4 bg-primary text-white">
          版本1: Grid布局 - 保证4列显示
        </h2>
        <CarbonInsightsGrid articles={mockArticles} />
      </div>

      {/* 版本2: 简化轮播 */}
      <div className="border-b-4 border-secondary-green">
        <h2 className="text-2xl font-bold text-center py-4 bg-secondary-green text-white">
          版本2: 简化轮播 - Flex布局
        </h2>
        <CarbonInsightsSimple articles={mockArticles} />
      </div>

      {/* 版本3: Embla轮播（原版） */}
      <div className="border-b-4 border-secondary-orange">
        <h2 className="text-2xl font-bold text-center py-4 bg-secondary-orange text-white">
          版本3: Embla轮播（修复后）
        </h2>
        <CarbonInsightsV2 articles={mockArticles} autoplay={false} />
      </div>

      {/* 静态测试 - 验证基础布局 */}
      <div className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">静态测试 - 原生HTML</h2>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
            {mockArticles.slice(0, 4).map((article) => (
              <div 
                key={article.id} 
                style={{ 
                  flex: '0 0 calc(25% - 18px)',
                  minWidth: '280px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ 
                  aspectRatio: '16/9', 
                  backgroundColor: '#e5e5e5',
                  borderRadius: '4px',
                  marginBottom: '12px'
                }}></div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{article.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}