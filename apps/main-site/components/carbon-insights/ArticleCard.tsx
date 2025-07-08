'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ArticleCard.module.css'
import type { ArticleCardProps } from '@/lib/types/carbon-insights'

export function ArticleCard({ article, isActive = true }: ArticleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        y: 0,
        scale: isActive ? 1 : 0.95
      }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={article.link} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          {!imageLoaded && (
            <div className={styles.skeleton} />
          )}
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.image}
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          <div 
            className={styles.categoryTag}
            style={{ 
              backgroundColor: article.categoryColor || 'var(--color-secondary-green)'
            }}
          >
            {article.category}
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.excerpt}>{article.excerpt}</p>
          
          <div className={styles.meta}>
            <span className={styles.date}>
              {formatDate(article.date)}
            </span>
            <span className={styles.divider}>•</span>
            <span className={styles.readingTime}>
              {article.readingTime} 分钟阅读
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}