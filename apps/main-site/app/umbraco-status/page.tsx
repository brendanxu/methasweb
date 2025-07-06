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