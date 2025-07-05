import HomepageHero from '@/components/homepage/HomepageHero'
import HomepageServices from '@/components/homepage/HomepageServices'
import HomepageImpact from '@/components/homepage/HomepageImpact'
import CarbonInsights from '@/components/homepage/CarbonInsights'
import HomepagePartners from '@/components/homepage/HomepagePartners'
import { getHomepageData } from '@/lib/api'

export default async function HomePage() {
  const homepageData = await getHomepageData()

  return (
    <div className="min-h-screen">
      <HomepageHero />
      <HomepageServices services={homepageData.services} />
      <HomepageImpact />
      <CarbonInsights />
      <HomepagePartners />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'South Pole - Leading Climate Solutions & Carbon Market Experts',
    description: 'South Pole develops comprehensive climate action strategies for businesses worldwide. Expert in carbon offsetting, net-zero strategies, and sustainable development since 2006.',
  }
}