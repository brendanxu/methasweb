'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { type VariantProps, cva } from 'class-variance-authority'

// 按钮变体配置 - 使用专业设计系统
const buttonVariants = cva(
  // 基础样式 - 专业设计系统
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary-700 to-primary-500 text-white hover:from-primary-800 hover:to-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-0',
        secondary: 'bg-white text-primary-700 border-2 border-primary-700 hover:bg-primary-50 hover:text-primary-800 focus:ring-primary-500 shadow-md hover:shadow-lg',
        outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-700 focus:ring-primary-500 bg-transparent hover:bg-neutral-50',
        ghost: 'text-primary-700 hover:bg-primary-50 hover:text-primary-800 focus:ring-primary-500 bg-transparent',
        link: 'text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline focus:ring-primary-500 bg-transparent p-0',
        destructive: 'bg-error text-white hover:bg-red-600 focus:ring-red-500 shadow-md hover:shadow-lg',
      },
      size: {
        sm: 'px-4 py-2 text-sm font-medium',
        md: 'px-6 py-3 text-base font-medium',
        lg: 'px-8 py-4 text-lg font-medium',
        xl: 'px-10 py-5 text-xl font-semibold',
        icon: 'p-2 w-10 h-10',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      loading: false,
    },
  }
)

// 按钮属性类型
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
    'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' |
    'onAnimationStart' | 'onAnimationEnd'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// 加载中图标组件
const LoadingIcon = () => (
  <motion.svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </motion.svg>
)

// 按钮组件
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false, 
    disabled,
    leftIcon,
    rightIcon,
    children,
    asChild = false,
    onClick,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    // asChild 支持 - 向后兼容
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: buttonVariants({ variant, size, loading, className }),
        ref,
        disabled: isDisabled,
        onClick,
        ...props
      } as any)
    }

    return (
      <motion.button
        ref={ref}
        className={buttonVariants({ variant, size, loading, className })}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        style={props.style}
        {...props}
      >
        {loading && <LoadingIcon />}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }