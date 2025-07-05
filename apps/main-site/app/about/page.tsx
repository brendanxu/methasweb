import { Suspense } from 'react'
import { getAboutPageData } from '@/lib/api'
import AboutHero from '@/components/about/AboutHero'
import MissionSection from '@/components/about/MissionSection'
import ValuesSection from '@/components/about/ValuesSection'
import StatsSection from '@/components/about/StatsSection'
import LeadershipSection from '@/components/about/LeadershipSection'
import HistorySection from '@/components/about/HistorySection'
import LocationsSection from '@/components/about/LocationsSection'
import ImpactSection from '@/components/about/ImpactSection'

export default async function AboutPage() {
  const aboutData = await getAboutPageData()

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
        {/* Hero Section */}
        <AboutHero data={aboutData.sections.HERO?.[0]} />
        
        {/* Mission Section */}
        <MissionSection data={aboutData.sections.MISSION?.[0]} />
        
        {/* Stats Section */}
        <StatsSection stats={aboutData.stats} />
        
        {/* Values Section */}
        <ValuesSection data={aboutData.sections.VALUES?.[0]} />
        
        {/* Leadership Section */}
        <LeadershipSection leadership={aboutData.leadership} />
        
        {/* History Section */}
        <HistorySection data={aboutData.sections.HISTORY?.[0]} />
        
        {/* Impact Section */}
        <ImpactSection data={aboutData.sections.IMPACT?.[0]} />
        
        {/* Global Locations Section */}
        <LocationsSection locations={aboutData.locations} />
      </Suspense>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'About South Pole - Climate Action Since 2006',
    description: 'Learn about South Pole\'s mission to accelerate the transition to a climate-positive world. Discover our history, values, and global team of 800+ climate experts.',
  }
}