import { notFound } from 'next/navigation'
import { Button } from "@repo/ui"
import { getNewsArticle, getLatestNews } from "../../../lib/api"
import Image from 'next/image'

interface NewsDetailProps {
  params: {
    slug: string
  }
}

async function ArticleHero({ article }: { article: any }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-white mb-4">
            {article.category.name}
          </span>
          <h1 className="text-h1 text-dark mb-6">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray mb-8">
            <time dateTime={article.publishDate}>
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
        
        <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

async function ArticleContent({ article }: { article: any }) {
  return (
    <section className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-lead text-gray mb-8">{article.summary}</p>
          <div className="text-body text-dark leading-relaxed">
            {article.content}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <p className="text-sm text-gray mb-2">Share this article</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">LinkedIn</Button>
                <Button variant="ghost" size="sm">Twitter</Button>
                <Button variant="ghost" size="sm">Email</Button>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href="/news">← Back to News</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

async function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const articles = await getLatestNews(3)
  const relatedArticles = articles.filter(article => article.slug !== currentSlug)

  if (relatedArticles.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 text-dark mb-12 text-center">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                  {article.category.name}
                </span>
                <h3 className="text-xl font-semibold text-dark mt-2 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray text-sm line-clamp-3 mb-4">{article.summary}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={`/news/${article.slug}`}>Read More</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const article = await getNewsArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <RelatedArticles currentSlug={params.slug} />
    </article>
  )
}