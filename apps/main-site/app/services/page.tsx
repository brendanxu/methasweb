import ServicesHero from '@/components/services/ServicesHero'
import ServicesOverview from '@/components/services/ServicesOverview'
import ServicesSolutions from '@/components/services/ServicesSolutions'
import ServicesApproach from '@/components/services/ServicesApproach'
import ServicesCTA from '@/components/services/ServicesCTA'
import { getServicesPageData } from '@/lib/api'

export default async function ServicesPage() {
  const servicesData = await getServicesPageData()

  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesOverview services={servicesData.services} />
      <ServicesSolutions solutions={servicesData.solutions} />
      <ServicesApproach />
      <ServicesCTA />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'What We Do - Climate Solutions & Services | South Pole',
    description: 'Discover South Pole\'s comprehensive climate solutions: carbon offsetting, net-zero strategies, renewable energy, and sustainability consulting. Create meaningful climate impact.',
  }
}