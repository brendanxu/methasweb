import { TeamMember } from '@/lib/types'
import Link from 'next/link'

interface LeadershipSectionProps {
  leadership: TeamMember[]
}

export default function LeadershipSection({ leadership }: LeadershipSectionProps) {
  const displayLeadership = leadership.length > 0 ? leadership.slice(0, 8) : [
    {
      id: '1',
      name: 'Renat Heuberger',
      title: 'CEO & Co-Founder',
      department: 'Leadership',
      bio: 'Renat co-founded 碳智METHAS in 2006 and has been driving climate action for over 18 years.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      isLeadership: true,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '2',
      name: 'Maximilian Horster',
      title: 'COO & Co-Founder',
      department: 'Leadership',
      bio: 'Maximilian oversees operations and has been instrumental in 碳智METHAS\'s global expansion.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      isLeadership: true,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '3',
      name: 'Dr. Sarah Johnson',
      title: 'Chief Climate Officer',
      department: 'Climate Science',
      bio: 'Dr. Johnson leads our climate science initiatives and carbon market development.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
      isLeadership: true,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '4',
      name: 'Michael Chen',
      title: 'Chief Technology Officer',
      department: 'Technology',
      bio: 'Michael drives our digital transformation and technology innovation initiatives.',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
      isLeadership: true,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Leadership
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced leaders driving our mission to create meaningful climate impact 
            across the globe. Together, we bring decades of expertise in climate science, 
            technology, and sustainable business practices.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {displayLeadership.map((leader) => (
            <div key={leader.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Profile Image */}
              <div className="relative">
                <img 
                  src={leader.imageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face`}
                  alt={leader.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

                {/* Social Links */}
                <div className="flex space-x-4">
                  {leader.linkedinUrl && (
                    <a 
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {leader.email && (
                    <a 
                      href={`mailto:${leader.email}`}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join Our Expert Team
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate climate professionals to join our mission. 
              Explore career opportunities and become part of our global impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/team"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View Full Team
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/careers"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                View Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}