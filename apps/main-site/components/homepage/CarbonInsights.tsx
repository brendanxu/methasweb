'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

interface InsightCard {
  id: string
  title: string
  description: string
  image: string
  category: string
  actionText: string
  href: string
}

const insightCards: InsightCard[] = [
  {
    id: '1',
    title: '碳市场月度报告',
    description: '深入分析全球碳市场走势，为您的碳资产管理提供专业指导和前瞻性洞察。',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
    category: '市场分析',
    actionText: '下载报告',
    href: '/reports/carbon-market-monthly'
  },
  {
    id: '2', 
    title: 'Article 6 实施指南',
    description: '详解《巴黎协定》第六条机制，帮助企业掌握国际碳信用交易新规则。',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=240&fit=crop',
    category: '政策解读',
    actionText: '了解更多',
    href: '/insights/article-6-guide'
  },
  {
    id: '3',
    title: '企业碳中和案例',
    description: '分享全球领先企业的碳中和实践经验，为您的净零转型提供借鉴。',
    image: 'https://images.unsplash.com/photo-1497436072909-f5e4be94743d?w=400&h=240&fit=crop',
    category: '最佳实践',
    actionText: '查看案例',
    href: '/case-studies/carbon-neutral'
  },
  {
    id: '4',
    title: '碳信用评级指南',
    description: '全面解析碳信用质量评估标准，助您识别高质量碳减排项目。',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
    category: '技术指南',
    actionText: '下载指南',
    href: '/guides/carbon-credit-rating'
  },
  {
    id: '5',
    title: '净零排放路径分析',
    description: '基于科学的目标设定方法，为不同行业制定可行的净零排放路线图。',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=240&fit=crop',
    category: '战略规划',
    actionText: '了解详情',
    href: '/insights/net-zero-pathways'
  },
  {
    id: '6',
    title: '可持续金融趋势',
    description: '洞察ESG投资和绿色金融发展趋势，把握可持续发展投资机遇。',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=240&fit=crop',
    category: '金融趋势',
    actionText: '阅读全文',
    href: '/insights/sustainable-finance'
  },
  {
    id: '7',
    title: '碳边境调节机制分析',
    description: '深度解读欧盟CBAM对全球贸易的影响，助力企业应对新挑战。',
    image: 'https://images.unsplash.com/photo-1594736797933-d0fba3253567?w=400&h=240&fit=crop',
    category: '贸易政策',
    actionText: '获取分析',
    href: '/insights/cbam-analysis'
  },
  {
    id: '8',
    title: '自然气候解决方案',
    description: '探索基于自然的气候解决方案，发现生态保护与碳减排的双重价值。',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=240&fit=crop',
    category: '创新解决方案',
    actionText: '探索更多',
    href: '/insights/nature-based-solutions'
  }
]

// 多语言内容
const carbonInsightsTranslations = {
  'zh-CN': {
    title: '碳智观察',
    subtitle: '深度洞察碳市场动态，把握可持续发展机遇',
    exploreMore: '探索更多洞察'
  },
  'en': {
    title: 'Carbon Insights',
    subtitle: 'Deep insights into carbon market dynamics, seizing sustainable development opportunities',
    exploreMore: 'Explore More Insights'
  },
  'de': {
    title: 'Carbon Einblicke',
    subtitle: 'Tiefe Einblicke in die Dynamik des Kohlenstoffmarktes, nachhaltige Entwicklungschancen nutzen',
    exploreMore: 'Weitere Einblicke erkunden'
  },
  'fr': {
    title: 'Perspectives Carbone',
    subtitle: 'Aperçus approfondis de la dynamique du marché du carbone, saisir les opportunités de développement durable',
    exploreMore: 'Explorer plus de perspectives'
  }
}

export default function CarbonInsights() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = carbonInsightsTranslations[language]
  
  // 防止重复渲染
  useEffect(() => {
    setIsComponentMounted(true)
    
    // 清理函数确保组件卸载时清理状态
    return () => {
      setIsComponentMounted(false)
    }
  }, [])
  
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1   // mobile small
      if (window.innerWidth < 768) return 2   // mobile large
      if (window.innerWidth < 1024) return 3  // tablet
      return 4 // desktop
    }
    return 4 // default/server-side
  }

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardsPerView = getCardsPerView()
      const cardWidth = scrollContainerRef.current.offsetWidth / cardsPerView
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    const cardsPerView = getCardsPerView()
    const scrollStep = cardsPerView >= 4 ? 2 : 1  // 桌面端每次滚动2个，其他每次1个
    const newIndex = Math.max(0, currentIndex - scrollStep)
    scrollToIndex(newIndex)
  }

  const scrollRight = () => {
    const cardsPerView = getCardsPerView()
    const scrollStep = cardsPerView >= 4 ? 2 : 1  // 桌面端每次滚动2个，其他每次1个
    const maxIndex = insightCards.length - cardsPerView
    const newIndex = Math.min(maxIndex, currentIndex + scrollStep)
    scrollToIndex(newIndex)
  }

  const cardsPerView = getCardsPerView()
  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < insightCards.length - cardsPerView

  // 防止重复渲染 - 只在组件挂载后渲染
  if (!isComponentMounted) {
    return (
      <section className="py-20 bg-background-secondary">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-semibold text-text-primary mb-4">
              {t.title}
            </h2>
            <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-display-md font-semibold text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative">
          {/* Left Arrow */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background-primary rounded-full shadow-soft border border-secondary-100 flex items-center justify-center text-text-muted hover:text-primary-600 hover:shadow-medium transition-all duration-200 group"
                style={{ marginLeft: '-24px' }}
              >
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right Arrow */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background-primary rounded-full shadow-soft border border-secondary-100 flex items-center justify-center text-text-muted hover:text-primary-600 hover:shadow-medium transition-all duration-200 group"
                style={{ marginRight: '-24px' }}
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {insightCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <Link href={card.href}>
                  <div className="bg-background-primary rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={card.image}
                        alt={card.title}
                        className="w-full h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-background-primary/90 backdrop-blur-sm text-primary-600 text-body-xs font-medium px-3 py-1 rounded-md">
                          {card.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-heading-sm font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-text-secondary text-body-sm leading-relaxed mb-4 line-clamp-3">
                        {card.description}
                      </p>
                      
                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center text-primary-600 font-medium text-body-sm group-hover:text-primary-700 transition-colors">
                          {card.actionText}
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(insightCards.length / cardsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary-600 w-8' 
                  : 'bg-secondary-300 hover:bg-secondary-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/insights"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-button-md min-h-[44px]"
          >
            {t.exploreMore}
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

    </section>
  )
}