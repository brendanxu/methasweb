'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@repo/ui'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsFinal({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
}: CarbonInsightsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsPerView = 4
  
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth / cardsPerView
      const scrollAmount = index * cardWidth
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < Math.ceil(articles.length / cardsPerView) - 1

  return (
    <section className="py-20 bg-neutral-50">
      <Container size="xl">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-xl text-neutral-600">{subtitle}</p>
        </div>

        {/* 轮播主体 */}
        <div className="relative">
          {/* 左箭头 */}
          {canScrollLeft && (
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
              style={{ left: '-24px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* 右箭头 */}
          {canScrollRight && (
            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all"
              style={{ right: '-24px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* 可视区域 */}
          <div 
            ref={containerRef}
            className="overflow-x-hidden"
            style={{ width: '100%' }}
          >
            {/* 内容容器 - 关键：使用flex并排显示 */}
            <div 
              className="flex gap-6 transition-transform duration-300"
              style={{
                // 不设置固定宽度，让内容自然撑开
              }}
            >
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  // 关键CSS：每个卡片占1/4宽度
                  className="flex-shrink-0"
                  style={{
                    width: 'calc((100% - 72px) / 4)', // 4个卡片，3个24px间隙
                    minWidth: '280px'
                  }}
                >
                  <Link href={article.link} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                      {/* 图片部分 */}
                      <div className="relative aspect-video bg-neutral-200">
                        <Image
                          src={article.image.src}
                          alt={article.image.alt}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span 
                            className="px-3 py-1 rounded-md text-xs font-semibold text-white"
                            style={{ backgroundColor: article.categoryColor || '#00875A' }}
                          >
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* 内容部分 */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-neutral-800 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
                          <span>{article.readingTime} 分钟阅读</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 分页指示器 */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(articles.length / cardsPerView) }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}