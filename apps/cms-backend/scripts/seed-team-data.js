const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTeamData() {
  console.log('👥 Seeding additional team data...\n');

  try {
    // Clear existing team members (keeping the leadership from company seed)
    console.log('🧹 Clearing non-leadership team members...');
    await prisma.teamMember.deleteMany({
      where: { isLeadership: false }
    });

    // Additional team members across different departments
    console.log('👥 Creating team members...');
    
    const teamMembersData = [
      // Climate Solutions Team
      {
        name: 'Dr. Sarah Chen',
        title: 'Head of Climate Solutions',
        department: 'Climate Solutions',
        bio: 'Dr. Chen leads our climate solutions team with over 15 years of experience in environmental science and carbon market development. She holds a PhD in Environmental Science from Stanford University.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/sarahchen',
        email: 'sarah.chen@southpole.com',
        isLeadership: false,
        displayOrder: 10
      },
      {
        name: 'Michael Rodriguez',
        title: 'Senior Carbon Project Developer',
        department: 'Climate Solutions',
        bio: 'Michael specializes in developing and implementing large-scale carbon offset projects across Latin America. He brings expertise in forestry and renewable energy projects.',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/mrodriguez',
        isLeadership: false,
        displayOrder: 11
      },
      {
        name: 'Emma Thompson',
        title: 'Climate Finance Specialist',
        department: 'Climate Solutions',
        bio: 'Emma focuses on innovative climate finance mechanisms and helping organizations access funding for their sustainability initiatives.',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 12
      },

      // Advisory & Consulting Team
      {
        name: 'Dr. James Wilson',
        title: 'Director of Advisory Services',
        department: 'Advisory & Consulting',
        bio: 'Dr. Wilson leads our advisory services, helping organizations develop comprehensive climate strategies. He has over 20 years of experience in sustainability consulting.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/jameswilson',
        isLeadership: false,
        displayOrder: 20
      },
      {
        name: 'Lisa Zhang',
        title: 'Senior Sustainability Consultant',
        department: 'Advisory & Consulting',
        bio: 'Lisa specializes in corporate sustainability strategy and ESG reporting. She has helped over 100 companies develop and implement their climate action plans.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 21
      },
      {
        name: 'David Kumar',
        title: 'Climate Risk Analyst',
        department: 'Advisory & Consulting',
        bio: 'David focuses on climate risk assessment and helping organizations build resilience to climate change impacts.',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 22
      },

      // Technology & Innovation Team
      {
        name: 'Alex Petrov',
        title: 'Head of Digital Innovation',
        department: 'Technology & Innovation',
        bio: 'Alex leads our digital transformation initiatives, developing cutting-edge technology solutions for climate action measurement and reporting.',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/alexpetrov',
        isLeadership: false,
        displayOrder: 30
      },
      {
        name: 'Rachel Green',
        title: 'Senior Software Engineer',
        department: 'Technology & Innovation',
        bio: 'Rachel develops and maintains our climate data platforms and APIs. She specializes in building scalable solutions for environmental data processing.',
        imageUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 31
      },
      {
        name: 'Tom Anderson',
        title: 'Data Scientist',
        department: 'Technology & Innovation',
        bio: 'Tom focuses on machine learning applications in climate science, developing predictive models for carbon sequestration and emission reductions.',
        imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 32
      },

      // Project Development Team
      {
        name: 'Maria Santos',
        title: 'Director of Project Development',
        department: 'Project Development',
        bio: 'Maria oversees the development of climate projects globally, with particular expertise in forest conservation and community-based initiatives.',
        imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/mariasantos',
        isLeadership: false,
        displayOrder: 40
      },
      {
        name: 'Robert Kim',
        title: 'Renewable Energy Project Manager',
        department: 'Project Development',
        bio: 'Robert manages renewable energy projects across Asia-Pacific, specializing in solar and wind farm development for carbon credit generation.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 41
      },
      {
        name: 'Sophie Laurent',
        title: 'Community Engagement Manager',
        department: 'Project Development',
        bio: 'Sophie works with local communities to develop sustainable livelihood projects that generate carbon credits while improving local economic conditions.',
        imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 42
      },

      // Marketing & Communications Team
      {
        name: 'Jennifer Walsh',
        title: 'Head of Marketing',
        department: 'Marketing & Communications',
        bio: 'Jennifer leads our global marketing efforts, focusing on climate education and awareness campaigns. She brings 12 years of experience in environmental communications.',
        imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/jenniferwalsh',
        isLeadership: false,
        displayOrder: 50
      },
      {
        name: 'Carlos Mendez',
        title: 'Communications Specialist',
        department: 'Marketing & Communications',
        bio: 'Carlos manages our content strategy and external communications, ensuring our climate impact stories reach global audiences effectively.',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 51
      },

      // Human Resources Team
      {
        name: 'Dr. Priya Patel',
        title: 'Head of Human Resources',
        department: 'Human Resources',
        bio: 'Dr. Patel leads our global HR operations, focusing on building diverse teams and fostering a culture of innovation and sustainability.',
        imageUrl: 'https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=400&h=400&fit=crop&crop=face',
        linkedinUrl: 'https://linkedin.com/in/priyapatel',
        isLeadership: false,
        displayOrder: 60
      },
      {
        name: 'Mark Johnson',
        title: 'Talent Acquisition Manager',
        department: 'Human Resources',
        bio: 'Mark focuses on attracting top climate talent globally, building teams that can drive meaningful environmental impact.',
        imageUrl: 'https://images.unsplash.com/photo-1521118379844-d63c76013cf5?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 61
      },

      // Operations Team
      {
        name: 'Anna Kowalski',
        title: 'Operations Manager',
        department: 'Operations',
        bio: 'Anna ensures smooth day-to-day operations across all our offices, implementing efficient processes that support our global climate work.',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 70
      },
      {
        name: 'Hassan Al-Rashid',
        title: 'Quality Assurance Manager',
        department: 'Operations',
        bio: 'Hassan oversees quality control for all our climate projects, ensuring the highest standards of environmental integrity and impact measurement.',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=400&fit=crop&crop=face',
        isLeadership: false,
        displayOrder: 71
      }
    ];

    for (const member of teamMembersData) {
      await prisma.teamMember.create({ data: member });
    }

    console.log(`✅ Created ${teamMembersData.length} additional team members`);

    console.log('\n🎉 Team data seeding completed successfully!');
    
    // Summary
    const summary = {
      leadership: await prisma.teamMember.count({ where: { isLeadership: true } }),
      totalMembers: await prisma.teamMember.count(),
      departments: await prisma.teamMember.findMany({
        where: { department: { not: null } },
        select: { department: true },
        distinct: ['department']
      })
    };

    console.log('\n📋 Team Summary:');
    console.log(`   - Leadership members: ${summary.leadership}`);
    console.log(`   - Total team members: ${summary.totalMembers}`);
    console.log(`   - Departments: ${summary.departments.length}`);
    summary.departments.forEach(dept => {
      console.log(`     • ${dept.department}`);
    });

  } catch (error) {
    console.error('❌ Team seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedTeamData().catch(console.error);
}

module.exports = { seedTeamData };