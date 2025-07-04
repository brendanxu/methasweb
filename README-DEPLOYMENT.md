# South Pole Clone - 部署指南

## 项目概述
这是一个高保真的 South Pole 企业官网克隆项目，使用现代化技术栈构建。

## 技术栈
- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **语言**: TypeScript
- **架构**: Turborepo Monorepo

## 部署到腾讯 EdgeOne

### 方式一：通过 Git 仓库部署
1. 将代码推送到 Git 仓库（GitHub/GitLab）
2. 在腾讯 EdgeOne 控制台选择从 Git 部署
3. 配置构建设置：
   - **构建命令**: `npm install && cd apps/main-site && npm run build`
   - **输出目录**: `apps/main-site/.next`
   - **安装命令**: `npm install`

### 方式二：手动上传构建产物
1. 本地构建项目：
   ```bash
   npm install
   cd apps/main-site
   npm run build
   ```

2. 上传 `.next` 目录到 EdgeOne

### 环境变量
无需特殊环境变量，项目使用模拟数据。

## 替代部署方案：Vercel

如果无法使用 EdgeOne，推荐使用 Vercel：

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 部署：
   ```bash
   vercel --prod
   ```

## 功能测试清单

### 页面功能测试
- [ ] 首页加载和动画效果
- [ ] Header 导航和巨型菜单
- [ ] 新闻列表页 (/news)
- [ ] 新闻详情页 (/news/[slug])
- [ ] 案例研究列表页 (/work)
- [ ] 案例研究详情页 (/work/[slug])
- [ ] Footer 链接

### 响应式测试
- [ ] 移动端 (320px - 768px)
- [ ] 平板端 (768px - 1024px)
- [ ] 桌面端 (1024px+)

### 动画测试
- [ ] 页面滚动动画
- [ ] 按钮悬停效果
- [ ] 卡片悬停效果
- [ ] Header 吸顶效果
- [ ] 移动端菜单动画

### 性能测试
- [ ] 页面加载速度
- [ ] 图片加载优化
- [ ] 动画性能
- [ ] SEO 元数据

## 已知问题
- Framer Motion 在构建时有 @emotion/is-prop-valid 警告，但不影响功能
- 当前使用模拟数据，生产环境需要接入真实 CMS

## 项目结构
```
southpole-clone/
├── apps/
│   └── main-site/          # 主站点应用
├── packages/
│   ├── ui/                 # 共享 UI 组件库
│   ├── tailwind-config/    # Tailwind 配置
│   ├── eslint-config/      # ESLint 配置
│   └── typescript-config/  # TypeScript 配置
└── vercel.json            # Vercel 部署配置
```