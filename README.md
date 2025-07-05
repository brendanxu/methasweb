# South Pole Clone Website - Methas 企业版

一个基于 Next.js 的现代响应式企业网站，克隆 South Pole 官网设计，包含完整的 CMS 后台管理系统。

## 📚 项目文档

### 🔥 快速开始
- **[QUICK_START.md](./QUICK_START.md)** - 5分钟快速启动指南

### 📋 完整文档  
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - **核心文档：完整项目状态、架构、功能清单**
- **[DEPLOYMENT_CONFIG.md](./DEPLOYMENT_CONFIG.md)** - 生产环境部署配置

### 🎯 当前状态
- ✅ **第一期开发完成** - 核心功能已实现
- 🌐 **前端已部署** - Vercel生产环境
- 🔧 **后台系统运行** - 本地API服务
- 📱 **管理界面可用** - 基础CMS功能

## 🚀 立即体验

### 启动项目 (3步)
```bash
git clone https://github.com/brendanxu/methasweb.git
cd methasweb/southpole-clone && npm install

# 启动后台服务
cd apps/cms-backend && npm run dev  # 端口: 3001

# 启动前端 (新终端)
cd apps/main-site && npm run dev    # 端口: 3000
```

### 访问地址
- **前端网站**: http://localhost:3000
- **管理后台**: http://localhost:3001/admin/working.html
- **API接口**: http://localhost:3001

### 登录信息
```
管理员: admin@southpole.com / admin123456
```

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 15** + **TypeScript** + **Tailwind CSS**
- **Vercel部署** + **响应式设计**

### 后端技术栈  
- **Express.js** + **PostgreSQL** + **Prisma ORM**
- **JWT认证** + **RESTful API**

### 项目结构
```
apps/
├── main-site/     # Next.js 前端主站
└── cms-backend/   # Express.js 后台API + 管理界面
packages/
└── ui/            # 共享UI组件库
```

## ✅ 核心功能

### 已完成功能
- 🏠 **完整企业网站** - 首页、关于我们、联系我们、服务页面
- 👥 **团队管理系统** - 成员信息、部门分类、状态管理
- 🏢 **办公地点管理** - 全球办公室、总部管理、联系信息
- 📝 **联系表单系统** - 表单提交、邮件通知、状态跟踪
- 🔍 **搜索和过滤** - 智能搜索、多维度过滤
- 🔐 **用户认证系统** - JWT认证、角色权限、安全管理
- 📊 **管理仪表板** - 数据统计、内容管理、系统监控
- 🎨 **SEO优化** - Meta标签、OpenGraph、层级化配置

### 待开发功能 (第二期)
- 📧 **邮件订阅系统** - Newsletter、自动化邮件
- 🌍 **多语言支持** - 中英文切换、国际化
- 📱 **移动应用** - React Native跨平台应用
- 🤖 **AI聊天机器人** - 智能客服、多语言支持

## 🎯 生产环境

### 部署状态
- **前端**: ✅ 已部署至 Vercel
- **域名**: 🔄 配置中 (www.methas.cn)
- **后台**: 🔄 待部署至云服务器
- **数据库**: ✅ PostgreSQL 生产就绪

### 关键配置
- Docker 容器化支持
- CI/CD 自动部署
- 安全头配置
- 性能优化

## 📞 技术支持

### 重要提醒
- **管理界面**: 如登录有问题，使用 `working.html` 版本
- **数据库**: 项目已从 SQLite 迁移至 PostgreSQL
- **部署**: 前端使用 Vercel，后台需单独部署

### 获取帮助
1. 查看 **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** 了解详细信息
2. 使用 **[QUICK_START.md](./QUICK_START.md)** 快速解决问题
3. 检查 `/health` 端点确认服务状态

---

**项目状态**: 第一期开发完成 ✅ | **下一步**: 完善管理功能、域名部署

**最后更新**: 2025年7月5日 | **GitHub**: https://github.com/brendanxu/methasweb