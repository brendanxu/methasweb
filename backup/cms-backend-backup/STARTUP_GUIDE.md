# CMS Backend 启动指南

## 🚀 快速启动

### 1. 安装 Docker 并启动数据库

```bash
# 下载安装 Docker Desktop for Mac
# 访问: https://docs.docker.com/desktop/install/mac/

# 启动 PostgreSQL 容器
docker run --name postgres-cms \
  -e POSTGRES_PASSWORD=southpole_dev_2024 \
  -e POSTGRES_USER=southpole_user \
  -e POSTGRES_DB=southpole_cms \
  -p 5432:5432 \
  -d postgres:16

# 验证容器运行
docker ps
```

### 2. 初始化项目

```bash
cd apps/cms-backend

# 安装依赖
npm install

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 填充示例数据
npm run seed
```

### 3. 启动开发服务器

```bash
# 启动后端服务
npm run dev

# 服务将在以下地址运行:
# 🚀 API: http://localhost:3001
# 🏥 健康检查: http://localhost:3001/health
```

### 4. 测试 API

```bash
# 运行 API 测试
npm test

# 或者手动测试健康检查
curl http://localhost:3001/health
```

## 📋 完整的 API 端点

### 🔐 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息
- `PUT /api/auth/profile` - 更新用户资料
- `POST /api/auth/change-password` - 修改密码
- `POST /api/auth/refresh` - 刷新令牌
- `POST /api/auth/register` - 注册新用户 (仅管理员)

### 📖 案例研究接口
- `GET /api/case-studies` - 获取所有案例研究
- `GET /api/case-studies/:id` - 获取单个案例研究
- `POST /api/case-studies` - 创建案例研究
- `PUT /api/case-studies/:id` - 更新案例研究
- `DELETE /api/case-studies/:id` - 删除案例研究
- `POST /api/case-studies/:id/publish` - 发布案例研究
- `POST /api/case-studies/:id/unpublish` - 取消发布

### 📰 新闻文章接口
- `GET /api/news` - 获取所有新闻文章
- `GET /api/news/:id` - 获取单个新闻文章
- `POST /api/news` - 创建新闻文章
- `PUT /api/news/:id` - 更新新闻文章
- `DELETE /api/news/:id` - 删除新闻文章
- `POST /api/news/:id/publish` - 发布新闻文章
- `POST /api/news/:id/unpublish` - 取消发布

### 🛠️ 服务接口
- `GET /api/services` - 获取所有服务
- `GET /api/services/:id` - 获取单个服务
- `GET /api/services/:id/stats` - 获取服务统计
- `POST /api/services` - 创建服务 (仅管理员)
- `PUT /api/services/:id` - 更新服务 (仅管理员)
- `DELETE /api/services/:id` - 删除服务 (仅管理员)

### 🏭 行业接口
- `GET /api/industries` - 获取所有行业
- `GET /api/industries/:id` - 获取单个行业
- `GET /api/industries/:id/stats` - 获取行业统计
- `POST /api/industries` - 创建行业 (仅管理员)
- `PUT /api/industries/:id` - 更新行业 (仅管理员)
- `DELETE /api/industries/:id` - 删除行业 (仅管理员)

### 📂 分类接口
- `GET /api/categories` - 获取所有分类
- `GET /api/categories/:id` - 获取单个分类
- `GET /api/categories/:id/stats` - 获取分类统计
- `POST /api/categories` - 创建分类 (仅管理员)
- `PUT /api/categories/:id` - 更新分类 (仅管理员)
- `DELETE /api/categories/:id` - 删除分类 (仅管理员)

### 📁 媒体文件接口
- `GET /api/media` - 获取所有媒体文件
- `GET /api/media/:id` - 获取单个媒体文件
- `GET /api/media/stats` - 获取媒体统计 (仅管理员)
- `POST /api/media/upload` - 上传单个文件
- `POST /api/media/upload-multiple` - 上传多个文件
- `PUT /api/media/:id` - 更新媒体文件元数据
- `DELETE /api/media/:id` - 删除媒体文件 (仅管理员)

### 👥 用户管理接口 (仅管理员)
- `GET /api/users` - 获取所有用户
- `GET /api/users/:id` - 获取单个用户
- `GET /api/users/stats` - 获取用户统计
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户
- `POST /api/users/:id/reset-password` - 重置用户密码
- `POST /api/users/bulk-update` - 批量更新用户

## 🔧 环境配置

确保 `.env` 文件包含以下配置：

```env
# 数据库配置
DATABASE_URL="postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public"

# JWT 配置
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# 服务器配置
PORT=3001
NODE_ENV=development

# CORS 配置
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"

# 速率限制
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🎯 下一步

1. **数据库已就绪**: ✅ PostgreSQL 容器运行中
2. **后端 API 已完成**: ✅ 所有核心功能已实现
3. **准备前端集成**: 🔄 可以开始替换前端 mock 数据

### 前端集成步骤：
1. 在前端项目中创建 API 客户端
2. 替换现有的 mock 数据调用
3. 实现用户认证状态管理
4. 添加文件上传功能
5. 测试所有功能

### 可选增强功能：
- 管理后台界面 (React Admin)
- 富文本编辑器集成
- 图片优化和 CDN
- 内容版本控制
- 高级搜索功能

🎉 CMS 后端已完全准备就绪！