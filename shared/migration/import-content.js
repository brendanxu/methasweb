#!/usr/bin/env node
/**
 * Umbraco 内容导入脚本
 * 自动生成于: 2025-07-06T08:50:21.736Z
 * 
 * 使用方法:
 * 1. 确保 Umbraco 已启动并完成初始设置
 * 2. 确保所有 Document Types 已创建
 * 3. 运行: node import-content.js
 */

const fs = require('fs');
const path = require('path');

const UMBRACO_BASE_URL = 'http://localhost:5000';
const UMBRACO_USERNAME = 'admin@southpole.com'; // 替换为实际管理员邮箱
const UMBRACO_PASSWORD = 'admin123456'; // 替换为实际密码

class ContentImporter {
  constructor() {
    this.authToken = null;
  }

  async authenticate() {
    const response = await fetch(`${UMBRACO_BASE_URL}/umbraco/backoffice/UmbracoApi/Authentication/PostLogin`, {
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
    
    const contentData = {
  "caseStudies": [
    {
      "contentTypeAlias": "caseStudy",
      "name": "Global Bank Carbon Neutrality",
      "properties": {
        "title": "Global Bank Carbon Neutrality",
        "urlSlug": "global-bank-carbon-neutrality",
        "clientName": "Global Bank Inc.",
        "summary": "Helping a major financial institution achieve carbon neutrality",
        "theGoal": "Achieve carbon neutrality by 2025",
        "theChallenge": "Complex operations across multiple countries",
        "theSolution": "Comprehensive carbon offset and reduction strategy",
        "publishedDate": "2025-07-06T08:50:21.735Z",
        "metaTitle": "Global Bank Carbon Neutrality",
        "metaDescription": "Helping a major financial institution achieve carbon neutrality"
      }
    }
  ],
  "newsArticles": [
    {
      "contentTypeAlias": "newsArticle",
      "name": "Climate Action Accelerates in 2024",
      "properties": {
        "title": "Climate Action Accelerates in 2024",
        "urlSlug": "climate-action-accelerates-2024",
        "excerpt": "Global climate initiatives show promising progress",
        "content": "<p>Climate action is accelerating globally as organizations commit to ambitious sustainability targets...</p>",
        "publishedDate": "2025-07-06T08:50:21.735Z",
        "metaTitle": "Climate Action Accelerates in 2024",
        "metaDescription": "Global climate initiatives show promising progress"
      }
    }
  ],
  "services": [
    {
      "contentTypeAlias": "service",
      "name": "Carbon Offsetting",
      "properties": {
        "name": "Carbon Offsetting",
        "urlSlug": "carbon-offsetting",
        "description": "High-quality carbon offset solutions",
        "fullDescription": "",
        "color": "#0057FF",
        "displayOrder": 0
      }
    },
    {
      "contentTypeAlias": "service",
      "name": "Renewable Energy",
      "properties": {
        "name": "Renewable Energy",
        "urlSlug": "renewable-energy",
        "description": "Clean energy project development",
        "fullDescription": "",
        "color": "#0057FF",
        "displayOrder": 0
      }
    }
  ],
  "industries": [
    {
      "contentTypeAlias": "industry",
      "name": "Financial Services",
      "properties": {
        "name": "Financial Services",
        "urlSlug": "financial-services",
        "description": "Banking, insurance, and financial institutions"
      }
    },
    {
      "contentTypeAlias": "industry",
      "name": "Technology",
      "properties": {
        "name": "Technology",
        "urlSlug": "technology",
        "description": "Technology companies and software development"
      }
    }
  ],
  "categories": [
    {
      "contentTypeAlias": "category",
      "name": "Insights",
      "properties": {
        "name": "Insights",
        "urlSlug": "insights",
        "description": "Industry insights and analysis",
        "color": "#0057FF"
      }
    },
    {
      "contentTypeAlias": "category",
      "name": "Company News",
      "properties": {
        "name": "Company News",
        "urlSlug": "news",
        "description": "Company announcements and updates",
        "color": "#0057FF"
      }
    }
  ],
  "teamMembers": [
    {
      "contentTypeAlias": "teamMember",
      "name": "John Doe",
      "properties": {
        "name": "John Doe",
        "title": "Chief Executive Officer",
        "department": "Executive",
        "bio": "John leads South Pole with over 15 years of experience in climate solutions.",
        "email": "",
        "linkedinUrl": "",
        "isLeadership": true,
        "displayOrder": 1
      }
    }
  ],
  "officeLocations": [
    {
      "contentTypeAlias": "officeLocation",
      "name": "Zurich Office",
      "properties": {
        "name": "Zurich Office",
        "address": "Technoparkstrasse 1, 8005 Zurich",
        "city": "Zurich",
        "country": "Switzerland",
        "countryCode": "CH",
        "phone": "",
        "email": "",
        "timezone": "",
        "coordinates": "",
        "description": "",
        "isHeadquarters": true,
        "displayOrder": 0
      }
    }
  ],
  "companyInfo": [
    {
      "contentTypeAlias": "companyInfo",
      "name": "Our Mission",
      "properties": {
        "section": "MISSION",
        "title": "Our Mission",
        "subtitle": "",
        "content": "<p>To accelerate the transition to a climate-positive world.</p>",
        "ctaText": "",
        "ctaUrl": "",
        "displayOrder": 1
      }
    }
  ],
  "companyStats": [
    {
      "contentTypeAlias": "companyStat",
      "name": "Projects Delivered",
      "properties": {
        "label": "Projects Delivered",
        "value": "1000+",
        "description": "Climate projects successfully delivered worldwide",
        "displayOrder": 1
      }
    }
  ]
};
    
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
        console.log(`📥 导入 ${contentType}...`);
        await this.importContentType(contentData[contentType]);
      }
    }

    console.log('✅ 所有内容导入完成！');
  }

  async importContentType(items) {
    for (const item of items) {
      try {
        const response = await fetch(`${UMBRACO_BASE_URL}/umbraco/backoffice/api/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
          },
          body: JSON.stringify({
            contentTypeAlias: item.contentTypeAlias,
            name: item.name,
            properties: item.properties,
            parentId: -1 // 根节点
          })
        });

        if (response.ok) {
          console.log(`  ✅ ${item.name}`);
        } else {
          console.log(`  ❌ ${item.name}: ${response.statusText}`);
        }
      } catch (error) {
        console.log(`  ❌ ${item.name}: ${error.message}`);
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
