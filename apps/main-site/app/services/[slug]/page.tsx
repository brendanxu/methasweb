import { notFound } from 'next/navigation'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceOverview from '@/components/services/ServiceOverview'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceProcess from '@/components/services/ServiceProcess'
import ServiceCaseStudies from '@/components/services/ServiceCaseStudies'
import ServiceCTA from '@/components/services/ServiceCTA'
import { getServiceBySlug } from '@/lib/api'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess service={service} />
      <ServiceCaseStudies service={service} />
      <ServiceCTA service={service} />
    </div>
  )
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  return {
    title: `${service.name} - Climate Solutions | South Pole`,
    description: service.description,
  }
}