'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsCarousel({
  articles,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
}: CarbonInsightsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  
  // Configuration
  const cardsPerView = 4
  const totalCards = articles.length
  const maxIndex = Math.max(0, totalCards - cardsPerView)
  const cardWidth = 25 // 每个卡片占25%
  
  // Update slide position
  const updateSlidePosition = () => {
    if (trackRef.current) {
      const offset = currentIndex * cardWidth
      trackRef.current.style.transform = `translateX(-${offset}%)`
    }
  }
  
  // Navigation functions
  const slideNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1)
    }
  }
  
  const slidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }
  
  // Touch/drag support
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setStartX(e.touches[0].clientX)
      setIsDragging(true)
    }
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return
    setCurrentX(e.touches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50
    
    if (diff > threshold) {
      slideNext()
    } else if (diff < -threshold) {
      slidePrev()
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }
  
  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX)
    setIsDragging(true)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setCurrentX(e.clientX)
  }
  
  const handleMouseUp = () => {
    if (!isDragging) return
    
    const diff = startX - currentX
    const threshold = 50
    
    if (diff > threshold) {
      slideNext()
    } else if (diff < -threshold) {
      slidePrev()
    }
    
    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }
  
  // Update position when index changes
  useEffect(() => {
    updateSlidePosition()
  }, [currentIndex])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        slidePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        slideNext()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])
  
  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < maxIndex
  
  return (
    <section className="carbon-insights">
      <div className="section-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      
      <div className="carousel-wrapper">
        {/* Left Navigation Button */}
        {canScrollPrev && (
          <button 
            className="nav-btn nav-prev" 
            onClick={slidePrev}
            aria-label="Previous articles"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        
        {/* Carousel Viewport */}
        <div className="carousel-viewport">
          {/* Sliding Track */}
          <div 
            ref={trackRef}
            className="carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {articles.map((article, index) => (
              <article key={article.id} className="article-card">
                <Link href={article.link} className="card-link">
                  <div className="card-image">
                    <div 
                      className="image-background"
                      style={{
                        backgroundImage: `url(${article.image.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    <div 
                      className="category-badge"
                      style={{ backgroundColor: article.categoryColor || '#00875A' }}
                    >
                      {article.category}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{article.title}</h3>
                    <p className="card-excerpt">{article.excerpt}</p>
                    <div className="card-meta">
                      <span className="card-date">
                        {new Date(article.date).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="card-reading-time">
                        {article.readingTime} 分钟阅读
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
        
        {/* Right Navigation Button */}
        {canScrollNext && (
          <button 
            className="nav-btn nav-next" 
            onClick={slideNext}
            aria-label="Next articles"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      
      {/* Progress Indicators */}
      <div className="progress-indicators">
        {Array.from({ length: Math.ceil(totalCards / cardsPerView) }).map((_, i) => (
          <button
            key={i}
            className={`progress-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      <style jsx>{`
        .carbon-insights {
          padding: 80px 0;
          background-color: #FAFBFC;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 24px;
        }
        
        .section-header h2 {
          font-size: 48px;
          font-weight: bold;
          color: #091E42;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        
        .section-header p {
          font-size: 20px;
          color: #6B778C;
          line-height: 1.5;
        }
        
        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        .carousel-viewport {
          width: 100%;
          overflow: hidden;
          cursor: grab;
        }
        
        .carousel-viewport:active {
          cursor: grabbing;
        }
        
        .carousel-track {
          display: flex;
          gap: 20px;
          transition: transform 0.3s ease-out;
          user-select: none;
        }
        
        .article-card {
          /* 关键：固定宽度，不要100% */
          flex: 0 0 calc((100% - 60px) / 4);
          min-width: 250px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        
        .card-link {
          display: block;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }
        
        .card-image {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          background-color: #f0f0f0;
        }
        
        .image-background {
          width: 100%;
          height: 100%;
        }
        
        .category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(4px);
          z-index: 1;
        }
        
        .card-content {
          padding: 24px;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #253858;
          margin-bottom: 12px;
          line-height: 1.4;
          height: 50px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .card-excerpt {
          font-size: 14px;
          color: #6B778C;
          line-height: 1.5;
          margin-bottom: 16px;
          height: 63px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #A5ADBA;
          padding-top: 16px;
          border-top: 1px solid #EBECF0;
        }
        
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          border: 1px solid #EBECF0;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: #253858;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .nav-btn:hover {
          background: white;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          transform: translateY(-50%) scale(1.05);
        }
        
        .nav-prev { 
          left: -24px; 
        }
        
        .nav-next { 
          right: -24px; 
        }
        
        .progress-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
        }
        
        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D1D5DB;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .progress-dot:hover {
          background: #9CA3AF;
        }
        
        .progress-dot.active {
          width: 24px;
          border-radius: 4px;
          background: #002145;
        }
        
        /* 响应式设计 */
        @media (max-width: 1024px) {
          .article-card {
            flex: 0 0 calc((100% - 40px) / 3);
          }
        }
        
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 36px;
          }
          
          .section-header p {
            font-size: 18px;
          }
          
          .article-card {
            flex: 0 0 calc((100% - 20px) / 2);
          }
          
          .nav-btn {
            width: 40px;
            height: 40px;
          }
          
          .nav-prev { left: -20px; }
          .nav-next { right: -20px; }
        }
        
        @media (max-width: 480px) {
          .section-header h2 {
            font-size: 28px;
          }
          
          .section-header p {
            font-size: 16px;
          }
          
          .article-card {
            flex: 0 0 100%;
          }
          
          .nav-btn {
            display: none;
          }
          
          .carousel-wrapper {
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  )
}