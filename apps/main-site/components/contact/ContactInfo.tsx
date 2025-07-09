import { OfficeLocation } from '@/lib/types'

interface ContactInfoProps {
  locations: OfficeLocation[]
}

export default function ContactInfo({ locations }: ContactInfoProps) {
  const headquarters = locations.find(location => location.isHeadquarters) || {
    id: '1',
    name: 'Zurich Headquarters',
    address: 'Technoparkstrasse 1',
    city: 'Zurich',
    country: 'Switzerland',
    phone: '+41 43 501 35 50',
    email: 'hello@methas.com',
    timezone: 'CET',
    isHeadquarters: true,
    isActive: true,
    createdAt: '',
    updatedAt: ''
  }

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: headquarters.email || 'hello@methas.com',
      link: `mailto:${headquarters.email || 'hello@methas.com'}`,
      description: 'Send us an email and get a response within 24 hours'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: headquarters.phone || '+41 43 501 35 50',
      link: `tel:${headquarters.phone || '+41435013550'}`,
      description: 'Call us during business hours'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      value: `${headquarters.address}, ${headquarters.city}, ${headquarters.country}`,
      link: `https://maps.google.com/?q=${encodeURIComponent(`${headquarters.address}, ${headquarters.city}, ${headquarters.country}`)}`,
      description: 'Visit our headquarters in Zurich'
    }
  ]

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM CET' },
    { day: 'Saturday - Sunday', hours: 'Closed' }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/methas',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/methasgroup',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/methasgroup',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Contact Information
        </h2>
        <p className="text-gray-600 mb-8">
          Our team is available to discuss your climate goals and help you create meaningful impact. 
          Choose the method that works best for you.
        </p>

        <div className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  {method.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <a 
                  href={method.link}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  target={method.title === 'Address' ? '_blank' : undefined}
                  rel={method.title === 'Address' ? 'noopener noreferrer' : undefined}
                >
                  {method.value}
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Business Hours
        </h3>
        <div className="space-y-2">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{schedule.day}</span>
              <span className="font-medium text-gray-900">{schedule.hours}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          * Hours may vary by region. Contact your local office for specific hours.
        </p>
      </div>

      {/* Follow Us */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Follow Us
        </h3>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest climate insights and projects.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label={`Follow us on ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              For urgent climate-related inquiries
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Contact our 24/7 hotline at <a href="tel:+41435013550" className="font-semibold underline">+41 43 501 35 50</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}