import { CompanyStat } from '@/lib/types'

interface HomepageStatsProps {
  stats: CompanyStat[]
}

export default function HomepageStats({ stats }: HomepageStatsProps) {
  const defaultStats = [
    {
      id: '1',
      label: 'CO₂ Reduced',
      value: '50M+',
      description: 'Tonnes of CO₂ equivalent reduced worldwide',
      iconUrl: '',
      displayOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '2',
      label: 'Global Projects',
      value: '700+',
      description: 'Climate projects delivered across 20+ countries',
      iconUrl: '',
      displayOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '3',
      label: 'Expert Team',
      value: '800+',
      description: 'Climate professionals working globally',
      iconUrl: '',
      displayOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '4',
      label: 'Years Experience',
      value: '18+',
      description: 'Leading climate action since 2006',
      iconUrl: '',
      displayOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  ]

  const displayStats = stats.length > 0 ? stats.slice(0, 4) : defaultStats

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Global Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Since 2006, we've been delivering measurable climate impact through 
            innovative solutions and strategic partnerships worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <div key={stat.id} className="text-center group">
              {/* Animated Counter */}
              <div className="relative mb-4">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
                  {stat.value}
                </div>
                
                {/* Floating Icon */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {getStatIcon(index)}
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${75 + (index * 5)}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gray-50 rounded-full px-8 py-4">
            <span className="text-gray-700 mr-4">Ready to create your own impact?</span>
            <a 
              href="/contact"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function getStatIcon(index: number) {
  const icons = [
    // CO2 Reduced
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>,
    // Projects
    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Team
    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    // Experience
    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ]
  
  return icons[index % icons.length]
}