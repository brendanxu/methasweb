import { Service } from '@/lib/types'

interface ServiceFeaturesProps {
  service: Service
}

export default function ServiceFeatures({ service }: ServiceFeaturesProps) {
  const defaultFeatures = [
    {
      id: '1',
      title: 'Expert Consultation',
      description: 'Work with our team of climate experts to develop the right strategy for your organization.',
      icon: '👥'
    },
    {
      id: '2',
      title: 'Verified Results',
      description: 'All solutions are verified to international standards and independently audited.',
      icon: '✅'
    },
    {
      id: '3',
      title: 'Ongoing Support',
      description: 'Continuous monitoring, reporting, and optimization to ensure lasting impact.',
      icon: '🔄'
    }
  ]

  const features = service.features || defaultFeatures

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive features designed to deliver maximum impact and value for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">{feature.icon || '🌟'}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}