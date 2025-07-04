import { Button, Card } from "@repo/ui"
import { getCaseStudies } from "../../lib/api"

async function WorkHero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-h1 text-white mb-6">Our Work</h1>
          <p className="text-lead text-white/90 max-w-3xl mx-auto">
            Discover how we&apos;ve helped organizations around the world achieve their climate goals 
            through innovative solutions and strategic partnerships.
          </p>
        </div>
      </div>
    </section>
  )
}

async function CaseStudiesGrid() {
  const caseStudies = await getCaseStudies()

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-h2 text-dark mb-4">Case Studies</h2>
            <p className="text-gray">
              Real-world examples of climate action and sustainability transformation.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Industries</Button>
            <Button variant="ghost" size="sm">Technology</Button>
            <Button variant="ghost" size="sm">Finance</Button>
            <Button variant="ghost" size="sm">Manufacturing</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Case Studies
          </Button>
        </div>
      </div>
    </section>
  )
}

async function StatsSection() {
  const stats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "50M+", label: "Tonnes CO₂ Avoided" },
    { number: "100+", label: "Countries Served" },
    { number: "15+", label: "Years Experience" }
  ]

  return (
    <section className="py-16 lg:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h2 text-dark mb-4">Our Impact</h2>
          <p className="text-lead text-gray max-w-2xl mx-auto">
            Measurable results from our climate action initiatives worldwide.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default async function WorkPage() {
  return (
    <div>
      <WorkHero />
      <CaseStudiesGrid />
      <StatsSection />
    </div>
  )
}