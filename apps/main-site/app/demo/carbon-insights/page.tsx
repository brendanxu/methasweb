import React from 'react'
import { CarbonInsights } from '@/components/carbon-insights'

export default function CarbonInsightsDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-0">
      {/* 碳智观察组件演示 - 只显示一次 */}
      <CarbonInsights />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: '碳智观察 - 组件演示',
    description: '展示现代化的碳智观察新闻资讯板块组件',
  }
}