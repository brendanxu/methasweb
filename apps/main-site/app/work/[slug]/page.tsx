import { notFound } from 'next/navigation'
import { Button } from "@repo/ui"
import { getCaseStudy, getLatestCaseStudies } from "../../../lib/api"
import Image from 'next/image'

interface CaseStudyDetailProps {
  params: Promise<{
    slug: string
  }>
}

async function CaseStudyHero({ caseStudy }: { caseStudy: any }) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-white mb-4">
            {caseStudy.relatedIndustry.name}
          </span>
          <h1 className="text-h1 text-dark mb-6">{caseStudy.title}</h1>
          <div className="flex items-center gap-4 text-gray mb-8">
            <span className="font-medium">Client:</span>
            <span className="text-primary font-semibold">{caseStudy.clientName}</span>
          </div>
        </div>
        
        <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
          <Image
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lead text-gray">{caseStudy.summary}</p>
        </div>
      </div>
    </section>
  )
}

async function CaseStudyContent({ caseStudy }: { caseStudy: any }) {
  return (
    <section className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12">
          <div className="bg-light rounded-lg p-8">
            <h2 className="text-h3 text-dark mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
              The Goal
            </h2>
            <p className="text-body text-dark leading-relaxed">{caseStudy.theGoal}</p>
          </div>
          
          <div className="bg-light rounded-lg p-8">
            <h2 className="text-h3 text-dark mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
              The Challenge
            </h2>
            <p className="text-body text-dark leading-relaxed">{caseStudy.theChallenge}</p>
          </div>
          
          <div className="bg-light rounded-lg p-8">
            <h2 className="text-h3 text-dark mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
              The Solution
            </h2>
            <p className="text-body text-dark leading-relaxed">{caseStudy.theSolution}</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray/20">
          <h3 className="text-h3 text-dark mb-6">Related Services</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {caseStudy.relatedServices.map((service: any) => (
              <span key={service.id} className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                {service.name}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <p className="text-sm text-gray mb-2">Share this case study</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">LinkedIn</Button>
                <Button variant="ghost" size="sm">Twitter</Button>
                <Button variant="ghost" size="sm">Email</Button>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href="/work">← Back to Our Work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

async function RelatedCaseStudies({ currentSlug }: { currentSlug: string }) {
  const caseStudies = await getLatestCaseStudies(3)
  const relatedStudies = caseStudies.filter(study => study.slug !== currentSlug)

  if (relatedStudies.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 text-dark mb-12 text-center">Related Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedStudies.slice(0, 3).map((study) => (
            <div key={study.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={study.heroImage}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-secondary px-3 py-1 text-xs font-medium text-white rounded-full">
                  {study.relatedIndustry.name}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-3 line-clamp-2">
                  {study.title}
                </h3>
                <p className="text-gray text-sm line-clamp-3 mb-4">{study.summary}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={`/work/${study.slug}`}>View Case Study</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ params }: CaseStudyDetailProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | 碳智METHAS',
      description: 'The requested case study could not be found.'
    }
  }

  return {
    title: `${caseStudy.title} | 碳智METHAS Case Study`,
    description: caseStudy.summary,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [
        {
          url: caseStudy.heroImage,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [caseStudy.heroImage],
    },
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <article>
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyContent caseStudy={caseStudy} />
      <RelatedCaseStudies currentSlug={slug} />
    </article>
  )
}