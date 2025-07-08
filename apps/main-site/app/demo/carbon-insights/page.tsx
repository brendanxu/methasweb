import React from 'react'
import { CarbonInsights } from '@/components/carbon-insights'

export default function CarbonInsightsDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-0">
      {/* 全新版本 - 从零重建 */}
      <CarbonInsights />
      
      {/* 不同背景测试 */}
      <div className="bg-white">
        <CarbonInsights />
      </div>
      
      {/* 第三个实例 */}
      <div className="bg-gray-50">
        <CarbonInsights />
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: '碳智观察 - 组件演示',
    description: '展示现代化的碳智观察新闻资讯板块组件',
  }
}