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
    title: '碳智METHAS - 专业碳中和解决方案与碳市场专家',
    description: '碳智METHAS为全球企业提供全方位的碳中和战略规划。专注于碳资产管理、零碳转型策略和可持续发展解决方案。',
  }
}