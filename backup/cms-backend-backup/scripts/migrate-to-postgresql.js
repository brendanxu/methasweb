const { PrismaClient: SqliteClient } = require('@prisma/client');
const { PrismaClient: PostgresClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SQLITE_URL = 'file:./dev.db';
const POSTGRES_URL = 'postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public';

async function migrateData() {
  console.log('🚀 Starting SQLite to PostgreSQL migration...\n');

  // Backup current schema.prisma
  const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
  const backupPath = path.join(__dirname, '../prisma/schema.sqlite.backup.prisma');
  
  try {
    // 1. Backup current schema
    console.log('📦 Backing up current schema...');
    await fs.copyFile(schemaPath, backupPath);
    console.log('✅ Schema backed up to schema.sqlite.backup.prisma');

    // 2. Replace schema with PostgreSQL version
    console.log('\n📝 Updating schema to PostgreSQL...');
    const postgresSchemaPath = path.join(__dirname, '../prisma/schema.postgresql.prisma');
    await fs.copyFile(postgresSchemaPath, schemaPath);
    console.log('✅ Schema updated to PostgreSQL version');

    // 3. Update .env file
    console.log('\n🔧 Updating .env file...');
    const envPath = path.join(__dirname, '../.env');
    let envContent = await fs.readFile(envPath, 'utf8');
    
    // Comment out SQLite URL and add PostgreSQL URL
    envContent = envContent.replace(
      /^DATABASE_URL=.*$/m,
      `# SQLite (backup)\n# DATABASE_URL="${SQLITE_URL}"\n\n# PostgreSQL\nDATABASE_URL="${POSTGRES_URL}"`
    );
    
    await fs.writeFile(envPath, envContent);
    console.log('✅ .env file updated');

    // 4. Generate Prisma client for PostgreSQL
    console.log('\n🔨 Generating Prisma client for PostgreSQL...');
    const { execSync } = require('child_process');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma client generated');

    // 5. Push schema to PostgreSQL
    console.log('\n📤 Pushing schema to PostgreSQL...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    console.log('✅ Schema pushed to PostgreSQL');

    // 6. Export data from SQLite
    console.log('\n📊 Exporting data from SQLite...');
    
    // Temporarily set DATABASE_URL to SQLite for export
    process.env.DATABASE_URL = SQLITE_URL;
    const sqliteClient = new SqliteClient();
    
    const data = {
      users: await sqliteClient.user.findMany(),
      services: await sqliteClient.service.findMany(),
      industries: await sqliteClient.industry.findMany(),
      categories: await sqliteClient.category.findMany(),
      caseStudies: await sqliteClient.caseStudy.findMany(),
      newsArticles: await sqliteClient.newsArticle.findMany(),
      caseStudyServices: await sqliteClient.caseStudyService.findMany(),
      mediaFiles: await sqliteClient.mediaFile.findMany()
    };

    await sqliteClient.$disconnect();
    
    console.log('✅ Data exported from SQLite:');
    Object.entries(data).forEach(([table, records]) => {
      console.log(`   - ${table}: ${records.length} records`);
    });

    // 7. Import data to PostgreSQL
    console.log('\n📥 Importing data to PostgreSQL...');
    
    // Set DATABASE_URL to PostgreSQL for import
    process.env.DATABASE_URL = POSTGRES_URL;
    const postgresClient = new PostgresClient();

    // Import in correct order to respect foreign key constraints
    console.log('   Importing users...');
    for (const user of data.users) {
      await postgresClient.user.create({
        data: {
          ...user,
          role: user.role.toUpperCase() // Convert string to enum
        }
      });
    }

    console.log('   Importing services...');
    for (const service of data.services) {
      await postgresClient.service.create({ data: service });
    }

    console.log('   Importing industries...');
    for (const industry of data.industries) {
      await postgresClient.industry.create({ data: industry });
    }

    console.log('   Importing categories...');
    for (const category of data.categories) {
      await postgresClient.category.create({ data: category });
    }

    console.log('   Importing case studies...');
    for (const caseStudy of data.caseStudies) {
      await postgresClient.caseStudy.create({
        data: {
          ...caseStudy,
          status: caseStudy.status.toUpperCase() // Convert string to enum
        }
      });
    }

    console.log('   Importing news articles...');
    for (const article of data.newsArticles) {
      // Map old fields to new fields
      await postgresClient.newsArticle.create({
        data: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.summary || article.excerpt, // Handle field name change
          featuredImageUrl: article.heroImageUrl || article.featuredImageUrl,
          content: article.content,
          status: article.status.toUpperCase(),
          metaTitle: article.metaTitle,
          metaDescription: article.metaDescription,
          publishedAt: article.publishedAt,
          tags: [], // New field
          categoryId: article.categoryId,
          authorId: article.authorId,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt
        }
      });
    }

    console.log('   Importing case study services...');
    for (const relation of data.caseStudyServices) {
      await postgresClient.caseStudyService.create({ data: relation });
    }

    console.log('   Importing media files...');
    for (const media of data.mediaFiles) {
      await postgresClient.mediaFile.create({
        data: {
          id: media.id,
          filename: media.filename,
          originalName: media.originalName,
          url: media.fileUrl || media.url,
          type: 'OTHER', // Default type
          mimetype: media.mimeType || media.mimetype,
          size: media.fileSize || media.size,
          alt: media.altText || media.alt,
          caption: media.caption,
          uploadedById: media.uploaderId || media.uploadedById,
          caseStudyId: media.caseStudyId,
          newsArticleId: media.newsArticleId,
          createdAt: media.createdAt,
          updatedAt: media.updatedAt
        }
      });
    }

    await postgresClient.$disconnect();
    
    console.log('\n✅ Data imported to PostgreSQL successfully!');

    // 8. Create migration completion marker
    const migrationMarker = {
      migrated: true,
      date: new Date().toISOString(),
      from: 'SQLite',
      to: 'PostgreSQL',
      recordsMigrated: Object.entries(data).reduce((acc, [_, records]) => acc + records.length, 0)
    };
    
    await fs.writeFile(
      path.join(__dirname, '../.migration-complete'),
      JSON.stringify(migrationMarker, null, 2)
    );

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📌 Next steps:');
    console.log('   1. Restart the CMS backend server');
    console.log('   2. Test all API endpoints');
    console.log('   3. Remove SQLite backup files when confirmed working');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    
    // Attempt to restore original schema
    try {
      console.log('\n🔄 Attempting to restore original schema...');
      await fs.copyFile(backupPath, schemaPath);
      console.log('✅ Schema restored');
    } catch (restoreError) {
      console.error('❌ Failed to restore schema:', restoreError);
    }
    
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  migrateData().catch(console.error);
}

module.exports = { migrateData };