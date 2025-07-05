# EdgeOne & Production Deployment Configuration

## 🌐 Domain Configuration
- **Primary Domain**: www.methas.cn
- **API Subdomain**: api.methas.cn (推荐)
- **Admin Subdomain**: admin.methas.cn (可选)

## 📦 EdgeOne 部署配置

### Build Settings
```bash
# Build Command
npm run build

# Output Directory
apps/main-site/.next

# Install Command  
npm ci

# Node Version
18.x
```

### Environment Variables (EdgeOne)
```bash
# 基础配置
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# API配置 (如果有独立API服务器)
NEXT_PUBLIC_API_URL=https://api.methas.cn/api

# 认证配置
NEXTAUTH_URL=https://www.methas.cn
NEXTAUTH_SECRET=your-nextauth-secret-32-characters-min

# 数据库 (如果需要)
DATABASE_URL=postgresql://username:password@host:5432/database

# 外部服务
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### EdgeOne部署步骤
1. **连接GitHub仓库**
   - 选择 `methasweb` 仓库
   - 分支: `main`
   - 根目录: `/apps/main-site`

2. **构建配置**
   - 框架: Next.js
   - Node版本: 18.x
   - 构建命令: `npm run build`
   - 输出目录: `.next`

3. **域名配置**
   - 添加自定义域名: `www.methas.cn`
   - 配置DNS CNAME记录

## 🚀 Vercel 部署配置

### vercel.json 配置文件
```json
{
  "version": 2,
  "name": "methas-southpole",
  "builds": [
    {
      "src": "apps/main-site/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "apps/main-site/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "NEXT_TELEMETRY_DISABLED": "1"
  },
  "functions": {
    "apps/main-site/app/**/*.js": {
      "maxDuration": 30
    }
  }
}
```

### Vercel 环境变量
```bash
NEXTAUTH_URL=https://www.methas.cn
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.methas.cn/api
```

## 🐳 Docker 生产部署

### 单容器部署
```bash
# 构建镜像
docker build -t methas-southpole .

# 运行容器
docker run -d \
  --name methas-web \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXTAUTH_URL=https://www.methas.cn \
  methas-southpole
```

### 完整栈部署 (推荐生产环境)
```bash
# 复制环境配置
cp .env.production.example .env.production

# 编辑环境变量
nano .env.production

# 启动完整服务栈
docker-compose -f docker-compose.prod.yml up -d

# 检查服务状态
docker-compose -f docker-compose.prod.yml ps
```

## 🌟 Railway 部署

### Railway 配置
```toml
# railway.toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "never"

[[services]]
name = "web"
source = "apps/main-site"

[services.web]
variables = { NODE_ENV = "production" }
```

## 📊 监控配置

### 健康检查端点
- **主站**: https://www.methas.cn/api/health
- **API**: https://api.methas.cn/api/health

### 性能监控
```javascript
// Google Analytics 4
gtag('config', 'G-XXXXXXXXXX', {
  page_title: 'Methas - South Pole Clone',
  page_location: 'https://www.methas.cn'
});
```

## 🔒 SSL/安全配置

### DNS记录配置
```
Type    Name              Value
CNAME   www.methas.cn     your-edgeone-domain.com
CNAME   api.methas.cn     your-api-server.com
A       methas.cn         your-server-ip (可选)
```

### 安全头配置
```nginx
# Security Headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "origin-when-cross-origin" always;
add_header X-XSS-Protection "1; mode=block" always;
```

## 🎯 推荐部署流程

### 方案1: EdgeOne + 外部API (简单)
1. 前端部署到EdgeOne
2. API部署到Railway/Render
3. 数据库使用云数据库服务

### 方案2: 全栈云服务 (完整)
1. 使用Railway部署完整应用
2. 配置自定义域名
3. 启用监控和日志

### 方案3: 自托管 (完全控制)
1. 云服务器 + Docker Compose
2. Nginx反向代理
3. Let's Encrypt SSL证书

## 🚀 快速开始命令

```bash
# 1. 克隆项目
git clone https://github.com/brendanxu/methasweb.git
cd methasweb

# 2. EdgeOne 部署
# 直接在EdgeOne控制台连接GitHub仓库

# 3. 或本地测试生产构建
npm run build:prod
npm run start:prod
```

选择最适合您需求的部署方案！