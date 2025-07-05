import Link from 'next/link'

export default function TeamCareers() {
  const openPositions = [
    {
      title: 'Senior Climate Scientist',
      department: 'Climate Science',
      location: 'Zurich, Switzerland',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead climate research and carbon market development initiatives.'
    },
    {
      title: 'Full Stack Developer',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Build and maintain digital platforms for climate solutions.'
    },
    {
      title: 'Project Manager',
      department: 'Project Development',
      location: 'Singapore',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Manage climate projects across Asia-Pacific region.'
    },
    {
      title: 'Business Development Manager',
      department: 'Business Development',
      location: 'New York, USA',
      type: 'Full-time',
      level: 'Senior',
      description: 'Drive growth and partnerships in North American markets.'
    }
  ]

  const careerPaths = [
    {
      title: 'Climate Science Track',
      description: 'From analyst to lead scientist, driving climate research and policy',
      levels: ['Climate Analyst', 'Climate Scientist', 'Senior Scientist', 'Lead Scientist', 'Chief Climate Officer'],
      icon: '🔬'
    },
    {
      title: 'Technology Track',
      description: 'Building the digital infrastructure for global climate action',
      levels: ['Developer', 'Senior Developer', 'Tech Lead', 'Engineering Manager', 'CTO'],
      icon: '💻'
    },
    {
      title: 'Project Management Track',
      description: 'Leading climate projects from conception to global implementation',
      levels: ['Project Coordinator', 'Project Manager', 'Senior PM', 'Program Director', 'VP Operations'],
      icon: '🌱'
    },
    {
      title: 'Business Track',
      description: 'Expanding climate solutions through strategic partnerships and growth',
      levels: ['Business Analyst', 'Manager', 'Senior Manager', 'Director', 'VP Business Development'],
      icon: '📈'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to make a difference? Join our global team of climate experts and help 
            accelerate the world's transition to a sustainable future. We're always looking 
            for passionate individuals who share our mission.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Meaningful Impact
            </h3>
            <p className="text-gray-600">
              Work on projects that directly contribute to global climate action and create lasting positive change for the planet.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Growth & Learning
            </h3>
            <p className="text-gray-600">
              Continuous opportunities for professional development, skill building, and career advancement in the growing climate sector.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Global Community
            </h3>
            <p className="text-gray-600">
              Be part of a diverse, international team working together across borders to tackle humanity's greatest challenge.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h3>
            <p className="text-gray-600">
              Current opportunities to join our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {position.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {position.department}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        {position.level}
                      </span>
                    </div>
                  </div>
                  <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full">
                    {position.type}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {position.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {position.location}
                  </div>
                  <Link 
                    href={`/careers/${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                  >
                    Apply Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/careers"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              View All Positions
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Career Paths */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Career Development Paths
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We support your professional growth with clear career progression 
              paths and opportunities to develop expertise in your chosen field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerPaths.map((path, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">{path.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {path.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {path.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {path.levels.map((level, levelIndex) => (
                    <div key={levelIndex} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${levelIndex === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                      <span className={`text-sm ${levelIndex === 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join our mission to accelerate the world's transition to a climate-positive future. 
              Together, we can create meaningful impact for our planet and future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/careers"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Explore Careers
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Talk to Talent Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}