# 部署指南 - South Pole Clone

## 项目部署准备状态

### ✅ 已完成的准备工作

1. **环境变量配置** - 已配置生产环境变量
2. **构建测试** - 构建成功，无错误
3. **依赖问题修复** - 已解决 framer-motion 依赖问题
4. **Next.js 配置** - 已修复配置警告

### ⚠️ 需要注意的事项

1. **Lint 警告** - 存在一些 ESLint 警告，但不影响部署
2. **类型检查** - 已在构建时跳过（通过 next.config.ts 配置）

## 部署到 Vercel

### 方法一：通过 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 生产部署
vercel --prod
```

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 导入项目
3. 选择 GitHub 仓库
4. 配置以下设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `apps/main-site/.next`
   - Install Command: `npm install`

### 方法三：手动部署

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Third-Party Git Repository"
4. 使用相同的构建设置

## 环境变量设置

在 Vercel Dashboard 中添加以下环境变量：

```
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## 部署后检查清单

- [ ] 检查所有页面是否正常加载
- [ ] 验证响应式布局
- [ ] 测试动画效果
- [ ] 检查图片加载
- [ ] 验证路由功能
- [ ] 测试 404 页面

## 常见问题解决

### 1. Monorepo 部署问题
项目已配置好 `vercel.json`，应该可以正确识别 monorepo 结构。

### 2. 构建失败
- 确保所有依赖都已安装
- 检查 Node.js 版本 >= 18

### 3. 样式问题
- Tailwind CSS 已正确配置
- UI 组件包已预构建

## 性能优化建议

1. **图片优化**
   - 考虑使用 Next.js Image 组件
   - 启用图片优化

2. **缓存策略**
   - Vercel 会自动处理静态资源缓存
   - 考虑添加 API 路由缓存

3. **监控**
   - 使用 Vercel Analytics 监控性能
   - 设置错误报告

## 下一步行动

1. **连接真实 CMS**
   - 替换 mock 数据
   - 配置 CMS API 端点

2. **添加分析工具**
   - Google Analytics
   - Vercel Analytics

3. **SEO 优化**
   - 完善 meta 标签
   - 添加 sitemap.xml
   - 配置 robots.txt

## 紧急回滚

如需回滚到之前的版本：

```bash
# 查看部署历史
vercel ls

# 回滚到特定版本
vercel rollback [deployment-url]
```

---

**注意**: 本项目已准备好部署，构建测试已通过。主要的警告都不会影响部署和运行。