'use client'

import React, { useEffect } from 'react'

export function CarbonInsights() {
  useEffect(() => {
    // 碳智观察轮播功能
    let currentIndex = 0;
    const track = document.getElementById('ciTrack');
    const cards = document.querySelectorAll('.ci-card');
    const indicators = document.querySelectorAll('.ci-indicator');
    
    if (!track || !cards.length) return;
    
    // 响应式卡片数量
    function getCardsPerView() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }
    
    // 更新轮播位置
    function updateCarousel() {
      if (!track) return;
      
      const cardsPerView = getCardsPerView();
      const cardWidth = 100 / cardsPerView;
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      
      // 限制索引范围
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      
      // 计算偏移
      const offset = currentIndex * cardWidth;
      track.style.transform = `translateX(-${offset}%)`;
      
      // 更新指示器
      updateIndicators();
    }
    
    // 更新指示器状态
    function updateIndicators() {
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === Math.floor(currentIndex / 2));
      });
    }
    
    // 下一页
    const slideNext = function() {
      const cardsPerView = getCardsPerView();
      const maxIndex = cards.length - cardsPerView;
      
      if (currentIndex < maxIndex) {
        currentIndex = Math.min(currentIndex + cardsPerView, maxIndex);
        updateCarousel();
      }
    };
    
    // 上一页
    const slidePrev = function() {
      if (currentIndex > 0) {
        const cardsPerView = getCardsPerView();
        currentIndex = Math.max(currentIndex - cardsPerView, 0);
        updateCarousel();
      }
    };
    
    // 绑定按钮事件
    const prevBtn = document.querySelector('.ci-nav-prev');
    const nextBtn = document.querySelector('.ci-nav-next');
    
    if (prevBtn) prevBtn.addEventListener('click', slidePrev);
    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      if (e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    });
    
    track.addEventListener('touchend', (e) => {
      if (e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            slideNext();
          } else {
            slidePrev();
          }
        }
      }
    });
    
    // 窗口调整时更新
    const handleResize = () => updateCarousel();
    window.addEventListener('resize', handleResize);
    
    // 初始化
    updateCarousel();
    
    // 清理函数
    return () => {
      if (prevBtn) prevBtn.removeEventListener('click', slidePrev);
      if (nextBtn) nextBtn.removeEventListener('click', slideNext);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className="carbon-insights-new">
        <div className="ci-header">
          <h2 className="ci-title">碳智观察</h2>
          <p className="ci-subtitle">深度洞察碳市场动态，把握可持续发展机遇</p>
        </div>
        
        <div className="ci-carousel">
          <button className="ci-nav ci-nav-prev">
            <span>‹</span>
          </button>
          
          <div className="ci-viewport">
            <div className="ci-track" id="ciTrack">
              {/* 文章1 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/0066cc/ffffff?text=Article+1" alt="碳市场月度报告" />
                  <span className="ci-tag">市场分析</span>
                </div>
                <h3 className="ci-card-title">碳市场月度报告</h3>
                <p className="ci-card-desc">深入分析全球碳市场走势，为您的碳资产管理提供专业指导和前瞻性洞察。</p>
                <a href="#" className="ci-card-link">下载报告 →</a>
              </article>
              
              {/* 文章2 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/00aa66/ffffff?text=Article+2" alt="Article 6 实施指南" />
                  <span className="ci-tag">政策解读</span>
                </div>
                <h3 className="ci-card-title">Article 6 实施指南</h3>
                <p className="ci-card-desc">详解《巴黎协定》第六条机制，帮助企业掌握国际碳信用交易新规则。</p>
                <a href="#" className="ci-card-link">了解更多 →</a>
              </article>
              
              {/* 文章3 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/ff6633/ffffff?text=Article+3" alt="CCER重启解读" />
                  <span className="ci-tag">政策动态</span>
                </div>
                <h3 className="ci-card-title">CCER重启深度解读</h3>
                <p className="ci-card-desc">中国核证自愿减排量重启，解析最新政策要点及市场机遇。</p>
                <a href="#" className="ci-card-link">了解更多 →</a>
              </article>
              
              {/* 文章4 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/9933ff/ffffff?text=Article+4" alt="企业碳管理" />
                  <span className="ci-tag">实践指南</span>
                </div>
                <h3 className="ci-card-title">企业碳管理指南</h3>
                <p className="ci-card-desc">从碳盘查到碳中和，帮助企业构建完整的碳管理体系。</p>
                <a href="#" className="ci-card-link">了解更多 →</a>
              </article>
              
              {/* 文章5 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/ff3366/ffffff?text=Article+5" alt="碳金融创新" />
                  <span className="ci-tag">金融创新</span>
                </div>
                <h3 className="ci-card-title">碳金融创新产品</h3>
                <p className="ci-card-desc">探索碳期货、碳期权等创新金融工具在碳市场中的应用。</p>
                <a href="#" className="ci-card-link">了解更多 →</a>
              </article>
              
              {/* 文章6 */}
              <article className="ci-card">
                <div className="ci-card-image">
                  <img src="https://via.placeholder.com/300x200/33ccff/ffffff?text=Article+6" alt="国际碳市场" />
                  <span className="ci-tag">国际视野</span>
                </div>
                <h3 className="ci-card-title">全球碳市场链接</h3>
                <p className="ci-card-desc">分析EU ETS、RGGI等国际碳市场互联互通最新进展。</p>
                <a href="#" className="ci-card-link">了解更多 →</a>
              </article>
            </div>
          </div>
          
          <button className="ci-nav ci-nav-next">
            <span>›</span>
          </button>
        </div>
        
        <div className="ci-indicators">
          <span className="ci-indicator active"></span>
          <span className="ci-indicator"></span>
          <span className="ci-indicator"></span>
        </div>
      </section>

      <style jsx>{`
        /* 碳智观察 - 全新样式 */
        .carbon-insights-new {
          padding: 60px 20px;
          background: #f8f9fa;
          overflow: hidden;
        }

        .ci-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .ci-title {
          font-size: 36px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .ci-subtitle {
          font-size: 16px;
          color: #666;
        }

        /* 轮播容器 */
        .ci-carousel {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        /* 视口 - 显示区域 */
        .ci-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* 轨道 - 包含所有卡片 */
        .ci-track {
          display: flex;
          gap: 20px;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        /* 卡片样式 - 关键：固定宽度 */
        .ci-card {
          flex: 0 0 calc((100% - 60px) / 4);
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .ci-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        /* 图片容器 */
        .ci-card-image {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }

        .ci-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .ci-card:hover .ci-card-image img {
          transform: scale(1.05);
        }

        /* 标签 */
        .ci-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 102, 204, 0.9);
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        /* 内容区 */
        .ci-card-title {
          padding: 16px 16px 8px;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          line-height: 1.4;
        }

        .ci-card-desc {
          padding: 0 16px;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .ci-card-link {
          display: inline-block;
          padding: 12px 16px 16px;
          color: #0066cc;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .ci-card-link:hover {
          color: #0052a3;
        }

        /* 导航按钮 */
        .ci-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
          font-size: 24px;
          color: #666;
        }

        .ci-nav:hover {
          background: #f5f5f5;
          border-color: #ccc;
          color: #333;
        }

        .ci-nav-prev {
          left: -22px;
        }

        .ci-nav-next {
          right: -22px;
        }

        /* 指示器 */
        .ci-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .ci-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ddd;
          transition: all 0.3s;
          cursor: pointer;
        }

        .ci-indicator.active {
          width: 24px;
          border-radius: 4px;
          background: #0066cc;
        }

        /* 响应式设计 */
        @media (max-width: 1024px) {
          .ci-card {
            flex: 0 0 calc((100% - 40px) / 3);
          }
        }

        @media (max-width: 768px) {
          .ci-card {
            flex: 0 0 calc((100% - 20px) / 2);
          }
          
          .ci-nav {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .ci-card {
            flex: 0 0 90%;
          }
          
          .ci-title {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  )
}