'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', asChild = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)'
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
      secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-primary-500 focus:ring-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
      ghost: 'text-text-secondary hover:text-primary-500 hover:bg-primary-50 focus:ring-primary-300'
    }
    
    const hoverVariants = {
      primary: { scale: 1.02, y: -2 },
      secondary: { scale: 1.02, y: -2 },
      outline: { scale: 1.02, y: -2 },
      ghost: { scale: 1.01 }
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-button-sm min-h-[36px]',     // 36px 高度
      md: 'px-6 py-3 text-button-md min-h-[44px]',     // 44px 高度  
      lg: 'px-8 py-4 text-button-lg min-h-[52px]'      // 52px 高度
    }
    
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: buttonClasses,
        ref,
        ...props
      } as any)
    }
    
    const { 
      onDrag, 
      onDragStart, 
      onDragEnd, 
      onAnimationStart,
      onAnimationEnd,
      ...otherProps 
    } = props
    
    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        whileHover={hoverVariants[variant]}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          duration: 0.3
        }}
        {...otherProps}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }