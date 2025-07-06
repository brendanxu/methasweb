# 🔗 后端集成快速指南

## 当前架构

```
┌─────────────────┐     API请求      ┌──────────────────┐
│   Next.js前端   │ ──────────────> │  Umbraco CMS后端  │
│   (Vercel)      │ <────────────── │   (Railway)       │
└─────────────────┘     JSON响应     └──────────────────┘
```

## 一、后端功能概览

### Umbraco CMS提供：
1. **内容管理系统** - 可视化界面管理所有网站内容
2. **Delivery API** - RESTful API提供内容数据
3. **媒体管理** - 上传和管理图片/文件
4. **用户权限** - 多用户协作管理内容
5. **版本控制** - 内容历史记录和回滚

## 二、快速开始使用后端

### 步骤1：访问管理界面
```
URL: https://your-railway-url.railway.app/umbraco
用户名: admin@southpole.com
密码: SouthPole2024!Railway
```

### 步骤2：创建第一个内容

1. **创建案例研究**：
   - 点击 Content → Create → Case Study
   - 填写标题、客户名称、摘要
   - 上传封面图片
   - 编写项目目标、挑战和解决方案
   - 点击 "Save and Publish"

2. **查看API输出**：
   ```bash
   curl -H "Api-Key: southpole-railway-api-key-2024" \
        https://your-railway-url.railway.app/umbraco/delivery/api/v1/content?contentType=caseStudy
   ```

### 步骤3：在前端显示

前端代码已经配置好，只需更新环境变量：
```env
NEXT_PUBLIC_UMBRACO_BASE_URL=https://your-railway-url.railway.app
NEXT_PUBLIC_UMBRACO_API_KEY=southpole-railway-api-key-2024
```

## 三、内容类型说明

### 1. Case Studies（案例研究）
- **用途**：展示公司项目案例
- **字段**：标题、客户、图片、描述、相关服务
- **前端路径**：`/work` 和 `/work/[slug]`

### 2. News Articles（新闻文章）
- **用途**：发布公司新闻和行业资讯
- **字段**：标题、发布日期、内容、分类
- **前端路径**：`/news` 和 `/news/[slug]`

### 3. Services（服务）
- **用途**：展示公司提供的服务
- **字段**：名称、描述、图标、特性
- **前端路径**：首页服务部分

### 4. Team Members（团队成员）
- **用途**：展示团队信息
- **字段**：姓名、职位、照片、简介
- **前端路径**：关于页面（需创建）

## 四、数据流程

```
1. 编辑器在Umbraco创建内容
     ↓
2. 内容保存到SQLite数据库
     ↓
3. 点击"Publish"发布内容
     ↓
4. 内容通过Delivery API可用
     ↓
5. 前端通过API获取内容
     ↓
6. 页面渲染显示内容
```

## 五、常用操作示例

### 1. 添加新案例研究
```javascript
// Umbraco后台操作：
// Content → Create → Case Study → 填写信息 → Save and Publish

// 前端自动获取：
const caseStudies = await umbracoClient.getCaseStudies()
// 新案例会自动出现在列表中
```

### 2. 更新现有内容
```javascript
// Umbraco后台操作：
// Content → 选择内容 → 编辑 → Save and Publish

// 前端会获取更新后的内容
```

### 3. 上传媒体文件
```javascript
// Umbraco后台操作：
// Media → Upload → 选择文件
// 在内容中通过Media Picker选择

// 图片URL会自动包含在API响应中
```

## 六、与前端集成

### 已配置的客户端方法：
```typescript
// 获取所有案例研究
await umbracoClient.getCaseStudies()

// 获取单个案例研究
await umbracoClient.getCaseStudy(slug)

// 获取新闻文章
await umbracoClient.getNewsArticles()

// 获取服务
await umbracoClient.getServices()

// 获取团队成员
await umbracoClient.getTeamMembers()
```

### 页面已集成Umbraco：
- ✅ `/work` - 案例研究列表
- ✅ `/work/[slug]` - 案例研究详情
- ✅ `/news` - 新闻列表
- ✅ `/news/[slug]` - 新闻详情
- ✅ 首页服务部分

## 七、测试后端连接

### 1. 命令行测试
```bash
# 测试健康状态
curl https://your-railway-url.railway.app/umbraco/api/health

# 测试API（需要API密钥）
curl -H "Api-Key: southpole-railway-api-key-2024" \
     https://your-railway-url.railway.app/umbraco/delivery/api/v1/content
```

### 2. 前端测试页面
访问：`http://localhost:3001/test-umbraco`

## 八、下一步行动

1. **部署Umbraco到Railway**
2. **登录Umbraco后台**
3. **创建一些测试内容**
4. **更新前端环境变量**
5. **验证内容显示正确**

---

**提示**：Umbraco后端就像一个内容数据库，通过友好的界面让非技术人员也能管理网站内容。前端通过API获取这些内容并展示给用户。