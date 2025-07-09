import TeamHero from '@/components/team/TeamHero'
import TeamLeadership from '@/components/team/TeamLeadership'
import TeamDepartments from '@/components/team/TeamDepartments'
import TeamStats from '@/components/team/TeamStats'
import TeamCulture from '@/components/team/TeamCulture'
import TeamCareers from '@/components/team/TeamCareers'
import { getTeamPageData } from '@/lib/api'

export default async function TeamPage() {
  const teamData = await getTeamPageData()

  return (
    <div className="min-h-screen">
      <TeamHero />
      <TeamStats stats={teamData.stats} />
      <TeamLeadership leadership={teamData.leadership} />
      <TeamDepartments departments={teamData.departments} />
      <TeamCulture />
      <TeamCareers />
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'Our Team - Climate Experts & Leaders | 碳智METHAS',
    description: 'Meet the passionate climate experts, leaders, and innovators driving 碳智METHAS\'s mission. 800+ professionals across 20+ countries creating global climate impact.',
  }
}