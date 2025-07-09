'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
// Using inline SVG instead of lucide-react
import { useLanguage } from '../../contexts/LanguageContext'

/**
 * Professional Hero Section with Video Background
 * Following Southpole.com design standards with blue overlay
 * 
 * Features:
 * - Full-screen immersive design (100vh)
 * - Video background with static image fallback
 * - Blue gradient overlay for text readability
 * - Staggered text animations
 * - Responsive design with mobile optimization
 * - Performance optimized with lazy loading
 * - Ken Burns effect for static images
 * - Smart device/network detection for video fallback
 * 
 * Content:
 * - Title: 专业的碳中和解决方案提供商
 * - Subtitle: 助力企业实现双碳目标，构建可持续发展未来
 * - CTA: 查看案例详情
 * 
 * Last updated: 2025-01-10
 */

// Animation variants for text entrance
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Background component that handles video/image switching
const HeroBackground: React.FC = () => {
  const [useVideo, setUseVideo] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Detect mobile devices or slow connections
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const slowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                          (navigator as any).connection?.effectiveType === '2g'
    
    if (isMobile || slowConnection) {
      setUseVideo(false)
    }
    
    // Simulate loading time for smooth transition
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-black/20" />
      </div>
    )
  }

  return (
    <>
      {useVideo ? (
        // Video Background for Desktop
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <video 
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&auto=format&q=75"
            onError={() => setUseVideo(false)}
          >
            <source src="/videos/hero-climate-action.mp4" type="video/mp4" />
            <source src="/videos/hero-climate-action.webm" type="video/webm" />
          </video>
        </motion.div>
      ) : (
        // Static Image Background with Ken Burns Effect
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&auto=format&q=75)'
          }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: 1.1, 
            opacity: 1 
          }}
          transition={{ 
            scale: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 1 }
          }}
        />
      )}
      
      {/* Deep Blue Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-900/70 via-primary-900/85 to-primary-900/70" />
    </>
  )
}

// Scroll indicator component
const ScrollIndicator: React.FC = () => {
  const { t } = useLanguage()
  
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={handleScrollClick}
    >
      <div className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300">
        <span className="text-sm font-medium">{t('discoverImpact')}</span>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Hero Component
export default function HomepageHero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <HeroBackground />

      {/* Content Layer */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto"
            style={{ 
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              fontWeight: 700,
              lineHeight: 1.2
            }}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {t('heroTitle')}
          </motion.h1>

          {/* Subtitle Lines */}
          <div className="mt-6 max-w-2xl mx-auto">
            <motion.p 
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontWeight: 400,
                lineHeight: 1.5
              }}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              {t('heroSubtitleLine1')}
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontWeight: 400,
                lineHeight: 1.5
              }}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              {t('heroSubtitleLine2')}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/work">
              <motion.button
                className="inline-flex items-center justify-center px-10 py-4 bg-primary-600 text-white font-medium text-lg rounded-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
                whileHover={{ 
                  backgroundColor: '#2563EB',
                  y: -2,
                  boxShadow: '0 6px 30px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {t('exploreButton')}
                <motion.svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}