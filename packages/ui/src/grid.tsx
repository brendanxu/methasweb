'use client'

import React from 'react'

interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6
    md?: 1 | 2 | 3 | 4 | 6
    lg?: 1 | 2 | 3 | 4 | 6
    xl?: 1 | 2 | 3 | 4 | 6
  }
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Grid({ 
  cols = 1, 
  gap = 'md', 
  responsive,
  children, 
  className = '',
  as: Component = 'div'
}: GridProps) {
  const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  }
  
  const gaps = {
    sm: 'gap-4',         // 16px
    md: 'gap-8',         // 32px - 碳智METHAS standard
    lg: 'gap-12',        // 48px
    xl: 'gap-16'         // 64px
  }
  
  // Build responsive classes
  let responsiveClasses = ''
  if (responsive) {
    if (responsive.sm) responsiveClasses += ` sm:${colsMap[responsive.sm]}`
    if (responsive.md) responsiveClasses += ` md:${colsMap[responsive.md]}`
    if (responsive.lg) responsiveClasses += ` lg:${colsMap[responsive.lg]}`
    if (responsive.xl) responsiveClasses += ` xl:${colsMap[responsive.xl]}`
  }
  
  const gridClasses = `
    grid
    ${colsMap[cols]}
    ${gaps[gap]}
    ${responsiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <Component className={gridClasses}>
      {children}
    </Component>
  )
}

// Convenience component for common grid patterns
interface FlexProps {
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Flex({ 
  direction = 'row', 
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  children, 
  className = '',
  as: Component = 'div'
}: FlexProps) {
  const directions = {
    row: 'flex-row',
    col: 'flex-col'
  }
  
  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }
  
  const gaps = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12',
    xl: 'gap-16'
  }
  
  const flexClasses = `
    flex
    ${directions[direction]}
    ${alignments[align]}
    ${justifications[justify]}
    ${gaps[gap]}
    ${wrap ? 'flex-wrap' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  return (
    <Component className={flexClasses}>
      {children}
    </Component>
  )
}

// Stack component for vertical layouts
interface StackProps {
  space?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Stack({ 
  space = 'md', 
  align = 'start',
  children, 
  className = '',
  as: Component = 'div'
}: StackProps) {
  return (
    <Flex 
      direction="col" 
      align={align} 
      gap={space} 
      className={className}
      as={Component}
    >
      {children}
    </Flex>
  )
}