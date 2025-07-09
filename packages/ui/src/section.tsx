'use client'

import React from 'react'

interface SectionProps {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'neutral' | 'primary' | 'secondary' | 'gradient'
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Section({ 
  spacing = 'lg', 
  background = 'white', 
  children, 
  className = '',
  as: Component = 'section'
}: SectionProps) {
  const spacings = {
    none: '',
    sm: 'py-12',        // 48px vertical padding
    md: 'py-16',        // 64px vertical padding
    lg: 'py-24',        // 96px vertical padding - 碳智METHAS standard
    xl: 'py-32'         // 128px vertical padding
  }
  
  const backgrounds = {
    white: 'bg-neutral-0',
    neutral: 'bg-neutral-50',
    primary: 'bg-primary text-neutral-0',
    secondary: 'bg-secondary-green text-neutral-0',
    gradient: 'bg-gradient-to-r from-primary to-secondary-green text-neutral-0'
  }
  
  const sectionClasses = `
    w-full
    ${spacings[spacing]}
    ${backgrounds[background]}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <Component className={sectionClasses}>
      {children}
    </Component>
  )
}