import { Button, Card, MotionSection, MotionGrid } from "@repo/ui"
import { getLatestCaseStudies, getLatestNews } from "../lib/api"

async function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-secondary py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <MotionSection direction="up" delay={0.2}>
            <h1 className="text-h1 text-white mb-6">
              Leading the Way in Climate Solutions
            </h1>
          </MotionSection>
          <MotionSection direction="up" delay={0.4}>
            <p className="text-lead text-white/90 mb-8 max-w-3xl mx-auto">
              South Pole develops comprehensive climate action strategies and solutions for businesses, 
              governments and organizations around the world to accelerate the transition to a net-zero future.
            </p>
          </MotionSection>
          <MotionSection direction="up" delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="lg">
                Explore Our Solutions
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  )
}

async function ServicesSection() {
  const services = [
    {
      title: "Climate Action",
      description: "Comprehensive strategies to help organizations achieve net-zero emissions and build climate resilience.",
      icon: "🌍"
    },
    {
      title: "Climate Finance",
      description: "Investment solutions and financing mechanisms to accelerate the transition to a sustainable economy.",
      icon: "💰"
    },
    {
      title: "Renewable Energy",
      description: "Clean energy project development, procurement strategies, and renewable energy certificates.",
      icon: "⚡"
    },
    {
      title: "Nature-Based Solutions",
      description: "Forest conservation, regenerative agriculture, and ecosystem restoration projects worldwide.",
      icon: "🌿"
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-dark mb-4">Our Solutions</h2>
          <p className="text-lead text-gray max-w-2xl mx-auto">
            We provide end-to-end climate solutions that enable organizations to take meaningful action and create lasting impact.
          </p>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-h3 text-dark mb-3">{service.title}</h3>
              <p className="text-gray">{service.description}</p>
            </div>
          ))}
        </MotionGrid>
      </div>
    </section>
  )
}

async function CaseStudiesSection() {
  const caseStudies = await getLatestCaseStudies(3)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-h2 text-dark mb-4">Featured Case Studies</h2>
            <p className="text-lead text-gray">
              Discover how we&apos;ve helped organizations achieve their climate goals.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/work">View All Work</a>
          </Button>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.2}>
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              imageUrl={study.heroImage}
              category={study.relatedIndustry.name}
              title={study.title}
              description={study.summary}
              href={`/work/${study.slug}`}
            />
          ))}
        </MotionGrid>
      </div>
    </section>
  )
}

async function NewsSection() {
  const news = await getLatestNews(4)

  return (
    <section className="py-16 lg:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-h2 text-dark mb-4">Latest Insights</h2>
            <p className="text-lead text-gray">
              Stay informed with the latest climate action news and insights.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/news">View All News</a>
          </Button>
        </div>
        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
          {news.map((article) => (
            <Card
              key={article.id}
              imageUrl={article.heroImage}
              category={article.category.name}
              title={article.title}
              description={article.summary}
              href={`/news/${article.slug}`}
            />
          ))}
        </MotionGrid>
      </div>
    </section>
  )
}

async function CallToActionSection() {
  return (
    <section className="py-16 lg:py-24 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-h2 text-white mb-6">Ready to Take Climate Action?</h2>
          <p className="text-lead text-gray mb-8 max-w-2xl mx-auto">
            Join thousands of organizations already working with South Pole to accelerate their climate journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Get Started Today
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white hover:text-dark">
              Download Our Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <NewsSection />
      <CallToActionSection />
    </div>
  )
}