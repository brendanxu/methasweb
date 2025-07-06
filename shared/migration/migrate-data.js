#!/usr/bin/env node

/**
 * 数据迁移脚本：从 PostgreSQL (Prisma) 迁移到 Umbraco
 * 
 * 执行步骤：
 * 1. 连接到 PostgreSQL 数据库
 * 2. 提取所有数据
 * 3. 转换为 Umbraco 格式
 * 4. 通过 Management API 导入到 Umbraco
 */

const fs = require('fs').promises;
const path = require('path');

// 检查是否存在 PostgreSQL 数据
const POSTGRES_DATA_PATH = path.join(__dirname, '../../../backup/cms-backend-backup/scripts/sqlite-export.json');
const UMBRACO_BASE_URL = process.env.UMBRACO_BASE_URL || 'http://localhost:5000';
const UMBRACO_API_KEY = process.env.UMBRACO_API_KEY || 'southpole-api-key-2024';

class DataMigrationTool {
  constructor() {
    this.sourceData = null;
    this.migratedData = {
      caseStudies: [],
      newsArticles: [],
      services: [],
      industries: [],
      categories: [],
      teamMembers: [],
      officeLocations: [],
      companyInfo: [],
      companyStats: []
    };
  }

  async run() {
    console.log('🚀 开始数据迁移过程...');
    
    try {
      // 1. 加载源数据
      await this.loadSourceData();
      
      // 2. 转换数据格式
      await this.transformData();
      
      // 3. 生成迁移脚本
      await this.generateMigrationScript();
      
      // 4. 保存转换后的数据
      await this.saveTransformedData();
      
      console.log('✅ 数据迁移准备完成！');
      console.log('📋 下一步：');
      console.log('   1. 启动 Umbraco CMS: npm run dev:umbraco');
      console.log('   2. 完成 Umbraco 初始设置');
      console.log('   3. 手动创建 Document Types (参考 shared/document-types/document-types.json)');
      console.log('   4. 执行生成的导入脚本');
      
    } catch (error) {
      console.error('❌ 迁移过程中出现错误:', error.message);
      process.exit(1);
    }
  }

  async loadSourceData() {
    console.log('📥 加载源数据...');
    
    try {
      // 尝试从备份的导出文件加载数据
      const dataBuffer = await fs.readFile(POSTGRES_DATA_PATH);
      this.sourceData = JSON.parse(dataBuffer.toString());
      console.log('✅ 成功加载 PostgreSQL 导出数据');
    } catch (error) {
      console.log('⚠️  无法找到 PostgreSQL 导出数据，生成模拟数据...');
      this.sourceData = this.generateMockData();
    }
  }

