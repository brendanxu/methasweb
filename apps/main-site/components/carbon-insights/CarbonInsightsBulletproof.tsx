'use client'

import React from 'react'
import Link from 'next/link'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsBulletproof({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
}: CarbonInsightsProps) {
  return (
    <section style={{ padding: '80px 0', backgroundColor: '#FAFBFC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* 标题 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#091E42', 
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            {title}
          </h2>
          <p style={{ fontSize: '20px', color: '#6B778C', lineHeight: '1.5' }}>
            {subtitle}
          </p>
        </div>

        {/* 防弹Grid布局 - 强制4列 */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', // 关键：minmax防止溢出
            gap: '24px',
            width: '100%',
            overflow: 'hidden' // 额外保护
          }}
        >
          {articles.slice(0, 4).map((article, index) => (
            <article
              key={article.id}
              style={{
                width: '100%', // 占满grid单元格
                overflow: 'hidden', // 防止内容溢出
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <Link href={article.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {/* 图片容器 - 防弹设计 */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '0',
                  paddingBottom: '56.25%', // 16:9 比例，固定高度
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0'
                }}>
                  {/* 使用背景图片方式 - 更安全 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${article.image.src})`,
                      backgroundSize: 'cover', // 关键：图片自适应裁剪
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  
                  {/* 分类标签 */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: article.categoryColor || '#00875A',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1
                  }}>
                    {article.category}
                  </div>
                </div>
                
                {/* 内容部分 - 固定高度 */}
                <div style={{ 
                  padding: '24px',
                  height: '200px', // 固定内容区域高度
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#253858',
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      height: '50px', // 固定标题高度
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      wordWrap: 'break-word', // 防止长单词破坏布局
                      overflowWrap: 'break-word'
                    }}>
                      {article.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#6B778C',
                      lineHeight: '1.5',
                      height: '63px', // 固定描述高度 (21px * 3行)
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {article.excerpt}
                    </p>
                  </div>
                  
                  {/* 底部元信息 */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px', 
                    color: '#A5ADBA',
                    paddingTop: '16px',
                    borderTop: '1px solid #EBECF0'
                  }}>
                    <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
                    <span>{article.readingTime} 分钟阅读</span>
                  </div>
                </div>
              </Link>
            </article>
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
              fontSize: '16px',
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