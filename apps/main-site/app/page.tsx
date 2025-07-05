import HomepageHero from '@/components/homepage/HomepageHero'
import HomepageServices from '@/components/homepage/HomepageServices'
import HomepageStats from '@/components/homepage/HomepageStats'
import HomepageImpact from '@/components/homepage/HomepageImpact'
import HomepageCaseStudies from '@/components/homepage/HomepageCaseStudies'
import HomepageNews from '@/components/homepage/HomepageNews'
import HomepagePartners from '@/components/homepage/HomepagePartners'
import HomepageCTA from '@/components/homepage/HomepageCTA'
import { getHomepageData } from '@/lib/api'

export default async function HomePage() {
  const homepageData = await getHomepageData()

  return (
    <div className="min-h-screen">
      <HomepageHero />
      <HomepageStats stats={homepageData.stats} />
      <HomepageServices services={homepageData.services} />
      <HomepageImpact />
      <HomepageCaseStudies caseStudies={homepageData.caseStudies} />
      <HomepagePartners />
      <HomepageNews news={homepageData.news} />
      <HomepageCTA />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'South Pole - Leading Climate Solutions & Carbon Market Experts',
    description: 'South Pole develops comprehensive climate action strategies for businesses worldwide. Expert in carbon offsetting, net-zero strategies, and sustainable development since 2006.',
  }
}