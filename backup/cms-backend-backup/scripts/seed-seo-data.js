const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedSEOData() {
  console.log('🔍 Seeding SEO meta data...\n');

  try {
    // Get admin user for creation tracking
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      throw new Error('Admin user not found. Please run main seed first.');
    }

    // Clear existing SEO meta
    console.log('🧹 Clearing existing SEO meta...');
    await prisma.sEOMeta.deleteMany();

    // Default SEO meta for main pages
    console.log('📝 Creating default SEO meta...');
    
    const seoMetaData = [
      // HOME Page
      {
        pageType: 'HOME',
        title: 'South Pole - Leading Climate Solutions Provider',
        description: 'South Pole is a leading provider of global sustainability solutions and services. We help organizations achieve their climate goals through comprehensive strategies, carbon markets, and sustainable development projects.',
        keywords: 'climate solutions, carbon markets, sustainability, renewable energy, climate action, carbon offset, REDD+, forest conservation, ESG, net zero',
        ogTitle: 'South Pole - Leading Climate Solutions Provider',
        ogDescription: 'Accelerating the transition to a climate-positive world through innovative sustainability solutions and carbon market expertise.',
        ogImage: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=1200&h=630&fit=crop',
        ogImageAlt: 'South Pole climate solutions team working on forest conservation project',
        ogType: 'website',
        ogUrl: 'https://southpole.com',
        canonical: 'https://southpole.com',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "South Pole",
          "url": "https://southpole.com",
          "logo": "https://southpole.com/logo.png",
          "description": "Leading provider of global sustainability solutions and services.",
          "foundingDate": "2006",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+41-43-501-35-50",
            "contactType": "Customer Service"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Technoparkstrasse 1",
            "addressLocality": "Zurich",
            "postalCode": "8005",
            "addressCountry": "CH"
          }
        },
        isDefault: true,
        priority: 100,
        createdById: adminUser.id
      },

      // ABOUT Page
      {
        pageType: 'ABOUT',
        title: 'About South Pole - Climate Action Since 2006',
        description: 'Learn about South Pole\'s mission to accelerate the transition to a climate-positive world. Discover our history, values, and global team of 800+ climate experts working across 20+ countries.',
        keywords: 'about south pole, climate experts, sustainability company, carbon market leaders, climate action history, environmental consulting',
        ogTitle: 'About South Pole - Climate Action Since 2006',
        ogDescription: 'South Pole has been leading climate action since 2006 with 800+ experts across 20+ countries. Learn about our mission, values, and impact.',
        ogImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop',
        ogImageAlt: 'South Pole team members collaborating on climate solutions',
        canonical: 'https://southpole.com/about',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // SERVICES Page
      {
        pageType: 'SERVICES',
        title: 'Climate Solutions & Services - South Pole',
        description: 'Explore South Pole\'s comprehensive climate solutions including carbon markets, renewable energy, nature-based solutions, and climate finance. Expert consulting for your sustainability goals.',
        keywords: 'climate services, carbon markets, renewable energy solutions, nature-based solutions, climate finance, sustainability consulting, carbon offset projects',
        ogTitle: 'Climate Solutions & Services - South Pole',
        ogDescription: 'Comprehensive climate solutions including carbon markets, renewable energy, and nature-based solutions. Expert consulting for your sustainability journey.',
        ogImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop',
        ogImageAlt: 'Renewable energy and climate solutions infrastructure',
        canonical: 'https://southpole.com/services',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // WORK/PROJECTS Page
      {
        pageType: 'WORK',
        title: 'Our Work & Impact - Climate Projects Worldwide',
        description: 'Discover South Pole\'s climate projects and case studies from around the world. See how we\'ve helped organizations achieve their sustainability goals through innovative solutions.',
        keywords: 'climate projects, case studies, carbon offset projects, renewable energy projects, forest conservation, sustainability success stories',
        ogTitle: 'Our Work & Impact - Climate Projects Worldwide',
        ogDescription: 'Explore our global climate projects and success stories. See how we\'re creating meaningful climate impact worldwide.',
        ogImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=630&fit=crop',
        ogImageAlt: 'Global climate projects and environmental impact initiatives',
        canonical: 'https://southpole.com/work',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // NEWS Page
      {
        pageType: 'NEWS',
        title: 'Climate News & Insights - South Pole',
        description: 'Stay updated with the latest climate news, insights, and thought leadership from South Pole. Expert analysis on carbon markets, sustainability trends, and climate policy.',
        keywords: 'climate news, carbon market insights, sustainability trends, climate policy, environmental news, thought leadership',
        ogTitle: 'Climate News & Insights - South Pole',
        ogDescription: 'Latest climate news, insights, and expert analysis on carbon markets, sustainability trends, and climate policy.',
        ogImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop',
        ogImageAlt: 'Climate news and insights publication',
        canonical: 'https://southpole.com/news',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // CONTACT Page
      {
        pageType: 'CONTACT',
        title: 'Contact South Pole - Get in Touch',
        description: 'Contact South Pole for climate solutions and sustainability consulting. Reach our global team of experts across 20+ countries. Get started on your climate journey today.',
        keywords: 'contact south pole, climate consulting, sustainability consulting, get in touch, climate experts, sustainability support',
        ogTitle: 'Contact South Pole - Get in Touch',
        ogDescription: 'Contact our global team of climate experts for sustainability consulting and climate solutions. Start your climate journey today.',
        ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=630&fit=crop',
        ogImageAlt: 'Contact South Pole climate experts for sustainability consulting',
        canonical: 'https://southpole.com/contact',
        structuredData: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact South Pole",
          "description": "Get in touch with South Pole for climate solutions and sustainability consulting.",
          "url": "https://southpole.com/contact"
        },
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // TEAM Page
      {
        pageType: 'TEAM',
        title: 'Our Team - Climate Experts Worldwide',
        description: 'Meet South Pole\'s global team of 800+ climate experts working across 20+ countries. Our diverse team of specialists drives meaningful climate action worldwide.',
        keywords: 'south pole team, climate experts, sustainability professionals, global team, environmental specialists, leadership team',
        ogTitle: 'Our Team - Climate Experts Worldwide',
        ogDescription: 'Meet our global team of 800+ climate experts driving meaningful climate action across 20+ countries.',
        ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop',
        ogImageAlt: 'South Pole global team of climate experts and sustainability professionals',
        canonical: 'https://southpole.com/team',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // LOCATIONS Page
      {
        pageType: 'LOCATIONS',
        title: 'Global Offices - South Pole Worldwide Presence',
        description: 'Find South Pole offices worldwide. We have 20+ offices across 5 continents, bringing local expertise to global climate challenges. Connect with our regional teams.',
        keywords: 'south pole offices, global presence, international offices, regional teams, worldwide locations, climate experts locations',
        ogTitle: 'Global Offices - South Pole Worldwide Presence',
        ogDescription: 'Connect with our global team at 20+ offices across 5 continents. Local expertise for global climate challenges.',
        ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop',
        ogImageAlt: 'South Pole global offices and worldwide presence',
        canonical: 'https://southpole.com/locations',
        isDefault: true,
        priority: 90,
        createdById: adminUser.id
      },

      // Case Study Template
      {
        pageType: 'CASE_STUDY',
        title: 'Climate Project Case Study - South Pole',
        description: 'Discover how South Pole delivers measurable climate impact through innovative sustainability projects. Real-world case studies and success stories.',
        keywords: 'case study, climate project, sustainability success, carbon offset project, environmental impact, climate solutions example',
        ogTitle: 'Climate Project Case Study - South Pole',
        ogDescription: 'Real-world climate project case study showcasing measurable environmental impact and sustainability success.',
        ogType: 'article',
        twitterCard: 'summary_large_image',
        isDefault: true,
        priority: 80,
        createdById: adminUser.id
      },

      // News Article Template
      {
        pageType: 'NEWS_ARTICLE',
        title: 'Climate News Article - South Pole',
        description: 'Latest insights and analysis on climate action, carbon markets, and sustainability from South Pole experts.',
        keywords: 'climate news, carbon market analysis, sustainability insights, environmental policy, climate expert opinion',
        ogTitle: 'Climate News Article - South Pole',
        ogDescription: 'Expert insights and analysis on climate action, carbon markets, and sustainability from South Pole.',
        ogType: 'article',
        twitterCard: 'summary_large_image',
        isDefault: true,
        priority: 80,
        createdById: adminUser.id
      }
    ];

    for (const seoMeta of seoMetaData) {
      await prisma.sEOMeta.create({ data: seoMeta });
    }

    console.log(`✅ Created ${seoMetaData.length} SEO meta entries`);

    console.log('\n🎉 SEO meta data seeding completed successfully!');
    
    // Summary
    const summary = {
      totalEntries: await prisma.sEOMeta.count(),
      defaultEntries: await prisma.sEOMeta.count({ where: { isDefault: true } }),
      pageTypes: await prisma.sEOMeta.groupBy({
        by: ['pageType'],
        _count: true
      })
    };

    console.log('\n📋 SEO Meta Summary:');
    console.log(`   - Total entries: ${summary.totalEntries}`);
    console.log(`   - Default entries: ${summary.defaultEntries}`);
    
    console.log('\n📊 Coverage by Page Type:');
    summary.pageTypes.forEach(item => {
      console.log(`   - ${item.pageType}: ${item._count} entries`);
    });

    // Check coverage
    const allPageTypes = ['HOME', 'ABOUT', 'SERVICES', 'WORK', 'NEWS', 'CONTACT', 'TEAM', 'LOCATIONS', 'CASE_STUDY', 'NEWS_ARTICLE'];
    const coveredTypes = summary.pageTypes.map(item => item.pageType);
    const missingTypes = allPageTypes.filter(type => !coveredTypes.includes(type));
    
    if (missingTypes.length > 0) {
      console.log('\n⚠️  Missing SEO coverage for:');
      missingTypes.forEach(type => console.log(`   - ${type}`));
    } else {
      console.log('\n✅ All main page types have SEO coverage!');
    }

  } catch (error) {
    console.error('❌ SEO meta seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedSEOData().catch(console.error);
}

module.exports = { seedSEOData };