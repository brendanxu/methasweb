import { OfficeLocation } from '@/lib/types'
import Link from 'next/link'

interface ContactLocationsProps {
  locations: OfficeLocation[]
}

export default function ContactLocations({ locations }: ContactLocationsProps) {
  const displayLocations = locations.length > 0 ? locations.slice(0, 6) : [
    {
      id: '1',
      name: 'Zurich Headquarters',
      address: 'Technoparkstrasse 1',
      city: 'Zurich',
      country: 'Switzerland',
      countryCode: 'CH',
      phone: '+41 43 501 35 50',
      email: 'zurich@methas.com',
      timezone: 'CET',
      isHeadquarters: true,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '2',
      name: 'Singapore',
      address: '6 Battery Road #40-02A',
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      phone: '+65 6681 9200',
      email: 'singapore@methas.com',
      timezone: 'SGT',
      isHeadquarters: false,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '3',
      name: 'New York',
      address: '20 Jay Street Suite 1010',
      city: 'New York',
      country: 'United States',
      countryCode: 'US',
      phone: '+1 646 663 8400',
      email: 'newyork@methas.com',
      timezone: 'EST',
      isHeadquarters: false,
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Global Offices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with our local teams worldwide. Each office brings deep regional expertise 
            and understanding of local climate challenges and opportunities.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayLocations.map((location) => (
            <div key={location.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {location.country}
                  </p>
                </div>
                {location.isHeadquarters && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    HQ
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-gray-400 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}, ${location.country}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
                  >
                    {location.address}
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {location.phone && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                )}
                
                {location.email && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href={`mailto:${location.email}`}
                      className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
                    >
                      {location.email}
                    </a>
                  </div>
                )}

                {location.timezone && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600 text-sm">
                      {location.timezone}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <a
                  href={`mailto:${location.email || 'hello@methas.com'}`}
                  className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Contact Office
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}, ${location.country}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="View on map"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Locations CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for another location?
            </h3>
            <p className="text-gray-600 mb-6">
              We have offices across 20+ countries worldwide. Find the one nearest to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/locations"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Locations
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              >
                General Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}