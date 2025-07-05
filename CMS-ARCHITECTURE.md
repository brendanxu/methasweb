# South Pole CMS 系统架构设计

## 🏗️ 系统架构概览

### 推荐技术栈

#### 后端 CMS 服务
```
框架: Node.js + Express.js / Fastify
数据库: PostgreSQL + Prisma ORM
认证: JWT + bcrypt
图片存储: Cloudinary / AWS S3
部署: Railway / Vercel / DigitalOcean
```

#### 管理后台
```
框架: Next.js 15 (独立应用)
UI库: Tailwind CSS + Headless UI
状态管理: Zustand
富文本: TinyMCE / Quill.js
图表: Chart.js / Recharts
```

## 📊 数据库模型设计

### 核心实体关系图
```
User (用户)
├── has many → CaseStudy (案例研究)
├── has many → NewsArticle (新闻文章)
└── has many → MediaFile (媒体文件)

CaseStudy (案例研究)
├── belongs to → User
├── belongs to → Industry (行业)
├── has many → CaseStudyService (多对多关系表)
└── has many → MediaFile

NewsArticle (新闻文章)
├── belongs to → User
├── belongs to → Category (分类)
└── has many → MediaFile

Service (服务)
├── has many → CaseStudyService
└── has many → CaseStudy (through CaseStudyService)

Industry (行业)
└── has many → CaseStudy

Category (分类)
└── has many → NewsArticle

MediaFile (媒体文件)
├── belongs to → User
├── belongs to → CaseStudy (optional)
└── belongs to → NewsArticle (optional)
```

### 数据库表结构

#### Users (用户表)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Case Studies (案例研究表)
```sql
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  hero_image_url TEXT,
  summary TEXT NOT NULL,
  the_goal TEXT NOT NULL,
  the_challenge TEXT NOT NULL,
  the_solution TEXT NOT NULL,
  industry_id UUID REFERENCES industries(id),
  author_id UUID REFERENCES users(id),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  meta_title VARCHAR(255),
  meta_description TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### News Articles (新闻文章表)
```sql
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  hero_image_url TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  meta_title VARCHAR(255),
  meta_description TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Services (服务表)
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon_url TEXT,
  color VARCHAR(7), -- HEX color code
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Industries (行业表)
```sql
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Categories (分类表)
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- HEX color code
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Case Study Services (多对多关系表)
```sql
CREATE TABLE case_study_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID REFERENCES case_studies(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(case_study_id, service_id)
);
```

#### Media Files (媒体文件表)
```sql
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  uploader_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔌 API 接口设计

### RESTful API 端点

#### 认证相关
```
POST /api/auth/login          # 用户登录
POST /api/auth/logout         # 用户登出
POST /api/auth/refresh        # 刷新令牌
GET  /api/auth/me             # 获取当前用户信息
```

#### 案例研究 (Case Studies)
```
GET    /api/case-studies                    # 获取案例列表 (支持分页、筛选、排序)
GET    /api/case-studies/:id               # 获取单个案例
POST   /api/case-studies                   # 创建案例
PUT    /api/case-studies/:id               # 更新案例
DELETE /api/case-studies/:id               # 删除案例
POST   /api/case-studies/:id/publish       # 发布案例
POST   /api/case-studies/:id/unpublish     # 取消发布
```

#### 新闻文章 (News Articles)
```
GET    /api/news-articles                  # 获取新闻列表
GET    /api/news-articles/:id             # 获取单篇新闻
POST   /api/news-articles                 # 创建新闻
PUT    /api/news-articles/:id             # 更新新闻
DELETE /api/news-articles/:id             # 删除新闻
POST   /api/news-articles/:id/publish     # 发布新闻
```

#### 分类管理
```
GET    /api/services                      # 获取服务列表
POST   /api/services                      # 创建服务
PUT    /api/services/:id                  # 更新服务
DELETE /api/services/:id                  # 删除服务

GET    /api/industries                    # 获取行业列表
POST   /api/industries                    # 创建行业
PUT    /api/industries/:id                # 更新行业
DELETE /api/industries/:id                # 删除行业

GET    /api/categories                    # 获取分类列表
POST   /api/categories                    # 创建分类
PUT    /api/categories/:id                # 更新分类
DELETE /api/categories/:id                # 删除分类
```

#### 媒体管理
```
GET    /api/media                         # 获取媒体文件列表
POST   /api/media/upload                  # 上传媒体文件
PUT    /api/media/:id                     # 更新媒体信息
DELETE /api/media/:id                     # 删除媒体文件
```

#### 用户管理
```
GET    /api/users                         # 获取用户列表
POST   /api/users                         # 创建用户
PUT    /api/users/:id                     # 更新用户
DELETE /api/users/:id                     # 删除用户
```

### API 查询参数示例

#### 案例研究列表查询
```
GET /api/case-studies?
  page=1&
  limit=10&
  status=published&
  industry=technology&
  service=climate-action&
  search=microsoft&
  sort=created_at&
  order=desc
```

#### 新闻文章列表查询
```
GET /api/news-articles?
  page=1&
  limit=12&
  status=published&
  category=sustainability&
  date_from=2024-01-01&
  date_to=2024-12-31&
  search=carbon&
  sort=published_at&
  order=desc
```

