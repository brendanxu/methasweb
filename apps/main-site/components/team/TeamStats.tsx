import { CompanyStat } from '@/lib/types'

interface TeamStatsProps {
  stats: CompanyStat[]
}

export default function TeamStats({ stats }: TeamStatsProps) {
  const teamStats = [
    {
      id: '1',
      label: 'Team Members',
      value: '800+',
      description: 'Climate experts working globally',
      iconUrl: '',
      displayOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '2',
      label: 'Countries',
      value: '20+',
      description: 'Global presence across continents',
      iconUrl: '',
      displayOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '3',
      label: 'Languages Spoken',
      value: '40+',
      description: 'Multilingual team for global reach',
      iconUrl: '',
      displayOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '4',
      label: 'Years Combined Experience',
      value: '10,000+',
      description: 'Collective climate expertise',
      iconUrl: '',
      displayOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '5',
      label: 'PhD & Masters',
      value: '60%',
      description: 'Advanced degree holders',
      iconUrl: '',
      displayOrder: 5,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '6',
      label: 'Female Leadership',
      value: '45%',
      description: 'Women in leadership positions',
      iconUrl: '',
      displayOrder: 6,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  ]

  const displayStats = stats.length > 0 ? stats : teamStats

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Team by the Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A diverse, experienced, and passionate team of climate professionals 
            working together to create meaningful environmental impact worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayStats.map((stat, index) => (
            <div key={stat.id} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {getStatIcon(index)}
              </div>
              
              {/* Value */}
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Drives Our Team
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our shared values and commitment to excellence unite us in our mission 
              to create a climate-positive future for all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Purpose-Driven',
                description: 'Every team member is motivated by our climate mission'
              },
              {
                icon: '🌍',
                title: 'Global Mindset',
                description: 'Thinking globally while acting locally in our communities'
              },
              {
                icon: '🔬',
                title: 'Science-Based',
                description: 'Evidence-driven approach to all our climate solutions'
              },
              {
                icon: '🤝',
                title: 'Collaborative',
                description: 'Working together across borders and disciplines'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function getStatIcon(index: number) {
  const icons = [
    // Team Members
    <svg key="team-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    // Countries
    <svg key="countries-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Languages
    <svg key="languages-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>,
    // Experience
    <svg key="experience-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Education
    <svg key="education-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>,
    // Diversity
    <svg key="diversity-icon" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ]
  
  return icons[index % icons.length]
}