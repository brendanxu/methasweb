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
    label: 'What we do',
    href: '/services',
    children: [
      { label: 'Climate Action', href: '/services/climate-action', description: 'Carbon offsetting and reduction strategies' },
      { label: 'Climate Finance', href: '/services/climate-finance', description: 'Investment solutions and green financing' },
      { label: 'Renewable Energy', href: '/services/renewable-energy', description: 'Clean energy projects and procurement' },
      { label: 'Nature-Based Solutions', href: '/services/nature-based-solutions', description: 'Forest conservation and ecosystem restoration' },
    ]
  },
  {
    label: 'Who we serve',
    href: '#',
    children: [
      { label: 'Corporations', href: '/corporations', description: 'Enterprise climate solutions' },
      { label: 'Governments', href: '/governments', description: 'Public sector climate action' },
      { label: 'Financial Institutions', href: '/financial', description: 'Investment and risk management' },
    ]
  },
  { label: 'Our work', href: '/work' },
  { label: 'Insights', href: '/news' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)

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
      <div className={`border-b border-gray/20 ${isSticky ? 'hidden' : 'block'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between text-sm">
            <div className="hidden md:flex items-center space-x-6">
              <a href="/contact" className="text-gray hover:text-primary transition-colors">Contact</a>
              <a href="/locations" className="text-gray hover:text-primary transition-colors">Locations</a>
            </div>
            <div className="flex items-center space-x-6 ml-auto">
              <select className="bg-transparent text-gray text-sm">
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
            <span className="text-2xl font-bold text-primary">South Pole</span>
          </a>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMegaMenu(item.label)}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <a
                  href={item.href}
                  className="text-dark hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
                
                <AnimatePresence>
                  {item.children && openMegaMenu === item.label && (
                    <motion.div 
                      className="absolute left-0 top-full mt-2 w-screen max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-gray-100"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="space-y-1">
                        {item.children.map((child, index) => (
                          <motion.a
                            key={child.label}
                            href={child.href}
                            className="group flex items-center justify-between rounded-lg p-4 hover:bg-blue-50 transition-all duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {child.label}
                              </div>
                              {child.description && (
                                <div className="mt-1 text-sm text-gray-600 group-hover:text-blue-500 transition-colors">
                                  {child.description}
                                </div>
                              )}
                            </div>
                            <svg 
                              className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.a>
                        ))}
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
              className="lg:hidden p-2 rounded-lg hover:bg-gray/10 transition-colors"
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
            className="lg:hidden border-t border-gray/20 bg-white"
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
                  <a
                    href={item.href}
                    className="block py-2 text-dark hover:text-primary font-medium"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <motion.a
                          key={child.label}
                          href={child.href}
                          className="block py-1 text-sm text-gray hover:text-primary"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (childIndex * 0.05), duration: 0.2 }}
                        >
                          {child.label}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}