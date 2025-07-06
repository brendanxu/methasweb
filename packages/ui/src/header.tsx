'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'

interface NavItem {
  label: string
  href: string
  children?: {
    label: string
    href: string
    description?: string
  }[]
}

const navItems: NavItem[] = [
  {
    label: 'About us',
    href: '/about',
    children: [
      { label: 'Our story', href: '/about/story', description: 'How South Pole became a climate leader' },
      { label: 'Leadership team', href: '/about/leadership', description: 'Meet our executive team and board' },
      { label: 'Mission & values', href: '/about/mission', description: 'Our purpose and core principles' },
      { label: 'Locations', href: '/about/locations', description: 'Our global offices and presence' },
    ]
  },
  {
    label: 'What we do',
    href: '/services',
    children: [
      { label: 'Services', href: '/services', description: 'Complete climate action solutions' },
      { label: 'Solutions', href: '/services/solutions', description: 'Tailored climate strategies' },
      { label: 'Industries', href: '/services/industries', description: 'Sector-specific expertise' },
      { label: 'Approach', href: '/services/approach', description: 'Our methodology and process' },
    ]
  },
  {
    label: 'Our impact',
    href: '/impact',
    children: [
      { label: 'Case studies', href: '/impact/case-studies', description: 'Real-world climate projects' },
      { label: 'Sustainability reports', href: '/impact/reports', description: 'Annual impact assessments' },
      { label: 'Client success', href: '/impact/success-stories', description: 'Customer transformation stories' },
      { label: 'Metrics', href: '/impact/metrics', description: 'Measurable climate outcomes' },
    ]
  },
  {
    label: 'News & insights',
    href: '/news',
    children: [
      { label: 'Latest news', href: '/news', description: 'Company announcements and updates' },
      { label: 'Blog', href: '/news/blog', description: 'Expert insights and analysis' },
      { label: 'Resources', href: '/news/resources', description: 'Reports, guides, and tools' },
      { label: 'Events', href: '/news/events', description: 'Conferences and webinars' },
    ]
  },
]

export function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{ 
        backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: isSticky ? 'blur(10px)' : 'blur(0px)',
        boxShadow: isSticky ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={`border-b border-secondary-200 ${isSticky ? 'hidden' : 'block'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between text-body-sm">
            <div className="hidden md:flex items-center space-x-6">
              <a href="/contact" className="text-text-muted hover:text-primary-800 transition-colors">Contact</a>
              <a href="/locations" className="text-text-muted hover:text-primary-800 transition-colors">Locations</a>
            </div>
            <div className="flex items-center space-x-6 ml-auto">
              <select className="bg-transparent text-text-muted text-body-sm">
                <option>EN</option>
                <option>DE</option>
                <option>FR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isSticky ? 'h-16' : 'h-20'}`}>
          <a href="/" className="flex items-center">
            <span className="text-heading-lg font-semibold text-text-primary">South Pole</span>
          </a>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMegaMenu(item.label)}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <div className="flex items-center space-x-1">
                  <a
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary transition-colors font-medium text-body-md"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <motion.svg
                      className="h-4 w-4 text-text-muted transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        rotate: openMegaMenu === item.label ? 180 : 0
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                </div>
                
                <AnimatePresence>
                  {item.children && openMegaMenu === item.label && (
                    <motion.div 
                      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-80 rounded-lg bg-background-primary shadow-medium border border-secondary-100 overflow-hidden"
                      initial={{ opacity: 0, y: -15, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.92 }}
                      transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      {/* Header with gradient */}
                      <div className="bg-background-secondary px-6 py-4 border-b border-secondary-100">
                        <h3 className="font-semibold text-text-primary text-body-sm uppercase tracking-wider">
                          {item.label}
                        </h3>
                      </div>
                      
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <motion.a
                            key={child.label}
                            href={child.href}
                            className="group flex items-start px-6 py-3 hover:bg-background-secondary transition-all duration-200"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.3 }}
                          >
                            <div className="flex-1">
                              <div className="font-medium text-text-primary group-hover:text-primary-600 transition-colors text-body-sm">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="mt-1 text-body-xs text-text-muted group-hover:text-text-secondary transition-colors leading-relaxed">
                                  {child.description}
                                </div>
                              )}
                            </div>
                            <svg 
                              className="h-4 w-4 text-secondary-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 ml-3 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.a>
                        ))}
                      </div>
                      
                      {/* Footer CTA */}
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                        <a 
                          href={item.href}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center"
                        >
                          View all {item.label.toLowerCase()}
                          <svg className="h-3 w-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="primary" size="md">
              Get started
            </Button>
            
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  variants={{
                    closed: { d: "M4 6h16M4 12h16M4 18h16" },
                    open: { d: "M6 18L18 6M6 6l12 12" }
                  }}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden border-t border-secondary-200 bg-background-primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-2 overflow-hidden">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between py-2">
                    <a
                      href={item.href}
                      className="text-text-primary hover:text-primary-700 font-medium flex-1 text-body-md"
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <motion.button
                        onClick={() => setMobileOpenSubmenu(mobileOpenSubmenu === item.label ? null : item.label)}
                        className="p-1 rounded hover:bg-secondary-100 transition-colors"
                      >
                        <motion.svg
                          className="h-4 w-4 text-text-muted transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{
                            rotate: mobileOpenSubmenu === item.label ? 180 : 0
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.button>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.children && mobileOpenSubmenu === item.label && (
                      <motion.div 
                        className="ml-4 space-y-1 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        {item.children.map((child, childIndex) => (
                          <motion.a
                            key={child.label}
                            href={child.href}
                            className="block py-2 px-3 text-body-sm text-text-muted hover:text-primary-700 hover:bg-secondary-50 rounded transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: childIndex * 0.05, duration: 0.2 }}
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="text-body-xs text-text-muted mt-1">{child.description}</div>
                            )}
                          </motion.a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}