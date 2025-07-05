import { Service } from '@/lib/types'

interface ServiceProcessProps {
  service: Service
}

export default function ServiceProcess({ service }: ServiceProcessProps) {
  const defaultProcess = [
    {
      id: '1',
      step: 1,
      title: 'Assessment',
      description: 'Comprehensive analysis of your current situation and goals',
      duration: '1-2 weeks'
    },
    {
      id: '2',
      step: 2,
      title: 'Strategy Development',
      description: 'Create a customized roadmap tailored to your specific needs',
      duration: '2-3 weeks'
    },
    {
      id: '3',
      step: 3,
      title: 'Implementation',
      description: 'Execute the plan with our expert team and proven methodologies',
      duration: '4-12 weeks'
    },
    {
      id: '4',
      step: 4,
      title: 'Monitoring & Optimization',
      description: 'Continuous tracking and improvement for maximum impact',
      duration: 'Ongoing'
    }
  ]

  const processSteps = service.process || defaultProcess

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven, systematic approach that ensures successful implementation and measurable results.
          </p>
        </div>

        <div className="relative">
          {/* Process Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1 lg:max-w-lg">
                  <div className={`bg-white rounded-2xl p-8 shadow-lg ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-lg font-bold mb-4">
                      {step.step}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {step.duration && (
                      <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {step.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 hidden lg:block">
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                {/* Visual Element */}
                <div className="flex-1 lg:max-w-lg">
                  <div className="bg-gray-50 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">
                        {index === 0 ? '🔍' : index === 1 ? '📋' : index === 2 ? '⚡' : '📈'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Step {step.step} of {processSteps.length}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-blue-50 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is ready to guide you through each step of the process 
              and ensure successful implementation of your climate strategy.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Journey
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}