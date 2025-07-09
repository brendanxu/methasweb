'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

// 碳智METHAS 统一动画配置
export const methasAnimations = {
  // 基础动画持续时间
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  
  // 缓动函数
  easing: {
    out: [0.4, 0, 0.2, 1],
    inOut: [0.16, 1, 0.3, 1],
    in: [0.4, 0, 1, 1],
    spring: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
    },
  },
  
  // 常用动画变体
  variants: {
    // 淡入动画
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    
    // 向上滑动
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    
    // 向下滑动
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    
    // 缩放进入
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    
    // 从左侧滑入
    slideLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    
    // 从右侧滑入
    slideRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    
    // 旋转进入
    rotateIn: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 10 },
    },
    
    // 弹跳效果
    bounce: {
      initial: { opacity: 0, y: 20, scale: 0.8 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 0.8 },
    },
  },
  
  // 交互动画
  interactions: {
    hover: {
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    focus: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
  },
  
  // 页面过渡动画
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  
  // 滚动触发动画
  scrollTrigger: {
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// 动画包装组件
interface AnimatedProps {
  children: React.ReactNode
  variant?: keyof typeof methasAnimations.variants
  delay?: number
  duration?: number
  className?: string
}

export function Animated({ 
  children, 
  variant = 'fadeIn', 
  delay = 0, 
  duration = methasAnimations.duration.normal,
  className = ''
}: AnimatedProps) {
  const animationVariant = methasAnimations.variants[variant]
  
  return (
    <motion.div
      className={className}
      initial={animationVariant.initial}
      animate={animationVariant.animate}
      exit={animationVariant.exit}
      transition={{
        duration,
        delay,
        ease: methasAnimations.easing.out,
      }}
    >
      {children}
    </motion.div>
  )
}

// 滚动触发动画组件
interface ScrollAnimatedProps {
  children: React.ReactNode
  variant?: keyof typeof methasAnimations.variants
  delay?: number
  className?: string
}

export function ScrollAnimated({ 
  children, 
  variant = 'slideUp', 
  delay = 0,
  className = ''
}: ScrollAnimatedProps) {
  const animationVariant = methasAnimations.variants[variant]
  
  return (
    <motion.div
      className={className}
      initial={animationVariant.initial}
      whileInView={animationVariant.animate}
      viewport={methasAnimations.scrollTrigger.viewport}
      transition={{
        ...methasAnimations.scrollTrigger.transition,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// 交互式动画组件
interface InteractiveProps {
  children: React.ReactNode
  hover?: boolean
  tap?: boolean
  focus?: boolean
  className?: string
  onClick?: () => void
}

export function Interactive({ 
  children, 
  hover = true, 
  tap = true, 
  focus = false,
  className = '',
  onClick
}: InteractiveProps) {
  const whileHover = hover ? methasAnimations.interactions.hover : undefined
  const whileTap = tap ? methasAnimations.interactions.tap : undefined
  const whileFocus = focus ? methasAnimations.interactions.focus : undefined
  
  return (
    <motion.div
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      whileFocus={whileFocus}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// 顺序动画组件
interface StaggeredProps {
  children: React.ReactNode
  stagger?: number
  variant?: keyof typeof methasAnimations.variants
  className?: string
}

export function Staggered({ 
  children, 
  stagger = 0.1, 
  variant = 'slideUp',
  className = ''
}: StaggeredProps) {
  const animationVariant = methasAnimations.variants[variant]
  
  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: stagger,
      },
    },
  }
  
  const itemVariants: Variants = {
    initial: animationVariant.initial,
    animate: animationVariant.animate,
  }
  
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// 页面过渡组件
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={methasAnimations.pageTransition.initial}
      animate={methasAnimations.pageTransition.animate}
      exit={methasAnimations.pageTransition.exit}
      transition={methasAnimations.pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}

// 加载动画组件
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }
  
  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
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
      </svg>
    </motion.div>
  )
}

// 预设动画 hooks
export const useMethasAnimations = () => {
  return {
    ...methasAnimations,
    // 快捷方法
    fadeIn: (delay = 0) => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay, duration: methasAnimations.duration.normal },
    }),
    slideUp: (delay = 0) => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: methasAnimations.duration.normal },
    }),
    scaleIn: (delay = 0) => ({
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay, duration: methasAnimations.duration.normal },
    }),
  }
}