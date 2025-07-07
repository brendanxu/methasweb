'use client'

import React from 'react'

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({ 
  size = 'xl', 
  padding = 'md', 
  children, 
  className = '',
  as: Component = 'div'
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',     // 672px
    md: 'max-w-4xl',     // 896px
    lg: 'max-w-6xl',     // 1152px
    xl: 'max-w-7xl',     // 1280px - South Pole standard
    full: 'max-w-full'
  }
  
  const paddings = {
    none: '',
    sm: 'px-4',
    md: 'px-4 sm:px-6 lg:px-8',    // Standard responsive padding
    lg: 'px-6 sm:px-8 lg:px-12'
  }
  
  const containerClasses = `
    w-full mx-auto
    ${sizes[size]}
    ${paddings[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <Component className={containerClasses}>
      {children}
    </Component>
  )
}