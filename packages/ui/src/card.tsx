'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  imageUrl: string
  category?: string
  title: string
  description: string
  href: string
}

export function Card({ imageUrl, category, title, description, href }: CardProps) {
  return (
    <motion.a
      href={href}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm"
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {category && (
          <motion.span 
            className="absolute top-4 left-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {category}
          </motion.span>
        )}
      </div>
      <div className="p-6">
        <motion.h3 
          className="mb-2 text-xl font-semibold text-dark line-clamp-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray line-clamp-3">{description}</p>
      </div>
    </motion.a>
  )
}