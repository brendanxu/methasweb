const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123456', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@southpole.com' },
    update: {},
    create: {
      email: 'admin@southpole.com',
      passwordHash: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true
    }
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create services
  const services = [
    {
      name: 'Climate Action',
      slug: 'climate-action',
      description: 'Comprehensive climate action strategies and implementation',
      color: '#0057FF'
    },
    {
      name: 'Climate Finance',
      slug: 'climate-finance',
      description: 'Financial instruments and strategies for climate initiatives',
      color: '#00B5A1'
    },
    {
      name: 'Renewable Energy',
      slug: 'renewable-energy',
      description: 'Renewable energy solutions and implementation',
      color: '#22C55E'
    },
    {
      name: 'Nature-Based Solutions',
      slug: 'nature-based-solutions',
      description: 'Natural climate solutions and conservation',
      color: '#10B981'
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service
    });
  }

  console.log('✅ Created services');

  // Create industries
  const industries = [
    {
      name: 'Technology',
      slug: 'technology',
      description: 'Technology and software companies'
    },
    {
      name: 'Finance',
      slug: 'finance',
      description: 'Financial services and institutions'
    },
    {
      name: 'Manufacturing',
      slug: 'manufacturing',
      description: 'Manufacturing and industrial companies'
    },
    {
      name: 'Energy',
      slug: 'energy',
      description: 'Energy companies and utilities'
    }
  ];

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { slug: industry.slug },
      update: {},
      create: industry
    });
  }

  console.log('✅ Created industries');

  // Create categories
  const categories = [
    {
      name: 'Climate Action',
      slug: 'climate-action',
      description: 'News about climate action initiatives',
      color: '#0057FF'
    },
    {
      name: 'Sustainability',
      slug: 'sustainability',
      description: 'Sustainability news and updates',
      color: '#22C55E'
    },
    {
      name: 'Innovation',
      slug: 'innovation',
      description: 'Innovation in climate technology',
      color: '#8B5CF6'
    },
    {
      name: 'Policy',
      slug: 'policy',
      description: 'Climate policy and regulation news',
      color: '#EF4444'
    }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  console.log('✅ Created categories');

  // Get created records for case study creation
  const techIndustry = await prisma.industry.findUnique({ where: { slug: 'technology' } });
  const climateActionService = await prisma.service.findUnique({ where: { slug: 'climate-action' } });
  const sustainabilityCategory = await prisma.category.findUnique({ where: { slug: 'sustainability' } });

  // Create sample case study
  const caseStudy = await prisma.caseStudy.create({
    data: {
      title: 'Microsoft Carbon Negative Initiative',
      slug: 'microsoft-carbon-negative-initiative',
      clientName: 'Microsoft Corporation',
      heroImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop',
      summary: 'Helping Microsoft achieve their ambitious carbon negative goals through comprehensive climate action strategies.',
      theGoal: 'Microsoft committed to being carbon negative by 2030 and removing all carbon emitted since the company was founded by 2050.',
      theChallenge: 'Developing a comprehensive strategy to not only achieve carbon neutrality but to go beyond and become carbon negative across all operations.',
      theSolution: 'We worked with Microsoft to develop a multi-faceted approach including renewable energy procurement, carbon removal technologies, and sustainable supply chain practices.',
      industryId: techIndustry.id,
      authorId: adminUser.id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      metaTitle: 'Microsoft Carbon Negative Initiative Case Study',
      metaDescription: 'Learn how South Pole helped Microsoft achieve their carbon negative goals through comprehensive climate action strategies.'
    }
  });

  // Link case study to service
  await prisma.caseStudyService.create({
    data: {
      caseStudyId: caseStudy.id,
      serviceId: climateActionService.id
    }
  });

  console.log('✅ Created sample case study');

  // Create sample news article
  await prisma.newsArticle.create({
    data: {
      title: 'New Carbon Removal Technologies Show Promise',
      slug: 'new-carbon-removal-technologies-show-promise',
      heroImageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1600&h=900&fit=crop',
      summary: 'Recent developments in direct air capture and other carbon removal technologies are showing significant promise for scaling climate solutions.',
      content: `
        <p>The field of carbon removal is experiencing rapid innovation, with new technologies emerging that could play a crucial role in achieving global climate goals.</p>
        
        <h2>Direct Air Capture Advances</h2>
        <p>Direct air capture (DAC) technology has seen significant improvements in efficiency and cost reduction. Several companies are now operating commercial-scale DAC facilities.</p>
        
        <h2>Nature-Based Solutions</h2>
        <p>Alongside technological solutions, nature-based approaches continue to show promise for large-scale carbon removal.</p>
        
        <h2>Looking Forward</h2>
        <p>The combination of technological and natural solutions provides a pathway for achieving the scale of carbon removal needed to meet climate targets.</p>
      `,
      categoryId: sustainabilityCategory.id,
      authorId: adminUser.id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      metaTitle: 'New Carbon Removal Technologies Show Promise',
      metaDescription: 'Recent developments in direct air capture and other carbon removal technologies are showing significant promise for scaling climate solutions.'
    }
  });

  console.log('✅ Created sample news article');

  console.log('🎉 Database seed completed successfully!');
  console.log('📧 Admin login: admin@southpole.com');
  console.log('🔑 Admin password: admin123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });