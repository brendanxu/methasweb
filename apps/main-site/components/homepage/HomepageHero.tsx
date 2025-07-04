import Link from 'next/link'

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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video - Desktop */}
      <div className="absolute inset-0 z-0">
        {/* Video for desktop (hidden on mobile for performance) */}
        <video 
          className="hidden md:block w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop"
        >
          {/* Replace these with actual video files when available */}
          <source src="/videos/hero-climate-action.mp4" type="video/mp4" />
          <source src="/videos/hero-climate-action.webm" type="video/webm" />
          
          {/* Fallback image for browsers that don't support video */}
          <img 
            src="https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop"
            alt="Climate action"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Static background image for mobile */}
        <div 
          className="md:hidden w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Leading the Way in 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg">
                {" "}Climate Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-xl">
              Since 2006, we've helped organizations accelerate their transition to a 
              net-zero future through comprehensive climate action strategies and solutions.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">18+</div>
                <div className="text-green-300 text-sm drop-shadow-md">Years Leading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">50M+</div>
                <div className="text-green-300 text-sm drop-shadow-md">CO₂ Reduced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">1000+</div>
                <div className="text-green-300 text-sm drop-shadow-md">Clients Served</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 group"
              >
                Explore Our Solutions
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200"
              >
                Start Your Journey
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 opacity-80">Discover our impact</span>
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}