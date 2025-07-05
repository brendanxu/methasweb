import { CaseStudy } from '@/lib/types'
import Link from 'next/link'

interface HomepageCaseStudiesProps {
  caseStudies: CaseStudy[]
}

export default function HomepageCaseStudies({ caseStudies }: HomepageCaseStudiesProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped organizations achieve their climate goals 
            through innovative solutions and strategic partnerships.
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {caseStudies.slice(0, 3).map((study) => (
              <Link key={study.id} href={`/work/${study.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                  <img 
                    src={study.heroImage}
                    alt={study.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <span className="text-blue-600 text-sm font-medium">{study.relatedIndustry.name}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{study.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Case studies will be displayed here.</p>
          </div>
        )}

        <div className="text-center">
          <Link 
            href="/work"
            className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            View All Case Studies
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}