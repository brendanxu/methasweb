import { Service } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'

interface HomepageServicesProps {
  services: Service[]
}

export default function HomepageServices({ services: _ }: HomepageServicesProps) {
  const climateSolutions = [
    {
      id: '1',
      name: 'Climate Action',
      slug: 'climate-action',
      category: 'CARBON OFFSETTING',
      title: 'Climate Action',
      description: 'Comprehensive climate strategies that enable organizations to reduce emissions and achieve net-zero goals.',
      keyPoints: [
        'Carbon footprint assessment and reduction strategies',
        'High-quality carbon credits and offset solutions',
        'Science-based targets and decarbonization roadmaps',
        'Sustainability reporting and compliance support'
      ],
      backgroundImage: '/images/services/climate-action-bg.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1569163139394-de44cb08a22b?auto=format&fit=crop&w=800&h=600'
    },
    {
      id: '2',
      name: 'Climate Finance',
      slug: 'climate-finance',
      category: 'INVESTMENT SOLUTIONS',
      title: 'Climate Finance',
      description: 'Innovative financing mechanisms and investment solutions for climate action and sustainable development.',
      keyPoints: [
        'Green bonds and sustainable finance instruments',
        'Climate risk assessment and adaptation strategies',
        'ESG investment advisory and due diligence',
        'Carbon market development and trading'
      ],
      backgroundImage: '/images/services/climate-finance-bg.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600'
    },
    {
      id: '3',
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      category: 'CLEAN ENERGY PROJECTS',
      title: 'Renewable Energy',
      description: 'Clean energy procurement, development, and renewable electricity solutions for a sustainable future.',
      keyPoints: [
        'Solar, wind, and hydroelectric project development',
        'Corporate renewable energy procurement strategies',
        'Power purchase agreements (PPAs) and energy trading',
        'Grid integration and energy storage solutions'
      ],
      backgroundImage: '/images/services/renewable-energy-bg.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&h=600'
    },
    {
      id: '4',
      name: 'Nature-Based Solutions',
      slug: 'nature-based-solutions',
      category: 'NATURAL CLIMATE SOLUTIONS',
      title: 'Nature-Based Solutions',
      description: 'Forest conservation, reforestation, and ecosystem restoration projects that deliver measurable climate benefits.',
      keyPoints: [
        'REDD+ and forest conservation initiatives',
        'Reforestation and afforestation projects',
        'Wetland restoration and biodiversity protection',
        'Sustainable agriculture and land management'
      ],
      backgroundImage: '/images/services/nature-based-bg.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&h=600'
    }
  ]

  // const displayServices = services.length > 0 ? services.slice(0, 4) : climateSolutions

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Climate Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three areas of expertise that enable organizations to achieve their climate goals 
            through comprehensive, science-based solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {climateSolutions.map((solution) => (
            <Link key={solution.id} href={`/services/${solution.slug}`}>
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[500px] sm:h-[550px] cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={solution.fallbackImage}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                  {/* Category Badge */}
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wide">
                      {solution.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors">
                    {solution.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-200 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {solution.description}
                  </p>
                  
                  {/* Key Points */}
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    {solution.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-xs sm:text-sm text-gray-300">
                        <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center text-blue-300 font-semibold group-hover:text-blue-200 transition-colors">
                    Learn More
                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Explore All Services
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}