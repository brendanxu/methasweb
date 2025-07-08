export interface Article {
  id: string
  title: string
  excerpt: string
  image: {
    src: string
    alt: string
    blurDataURL?: string
  }
  category: string
  categoryColor?: string
  date: string
  readingTime: number
  link: string
}

export interface CarbonInsightsProps {
  articles: Article[]
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  title?: string
  subtitle?: string
  className?: string
}

export interface ArticleCardProps {
  article: Article
  isActive?: boolean
  isPrev?: boolean
  isNext?: boolean
}