import { OfficeLocation } from '@/lib/types'
import Link from 'next/link'

interface LocationsSectionProps {
  locations: OfficeLocation[]
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  const displayLocations = locations.length > 0 ? locations.slice(0, 12) : [
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
      coordinates: '47.3769,8.5417',
      description: 'Our global headquarters and founding office',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
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
      coordinates: '1.2966,103.8520',
      description: 'Asia-Pacific regional hub',
      imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop',
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
      coordinates: '40.7041,73.9867',
      description: 'North American operations center',
      imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
      isHeadquarters: false,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '4',
      name: 'Amsterdam',
      address: 'Keizersgracht 62',
      city: 'Amsterdam',
      country: 'Netherlands',
      countryCode: 'NL',
      phone: '+31 20 240 7900',
      email: 'amsterdam@methas.com',
      timezone: 'CET',
      coordinates: '52.3702,4.8952',
      description: 'European operations hub',
      imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop',
      isHeadquarters: false,
      isActive: true,
      createdAt: '',
      updatedAt: ''
    }
  ]

  // Group locations by region
  const locationsByRegion = displayLocations.reduce((acc, location) => {
    let region = 'Other'
    
    if (['CH', 'NL', 'DE', 'UK', 'ES', 'IT', 'FR'].includes(location.countryCode || '')) {
      region = 'Europe'
    } else if (['SG', 'CN', 'JP', 'IN', 'TH', 'VN'].includes(location.countryCode || '')) {
      region = 'Asia-Pacific'
    } else if (['US', 'CA', 'MX'].includes(location.countryCode || '')) {
      region = 'Americas'
    } else if (['ZA', 'KE', 'GH', 'NG'].includes(location.countryCode || '')) {
      region = 'Africa'
    }
    
    if (!acc[region]) acc[region] = []
    acc[region]!.push(location)
    return acc
  }, {} as Record<string, OfficeLocation[]>)

  const regionOrder = ['Europe', 'Americas', 'Asia-Pacific', 'Africa', 'Other']
  const sortedRegions = regionOrder.filter(region => locationsByRegion[region])

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global Presence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With offices across five continents, we're positioned to serve clients worldwide 
            and deliver local expertise with global impact. Our diverse team brings deep 
            regional knowledge to every climate solution.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-gray-600">Continents</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Global Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">800+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
        </div>

        {/* Regions */}
        <div className="space-y-16">
          {sortedRegions.map((regionName) => (
            <div key={regionName}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {regionName}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {locationsByRegion[regionName]?.map((location) => (
                  <div key={location.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative h-48">
                      <img 
                        src={location.imageUrl || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop`}
                        alt={`${location.city}, ${location.country}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      {location.isHeadquarters && (
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Headquarters
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-xl font-bold">{location.city}</h4>
                        <p className="text-gray-200">{location.country}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {location.name}
                      </h4>
                      
                      {location.description && (
                        <p className="text-gray-600 text-sm mb-4">
                          {location.description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-start">
                          <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{location.address}</span>
                        </div>
                        
                        {location.phone && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${location.phone}`} className="hover:text-blue-600 transition-colors">
                              {location.phone}
                            </a>
                          </div>
                        )}
                        
                        {location.email && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${location.email}`} className="hover:text-blue-600 transition-colors">
                              {location.email}
                            </a>
                          </div>
                        )}

                        {location.timezone && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{location.timezone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Partner with Our Global Team
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to start your climate journey? Connect with our local experts 
              who understand your region's unique challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Your Local Office
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/locations"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                View All Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}