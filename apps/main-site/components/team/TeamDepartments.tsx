interface Department {
  id: string
  name: string
  description: string
  teamSize: number
  icon: string
  expertise: string[]
}

interface TeamDepartmentsProps {
  departments: Department[]
}

export default function TeamDepartments({ departments }: TeamDepartmentsProps) {
  const defaultDepartments = [
    {
      id: '1',
      name: 'Climate Science',
      description: 'Leading climate research, carbon market development, and scientific advisory services.',
      teamSize: 120,
      icon: '🔬',
      expertise: ['Climate Modeling', 'Carbon Markets', 'Scientific Research', 'Policy Analysis']
    },
    {
      id: '2',
      name: 'Technology & Innovation',
      description: 'Developing cutting-edge digital solutions and platforms for climate action.',
      teamSize: 85,
      icon: '💻',
      expertise: ['Digital Platforms', 'Data Analytics', 'Blockchain', 'AI/ML Solutions']
    },
    {
      id: '3',
      name: 'Project Development',
      description: 'Creating and managing climate projects worldwide, from conception to implementation.',
      teamSize: 150,
      icon: '🌱',
      expertise: ['Project Management', 'Impact Assessment', 'Community Engagement', 'Monitoring & Verification']
    },
    {
      id: '4',
      name: 'Business Development',
      description: 'Building partnerships and expanding our global reach to maximize climate impact.',
      teamSize: 95,
      icon: '🤝',
      expertise: ['Partnership Development', 'Market Analysis', 'Strategic Planning', 'Client Relations']
    },
    {
      id: '5',
      name: 'Finance & Operations',
      description: 'Managing financial strategy, operations, and ensuring sustainable business growth.',
      teamSize: 70,
      icon: '📊',
      expertise: ['Financial Planning', 'Risk Management', 'Operations Optimization', 'Compliance']
    },
    {
      id: '6',
      name: 'Communications',
      description: 'Sharing our climate message and engaging stakeholders across global audiences.',
      teamSize: 45,
      icon: '📢',
      expertise: ['Content Strategy', 'Public Relations', 'Digital Marketing', 'Stakeholder Engagement']
    }
  ]

  const displayDepartments = departments.length > 0 ? departments : defaultDepartments

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Departments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cross-functional teams working together to deliver comprehensive climate solutions. 
            Each department brings specialized expertise and collaborative spirit to our mission.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayDepartments.map((dept) => (
            <div key={dept.id} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {dept.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{dept.teamSize}</div>
                  <div className="text-gray-500 text-sm">Team Members</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {dept.name}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {dept.description}
              </p>

              {/* Expertise Tags */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.expertise.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Section */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Cross-Departmental Collaboration
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our departments work seamlessly together, combining expertise to deliver 
              innovative climate solutions that create lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Daily Standups
              </h4>
              <p className="text-gray-600 text-sm">
                Regular cross-team communication and alignment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Shared Projects
              </h4>
              <p className="text-gray-600 text-sm">
                Multi-disciplinary teams tackling complex challenges
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Knowledge Sharing
              </h4>
              <p className="text-gray-600 text-sm">
                Regular workshops and learning sessions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Innovation Labs
              </h4>
              <p className="text-gray-600 text-sm">
                Experimental projects driving future solutions
              </p>
            </div>
          </div>
        </div>

        {/* Department Stats */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Department Highlights
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {displayDepartments.reduce((sum, dept) => sum + dept.teamSize, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {displayDepartments.length}
              </div>
              <div className="text-gray-600 text-sm">Core Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600 text-sm">Office Locations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Global Operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}