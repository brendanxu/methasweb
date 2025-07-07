'use client'

import React from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'

// 标准动画变体
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
}

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
}

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.2, 1]
    }
  }
}

export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
}

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
}

// 交错动画容器
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// 动画包装组件
interface AnimatedElementProps extends HTMLMotionProps<'div'> {
  variant?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight'
  delay?: number
}

export function AnimatedElement({ 
  variant = 'fadeInUp', 
  delay = 0, 
  children, 
  className = '',
  ...props 
}: AnimatedElementProps) {
  const variants = {
    fadeInUp: fadeInUpVariants,
    fadeIn: fadeInVariants,
    scaleIn: scaleInVariants,
    slideInLeft: slideInLeftVariants,
    slideInRight: slideInRightVariants
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[variant]}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 交错动画容器
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number
  children: React.ReactNode
}

export function StaggerContainer({ 
  staggerDelay = 0.1, 
  children, 
  className = '',
  ...props 
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 悬停效果组件
interface HoverLiftProps extends HTMLMotionProps<'div'> {
  liftAmount?: number
  children: React.ReactNode
}

export function HoverLift({ 
  liftAmount = -4, 
  children, 
  className = '',
  ...props 
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: liftAmount }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 点击缩放效果组件
interface ClickScaleProps extends HTMLMotionProps<'div'> {
  scaleAmount?: number
  children: React.ReactNode
}

export function ClickScale({ 
  scaleAmount = 0.98, 
  children, 
  className = '',
  ...props 
}: ClickScaleProps) {
  return (
    <motion.div
      className={className}
      whileTap={{ scale: scaleAmount }}
      transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 视差滚动效果组件
interface ParallaxProps extends HTMLMotionProps<'div'> {
  offset?: number
  children: React.ReactNode
}

export function Parallax({ 
  offset = 50, 
  children, 
  className = '',
  ...props 
}: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}