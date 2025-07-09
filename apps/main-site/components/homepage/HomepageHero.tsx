'use client'

import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

/**
 * Hero Section with Video Background
 * 
 * To add real video files:
 * 1. Place your video files in the public/videos/ directory
 * 2. Replace the placeholder paths in the <source> tags:
 *    - /videos/hero-climate-action.mp4
 *    - /videos/hero-climate-action.webm
 * 3. Recommended video specifications:
 *    - Duration: 10-30 seconds (loops automatically)
 *    - Resolution: 1920x1080 minimum for desktop
 *    - Format: MP4 (H.264) and WebM for browser compatibility
 *    - File size: Keep under 5MB for good performance
 * 4. Consider creating mobile-optimized versions for better performance
 */
export default function HomepageHero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Desktop */}
      <div className="absolute inset-0 z-0" style={{ left: 0, right: 0 }}>
        {/* Video for desktop (hidden on mobile for performance) */}
        <video 
          className="hidden md:block w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop&auto=format&q=75"
        >
          {/* Replace these with actual video files when available */}
          <source src="/videos/hero-climate-action.mp4" type="video/mp4" />
          <source src="/videos/hero-climate-action.webm" type="video/webm" />
          
          {/* Fallback image for browsers that don't support video */}
          <img 
            src="https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop&auto=format&q=75"
            alt="Climate action"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </video>
        
        {/* Static background image for mobile */}
        <div 
          className="md:hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=800&h=1200&fit=crop&auto=format&q=75)'
          }}
        ></div>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-1"></div>
      </div>


      {/* Content */}
      <div className="relative z-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-hero-lg md:text-hero-xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {t('heroTitle')}
            </h1>
            
            <p className="text-body-lg md:text-heading-md text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              {t('heroSubtitle')}
            </p>

            {/* Key Highlights - Professional spacing using 8px grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="text-center px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>18+</div>
                <div className="text-white/80 text-sm md:text-base leading-relaxed">{t('yearsLeading')}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>50M+</div>
                <div className="text-white/80 text-sm md:text-base leading-relaxed">{t('co2Reduced')}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>1000+</div>
                <div className="text-white/80 text-sm md:text-base leading-relaxed">{t('clientsServed')}</div>
              </div>
            </div>

            {/* CTA Buttons - Professional alignment and spacing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <Link 
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-500 font-semibold rounded-full hover:bg-gray-50 hover:text-primary-600 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base min-h-[52px]"
              >
                {t('exploreButton')}
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-500 transition-all duration-300 hover:-translate-y-0.5 text-base min-h-[52px]"
              >
                {t('startButton')}
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 opacity-80">{t('discoverImpact')}</span>
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}