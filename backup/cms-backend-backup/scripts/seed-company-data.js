const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedCompanyData() {
  console.log('🌱 Seeding company data...\n');

  try {
    // Get admin user for foreign key
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      throw new Error('Admin user not found. Please run main seed first.');
    }

    // Clear existing company data
    console.log('🧹 Clearing existing company data...');
    await prisma.companyStats.deleteMany();
    await prisma.companyInfo.deleteMany();
    
    // Create company information sections
    console.log('📝 Creating company information sections...');
    
    const companyInfoData = [
      // HERO Section
      {
        section: 'HERO',
        title: 'Leading climate impact since 2006',
        subtitle: 'We help organizations and communities achieve their climate goals',
        content: `South Pole is a leading provider of global sustainability solutions and services. Since 2006, we have helped organizations and communities achieve their climate goals through comprehensive climate action strategies, carbon market solutions, and sustainable development projects.

Our team of 800+ experts across 20+ countries works tirelessly to create meaningful climate impact through innovative solutions, rigorous science, and collaborative partnerships.`,
        imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1600&h=900&fit=crop',
        ctaText: 'Learn About Our Impact',
        ctaUrl: '/work',
        displayOrder: 1,
        authorId: adminUser.id
      },
      
      // MISSION Section
      {
        section: 'MISSION',
        title: 'Our Mission',
        subtitle: 'Creating true climate impact for all',
        content: `Our mission is to accelerate the transition to a climate-positive world by helping organizations and communities reduce their environmental impact and build resilience to climate change.

We believe that every organization has a role to play in addressing the climate crisis, and we're here to make that journey both achievable and impactful. Through our comprehensive suite of services, we enable businesses to turn climate commitments into measurable action.`,
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop',
        displayOrder: 1,
        authorId: adminUser.id
      },

      // VALUES Section
      {
        section: 'VALUES',
        title: 'Our Values',
        subtitle: 'Integrity, Innovation, and Impact',
        content: `**Integrity**: We maintain the highest standards of environmental and social integrity in everything we do. Our rigorous verification processes and transparent reporting ensure that every project delivers real, measurable impact.

**Innovation**: We continuously develop cutting-edge solutions to address the world's most pressing climate challenges. Our team combines deep expertise with creative thinking to find new pathways to sustainability.

**Impact**: We measure our success by the positive change we create for the planet and communities. Every project, every partnership, and every solution is designed to deliver meaningful climate impact.`,
        displayOrder: 1,
        authorId: adminUser.id
      },

      // HISTORY Section
      {
        section: 'HISTORY',
        title: 'Our Journey',
        subtitle: 'Nearly two decades of climate leadership',
        content: `Founded in 2006, South Pole began with a simple yet ambitious goal: to help organizations navigate the emerging carbon markets and create meaningful climate impact. 

Over the years, we've grown from a small team of climate experts to a global organization with offices across five continents. We've helped develop and finance over 700 climate projects worldwide, supported the development of international climate standards, and enabled thousands of organizations to achieve their sustainability goals.

Today, we continue to innovate and lead in the rapidly evolving landscape of climate action, always staying true to our core mission of creating measurable, positive impact for the planet.`,
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&h=900&fit=crop',
        displayOrder: 1,
        authorId: adminUser.id
      },

      // COMMITMENT Section
      {
        section: 'COMMITMENT',
        title: 'Commitment to Quality',
        subtitle: 'Rigorous standards and transparent processes',
        content: `We are committed to maintaining the highest standards of quality and integrity in all our climate solutions. Our commitment includes:

**Rigorous Verification**: All our projects undergo strict third-party verification to ensure they deliver real, additional, and permanent climate benefits.

**Transparent Reporting**: We provide detailed, transparent reporting on all project activities and outcomes, enabling our clients to track and communicate their climate impact with confidence.

**Continuous Improvement**: We continuously refine our methodologies and processes based on the latest climate science and best practices in the industry.

**Stakeholder Engagement**: We work closely with local communities and stakeholders to ensure our projects create positive social and environmental outcomes.`,
        displayOrder: 1,
        authorId: adminUser.id
      },

      // IMPACT Section
      {
        section: 'IMPACT',
        title: 'Our Global Impact',
        subtitle: 'Driving climate action across the world',
        content: `Since our founding, South Pole has been at the forefront of global climate action, delivering meaningful impact across diverse sectors and geographies:

**Climate Projects**: We've developed and financed over 700 climate projects across 50+ countries, generating millions of tonnes of verified carbon reductions.

**Organizational Impact**: We've helped thousands of organizations set science-based targets, develop climate strategies, and implement sustainable practices.

**Market Development**: We've played a key role in developing international climate standards and market mechanisms that enable scalable climate action.

**Knowledge Sharing**: Through our research and thought leadership, we continue to advance the understanding and practice of effective climate action.`,
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&h=900&fit=crop',
        ctaText: 'Explore Our Projects',
        ctaUrl: '/work',
        displayOrder: 1,
        authorId: adminUser.id
      }
    ];

    for (const info of companyInfoData) {
      await prisma.companyInfo.create({ data: info });
    }

    console.log(`✅ Created ${companyInfoData.length} company information sections`);

    // Create company statistics
    console.log('📊 Creating company statistics...');
    
    const statsData = [
      {
        label: 'Expert Team Members',
        value: '800+',
        description: 'Climate experts working across the globe',
        displayOrder: 1
      },
      {
        label: 'Countries',
        value: '20+',
        description: 'Global presence across five continents',
        displayOrder: 2
      },
      {
        label: 'Climate Projects',
        value: '700+',
        description: 'Projects developed and financed worldwide',
        displayOrder: 3
      },
      {
        label: 'Years of Experience',
        value: '18+',
        description: 'Leading climate action since 2006',
        displayOrder: 4
      },
      {
        label: 'CO₂ Reduced',
        value: '50M+',
        description: 'Tonnes of CO₂ equivalent reduced or removed',
        displayOrder: 5
      },
      {
        label: 'Organizations Served',
        value: '1000+',
        description: 'Companies and institutions we\'ve helped',
        displayOrder: 6
      }
    ];

    for (const stat of statsData) {
      await prisma.companyStats.create({ data: stat });
    }

    console.log(`✅ Created ${statsData.length} company statistics`);

    // Sample team members (leadership)
    console.log('👥 Creating sample team members...');
    
    const teamData = [
      {
        name: 'Renat Heuberger',
        title: 'CEO & Co-Founder',
        department: 'Executive Leadership',
        bio: 'Renat co-founded South Pole in 2006 and has since built it into one of the world\'s leading providers of climate solutions. He is a recognized expert in carbon markets and climate finance.',
        isLeadership: true,
        displayOrder: 1
      },
      {
        name: 'Andreas Keel',
        title: 'CTO & Co-Founder',
        department: 'Technology & Innovation',
        bio: 'Andreas leads South Pole\'s technology initiatives and drives innovation in climate solutions. He co-founded the company with a vision to scale climate action through technology.',
        isLeadership: true,
        displayOrder: 2
      },
      {
        name: 'Maximilian Horster',
        title: 'CFO',
        department: 'Finance & Operations',
        bio: 'Maximilian oversees South Pole\'s financial strategy and operations, ensuring sustainable growth while maintaining the company\'s commitment to climate impact.',
        isLeadership: true,
        displayOrder: 3
      },
      {
        name: 'Rebecca Leeming',
        title: 'Chief Business Development Officer',
        department: 'Business Development',
        bio: 'Rebecca leads business development and strategic partnerships, helping organizations around the world access South Pole\'s climate solutions.',
        isLeadership: true,
        displayOrder: 4
      }
    ];

    for (const member of teamData) {
      await prisma.teamMember.create({ data: member });
    }

    console.log(`✅ Created ${teamData.length} team members`);

    // Sample office locations
    console.log('🌍 Creating office locations...');
    
    const locationsData = [
      {
        name: 'Zurich Headquarters',
        address: 'Technoparkstrasse 1, 8005 Zurich',
        city: 'Zurich',
        country: 'Switzerland',
        countryCode: 'CH',
        phone: '+41 43 501 35 50',
        email: 'info@southpole.com',
        timezone: 'CET',
        coordinates: '47.3769,8.5417',
        description: 'Our global headquarters and main hub for European operations.',
        isHeadquarters: true
      },
      {
        name: 'London Office',
        address: '1 King William Street, London',
        city: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'GMT',
        coordinates: '51.5074,-0.1278',
        description: 'Serving clients across the UK and broader European market.'
      },
      {
        name: 'New York Office',
        address: '1 World Trade Center, New York',
        city: 'New York',
        country: 'United States',
        countryCode: 'US',
        timezone: 'EST',
        coordinates: '40.7131,-74.0118',
        description: 'North American headquarters serving clients across the Americas.'
      },
      {
        name: 'Singapore Office',
        address: '1 Raffles Place, Singapore',
        city: 'Singapore',
        country: 'Singapore',
        countryCode: 'SG',
        timezone: 'SGT',
        coordinates: '1.2847,103.8516',
        description: 'Asia-Pacific hub serving the growing Asian market.'
      },
      {
        name: 'São Paulo Office',
        address: 'Av. Paulista, 1000, São Paulo',
        city: 'São Paulo',
        country: 'Brazil',
        countryCode: 'BR',
        timezone: 'BRT',
        coordinates: '-23.5505,-46.6333',
        description: 'Latin American operations center focusing on forest conservation projects.'
      }
    ];

    for (const location of locationsData) {
      await prisma.officeLocation.create({ data: location });
    }

    console.log(`✅ Created ${locationsData.length} office locations`);

    console.log('\n🎉 Company data seeding completed successfully!');
    
    // Summary
    const summary = {
      companyInfo: await prisma.companyInfo.count(),
      stats: await prisma.companyStats.count(),
      teamMembers: await prisma.teamMember.count(),
      locations: await prisma.officeLocation.count()
    };

    console.log('\n📋 Summary:');
    Object.entries(summary).forEach(([table, count]) => {
      console.log(`   - ${table}: ${count} records`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedCompanyData().catch(console.error);
}

module.exports = { seedCompanyData };