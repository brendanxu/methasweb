# 🎯 Umbraco CMS 后端使用指南

## 一、访问后台管理界面

### 1. 登录地址
- **本地开发**: `http://localhost:5001/umbraco`
- **Railway部署后**: `https://your-railway-url.railway.app/umbraco`

### 2. 默认登录信息
- **用户名**: `admin@southpole.com`
- **密码**: `SouthPole2024!Railway`

## 二、内容管理

### 1. 创建内容类型（Document Types）

登录后，导航到 **Settings** → **Document Types**：

#### 案例研究（Case Study）
```
属性设置：
- title (文本)
- slug (URL别名)
- clientName (文本)
- heroImage (媒体选择器)
- summary (文本区域)
- theGoal (富文本编辑器)
- theChallenge (富文本编辑器)
- theSolution (富文本编辑器)
- services (多选内容)
- industry (内容选择器)
- publishedDate (日期选择器)
```

#### 新闻文章（News Article）
```
属性设置：
- title (文本)
- slug (URL别名)
- publishDate (日期选择器)
- heroImage (媒体选择器)
- content (富文本编辑器)
- category (内容选择器)
- summary (文本区域)
```

#### 服务（Service）
```
属性设置：
- name (文本)
- slug (URL别名)
- description (文本区域)
- icon (媒体选择器)
- fullDescription (富文本编辑器)
- benefits (多行文本)
- features (多行文本)
- process (多行文本)
- displayOrder (数字)
```

### 2. 创建内容

1. 导航到 **Content** 部分
2. 右键点击根节点，选择 **Create**
3. 选择内容类型（如 Case Study）
4. 填写内容字段
5. 点击 **Save and Publish**

### 3. 媒体管理

1. 导航到 **Media** 部分
2. 上传图片/文件
3. 在内容中通过媒体选择器引用

## 三、API访问

### 1. Delivery API端点

基础URL：`https://your-railway-url.railway.app/umbraco/delivery/api/v1`

### 2. 认证

所有API请求需要在Header中包含：
```
Api-Key: southpole-railway-api-key-2024
```

### 3. 常用API端点

#### 获取所有案例研究
```bash
GET /content?contentType=caseStudy
Headers: Api-Key: southpole-railway-api-key-2024
```

#### 获取单个案例研究
```bash
GET /content/item/case-studies/{slug}
Headers: Api-Key: southpole-railway-api-key-2024
```

#### 获取所有新闻文章
```bash
GET /content?contentType=newsArticle
Headers: Api-Key: southpole-railway-api-key-2024
```

#### 获取所有服务
```bash
GET /content?contentType=service
Headers: Api-Key: southpole-railway-api-key-2024
```

## 四、前端集成

### 1. 环境配置

在前端项目中设置环境变量：
```env
NEXT_PUBLIC_UMBRACO_BASE_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_UMBRACO_API_KEY=southpole-railway-api-key-2024
```

### 2. 使用已有的客户端

```typescript
import { umbracoClient } from '@/lib/umbraco-client'

// 获取案例研究
const caseStudies = await umbracoClient.getCaseStudies()

// 获取单个案例研究
const caseStudy = await umbracoClient.getCaseStudy('climate-action-project')

// 获取新闻文章
const newsArticles = await umbracoClient.getNewsArticles()

// 获取服务
const services = await umbracoClient.getServices()
```

### 3. 在页面中使用

```typescript
// app/work/page.tsx
import { umbracoClient } from '@/lib/umbraco-client'

export default async function WorkPage() {
  const caseStudies = await umbracoClient.getCaseStudies()
  
  return (
    <div>
      {caseStudies.map(study => (
        <div key={study.id}>
          <h2>{study.title}</h2>
          <p>{study.summary}</p>
        </div>
      ))}
    </div>
  )
}
```

## 五、内容发布流程

### 1. 创建内容
1. 登录Umbraco后台
2. 在Content部分创建新内容
3. 填写所有必填字段
4. 上传相关图片到Media库

### 2. 预览内容
1. 点击 **Save** 保存草稿
2. 使用预览功能查看效果

### 3. 发布内容
1. 检查所有内容无误
2. 点击 **Save and Publish**
3. 内容立即通过API可用

### 4. 前端更新
- 如果使用静态生成（SSG），需要重新部署前端
- 如果使用服务端渲染（SSR），内容会自动更新

## 六、常见操作

### 1. 批量导入内容
可以使用Umbraco的导入功能或编写脚本通过API批量创建内容。

### 2. 内容版本管理
Umbraco自动保存内容的历史版本，可以在需要时回滚。

### 3. 多语言支持
在Document Type中启用语言变体，可以创建多语言内容。

### 4. 用户权限管理
在 **Users** 部分可以创建新用户并分配不同的权限级别。

## 七、故障排除

### 1. API返回401错误
检查API密钥是否正确设置在请求头中。

### 2. 内容不显示
- 确保内容已发布（不只是保存）
- 检查API端点是否正确
- 验证内容类型名称是否匹配

### 3. 图片无法显示
确保媒体URL包含完整的域名，检查 `umbraco-client.ts` 中的 `getMediaUrl` 方法。

## 八、最佳实践

1. **内容组织**：创建清晰的内容树结构
2. **命名规范**：使用一致的slug命名
3. **图片优化**：上传前优化图片大小
4. **定期备份**：导出内容和媒体备份
5. **API缓存**：在前端实现适当的缓存策略

## 九、快速测试

### 测试API连接
```bash
# 健康检查
curl https://your-railway-url.railway.app/umbraco/api/health

# 获取内容
curl -H "Api-Key: southpole-railway-api-key-2024" \
     https://your-railway-url.railway.app/umbraco/delivery/api/v1/content?contentType=caseStudy
```

### 测试前端集成
```typescript
// 在前端项目中创建测试页面
// app/test-umbraco/page.tsx
import { checkUmbracoHealth } from '@/lib/health-check'

export default async function TestPage() {
  const health = await checkUmbracoHealth()
  return <pre>{JSON.stringify(health, null, 2)}</pre>
}
```

---

**重要提示**：部署到Railway后，记得更新前端的环境变量，指向新的Railway URL！