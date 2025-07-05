export default function ServicesApproach() {
  const approaches = [
    {
      title: 'Science-Based Solutions',
      description: 'All our solutions are grounded in the latest climate science and aligned with international standards and frameworks.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        'IPCC-aligned methodologies',
        'Peer-reviewed research',
        'International standards compliance',
        'Continuous scientific updates'
      ]
    },
    {
      title: 'Technology-Enabled',
      description: 'We leverage cutting-edge technology to enhance transparency, efficiency, and impact measurement across all our services.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      features: [
        'Digital MRV platforms',
        'Satellite monitoring',
        'Blockchain verification', 
        'AI-powered analytics'
      ]
    },
    {
      title: 'Partnership-Driven',
      description: 'We believe in collaborative approaches, working closely with clients, communities, and stakeholders to deliver shared value.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        'Multi-stakeholder engagement',
        'Community co-benefits',
        'Long-term partnerships',
        'Transparent communication'
      ]
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine scientific rigor, technological innovation, and collaborative partnerships 
            to deliver climate solutions that create lasting impact.
          </p>
        </div>

        {/* Approaches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {approaches.map((approach, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {approach.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {approach.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {approach.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {approach.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Standards & Certifications */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Standards & Certifications
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We adhere to the highest international standards and maintain certifications 
              that ensure quality, transparency, and credibility in all our work.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'VCS', description: 'Verified Carbon Standard' },
              { name: 'Gold Standard', description: 'Gold Standard for Global Goals' },
              { name: 'CDM', description: 'Clean Development Mechanism' },
              { name: 'SBTi', description: 'Science Based Targets initiative' },
              { name: 'GHG Protocol', description: 'Greenhouse Gas Protocol' },
              { name: 'ISO 14064', description: 'ISO Standard for GHG Quantification' }
            ].map((standard, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="text-blue-600 font-bold text-xs">{standard.name}</span>
                </div>
                <p className="text-gray-600 text-xs">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose South Pole
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '18+ Years Experience',
                description: 'Pioneer in climate solutions since 2006',
                icon: '🏆'
              },
              {
                title: '800+ Experts',
                description: 'Global team of climate professionals',
                icon: '👥'
              },
              {
                title: '700+ Projects',
                description: 'Delivered across 20+ countries',
                icon: '🌍'
              },
              {
                title: '50M+ CO₂ Reduced',
                description: 'Measurable climate impact achieved',
                icon: '📊'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {stat.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}