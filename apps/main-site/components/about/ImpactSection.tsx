import { CompanyInfo } from '@/lib/types'
import Link from 'next/link'

interface ImpactSectionProps {
  data?: CompanyInfo
}

export default function ImpactSection({ data }: ImpactSectionProps) {
  const title = data?.title || "Creating Real Impact"
  const subtitle = data?.subtitle || "Measurable climate action across the globe"
  const content = data?.content || "Our impact extends far beyond carbon reduction. We create lasting positive change for communities, ecosystems, and organizations worldwide through innovative climate solutions."

  const impactAreas = [
    {
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Carbon Reduction",
      value: "50M+",
      unit: "tonnes CO₂e",
      description: "Total carbon emissions reduced through our projects and initiatives worldwide."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Projects",
      value: "700+",
      unit: "projects",
      description: "Climate and sustainability projects developed and implemented across 20+ countries."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Lives Improved",
      value: "2M+",
      unit: "people",
      description: "Communities and individuals positively impacted through sustainable development projects."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Organizations Served",
      value: "1000+",
      unit: "clients",
      description: "Companies and institutions helped achieve their sustainability and climate goals."
    }
  ]

  const sdgGoals = [
    { number: 7, title: "Affordable and Clean Energy", color: "bg-yellow-500" },
    { number: 11, title: "Sustainable Cities and Communities", color: "bg-orange-500" },
    { number: 12, title: "Responsible Consumption", color: "bg-yellow-600" },
    { number: 13, title: "Climate Action", color: "bg-green-600" },
    { number: 15, title: "Life on Land", color: "bg-green-500" },
    { number: 17, title: "Partnerships for the Goals", color: "bg-blue-600" }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-blue-600 font-semibold mb-6">
              {subtitle}
            </p>
          )}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content}
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactAreas.map((area, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {area.icon}
              </div>
              
              {/* Metric */}
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-1">
                  {area.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  {area.unit}
                </div>
              </div>
              
              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Stories */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Impact Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Forest Restoration</h4>
              <p className="text-gray-600 mb-4">
                Our reforestation projects in Brazil have planted over 5 million trees, 
                restoring 50,000 hectares of degraded land and creating jobs for local communities.
              </p>
              <Link href="/projects/forest-restoration" className="text-blue-600 font-semibold hover:text-blue-700">
                Learn more →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Clean Energy Access</h4>
              <p className="text-gray-600 mb-4">
                Solar energy projects in rural Africa provide clean electricity to 100,000+ people, 
                replacing kerosene lamps and reducing indoor air pollution.
              </p>
              <Link href="/projects/solar-africa" className="text-blue-600 font-semibold hover:text-blue-700">
                Learn more →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Corporate Net Zero</h4>
              <p className="text-gray-600 mb-4">
                We've helped 500+ companies set science-based targets and develop comprehensive 
                strategies to achieve net-zero emissions by 2050.
              </p>
              <Link href="/services/net-zero" className="text-blue-600 font-semibold hover:text-blue-700">
                Learn more →
              </Link>
            </div>
          </div>
        </div>

        {/* UN SDG Alignment */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Contributing to Global Goals
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our work directly supports the United Nations Sustainable Development Goals, 
            creating positive impact that extends beyond climate action.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sdgGoals.map((goal) => (
              <div key={goal.number} className="text-center group">
                <div className={`w-20 h-20 ${goal.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl font-bold text-white">{goal.number}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium leading-tight">
                  {goal.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Impact?
            </h3>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of organizations worldwide who are creating meaningful climate action. 
              Let's build a sustainable future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Start Your Journey
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/work"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}