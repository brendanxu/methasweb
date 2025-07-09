'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { type VariantProps, cva } from 'class-variance-authority'

// 卡片变体配置
const cardVariants = cva(
  'rounded-lg border transition-all duration-normal overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 shadow-sm hover:shadow-md',
        elevated: 'bg-white border-gray-200 shadow-md hover:shadow-lg',
        outline: 'bg-white border-gray-300 shadow-none hover:shadow-sm',
        ghost: 'bg-transparent border-transparent shadow-none hover:bg-gray-50',
        gradient: 'bg-gradient-to-br from-primary-50 to-green-50 border-primary-200 shadow-sm hover:shadow-md',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  }
)

// 卡片属性类型
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
  interactive?: boolean
}

// 卡片组件
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, children, onClick, ...props }, ref) => {
    const isInteractive = interactive || !!onClick

    return (
      <motion.div
        ref={ref}
        className={cardVariants({ variant, size, interactive: isInteractive, className })}
        onClick={onClick}
        whileHover={isInteractive ? { y: -2 } : {}}
        whileTap={isInteractive ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

// 卡片头部组件
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pb-4 border-b border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = "CardHeader"

// 卡片标题组件
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`text-heading-md font-semibold text-gray-900 ${className}`}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardTitle.displayName = "CardTitle"

// 卡片描述组件
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-body-sm text-gray-600 mt-2 ${className}`}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = "CardDescription"

// 卡片内容组件
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`py-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContent.displayName = "CardContent"

// 卡片底部组件
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pt-4 border-t border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = "CardFooter"

// 卡片图片组件
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'auto', ...props }, ref) => {
    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'aspect-[3/2]',
      auto: 'aspect-auto',
    }

    return (
      <div className={`overflow-hidden ${aspectRatioClasses[aspectRatio]}`}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-normal hover:scale-105 ${className}`}
          {...props}
        />
      </div>
    )
  }
)

CardImage.displayName = "CardImage"

// 卡片网格组件
export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

export const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({ className, children, cols = 3, gap = 'md', responsive = true, ...props }, ref) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      6: 'grid-cols-6',
    }

    const gapMap = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-10',
    }

    const responsiveClasses = responsive 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : colsMap[cols]

    return (
      <div
        ref={ref}
        className={`grid ${responsiveClasses} ${gapMap[gap]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardGrid.displayName = "CardGrid"