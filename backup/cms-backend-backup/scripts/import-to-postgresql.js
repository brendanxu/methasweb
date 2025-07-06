const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

async function importToPostgreSQL() {
  console.log('📥 Importing data to PostgreSQL...\n');
  
  try {
    // Read exported data
    const dataPath = path.join(__dirname, 'sqlite-export.json');
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    
    // Clear existing data (optional - comment out if you want to append)
    console.log('🧹 Clearing existing data...');
    await prisma.mediaFile.deleteMany();
    await prisma.caseStudyService.deleteMany();
    await prisma.caseStudy.deleteMany();
    await prisma.newsArticle.deleteMany();
    await prisma.service.deleteMany();
    await prisma.industry.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    
    // Import users
    console.log('\n📤 Importing users...');
    for (const user of data.users) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          passwordHash: user.password_hash,
          name: user.name,
          role: user.role.toUpperCase(), // Convert to enum
          avatarUrl: user.avatar_url,
          isActive: Boolean(user.is_active),
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.users.length} users`);
    
    // Import services
    console.log('\n📤 Importing services...');
    for (const service of data.services) {
      await prisma.service.create({
        data: {
          id: service.id,
          name: service.name,
          slug: service.slug,
          description: service.description,
          iconUrl: service.icon_url,
          color: service.color,
          isActive: Boolean(service.is_active),
          createdAt: new Date(service.created_at),
          updatedAt: new Date(service.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.services.length} services`);
    
    // Import industries
    console.log('\n📤 Importing industries...');
    for (const industry of data.industries) {
      await prisma.industry.create({
        data: {
          id: industry.id,
          name: industry.name,
          slug: industry.slug,
          description: industry.description,
          isActive: Boolean(industry.is_active),
          createdAt: new Date(industry.created_at),
          updatedAt: new Date(industry.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.industries.length} industries`);
    
    // Import categories
    console.log('\n📤 Importing categories...');
    for (const category of data.categories) {
      await prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
          isActive: Boolean(category.is_active),
          createdAt: new Date(category.created_at),
          updatedAt: new Date(category.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.categories.length} categories`);
    
    // Import case studies
    console.log('\n📤 Importing case studies...');
    for (const caseStudy of data.caseStudies) {
      await prisma.caseStudy.create({
        data: {
          id: caseStudy.id,
          title: caseStudy.title,
          slug: caseStudy.slug,
          clientName: caseStudy.client_name,
          heroImageUrl: caseStudy.hero_image_url,
          summary: caseStudy.summary,
          theGoal: caseStudy.the_goal,
          theChallenge: caseStudy.the_challenge,
          theSolution: caseStudy.the_solution,
          status: caseStudy.status.toUpperCase(), // Convert to enum
          metaTitle: caseStudy.meta_title,
          metaDescription: caseStudy.meta_description,
          publishedAt: caseStudy.published_at ? new Date(caseStudy.published_at) : null,
          industryId: caseStudy.industry_id,
          authorId: caseStudy.author_id,
          createdAt: new Date(caseStudy.created_at),
          updatedAt: new Date(caseStudy.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.caseStudies.length} case studies`);
    
    // Import news articles
    console.log('\n📤 Importing news articles...');
    for (const article of data.newsArticles) {
      await prisma.newsArticle.create({
        data: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.summary, // Map summary to excerpt
          featuredImageUrl: article.hero_image_url, // Map hero_image_url to featuredImageUrl
          content: article.content,
          status: article.status.toUpperCase(), // Convert to enum
          metaTitle: article.meta_title,
          metaDescription: article.meta_description,
          publishedAt: article.published_at ? new Date(article.published_at) : null,
          tags: [], // Default empty array for new field
          categoryId: article.category_id,
          authorId: article.author_id,
          createdAt: new Date(article.created_at),
          updatedAt: new Date(article.updated_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.newsArticles.length} news articles`);
    
    // Import case study services
    console.log('\n📤 Importing case study services...');
    for (const relation of data.caseStudyServices) {
      await prisma.caseStudyService.create({
        data: {
          id: relation.id,
          caseStudyId: relation.case_study_id,
          serviceId: relation.service_id,
          createdAt: new Date(relation.created_at)
        }
      });
    }
    console.log(`   ✅ Imported ${data.caseStudyServices.length} case study services`);
    
    // Import media files
    if (data.mediaFiles.length > 0) {
      console.log('\n📤 Importing media files...');
      for (const media of data.mediaFiles) {
        await prisma.mediaFile.create({
          data: {
            id: media.id,
            filename: media.filename,
            originalName: media.original_name,
            url: media.file_url,
            type: 'OTHER', // Default type
            mimetype: media.mime_type,
            size: media.file_size,
            alt: media.alt_text,
            caption: media.caption,
            uploadedById: media.uploader_id,
            caseStudyId: media.case_study_id,
            newsArticleId: media.news_article_id,
            createdAt: new Date(media.created_at),
            updatedAt: new Date(media.updated_at)
          }
        });
      }
      console.log(`   ✅ Imported ${data.mediaFiles.length} media files`);
    }
    
    console.log('\n🎉 Data import completed successfully!');
    
    // Verify data
    console.log('\n📊 Verifying imported data:');
    const counts = {
      users: await prisma.user.count(),
      services: await prisma.service.count(),
      industries: await prisma.industry.count(),
      categories: await prisma.category.count(),
      caseStudies: await prisma.caseStudy.count(),
      newsArticles: await prisma.newsArticle.count(),
      caseStudyServices: await prisma.caseStudyService.count(),
      mediaFiles: await prisma.mediaFile.count()
    };
    
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`   - ${table}: ${count} records`);
    });
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  importToPostgreSQL().catch(console.error);
}

module.exports = { importToPostgreSQL };