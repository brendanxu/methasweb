const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedContactData() {
  console.log('📧 Seeding contact forms data...\n');

  try {
    // Get admin user for assignment
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!adminUser) {
      throw new Error('Admin user not found. Please run main seed first.');
    }

    // Clear existing contact forms
    console.log('🧹 Clearing existing contact forms...');
    await prisma.contactForm.deleteMany();

    // Sample contact forms
    console.log('📝 Creating sample contact forms...');
    
    const contactFormsData = [
      // Recent urgent partnership inquiry
      {
        type: 'PARTNERSHIP',
        status: 'NEW',
        priority: 'URGENT',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@greentech.com',
        phone: '+1-555-0123',
        company: 'GreenTech Innovations',
        jobTitle: 'Chief Sustainability Officer',
        country: 'United States',
        subject: 'Strategic Partnership for Carbon Offset Program',
        message: 'Hello, we are a leading renewable energy company looking to partner with South Pole for a comprehensive carbon offset program. We are interested in developing forest conservation projects in Latin America and would like to discuss potential collaboration opportunities. Our annual carbon footprint is approximately 50,000 tonnes CO2e.',
        source: 'website',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },

      // Media inquiry assigned and in progress
      {
        type: 'MEDIA',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'm.chen@climatereporter.com',
        phone: '+44-207-555-0987',
        company: 'Climate Reporter Magazine',
        jobTitle: 'Senior Environmental Journalist',
        country: 'United Kingdom',
        subject: 'Interview Request: Global Carbon Market Trends 2024',
        message: 'I am writing an article about the evolution of voluntary carbon markets and would like to interview someone from South Pole about recent trends, challenges, and opportunities in the sector. The article will be featured in our December issue.',
        source: 'website',
        assignedToId: adminUser.id,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },

      // Career inquiry resolved
      {
        type: 'CAREER',
        status: 'RESOLVED',
        priority: 'MEDIUM',
        firstName: 'Emma',
        lastName: 'Rodriguez',
        email: 'emma.rodriguez@email.com',
        phone: '+34-91-555-1234',
        company: '',
        jobTitle: '',
        country: 'Spain',
        subject: 'Application for Climate Project Manager Position',
        message: 'Dear South Pole team, I have over 8 years of experience in environmental project management and am very interested in the Climate Project Manager position I saw posted on your careers page. I have extensive experience with REDD+ projects and community engagement. Please find my CV attached.',
        source: 'careers-page',
        assignedToId: adminUser.id,
        responseText: 'Thank you for your interest in South Pole. We have reviewed your application and would like to schedule an initial interview. Our HR team will contact you within the next week.',
        responseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      },

      // General consultation inquiry
      {
        type: 'CONSULTATION',
        status: 'ASSIGNED',
        priority: 'HIGH',
        firstName: 'David',
        lastName: 'Kim',
        email: 'david.kim@sustainablecorp.com',
        phone: '+82-2-555-6789',
        company: 'Sustainable Corp',
        jobTitle: 'Head of ESG',
        country: 'South Korea',
        subject: 'Net Zero Strategy Development for Manufacturing Company',
        message: 'We are a mid-size manufacturing company based in Seoul and are committed to achieving net zero emissions by 2030. We need expert guidance on developing a comprehensive decarbonization strategy, including scope 3 emissions management and science-based target setting.',
        source: 'website',
        assignedToId: adminUser.id,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },

      // Support request
      {
        type: 'SUPPORT',
        status: 'NEW',
        priority: 'MEDIUM',
        firstName: 'Lisa',
        lastName: 'Thompson',
        email: 'lisa.thompson@carbonneutral.org',
        phone: '+1-415-555-2468',
        company: 'Carbon Neutral Initiative',
        jobTitle: 'Program Director',
        country: 'United States',
        subject: 'Technical Support for Carbon Registry Platform',
        message: 'We are experiencing some issues with uploading verification documents to the South Pole registry platform. The upload fails consistently for files larger than 10MB. Could you please provide technical assistance?',
        source: 'client-portal',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },

      // General inquiry - older
      {
        type: 'GENERAL',
        status: 'CLOSED',
        priority: 'LOW',
        firstName: 'Andreas',
        lastName: 'Mueller',
        email: 'a.mueller@climateaction.de',
        phone: '+49-30-555-7890',
        company: 'Climate Action Germany',
        jobTitle: 'Research Assistant',
        country: 'Germany',
        subject: 'Request for Information on Forest Project Methodologies',
        message: 'Hello, I am a graduate student researching forest carbon projects and would appreciate any publicly available information about the methodologies used in South Pole forest conservation projects.',
        source: 'website',
        assignedToId: adminUser.id,
        responseText: 'Thank you for your inquiry. We have sent you our publicly available methodology documents and case studies via email. Best of luck with your research!',
        responseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
      },

      // Recent partnership inquiry from Asia
      {
        type: 'PARTNERSHIP',
        status: 'NEW',
        priority: 'HIGH',
        firstName: 'Yuki',
        lastName: 'Tanaka',
        email: 'y.tanaka@greenenergy.jp',
        phone: '+81-3-555-4567',
        company: 'Green Energy Solutions Japan',
        jobTitle: 'International Business Manager',
        country: 'Japan',
        subject: 'Collaboration on Solar Project Development in Southeast Asia',
        message: 'We are interested in partnering with South Pole to develop large-scale solar projects in Vietnam and Thailand. We have identified several potential sites and would like to discuss co-development opportunities and carbon credit generation.',
        source: 'conference-referral',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
      },

      // Media inquiry about recent announcement
      {
        type: 'MEDIA',
        status: 'NEW',
        priority: 'MEDIUM',
        firstName: 'Carlos',
        lastName: 'Silva',
        email: 'carlos.silva@ambientalista.com',
        phone: '+55-11-555-9876',
        company: 'Revista Ambientalista',
        jobTitle: 'Environmental Correspondent',
        country: 'Brazil',
        subject: 'Comment Request on New REDD+ Project in Amazon',
        message: 'I am writing about the recent announcement of South Pole\'s new REDD+ project in the Amazon region. Would it be possible to get a comment from a South Pole representative about the project\'s expected impact and community involvement?',
        source: 'press-release',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      }
    ];

    for (const contactForm of contactFormsData) {
      await prisma.contactForm.create({ data: contactForm });
    }

    console.log(`✅ Created ${contactFormsData.length} sample contact forms`);

    console.log('\n🎉 Contact forms data seeding completed successfully!');
    
    // Summary
    const summary = {
      totalForms: await prisma.contactForm.count(),
      newForms: await prisma.contactForm.count({ where: { status: 'NEW' } }),
      assignedForms: await prisma.contactForm.count({ where: { status: 'ASSIGNED' } }),
      inProgressForms: await prisma.contactForm.count({ where: { status: 'IN_PROGRESS' } }),
      resolvedForms: await prisma.contactForm.count({ where: { status: 'RESOLVED' } }),
      closedForms: await prisma.contactForm.count({ where: { status: 'CLOSED' } }),
      typeBreakdown: await prisma.contactForm.groupBy({
        by: ['type'],
        _count: true
      })
    };

    console.log('\n📋 Contact Forms Summary:');
    console.log(`   - Total forms: ${summary.totalForms}`);
    console.log(`   - New: ${summary.newForms}`);
    console.log(`   - Assigned: ${summary.assignedForms}`);
    console.log(`   - In Progress: ${summary.inProgressForms}`);
    console.log(`   - Resolved: ${summary.resolvedForms}`);
    console.log(`   - Closed: ${summary.closedForms}`);
    
    console.log('\n📊 Forms by Type:');
    summary.typeBreakdown.forEach(item => {
      console.log(`   - ${item.type}: ${item._count}`);
    });

  } catch (error) {
    console.error('❌ Contact forms seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedContactData().catch(console.error);
}

module.exports = { seedContactData };