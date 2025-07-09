'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { type VariantProps, cva } from 'class-variance-authority'

// 区域变体配置
const sectionVariants = cva(
  'w-full',
  {
    variants: {
      spacing: {
        none: '',
        sm: 'py-8 sm:py-12',
        md: 'py-12 sm:py-16',
        lg: 'py-16 sm:py-20 lg:py-24',
        xl: 'py-20 sm:py-24 lg:py-32',
      },
      background: {
        white: 'bg-white',
        gray: 'bg-gray-50',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-green-500 text-white',
        gradient: 'bg-gradient-to-br from-primary-50 to-green-50',
        'gradient-dark': 'bg-gradient-to-br from-primary-500 to-green-500 text-white',
        transparent: 'bg-transparent',
      },
      width: {
        full: 'w-full',
        contained: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
        wide: 'max-w-none px-4 sm:px-6 lg:px-8',
      },
    },
    defaultVariants: {
      spacing: 'lg',
      background: 'white',
      width: 'contained',
    },
  }
)

// 区域属性类型
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: React.ReactNode
  as?: React.ElementType
  animate?: boolean
}

// 区域组件
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    spacing, 
    background, 
    width, 
    children, 
    as: Component = 'section',
    animate = false,
    ...props 
  }, ref) => {
    const sectionContent = (
      <Component
        ref={ref}
        className={sectionVariants({ spacing, background, width, className })}
        {...props}
      >
        {children}
      </Component>
    )

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {sectionContent}
        </motion.div>
      )
    }

    return sectionContent
  }
)

Section.displayName = "Section"

// 容器组件
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  center?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = 'lg', center = true, ...props }, ref) => {
    const sizeClasses = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-none',
      full: 'w-full',
    }

    const centerClasses = center ? 'mx-auto' : ''

    return (
      <div
        ref={ref}
        className={`${sizeClasses[size]} ${centerClasses} px-4 sm:px-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"

// 网格组件
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6
    md?: 1 | 2 | 3 | 4 | 5 | 6
    lg?: 1 | 2 | 3 | 4 | 5 | 6
    xl?: 1 | 2 | 3 | 4 | 5 | 6
  }
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, cols = 1, gap = 'md', responsive, ...props }, ref) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    }

    const gapMap = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-10',
    }

    // 构建响应式类
    let responsiveClasses = ''
    if (responsive) {
      if (responsive.sm) responsiveClasses += ` sm:${colsMap[responsive.sm]}`
      if (responsive.md) responsiveClasses += ` md:${colsMap[responsive.md]}`
      if (responsive.lg) responsiveClasses += ` lg:${colsMap[responsive.lg]}`
      if (responsive.xl) responsiveClasses += ` xl:${colsMap[responsive.xl]}`
    }

    return (
      <div
        ref={ref}
        className={`grid ${colsMap[cols]} ${gapMap[gap]} ${responsiveClasses} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = "Grid"

// Flex布局组件
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    className, 
    children, 
    direction = 'row', 
    align = 'start', 
    justify = 'start',
    gap = 'md',
    wrap = false,
    ...props 
  }, ref) => {
    const directionMap = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    }

    const alignMap = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    }

    const justifyMap = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }

    const gapMap = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    }

    return (
      <div
        ref={ref}
        className={`
          flex 
          ${directionMap[direction]} 
          ${alignMap[align]} 
          ${justifyMap[justify]} 
          ${gapMap[gap]} 
          ${wrap ? 'flex-wrap' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Flex.displayName = "Flex"

// Stack组件（垂直布局）
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  space?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  divider?: React.ReactNode
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, children, space = 'md', align = 'start', divider, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    
    return (
      <Flex
        ref={ref}
        direction="col"
        align={align}
        gap={space}
        className={className}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && divider}
              </React.Fragment>
            ))
          : children}
      </Flex>
    )
  }
)

Stack.displayName = "Stack"

// 分隔线组件
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'light' | 'dark'
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', size = 'md', color = 'default', ...props }, ref) => {
    const orientationClasses = {
      horizontal: 'w-full h-px',
      vertical: 'h-full w-px',
    }

    const sizeClasses = {
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    }

    const colorClasses = {
      default: 'bg-gray-200',
      light: 'bg-gray-100',
      dark: 'bg-gray-300',
    }

    return (
      <div
        ref={ref}
        className={`
          ${orientationClasses[orientation]} 
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          ${className}
        `}
        {...props}
      />
    )
  }
)

Divider.displayName = "Divider"