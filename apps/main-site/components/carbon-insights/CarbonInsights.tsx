'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Container } from '@repo/ui'
import { ArticleCard } from './ArticleCard'
import styles from './CarbonInsights.module.css'
import type { CarbonInsightsProps } from '@/lib/types/carbon-insights'

export function CarbonInsightsV2({
  articles,
  autoplay = false,
  autoplayInterval = 5000,
  loop = true,
  title = '碳智观察',
  subtitle = '深度洞察碳市场动态，把握可持续发展机遇',
  className = ''
}: CarbonInsightsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  // Configure Embla options
  const options = {
    loop,
    align: 'start' as const,
    skipSnaps: false,
    containScroll: 'trimSnaps' as const,
    slidesToScroll: 1,
    dragFree: false
  }

  // Configure autoplay
  const autoplayPlugin = autoplay
    ? Autoplay({ delay: autoplayInterval, stopOnInteraction: true })
    : undefined

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplayPlugin ? [autoplayPlugin] : []
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  return (
    <section className={`${styles.section} ${className}`}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carouselViewport} ref={emblaRef}>
            <div className={styles.carouselContainer}>
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={styles.carouselSlide}
                >
                  <ArticleCard
                    article={article}
                    isActive={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <AnimatePresence>
            {canScrollPrev && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                onClick={scrollPrev}
                aria-label="Previous articles"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollNext && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={scrollNext}
                aria-label="Next articles"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressTrack}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${styles.progressDot} ${
                  index === selectedIndex ? styles.progressDotActive : ''
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}