  generateMockData() {
    return {
      users: [
        {
          id: 'user1',
          email: 'admin@southpole.com',
          name: 'South Pole Admin',
          role: 'ADMIN',
          createdAt: new Date().toISOString()
        }
      ],
      industries: [
        {
          id: 'financial-services',
          name: 'Financial Services',
          slug: 'financial-services',
          description: 'Banking, insurance, and financial institutions',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'technology',
          name: 'Technology',
          slug: 'technology',
          description: 'Technology companies and software development',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      categories: [
        {
          id: 'insights',
          name: 'Insights',
          slug: 'insights',
          description: 'Industry insights and analysis',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'news',
          name: 'Company News',
          slug: 'news',
          description: 'Company announcements and updates',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      services: [
        {
          id: 'carbon-offsetting',
          name: 'Carbon Offsetting',
          slug: 'carbon-offsetting',
          description: 'High-quality carbon offset solutions',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'renewable-energy',
          name: 'Renewable Energy',
          slug: 'renewable-energy',
          description: 'Clean energy project development',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      caseStudies: [
        {
          id: 'global-bank-case',
          title: 'Global Bank Carbon Neutrality',
          slug: 'global-bank-carbon-neutrality',
          clientName: 'Global Bank Inc.',
          summary: 'Helping a major financial institution achieve carbon neutrality',
          theGoal: 'Achieve carbon neutrality by 2025',
          theChallenge: 'Complex operations across multiple countries',
          theSolution: 'Comprehensive carbon offset and reduction strategy',
          status: 'PUBLISHED',
          publishedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          industryId: 'financial-services',
          authorId: 'user1'
        }
      ],
      newsArticles: [
        {
          id: 'climate-action-2024',
          title: 'Climate Action Accelerates in 2024',
          slug: 'climate-action-accelerates-2024',
          excerpt: 'Global climate initiatives show promising progress',
          content: '<p>Climate action is accelerating globally as organizations commit to ambitious sustainability targets...</p>',
          status: 'PUBLISHED',
          publishedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          categoryId: 'insights',
          authorId: 'user1'
        }
      ],
      teamMembers: [
        {
          id: 'john-doe',
          name: 'John Doe',
          title: 'Chief Executive Officer',
          department: 'Executive',
          bio: 'John leads South Pole with over 15 years of experience in climate solutions.',
          isLeadership: true,
          displayOrder: 1,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      officeLocations: [
        {
          id: 'zurich-office',
          name: 'Zurich Office',
          address: 'Technoparkstrasse 1, 8005 Zurich',
          city: 'Zurich',
          country: 'Switzerland',
          countryCode: 'CH',
          isHeadquarters: true,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ],
      companyInfo: [
        {
          id: 'mission-statement',
          section: 'MISSION',
          title: 'Our Mission',
          content: '<p>To accelerate the transition to a climate-positive world.</p>',
          displayOrder: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          authorId: 'user1'
        }
      ],
      companyStats: [
        {
          id: 'projects-delivered',
          label: 'Projects Delivered',
          value: '1000+',
          description: 'Climate projects successfully delivered worldwide',
          displayOrder: 1,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ]
    };
  }

  async transformData() {
    console.log('🔄 转换数据格式...');

    // 转换行业数据
    this.migratedData.industries = this.sourceData.industries?.map(industry => ({
      contentTypeAlias: 'industry',
      name: industry.name,
      properties: {
        name: industry.name,
        urlSlug: industry.slug,
        description: industry.description || ''
      }
    })) || [];

    // 转换分类数据
    this.migratedData.categories = this.sourceData.categories?.map(category => ({
      contentTypeAlias: 'category',
      name: category.name,
      properties: {
        name: category.name,
        urlSlug: category.slug,
        description: category.description || '',
        color: category.color || '#0057FF'
      }
    })) || [];

    // 转换服务数据
    this.migratedData.services = this.sourceData.services?.map(service => ({
      contentTypeAlias: 'service',
      name: service.name,
      properties: {
        name: service.name,
        urlSlug: service.slug,
        description: service.description || '',
        fullDescription: service.fullDescription || '',
        color: service.color || '#0057FF',
        displayOrder: service.displayOrder || 0
      }
    })) || [];

    // 转换案例研究数据
    this.migratedData.caseStudies = this.sourceData.caseStudies?.map(caseStudy => ({
      contentTypeAlias: 'caseStudy',
      name: caseStudy.title,
      properties: {
        title: caseStudy.title,
        urlSlug: caseStudy.slug,
        clientName: caseStudy.clientName,
        summary: caseStudy.summary,
        theGoal: caseStudy.theGoal,
        theChallenge: caseStudy.theChallenge,
        theSolution: caseStudy.theSolution,
        publishedDate: caseStudy.publishedAt || caseStudy.createdAt,
        metaTitle: caseStudy.metaTitle || caseStudy.title,
        metaDescription: caseStudy.metaDescription || caseStudy.summary
      }
    })) || [];

    // 转换新闻文章数据
    this.migratedData.newsArticles = this.sourceData.newsArticles?.map(article => ({
      contentTypeAlias: 'newsArticle',
      name: article.title,
      properties: {
        title: article.title,
        urlSlug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        publishedDate: article.publishedAt || article.createdAt,
        metaTitle: article.metaTitle || article.title,
        metaDescription: article.metaDescription || article.excerpt
      }
    })) || [];

    // 转换团队成员数据
    this.migratedData.teamMembers = this.sourceData.teamMembers?.map(member => ({
      contentTypeAlias: 'teamMember',
      name: member.name,
      properties: {
        name: member.name,
        title: member.title,
        department: member.department || '',
        bio: member.bio || '',
        email: member.email || '',
        linkedinUrl: member.linkedinUrl || '',
        isLeadership: member.isLeadership || false,
        displayOrder: member.displayOrder || 0
      }
    })) || [];

    // 转换办公地点数据
    this.migratedData.officeLocations = this.sourceData.officeLocations?.map(location => ({
      contentTypeAlias: 'officeLocation',
      name: location.name,
      properties: {
        name: location.name,
        address: location.address,
        city: location.city,
        country: location.country,
        countryCode: location.countryCode || '',
        phone: location.phone || '',
        email: location.email || '',
        timezone: location.timezone || '',
        coordinates: location.coordinates || '',
        description: location.description || '',
        isHeadquarters: location.isHeadquarters || false,
        displayOrder: location.displayOrder || 0
      }
    })) || [];

    // 转换公司信息数据
    this.migratedData.companyInfo = this.sourceData.companyInfo?.map(info => ({
      contentTypeAlias: 'companyInfo',
      name: info.title,
      properties: {
        section: info.section,
        title: info.title,
        subtitle: info.subtitle || '',
        content: info.content,
        ctaText: info.ctaText || '',
        ctaUrl: info.ctaUrl || '',
        displayOrder: info.displayOrder || 0
      }
    })) || [];

    // 转换公司统计数据
    this.migratedData.companyStats = this.sourceData.companyStats?.map(stat => ({
      contentTypeAlias: 'companyStat',
      name: stat.label,
      properties: {
        label: stat.label,
        value: stat.value,
        description: stat.description || '',
        displayOrder: stat.displayOrder || 0
      }
    })) || [];

    console.log('✅ 数据转换完成');
  }

  async generateMigrationScript() {
    console.log('📝 生成迁移脚本...');

    const migrationScript = `#!/usr/bin/env node
/**
 * Umbraco 内容导入脚本
 * 自动生成于: ${new Date().toISOString()}
 * 
 * 使用方法:
 * 1. 确保 Umbraco 已启动并完成初始设置
 * 2. 确保所有 Document Types 已创建
 * 3. 运行: node import-content.js
 */

const fs = require('fs');
const path = require('path');

const UMBRACO_BASE_URL = '${UMBRACO_BASE_URL}';
const UMBRACO_USERNAME = 'admin@southpole.com'; // 替换为实际管理员邮箱
const UMBRACO_PASSWORD = 'admin123456'; // 替换为实际密码

class ContentImporter {
  constructor() {
    this.authToken = null;
  }

  async authenticate() {
    const response = await fetch(\`\${UMBRACO_BASE_URL}/umbraco/backoffice/UmbracoApi/Authentication/PostLogin\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: UMBRACO_USERNAME,
        password: UMBRACO_PASSWORD
      })
    });

    if (response.ok) {
      const data = await response.json();
      this.authToken = data.token;
      console.log('✅ Umbraco 认证成功');
    } else {
      throw new Error('认证失败');
    }
  }

  async importContent() {
    console.log('🚀 开始导入内容...');
    
    const contentData = ${JSON.stringify(this.migratedData, null, 2)};
    
    // 导入顺序：基础数据 -> 关联数据
    const importOrder = [
      'industries',
      'categories', 
      'services',
      'teamMembers',
      'officeLocations',
      'companyInfo',
      'companyStats',
      'caseStudies',
      'newsArticles'
    ];

    for (const contentType of importOrder) {
      if (contentData[contentType] && contentData[contentType].length > 0) {
        console.log(\`📥 导入 \${contentType}...\`);
        await this.importContentType(contentData[contentType]);
      }
    }

    console.log('✅ 所有内容导入完成！');
  }

  async importContentType(items) {
    for (const item of items) {
      try {
        const response = await fetch(\`\${UMBRACO_BASE_URL}/umbraco/backoffice/api/content\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${this.authToken}\`
          },
          body: JSON.stringify({
            contentTypeAlias: item.contentTypeAlias,
            name: item.name,
            properties: item.properties,
            parentId: -1 // 根节点
          })
        });

        if (response.ok) {
          console.log(\`  ✅ \${item.name}\`);
        } else {
          console.log(\`  ❌ \${item.name}: \${response.statusText}\`);
        }
      } catch (error) {
        console.log(\`  ❌ \${item.name}: \${error.message}\`);
      }
    }
  }

  async run() {
    try {
      await this.authenticate();
      await this.importContent();
    } catch (error) {
      console.error('❌ 导入失败:', error.message);
    }
  }
}

const importer = new ContentImporter();
importer.run();
`;

    await fs.writeFile(
      path.join(__dirname, 'import-content.js'),
      migrationScript
    );

    console.log('✅ 迁移脚本已生成: shared/migration/import-content.js');
  }

  async saveTransformedData() {
    const outputPath = path.join(__dirname, 'migrated-data.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(this.migratedData, null, 2)
    );
    
    console.log(`✅ 转换后的数据已保存: ${outputPath}`);
  }
}

// 运行迁移工具
if (require.main === module) {
  const migrationTool = new DataMigrationTool();
  migrationTool.run();
}

module.exports = DataMigrationTool;