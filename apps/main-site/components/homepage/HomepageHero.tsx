import Link from 'next/link'

export default function HomepageHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1920&h=1080&fit=crop"
          alt="Climate action"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Leading the Way in 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                {" "}Climate Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
              Since 2006, we've helped organizations accelerate their transition to a 
              net-zero future through comprehensive climate action strategies and solutions.
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">18+</div>
                <div className="text-green-300 text-sm">Years Leading</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">50M+</div>
                <div className="text-green-300 text-sm">CO₂ Reduced</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
                <div className="text-green-300 text-sm">Clients Served</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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

          {/* Right side visual */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              {/* Climate Impact Visual */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Global Climate Impact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Carbon Emissions Reduced</span>
                    <span className="text-green-400 font-bold">50M+ tonnes</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Projects Worldwide</span>
                    <span className="text-blue-400 font-bold">700+ projects</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Countries Reached</span>
                    <span className="text-purple-400 font-bold">20+ countries</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-gray-300 text-sm text-center">
                    Trusted by Fortune 500 companies, governments, and NGOs worldwide
                  </p>
                </div>
              </div>
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