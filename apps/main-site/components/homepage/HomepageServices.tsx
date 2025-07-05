import { Service } from '@/lib/types'
import Link from 'next/link'

interface HomepageServicesProps {
  services: Service[]
}

export default function HomepageServices({ services }: HomepageServicesProps) {
  const defaultServices = [
    {
      id: '1',
      name: 'Carbon Offsetting',
      slug: 'carbon-offsetting',
      description: 'High-quality carbon credits and offset solutions to neutralize your unavoidable emissions.',
      icon: '🌱'
    },
    {
      id: '2', 
      name: 'Net Zero Strategy',
      slug: 'net-zero-strategy',
      description: 'Science-based decarbonization roadmaps to achieve net-zero emissions by 2050.',
      icon: '🎯'
    },
    {
      id: '3',
      name: 'Renewable Energy',
      slug: 'renewable-energy', 
      description: 'Clean energy procurement and development solutions for 100% renewable electricity.',
      icon: '⚡'
    },
    {
      id: '4',
      name: 'Nature-Based Solutions',
      slug: 'nature-based-solutions',
      description: 'Forest conservation and ecosystem restoration projects delivering climate benefits.',
      icon: '🌳'
    }
  ]

  const displayServices = services.length > 0 ? services.slice(0, 4) : defaultServices

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Climate Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive climate action strategies that enable organizations 
            to reduce emissions, offset their impact, and build a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displayServices.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  Learn More →
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
            View All Services
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}