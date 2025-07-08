'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@repo/ui'
import { ArticleCard } from './ArticleCard'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsGrid({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
  className = ''
}: CarbonInsightsProps) {
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

        {/* Grid Layout - 强制4列 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 8).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard article={article} isActive={true} />
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <div className="text-center mt-12">
          <motion.a
            href="/insights"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-accent transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            探索更多洞察
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </Container>
    </section>
  )
}