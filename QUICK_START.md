# South Pole Clone - 快速启动指南

## 🚀 立即启动项目

### 环境要求
- Node.js 22.17.0+
- PostgreSQL 数据库
- Git

### 启动步骤

```bash
# 1. 克隆项目
git clone https://github.com/brendanxu/methasweb.git
cd methasweb/southpole-clone

# 2. 安装依赖
npm install

# 3. 启动后台服务
cd apps/cms-backend
npm run dev  # 端口: 3001

# 4. 启动前端 (新终端)
cd apps/main-site  
npm run dev  # 端口: 3000
```

### 关键访问地址
- **前端主站**: http://localhost:3000
- **后台API**: http://localhost:3001
- **管理界面**: http://localhost:3001/admin/working.html
- **健康检查**: http://localhost:3001/health

### 默认登录信息
```
管理员账户:
邮箱: admin@southpole.com
密码: admin123456
```

## 📁 核心文件位置

### 需要关注的重要文件
- `PROJECT_STATUS.md` - **完整项目状态文档**
- `DEPLOYMENT_CONFIG.md` - 部署配置指南
- `apps/main-site/` - 前端 Next.js 应用
- `apps/cms-backend/` - 后端 Express.js API
- `apps/cms-backend/public/admin/working.html` - **可用的管理界面**

### 环境配置文件
- `apps/cms-backend/.env` - 后台环境变量
- `apps/main-site/.env.local` - 前端环境变量
- `.env.production` - 生产环境配置模板

## ⚡ 常见问题解决

### 问题1: 管理界面无法登录
**解决方案**: 使用 `working.html` 版本
```
访问: http://localhost:3001/admin/working.html
```

### 问题2: 数据库连接错误
**解决方案**: 检查PostgreSQL服务并运行迁移
```bash
cd apps/cms-backend
npm run db:migrate
npm run db:seed
```

### 问题3: 端口被占用
**解决方案**: 杀死占用端口的进程
```bash
# 查找占用端口的进程
lsof -i :3001
lsof -i :3000

# 杀死进程
kill -9 [PID]
```

## 🔄 开发状态

### ✅ 已完成
- 完整的前端网站 (Next.js)
- 后台API系统 (Express.js)
- 数据库设计 (PostgreSQL)
- 用户认证系统
- 基础管理界面
- Vercel 生产部署

### 🔄 待完成
- 修复主要管理界面
- 域名配置 (www.methas.cn)
- 完善编辑功能
- 后台服务部署

## 📞 获取帮助

1. **查看完整文档**: 阅读 `PROJECT_STATUS.md`
2. **检查API状态**: 访问 `/health` 端点
3. **查看日志**: 检查终端输出的错误信息
4. **重置数据**: 运行 `npm run db:seed`

---
**快速参考最后更新**: 2025年7月5日