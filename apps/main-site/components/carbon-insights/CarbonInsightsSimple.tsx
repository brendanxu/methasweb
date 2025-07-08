'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@repo/ui'
import { ArticleCard } from './ArticleCard'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsSimple({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
  className = ''
}: CarbonInsightsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300
      const scrollAmount = cardWidth + 24 // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className={`py-20 bg-neutral-50 ${className}`}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-xl text-neutral-600">{subtitle}</p>
        </motion.div>

        {/* 轮播容器 */}
        <div className="relative">
          {/* 左箭头 */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
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
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              style={{ right: '-24px' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* 文章容器 - 使用flex确保并排显示 */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-none"
                style={{
                  width: 'calc((100% - 72px) / 4)', // 确保4个卡片
                  minWidth: '280px',
                  maxWidth: '320px',
                  scrollSnapAlign: 'start'
                }}
              >
                <ArticleCard article={article} isActive={true} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 指示器 */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(articles.length / 4) }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-neutral-300"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}