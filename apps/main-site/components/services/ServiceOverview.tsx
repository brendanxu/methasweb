import { Service } from '@/lib/types'

interface ServiceOverviewProps {
  service: Service
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <section id="overview" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {service.name} Overview
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {service.fullDescription || service.description}
            </p>
            
            {service.benefits && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits:</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Highlights</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-3xl mr-4">⚡</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Implementation</h4>
                  <p className="text-gray-600 text-sm">Quick setup and deployment</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-3xl mr-4">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Results</h4>
                  <p className="text-gray-600 text-sm">Track record of success</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-3xl mr-4">🌍</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Reach</h4>
                  <p className="text-gray-600 text-sm">Available worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}