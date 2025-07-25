import ServicesHero from '@/components/services/ServicesHero'
import ServicesOverview from '@/components/services/ServicesOverview'
import ServicesSolutions from '@/components/services/ServicesSolutions'
import ServicesApproach from '@/components/services/ServicesApproach'
import { getServicesPageData } from '@/lib/api'

export default async function ServicesPage() {
  const servicesData = await getServicesPageData()

  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesOverview services={servicesData.services} />
      <ServicesSolutions solutions={servicesData.solutions} />
      <ServicesApproach />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'What We Do - Climate Solutions & Services | 碳智METHAS',
    description: 'Discover 碳智METHAS\'s comprehensive climate solutions: carbon offsetting, net-zero strategies, renewable energy, and sustainability consulting. Create meaningful climate impact.',
  }
}