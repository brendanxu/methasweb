# 🔗 Umbraco与South Pole前端完整集成指南

## 📋 当前状态
- ✅ Umbraco已成功运行在 http://localhost:5001/umbraco
- ❌ Umbraco是空的，没有内容类型和内容
- ❌ 前端还在使用mock数据，未连接Umbraco

## 🎯 集成目标
将Umbraco配置为South Pole网站的内容管理系统，让编辑可以通过Umbraco后台管理所有网站内容。

## 📐 第一步：创建内容类型（Document Types）

### 1. 登录Umbraco
- URL: http://localhost:5001/umbraco
- 用户名: admin@southpole.com
- 密码: SouthPole2024!Railway

### 2. 创建内容类型

#### A. Case Study（案例研究）
1. 进入 **Settings** → **Document Types**
2. 点击 **Create** → **Document Type**
3. 名称：`Case Study`
4. 别名：`caseStudy`
5. 图标：选择一个合适的图标
6. 添加以下属性（Properties）：

| 属性名 | 别名 | 数据类型 |
|--------|------|----------|
| Title | title | Textstring |
| URL Slug | slug | Textstring |
| Client Name | clientName | Textstring |
| Hero Image | heroImage | Media Picker |
| Summary | summary | Textarea |
| The Goal | theGoal | Rich Text Editor |
| The Challenge | theChallenge | Rich Text Editor |
| The Solution | theSolution | Rich Text Editor |
| Related Services | relatedServices | Content Picker (多选) |
| Related Industry | relatedIndustry | Content Picker |
| Published Date | publishedDate | Date Picker |

#### B. News Article（新闻文章）
创建步骤同上，属性如下：

| 属性名 | 别名 | 数据类型 |
|--------|------|----------|
| Title | title | Textstring |
| URL Slug | slug | Textstring |
| Publish Date | publishDate | Date Picker |
| Hero Image | heroImage | Media Picker |
| Content | content | Rich Text Editor |
| Category | category | Content Picker |
| Summary | summary | Textarea |

#### C. Service（服务）
| 属性名 | 别名 | 数据类型 |
|--------|------|----------|
| Name | name | Textstring |
| URL Slug | slug | Textstring |
| Description | description | Textarea |
| Icon | icon | Media Picker |
| Full Description | fullDescription | Rich Text Editor |
| Benefits | benefits | Repeatable Textstrings |
| Display Order | displayOrder | Numeric |

#### D. Industry（行业）
| 属性名 | 别名 | 数据类型 |
|--------|------|----------|
| Name | name | Textstring |
| URL Slug | slug | Textstring |
| Description | description | Textarea |

#### E. Category（分类）
| 属性名 | 别名 | 数据类型 |
|--------|------|----------|
| Name | name | Textstring |
| URL Slug | slug | Textstring |

### 3. 创建内容结构

1. 进入 **Content** 部分
2. 创建以下文件夹结构：
```
Root
├── Case Studies
├── News
├── Services
├── Industries
└── Categories
```

## 🔧 第二步：配置前端集成

### 1. 更新环境变量
创建 `.env.local` 文件：
```env
NEXT_PUBLIC_UMBRACO_BASE_URL=http://localhost:5001
NEXT_PUBLIC_UMBRACO_API_KEY=southpole-api-key-2024
```

### 2. 测试API连接
```bash
# 测试API是否工作
curl -H "Api-Key: southpole-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content
```

### 3. 更新页面使用真实数据

修改 `apps/main-site/app/work/page.tsx`：
```typescript
import { umbracoClient } from '@/lib/umbraco-client'

export default async function WorkPage() {
  // 从Umbraco获取真实数据
  const caseStudies = await umbracoClient.getCaseStudies()
  
  // 如果没有数据，使用mock数据作为后备
  const displayData = caseStudies.length > 0 ? caseStudies : mockCaseStudies
  
  return (
    // ... 渲染逻辑
  )
}
```

## 📝 第三步：创建示例内容

### 1. 上传媒体文件
1. 进入 **Media** 部分
2. 创建文件夹：Images, Icons
3. 上传案例研究和新闻的图片

### 2. 创建服务内容
1. 在 Content → Services 下创建服务
2. 例如：
   - Carbon Footprint Assessment
   - Climate Strategy Development
   - Renewable Energy Solutions

### 3. 创建案例研究
1. 在 Content → Case Studies 下创建案例
2. 填写所有必需字段
3. 关联相关服务和行业

### 4. 创建新闻文章
1. 在 Content → News 下创建文章
2. 设置发布日期和分类

## 🚀 第四步：验证集成

### 1. 检查API响应
```bash
# 获取所有案例研究
curl -H "Api-Key: southpole-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content?contentType=caseStudy

# 获取所有服务
curl -H "Api-Key: southpole-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service
```

### 2. 启动前端开发服务器
```bash
cd apps/main-site
npm run dev
```

### 3. 访问页面验证
- http://localhost:3001/work - 案例研究列表
- http://localhost:3001/news - 新闻列表
- 首页服务部分

## 🎨 第五步：内容编辑工作流

### 编辑流程
1. **内容创建**：编辑在Umbraco后台创建内容
2. **预览**：使用Umbraco预览功能
3. **发布**：点击"Save and Publish"
4. **前端更新**：内容通过API自动更新到前端

### 权限管理
1. 创建编辑用户组
2. 设置内容编辑权限
3. 限制对系统设置的访问

## ⚠️ 重要提示

1. **API密钥安全**：生产环境中更换API密钥
2. **CORS配置**：确保Umbraco允许前端域名访问
3. **缓存策略**：在前端实现适当的缓存
4. **备份**：定期备份Umbraco数据库

## 🔍 故障排除

### 内容不显示
1. 确认内容已发布（不只是保存）
2. 检查API密钥是否正确
3. 查看浏览器控制台错误

### API返回空数据
1. 检查内容类型别名是否匹配
2. 确认Delivery API已启用
3. 验证内容权限设置

## 📊 数据迁移（可选）

如果需要导入现有mock数据到Umbraco：
1. 使用Umbraco的导入功能
2. 或编写脚本通过Content Management API创建内容

---

**下一步**：按照上述步骤在Umbraco中创建内容类型，然后创建一些测试内容验证集成。