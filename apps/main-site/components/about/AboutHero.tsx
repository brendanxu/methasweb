import { CompanyInfo } from '@/lib/types'
import Link from 'next/link'

interface AboutHeroProps {
  data?: CompanyInfo
}

export default function AboutHero({ data }: AboutHeroProps) {
  const title = data?.title || "Leading climate impact since 2006"
  const subtitle = data?.subtitle || "We help organizations and communities achieve their climate goals"
  const content = data?.content || "South Pole is a leading provider of global sustainability solutions and services. Since 2006, we have helped organizations and communities achieve their climate goals through comprehensive climate action strategies, carbon market solutions, and sustainable development projects."
  const imageUrl = data?.imageUrl || "https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1600&h=900&fit=crop"
  const ctaText = data?.ctaText || "Learn About Our Impact"
  const ctaUrl = data?.ctaUrl || "/work"

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
              {subtitle}
            </p>
          )}
          
          <div className="prose prose-lg prose-invert max-w-3xl mb-12">
            <p className="text-gray-200 leading-relaxed">
              {content}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={ctaUrl}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {ctaText}
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}