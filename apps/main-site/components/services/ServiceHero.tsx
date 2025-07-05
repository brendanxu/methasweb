import { Service } from '@/lib/types'
import Link from 'next/link'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-green-600 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-blue-100">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="text-blue-300">/</li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            </li>
            <li className="text-blue-300">/</li>
            <li className="text-white font-medium">{service.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-2xl mr-2">{service.icon || '🌱'}</span>
              <span className="text-white font-medium">Featured Service</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {service.name}
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {service.fullDescription || service.description}
            </p>

            {/* Key Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Key Benefits:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.slice(0, 4).map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-blue-100">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="#overview"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Learn More
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-6xl">{service.icon || '🌱'}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-blue-100 mb-6">
                  Join thousands of organizations creating meaningful climate impact.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-blue-200 text-sm">Expert Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1000+</div>
                    <div className="text-blue-200 text-sm">Clients Served</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Learn more</span>
          <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}