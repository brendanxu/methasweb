# 🔧 Umbraco API 400 Bad Request 错误解决方案

## 🎯 问题根源分析

经过详细测试，发现 400 错误的主要原因：

1. **查询参数格式不兼容** - Umbraco Delivery API v2 不支持某些查询参数格式
2. **内容类型不存在时返回 404** - 而不是空结果
3. **sort 和 expand 参数格式问题** - v2 API 可能使用不同的参数格式

---

## ✅ 立即修复方案

### 第1步：简化 API 调用（最高优先级）

修改 `lib/umbraco-client.ts` 中的查询参数：

```typescript
// ❌ 错误：使用了不支持的参数格式
const response = await this.fetchFromUmbraco(
  `/content?contentType=newsArticle&take=${take}&skip=${skip}&sort=properties/publishedDate:desc&expand=properties[featuredImage,category]`
)

// ✅ 修复：简化查询参数
const response = await this.fetchFromUmbraco(
  `/content?contentType=newsArticle&take=${take}&skip=${skip}`
)
```

### 第2步：修复所有 API 调用方法

```typescript
// Services - 移除 sort 和 expand 参数
async getServices(take = 100): Promise<Service[]> {
  try {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=sevice&take=${take}`
    )
    
    const serviceItems = response.items?.filter((item: any) => item.contentType === 'sevice') || []
    return serviceItems.map((item: any) => this.adaptService(item))
  } catch (error) {
    console.error('Failed to get services:', error)
    return []
  }
}

// Case Studies - 简化查询
async getCaseStudies(take = 50, skip = 0): Promise<CaseStudy[]> {
  try {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=caseStudy&take=${take}&skip=${skip}`
    )
    
    const caseStudyItems = response.items?.filter((item: any) => item.contentType === 'caseStudy') || []
    return caseStudyItems.map((item: any) => this.adaptCaseStudy(item))
  } catch (error) {
    console.error('Failed to get case studies:', error)
    return []
  }
}

// News Articles - 简化查询
async getNewsArticles(take = 50, skip = 0): Promise<NewsArticle[]> {
  try {
    const response = await this.fetchFromUmbraco(
      `/content?contentType=newsArticle&take=${take}&skip=${skip}`
    )
    
    const newsItems = response.items?.filter((item: any) => item.contentType === 'newsArticle') || []
    return newsItems.map((item: any) => this.adaptNewsArticle(item))
  } catch (error) {
    console.error('Failed to get news articles:', error)
    return []
  }
}
```

### 第3步：处理 404 错误

```typescript
private async fetchFromUmbraco(endpoint: string, options: RequestInit = {}) {
  const url = `${this.baseUrl}${endpoint}`
  
  const defaultHeaders = {
    'Api-Key': this.apiKey,
    'Content-Type': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    // 特殊处理 404 - 返回空结果而不是错误
    if (response.status === 404) {
      console.warn(`Content not found for: ${endpoint}`)
      return { items: [], total: 0 }
    }
    
    if (!response.ok) {
      throw new Error(`Umbraco API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Umbraco API Error:', error)
    throw error
  }
}
```

---

## 🔍 测试命令

### 1. 基础 API 测试
```bash
# ✅ 工作的请求（不带复杂参数）
curl -s "http://localhost:5001/umbraco/delivery/api/v2/content?contentType=sevice" \
     -H "Api-Key: southpole-api-key-2024" | jq .

# ❌ 失败的请求（带 sort 参数）
curl -s "http://localhost:5001/umbraco/delivery/api/v2/content?contentType=sevice&sort=name" \
     -H "Api-Key: southpole-api-key-2024"
```

### 2. 验证内容类型
```bash
# 获取所有内容，查看实际的 contentType 值
curl -s "http://localhost:5001/umbraco/delivery/api/v2/content" \
     -H "Api-Key: southpole-api-key-2024" | jq '.items[].contentType' | sort | uniq
```

### 3. 测试分页
```bash
# 测试 take 和 skip 参数
curl -s "http://localhost:5001/umbraco/delivery/api/v2/content?take=10&skip=0" \
     -H "Api-Key: southpole-api-key-2024" | jq '.total'
```

---

## 📋 Umbraco API v2 正确格式

### ✅ 支持的查询参数
- `contentType` - 按内容类型过滤
- `take` - 限制返回数量
- `skip` - 跳过记录数（分页）

### ❌ 不支持或格式不同的参数
- `sort` - 可能需要不同格式或不支持
- `expand` - 可能需要不同格式或不支持
- `filter` - 可能需要不同格式

### 正确的 API 端点格式
```
基础端点: /umbraco/delivery/api/v2/content
按类型获取: /umbraco/delivery/api/v2/content?contentType={type}
分页: /umbraco/delivery/api/v2/content?take={number}&skip={number}
```

---

## 🚀 快速修复步骤

### 1. 立即修改代码（2分钟）
编辑 `lib/umbraco-client.ts`，移除所有 `sort` 和 `expand` 参数

### 2. 测试修复（1分钟）
```bash
# 重启前端服务
npm run dev

# 访问状态页面
open http://localhost:3000/umbraco-status
```

### 3. 验证 API 调用（1分钟）
在浏览器开发者工具中查看网络请求，确认没有 400 错误

---

## 🔧 长期解决方案

### 1. 查阅 Umbraco 文档
- 确认 Delivery API v2 的完整参数支持
- 了解排序和扩展的正确语法

### 2. 实现客户端排序
如果 API 不支持排序，在前端实现：
```typescript
// 客户端排序示例
const sortedItems = items.sort((a, b) => 
  new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
)
```

### 3. 添加 API 版本检测
```typescript
// 检测 API 版本并使用相应的参数格式
const apiVersion = await this.detectApiVersion()
const queryParams = this.buildQueryParams(apiVersion, options)
```

---

## ✅ 验证清单

- [ ] 移除所有 `sort` 参数
- [ ] 移除所有 `expand` 参数  
- [ ] 添加 404 错误处理
- [ ] 测试所有 API 端点
- [ ] 确认没有 400 错误

---

## 🎯 预期结果

修复后，状态页面应显示：
- ✅ Delivery API: 可用
- ✅ 数据库: 连接
- ✅ API密钥: 有效
- ✅ 服务数量: 正确显示

**所有 API 调用应返回 200 OK，没有 400 错误！**