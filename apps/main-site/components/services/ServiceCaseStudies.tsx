import { Service } from '@/lib/types'
import Link from 'next/link'

interface ServiceCaseStudiesProps {
  service: Service
}

export default function ServiceCaseStudies({ service }: ServiceCaseStudiesProps) {
  const caseStudies = [
    {
      id: '1',
      title: 'Global Tech Company Achieves Carbon Neutrality',
      client: 'Fortune 500 Technology Company',
      impact: '1.2M tonnes CO₂ offset',
      description: 'Comprehensive carbon offsetting program across 15 countries.',
      image: 'https://images.unsplash.com/photo-1518134154094-e56e3c50c4b1?w=600&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Manufacturing Giant Reduces Emissions by 40%',
      client: 'Leading Manufacturing Company',
      impact: '40% emission reduction',
      description: 'Implemented renewable energy and efficiency improvements.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Financial Institution Sets Science-Based Targets',
      client: 'International Banking Group',
      impact: 'Net-zero by 2030',
      description: 'Developed comprehensive decarbonization strategy.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how organizations like yours have achieved their climate goals with our {service.name.toLowerCase()} solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-48">
                <img 
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {study.impact}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                
                <p className="text-blue-600 font-medium text-sm mb-3">
                  {study.client}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {study.description}
                </p>

                <Link 
                  href={`/work/${study.id}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Read Case Study
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {service.name} Impact
            </h3>
            <p className="text-gray-600">
              Real results from our {service.name.toLowerCase()} solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15M+</div>
              <div className="text-gray-600 text-sm">CO₂ Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-gray-600 text-sm">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 text-sm">Success Rate</div>
            </div>
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/work"
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            View All Case Studies
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}