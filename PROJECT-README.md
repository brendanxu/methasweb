# South Pole Climate Solutions - Website Clone

一个高保真的 South Pole 企业官网克隆项目，使用现代化技术栈构建，专注于气候解决方案展示。

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-15.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue)

## ✨ 功能特点

- 🎨 **现代化设计**：高保真复刻 South Pole 官网设计
- 📱 **完全响应式**：完美适配移动端、平板和桌面设备
- 🎭 **精美动画**：使用 Framer Motion 实现流畅的交互动画
- ⚡ **高性能**：基于 Next.js 15 和 App Router 的优化构建
- 🏗️ **Monorepo 架构**：使用 Turborepo 管理多包项目
- 🎯 **TypeScript**：完整的类型安全支持
- 🎪 **组件化**：可复用的 UI 组件库

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **构建工具**: Turborepo
- **部署**: Vercel / 腾讯 EdgeOne

## 📁 项目结构

```
southpole-clone/
├── apps/
│   └── main-site/          # 主站点应用
│       ├── app/            # Next.js App Router 页面
│       ├── lib/            # 工具函数和数据层
│       └── public/         # 静态资源
├── packages/
│   ├── ui/                 # 共享 UI 组件库
│   ├── tailwind-config/    # Tailwind 配置
│   ├── eslint-config/      # ESLint 配置
│   ├── prettier-config/    # Prettier 配置
│   └── typescript-config/  # TypeScript 配置
└── docs/                   # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装和运行

```bash
# 克隆项目
git clone https://github.com/YOUR-USERNAME/southpole-clone.git
cd southpole-clone

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看主站点。

### 构建生产版本

```bash
# 构建所有包
npm run build

# 仅构建主站点
cd apps/main-site
npm run build
```

## 📄 页面结构

- **首页 (`/`)**: Hero 区域、服务展示、案例研究、新闻资讯
- **案例研究 (`/work`)**: 客户案例列表和详情页
- **新闻资讯 (`/news`)**: 新闻文章列表和详情页
- **其他页面**: 关于我们、联系方式等（占位页面）

## 🎨 UI 组件

### 核心组件

- `Button`: 多变体按钮组件
- `Card`: 卡片展示组件
- `Header`: 响应式导航头
- `Footer`: 网站底部
- `MotionSection`: 滚动动画容器
- `MotionGrid`: 交错动画网格

### 使用示例

```tsx
import { Button, Card, MotionSection } from '@repo/ui'

export function Example() {
  return (
    <MotionSection>
      <Card
        imageUrl="/example.jpg"
        title="示例卡片"
        description="这是一个示例卡片"
        href="/example"
      />
      <Button variant="primary">点击按钮</Button>
    </MotionSection>
  )
}
```

## 🎭 动画效果

项目使用 Framer Motion 实现了丰富的动画效果：

- **页面进入动画**: 元素滚动进入视口时的渐入效果
- **悬停动画**: 按钮和卡片的交互反馈
- **导航动画**: Header 吸顶和菜单展开效果
- **响应式动画**: 移动端友好的动画优化

## 📱 响应式设计

- **移动端**: 320px - 768px
- **平板端**: 768px - 1024px  
- **桌面端**: 1024px+

所有组件都经过精心设计，确保在各种设备上都有最佳体验。

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建项目
npm run build

# 代码检查
npm run lint

# 格式化代码
npm run format

# 类型检查
npm run check-types
```

## 📦 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 腾讯 EdgeOne 部署

参考 `DEPLOYMENT-CHECKLIST.md` 获取详细的部署指南。

## 🧪 测试

项目已通过全面的功能测试，详见 `TESTING-REPORT.md`：

- ✅ 所有页面功能正常
- ✅ 响应式设计完善
- ✅ 动画效果流畅
- ✅ 性能表现优秀

## 📈 性能优化

- **代码分割**: 自动的路由级代码分割
- **图片优化**: Next.js Image 组件优化
- **CSS 优化**: Tailwind CSS 的生产构建优化
- **动画优化**: Framer Motion 的 GPU 加速动画

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v1.0.0 (2025-07-04)

- ✨ 初始版本发布
- 🎨 完整的 UI/UX 实现
- 📱 响应式设计完成
- 🎭 Framer Motion 动画集成
- 🏗️ Turborepo 项目架构
- ⚡ Next.js 15 性能优化

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [South Pole](https://www.southpole.com) - 原始设计灵感
- [Next.js](https://nextjs.org) - React 框架
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架
- [Framer Motion](https://www.framer.com/motion) - 动画库
- [Unsplash](https://unsplash.com) - 示例图片

---

**项目状态**: ✅ 生产就绪 | **开发者**: Claude AI Assistant | **最后更新**: 2025-07-04