## 🎨 管理后台界面设计

### 页面结构
```
/admin
├── /dashboard              # 仪表板 (统计数据)
├── /case-studies          # 案例研究管理
│   ├── /                  # 列表页
│   ├── /new               # 新建页
│   └── /:id/edit          # 编辑页
├── /news                  # 新闻文章管理
│   ├── /                  # 列表页
│   ├── /new               # 新建页
│   └── /:id/edit          # 编辑页
├── /media                 # 媒体库管理
├── /settings              # 系统设置
│   ├── /services          # 服务管理
│   ├── /industries        # 行业管理
│   ├── /categories        # 分类管理
│   └── /users             # 用户管理
└── /profile               # 个人资料
```

### 核心功能模块

#### 1. 仪表板 (Dashboard)
- 内容统计 (总数、本月新增、状态分布)
- 最近活动时间线
- 热门内容排行
- 系统状态监控

#### 2. 内容编辑器
- 富文本编辑器 (支持图片、链接、格式化)
- 实时预览功能
- 自动保存草稿
- 版本历史记录
- SEO 元数据编辑

#### 3. 媒体库
- 拖拽上传
- 图片裁剪和优化
- 文件夹组织
- 搜索和筛选
- 批量操作

#### 4. 权限管理
- 角色权限矩阵
- 内容审核工作流
- 操作日志记录

## 🔧 技术实现细节

### 1. 后端架构 (Node.js + Express)

#### 项目结构
```
cms-backend/
├── src/
│   ├── controllers/        # 控制器
│   ├── middleware/         # 中间件
│   ├── models/            # 数据模型 (Prisma)
│   ├── routes/            # 路由定义
│   ├── services/          # 业务逻辑
│   ├── utils/             # 工具函数
│   └── app.js             # 应用入口
├── prisma/
│   ├── schema.prisma      # 数据库模式
│   └── migrations/        # 数据库迁移
├── uploads/               # 本地文件存储
├── .env                   # 环境变量
├── package.json
└── README.md
```

#### 核心依赖包
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5",
    "cloudinary": "^1.40.0",
    "joi": "^17.9.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.8.0",
    "winston": "^3.10.0"
  }
}
```

### 2. 管理后台 (Next.js)

#### 项目结构
```
cms-admin/
├── src/
│   ├── components/        # UI 组件
│   ├── pages/             # 页面组件
│   ├── hooks/             # 自定义 Hooks
│   ├── services/          # API 服务
│   ├── stores/            # 状态管理 (Zustand)
│   ├── types/             # TypeScript 类型
│   └── utils/             # 工具函数
├── public/                # 静态资源
├── .env.local             # 环境变量
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🚀 开发阶段规划

### 第一阶段 (MVP - 2周)
1. **设置项目基础** (1-2天)
   - 创建后端项目结构
   - 配置数据库和 Prisma
   - 创建管理后台项目

2. **核心 API 开发** (3-4天)
   - 用户认证系统
   - Case Study CRUD 接口
   - News Article CRUD 接口
   - 基础的媒体上传

3. **管理后台基础** (4-5天)
   - 登录页面
   - 仪表板
   - 案例研究管理页面
   - 新闻管理页面

4. **前端集成** (2-3天)
   - 替换 mock 数据为 API 调用
   - 测试和调试

### 第二阶段 (完善功能 - 2周)
1. **高级功能**
   - 富文本编辑器
   - 图片上传和优化
   - 内容搜索和筛选
   - 草稿和预览功能

2. **权限和安全**
   - 角色权限管理
   - 内容审核流程
   - API 安全加固

3. **用户体验优化**
   - 响应式设计
   - 加载状态
   - 错误处理

### 第三阶段 (生产部署 - 1周)
1. **生产环境配置**
   - 数据库迁移
   - CDN 配置
   - 环境变量设置

2. **性能优化**
   - API 缓存
   - 图片优化
   - 数据库查询优化

3. **监控和维护**
   - 日志系统
   - 错误监控
   - 备份策略

## 💡 技术选择建议

### 推荐方案 A: 全栈 Next.js (简单快速)
- **优点**: 统一技术栈，开发效率高，部署简单
- **缺点**: 单体应用，扩展性相对较弱
- **适用**: 团队规模小，快速上线需求

### 推荐方案 B: 分离式架构 (灵活强大)
- **优点**: 技术选择灵活，可独立扩展，性能更好
- **缺点**: 复杂度较高，部署和维护成本高
- **适用**: 长期项目，对性能和扩展性有要求

### 推荐方案 C: Headless CMS (第三方)
- **Strapi**: 开源，功能丰富，自定义能力强
- **Contentful**: 商业服务，稳定可靠，集成简单
- **Sanity**: 现代化界面，实时协作，开发体验好

基于你的项目规模和需求，我推荐 **方案 B (分离式架构)**，使用 Node.js + PostgreSQL + Next.js 的组合，既能满足当前需求，又为未来扩展留有空间。

你倾向于哪种技术方案？我可以帮你详细实施。