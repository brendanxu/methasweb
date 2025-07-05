import { Service } from '@/lib/types'
import Link from 'next/link'

interface ServicesOverviewProps {
  services: Service[]
}

export default function ServicesOverview({ services }: ServicesOverviewProps) {
  const displayServices = services.length > 0 ? services : [
    {
      id: '1',
      name: 'Carbon Offsetting',
      slug: 'carbon-offsetting',
      description: 'High-quality carbon credits and offset solutions to neutralize your unavoidable emissions and support sustainable development projects worldwide.',
      icon: '🌱'
    },
    {
      id: '2',
      name: 'Net Zero Strategy',
      slug: 'net-zero-strategy',
      description: 'Science-based decarbonization roadmaps to help your organization achieve net-zero emissions by 2050 or earlier.',
      icon: '🎯'
    },
    {
      id: '3',
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Clean energy procurement, development, and financing solutions to power your business with 100% renewable electricity.',
      icon: '⚡'
    },
    {
      id: '4',
      name: 'Sustainability Consulting',
      slug: 'sustainability-consulting',
      description: 'Strategic sustainability advisory services to integrate climate action into your core business strategy and operations.',
      icon: '📊'
    },
    {
      id: '5',
      name: 'Carbon Accounting',
      slug: 'carbon-accounting',
      description: 'Comprehensive carbon footprint measurement, reporting, and management solutions aligned with international standards.',
      icon: '📈'
    },
    {
      id: '6',
      name: 'Nature-Based Solutions',
      slug: 'nature-based-solutions',
      description: 'Forest conservation, reforestation, and ecosystem restoration projects that deliver climate and biodiversity benefits.',
      icon: '🌳'
    }
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From strategy to implementation, we provide end-to-end climate solutions 
            tailored to your organization's unique needs and sustainability goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayServices.map((service, index) => (
            <div key={service.id} className="group">
              <Link href={`/services/${service.slug}`}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group-hover:border-green-200">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{service.icon || getServiceIcon(index)}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Learn More</span>
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Every organization's climate journey is unique. Our experts work with you 
              to develop tailored solutions that meet your specific sustainability goals and business objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Speak with an Expert
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/work"
                className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getServiceIcon(index: number) {
  const icons = ['🌱', '🎯', '⚡', '📊', '📈', '🌳']
  return icons[index % icons.length]
}