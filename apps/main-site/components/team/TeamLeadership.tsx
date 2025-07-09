import { TeamMember } from '@/lib/types'
import Link from 'next/link'

interface TeamLeadershipProps {
  leadership: TeamMember[]
}

export default function TeamLeadership({ leadership }: TeamLeadershipProps) {
  const defaultLeadership = [
    {
      id: '1',
      name: 'Renat Heuberger',
      title: 'CEO & Co-Founder',
      department: 'Leadership',
      bio: 'Renat co-founded 碳智METHAS in 2006 and has been driving climate action for over 18 years. He is a recognized expert in carbon markets and climate finance.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/renatheuberger',
      email: 'renat.heuberger@methas.com',
      isLeadership: true,
      displayOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '2',
      name: 'Maximilian Horster',
      title: 'COO & Co-Founder',
      department: 'Leadership',
      bio: 'Maximilian oversees global operations and has been instrumental in 碳智METHAS\'s expansion across 20+ countries.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/maximilianhorster',
      email: 'maximilian.horster@methas.com',
      isLeadership: true,
      displayOrder: 2,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '3',
      name: 'Dr. Sarah Johnson',
      title: 'Chief Climate Officer',
      department: 'Climate Science',
      bio: 'Dr. Johnson leads our climate science initiatives and carbon market development with 15+ years of experience in environmental research.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnsonclimate',
      email: 'sarah.johnson@methas.com',
      isLeadership: true,
      displayOrder: 3,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '4',
      name: 'Michael Chen',
      title: 'Chief Technology Officer',
      department: 'Technology',
      bio: 'Michael drives our digital transformation and technology innovation initiatives, bringing cutting-edge solutions to climate action.',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/michaelchentech',
      email: 'michael.chen@methas.com',
      isLeadership: true,
      displayOrder: 4,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '5',
      name: 'Elena Rodriguez',
      title: 'Chief Financial Officer',
      department: 'Finance',
      bio: 'Elena manages our global financial strategy and sustainable finance initiatives, ensuring strong fiscal health and responsible growth.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/elenarodriguezfinance',
      email: 'elena.rodriguez@methas.com',
      isLeadership: true,
      displayOrder: 5,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '6',
      name: 'David Kim',
      title: 'Chief Strategy Officer',
      department: 'Strategy',
      bio: 'David leads our strategic planning and business development efforts, identifying new opportunities for climate impact and growth.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      linkedinUrl: 'https://linkedin.com/in/davidkimstrategy',
      email: 'david.kim@methas.com',
      isLeadership: true,
      displayOrder: 6,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  ]

  const displayLeadership = leadership.length > 0 ? leadership.slice(0, 6) : defaultLeadership

  return (
    <section id="leadership" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced leaders guiding 碳智METHAS's mission to accelerate 
            the transition to a climate-positive world. Together, they bring decades 
            of expertise in climate science, business strategy, and global operations.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayLeadership.map((leader) => (
            <div key={leader.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Profile Image */}
              <div className="relative">
                <img 
                  src={leader.imageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face`}
                  alt={leader.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    {leader.linkedinUrl && (
                      <a 
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {leader.email && (
                      <a 
                        href={`mailto:${leader.email}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {leader.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  {leader.title}
                </p>
                {leader.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {leader.bio}
                  </p>
                )}
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {leader.department}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    Leadership
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <div className="bg-white rounded-2xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Philosophy
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our leaders embody the values and vision that drive our organization forward, 
              fostering innovation, collaboration, and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Visionary Leadership
              </h4>
              <p className="text-gray-600">
                Setting bold goals and inspiring teams to achieve transformational climate impact through strategic vision and innovation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Collaborative Culture
              </h4>
              <p className="text-gray-600">
                Fostering an inclusive environment where diverse perspectives drive innovation and collective problem-solving.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Continuous Learning
              </h4>
              <p className="text-gray-600">
                Promoting a culture of learning, adaptation, and growth to stay at the forefront of climate solutions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Work with Our Team?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with our leadership and experts to discuss your climate goals 
              and explore how we can work together to create meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Our Team
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/careers"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                Join Our Leadership
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}