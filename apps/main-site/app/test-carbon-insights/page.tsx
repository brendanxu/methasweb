'use client'

import React from 'react'
import { CarbonInsights } from '@/components/carbon-insights'

export default function TestCarbonInsightsPage() {
  return (
    <div className="min-h-screen bg-neutral-0">
      {/* 🔥 BRAND NEW: 完全重新创建的轮播组件 */}
      <div className="border-b-4 border-red-600">
        <h2 className="text-2xl font-bold text-center py-4 bg-red-600 text-white">
          🔥 BRAND NEW: 全新轮播组件 - 从零开始重建！
        </h2>
        <CarbonInsights />
      </div>

    </div>
  )
}