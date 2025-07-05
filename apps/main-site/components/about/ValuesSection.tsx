import { CompanyInfo } from '@/lib/types'

interface ValuesSectionProps {
  data?: CompanyInfo
}

export default function ValuesSection({ data }: ValuesSectionProps) {
  const title = data?.title || "Our Values"
  const subtitle = data?.subtitle || "Integrity, Innovation, and Impact"
  const content = data?.content || "**Integrity**: We maintain the highest standards of environmental and social integrity in everything we do.\n\n**Innovation**: We continuously develop cutting-edge solutions to address the world's most pressing climate challenges.\n\n**Impact**: We measure our success by the positive change we create for the planet and communities."

  // Parse content to extract values
  const values = content.split('\n\n').map(paragraph => {
    const match = paragraph.match(/\*\*(.*?)\*\*:\s*(.*)/)
    if (match) {
      return {
        name: match[1],
        description: match[2]
      }
    }
    return null
  }).filter(Boolean)

  const defaultValues = [
    {
      name: "Integrity",
      description: "We maintain the highest standards of environmental and social integrity in everything we do. Our rigorous verification processes and transparent reporting ensure that every project delivers real, measurable impact."
    },
    {
      name: "Innovation", 
      description: "We continuously develop cutting-edge solutions to address the world's most pressing climate challenges. Our team combines deep expertise with creative thinking to find new pathways to sustainability."
    },
    {
      name: "Impact",
      description: "We measure our success by the positive change we create for the planet and communities. Every project, every partnership, and every solution is designed to deliver meaningful climate impact."
    }
  ]

  const displayValues = values.length > 0 ? values : defaultValues

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-blue-600 font-semibold">
              {subtitle}
            </p>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {displayValues.map((value, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getValueIcon(index)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {value?.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg">
                {value?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Values in Action
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              See how our values guide every project and partnership. Explore our work 
              and discover the real-world impact of our commitment to integrity, innovation, and impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/work"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Our Projects
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="/about/approach"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                Our Approach
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getValueIcon(index: number) {
  const icons = [
    // Integrity
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    // Innovation
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>,
    // Impact
    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ]
  
  return icons[index % icons.length]
}