interface Solution {
  id: string
  title: string
  description: string
  benefits: string[]
  icon: string
}

interface ServicesSolutionsProps {
  solutions: Solution[]
}

export default function ServicesSolutions({ solutions }: ServicesSolutionsProps) {
  const displaySolutions = solutions.length > 0 ? solutions : [
    {
      id: '1',
      title: 'Climate Strategy & Planning',
      description: 'Develop comprehensive climate strategies aligned with science-based targets and international frameworks.',
      benefits: [
        'Science-based target setting',
        'Climate risk assessments', 
        'Decarbonization roadmaps',
        'Policy alignment strategies'
      ],
      icon: '📋'
    },
    {
      id: '2',
      title: 'Carbon Market Solutions',
      description: 'Access high-quality carbon credits and participate in global carbon markets to offset unavoidable emissions.',
      benefits: [
        'Verified carbon credits',
        'Portfolio diversification',
        'Market intelligence',
        'Risk management'
      ],
      icon: '🌍'
    },
    {
      id: '3',
      title: 'Technology & Innovation',
      description: 'Leverage cutting-edge technology and digital solutions to accelerate your climate action.',
      benefits: [
        'Digital MRV platforms',
        'AI-powered analytics',
        'Blockchain verification',
        'IoT monitoring systems'
      ],
      icon: '🚀'
    },
    {
      id: '4',
      title: 'Investment & Financing',
      description: 'Access climate finance and investment opportunities to fund your sustainability transformation.',
      benefits: [
        'Green bonds & loans',
        'Blended finance',
        'Impact investments',
        'Grant funding support'
      ],
      icon: '💰'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Integrated Climate Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our holistic approach combines strategy, technology, and finance to deliver 
            comprehensive climate solutions that drive real impact and business value.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displaySolutions.map((solution, index) => (
            <div key={solution.id} className={`${index % 2 === 0 ? 'lg:mr-4' : 'lg:ml-4'}`}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Icon & Title */}
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl">{solution.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Key Benefits:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Overview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure successful implementation 
              and measurable impact for every climate initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assess',
                description: 'Comprehensive baseline assessment and goal setting'
              },
              {
                step: '02', 
                title: 'Plan',
                description: 'Strategic roadmap development and solution design'
              },
              {
                step: '03',
                title: 'Implement',
                description: 'Project execution and technology deployment'
              },
              {
                step: '04',
                title: 'Monitor',
                description: 'Continuous monitoring, reporting, and optimization'
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {phase.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {phase.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {phase.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-green-200 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}