import { NewsArticle } from '@/lib/types'
import Link from 'next/link'

interface HomepageNewsProps {
  news: NewsArticle[]
}

export default function HomepageNews({ news }: HomepageNewsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest climate action news, insights, and thought leadership from our experts.
          </p>
        </div>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {news.slice(0, 3).map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <img 
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-600 text-sm font-medium">{article.category.name}</span>
                      <span className="text-gray-500 text-sm">{new Date(article.publishDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{article.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Latest news will be displayed here.</p>
          </div>
        )}

        <div className="text-center">
          <Link 
            href="/news"
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
          >
            View All News
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}