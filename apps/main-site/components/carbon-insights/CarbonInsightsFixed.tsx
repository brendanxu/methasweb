'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsFixed({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
}: CarbonInsightsProps) {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FAFBFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#091E42', marginBottom: '16px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '20px', color: '#6B778C' }}>
            {subtitle}
          </p>
        </div>

        {/* 4个文章并排 - 关键部分 */}
        <div 
          style={{
            display: 'flex',
            gap: '24px',
            overflow: 'hidden', // 隐藏超出部分
            width: '100%'
          }}
        >
          {articles.slice(0, 4).map((article) => (
            <div
              key={article.id}
              style={{
                // 关键：每个卡片占1/4宽度！
                flex: '0 0 calc(25% - 18px)',
                minWidth: '280px',
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Link href={article.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                {/* 图片部分 */}
                <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#f0f0f0' }}>
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    left: '16px',
                    backgroundColor: article.categoryColor || '#00875A',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {article.category}
                  </div>
                </div>
                
                {/* 内容部分 */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#253858',
                    marginBottom: '12px',
                    lineHeight: '1.4',
                    height: '50px', // 固定高度保持对齐
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6B778C',
                    lineHeight: '1.5',
                    marginBottom: '16px',
                    height: '60px', // 固定高度
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '12px', 
                    color: '#A5ADBA' 
                  }}>
                    <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
                    <span>{article.readingTime} 分钟阅读</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link 
            href="/insights"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: '#002145',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0052CC'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#002145'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            探索更多洞察
            <svg style={{ marginLeft: '8px', width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}