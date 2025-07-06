#!/bin/bash

echo "🔗 配置Umbraco与前端集成..."

# 1. 创建前端环境变量文件
echo "📝 创建前端环境变量..."
cat > apps/main-site/.env.local << EOF
# Umbraco CMS Configuration
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:5001
NEXT_PUBLIC_UMBRACO_API_KEY=southpole-api-key-2024

# 使用真实Umbraco数据（设为true启用）
NEXT_PUBLIC_USE_UMBRACO=true
EOF

# 2. 创建数据切换工具
echo "🔧 创建数据源切换工具..."
cat > apps/main-site/lib/data-source.ts << 'EOF'
/**
 * 数据源管理器
 * 根据环境变量决定使用Umbraco API还是Mock数据
 */

import { umbracoClient } from './umbraco-client'
import { mockCaseStudies, mockNewsArticles, mockServices } from './mock-data'
import type { CaseStudy, NewsArticle, Service } from './types'

const USE_UMBRACO = process.env.NEXT_PUBLIC_USE_UMBRACO === 'true'

export const dataSource = {
  async getCaseStudies(): Promise<CaseStudy[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getCaseStudies()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockCaseStudies
  },

  async getCaseStudy(slug: string): Promise<CaseStudy | null> {
    if (USE_UMBRACO) {
      try {
        return await umbracoClient.getCaseStudy(slug)
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockCaseStudies.find(cs => cs.slug === slug) || null
  },

  async getNewsArticles(): Promise<NewsArticle[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getNewsArticles()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockNewsArticles
  },

  async getNewsArticle(slug: string): Promise<NewsArticle | null> {
    if (USE_UMBRACO) {
      try {
        return await umbracoClient.getNewsArticle(slug)
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockNewsArticles.find(article => article.slug === slug) || null
  },

  async getServices(): Promise<Service[]> {
    if (USE_UMBRACO) {
      try {
        const data = await umbracoClient.getServices()
        if (data.length > 0) return data
      } catch (error) {
        console.error('Failed to fetch from Umbraco, using mock data:', error)
      }
    }
    return mockServices
  }
}
EOF

# 3. 创建Umbraco状态检查页面
echo "📊 创建Umbraco状态页面..."
cat > apps/main-site/app/umbraco-status/page.tsx << 'EOF'
import { checkUmbracoHealth, getUmbracoConfig } from '@/lib/health-check'
import { dataSource } from '@/lib/data-source'

export default async function UmbracoStatusPage() {
  const health = await checkUmbracoHealth()
  const config = getUmbracoConfig()
  
  let contentStats = {
    caseStudies: 0,
    news: 0,
    services: 0
  }
  
  try {
    const [caseStudies, news, services] = await Promise.all([
      dataSource.getCaseStudies(),
      dataSource.getNewsArticles(),
      dataSource.getServices()
    ])
    
    contentStats = {
      caseStudies: caseStudies.length,
      news: news.length,
      services: services.length
    }
  } catch (error) {
    console.error('Failed to fetch content stats:', error)
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Umbraco集成状态</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">连接状态</h2>
          <div className="space-y-2">
            <p>Umbraco服务: {health.umbracoService ? '✅ 运行中' : '❌ 未连接'}</p>
            <p>Delivery API: {health.deliveryApi ? '✅ 可用' : '❌ 不可用'}</p>
            <p>数据库: {health.database ? '✅ 连接' : '❌ 未连接'}</p>
            <p>API密钥: {health.apiKey ? '✅ 有效' : '❌ 无效'}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">配置信息</h2>
          <div className="space-y-2">
            <p>Base URL: {config.baseUrl}</p>
            <p>使用Umbraco数据: {process.env.NEXT_PUBLIC_USE_UMBRACO === 'true' ? '是' : '否（使用Mock数据）'}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">内容统计</h2>
          <div className="space-y-2">
            <p>案例研究: {contentStats.caseStudies} 个</p>
            <p>新闻文章: {contentStats.news} 个</p>
            <p>服务: {contentStats.services} 个</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">下一步操作</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>访问 <a href="http://localhost:5001/umbraco" className="text-blue-600 underline">Umbraco后台</a></li>
            <li>创建内容类型（Document Types）</li>
            <li>添加测试内容</li>
            <li>刷新此页面查看内容统计</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
EOF

# 4. 更新示例页面使用数据源
echo "📄 更新页面使用数据源..."
cat > apps/main-site/app/work/page.tsx.example << 'EOF'
// 示例：如何在页面中使用数据源
import { dataSource } from '@/lib/data-source'

export default async function WorkPage() {
  // 自动选择Umbraco或Mock数据
  const caseStudies = await dataSource.getCaseStudies()
  
  return (
    <div>
      {/* 渲染案例研究 */}
      {caseStudies.map(study => (
        <div key={study.id}>
          <h2>{study.title}</h2>
          <p>{study.summary}</p>
        </div>
      ))}
    </div>
  )
}
EOF

echo "✅ 集成配置完成！"
echo ""
echo "📋 下一步："
echo "1. 访问 http://localhost:5001/umbraco 创建内容类型"
echo "2. 按照 UMBRACO-INTEGRATION-GUIDE.md 配置内容"
echo "3. 访问 http://localhost:3001/umbraco-status 查看集成状态"
echo ""
echo "💡 提示："
echo "- 设置 NEXT_PUBLIC_USE_UMBRACO=false 可切换回Mock数据"
echo "- 查看 apps/main-site/app/work/page.tsx.example 了解如何更新页面"