import React from 'react'

const footerLinks = {
  solutions: {
    title: 'Solutions',
    links: [
      { label: 'Climate Action', href: '/climate-action' },
      { label: 'Climate Finance', href: '/climate-finance' },
      { label: 'Renewable Energy', href: '/renewable-energy' },
      { label: 'Nature-Based Solutions', href: '/nature-based' },
      { label: 'Carbon Credits', href: '/carbon-credits' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/work' },
      { label: 'Careers', href: 'https://careers.southpole.com' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Reports', href: '/reports' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'FAQ', href: '/faq' },
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ]
  }
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/south-pole', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/southpole', icon: 'twitter' },
  { name: 'YouTube', href: 'https://youtube.com/southpole', icon: 'youtube' },
]

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl font-bold">
              South Pole
            </a>
            <p className="mt-4 text-sm text-gray">
              Leading the way in climate action and sustainability solutions.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 border-t border-gray/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray">
              © {new Date().getFullYear()} South Pole. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="/sitemap" className="text-sm text-gray hover:text-white">
                Sitemap
              </a>
              <a href="/accessibility" className="text-sm text-gray hover:text-white">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}