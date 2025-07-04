import { Button, Card } from "@repo/ui"
import { getNewsArticles } from "../../lib/api"

async function NewsHero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-h1 text-white mb-6">Climate Insights & News</h1>
          <p className="text-lead text-white/90 max-w-3xl mx-auto">
            Stay informed with the latest developments in climate action, sustainability, 
            and environmental policy from our global team of experts.
          </p>
        </div>
      </div>
    </section>
  )
}

async function NewsGrid() {
  const articles = await getNewsArticles()

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-h2 text-dark mb-4">Latest Articles</h2>
            <p className="text-gray">
              Explore our insights on climate solutions and sustainability.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Categories</Button>
            <Button variant="ghost" size="sm">Climate Action</Button>
            <Button variant="ghost" size="sm">Policy</Button>
            <Button variant="ghost" size="sm">Innovation</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              imageUrl={article.heroImage}
              category={article.category.name}
              title={article.title}
              description={article.summary}
              href={`/news/${article.slug}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  )
}

export default async function NewsPage() {
  return (
    <div>
      <NewsHero />
      <NewsGrid />
    </div>
  )
}