# 碳智METHAS Monorepo 架构文档

## 项目概述

这是一个基于 Turborepo 的现代化 Monorepo 架构，专为碳智METHAS企业官网设计。该架构遵循专业的设计系统原则，确保可维护性、可扩展性和一致性。

## 技术栈

- **Monorepo 管理**: Turborepo 2.5+
- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript 5.0+
- **样式**: Tailwind CSS 3.4+ + CSS Variables
- **动画**: Framer Motion 11+
- **设计系统**: 自定义设计令牌系统
- **文档**: Storybook 7+
- **构建**: Turbo, SWC, Vite

## 项目结构

```
southpole-clone/
├── apps/                                    # 应用程序
│   ├── main-site/                          # 主站应用
│   │   ├── app/                            # Next.js App Router
│   │   ├── components/                     # 应用特定组件
│   │   ├── lib/                            # 工具函数和类型
│   │   └── public/                         # 静态资源
│   └── umbraco-cms/                        # Umbraco CMS 后端
│
├── packages/                               # 共享包
│   ├── design-tokens/                      # 设计令牌系统
│   │   ├── src/
│   │   │   ├── tokens.scss                # SCSS 设计令牌
│   │   │   ├── index.css                  # CSS 样式导入
│   │   │   └── index.ts                   # TypeScript 令牌导出
│   │   └── dist/                          # 构建输出
│   │
│   ├── ui-new/                            # 新UI组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── atoms/                 # 原子组件
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   └── Card.tsx
│   │   │   │   └── layout/                # 布局组件
│   │   │   │       └── Section.tsx
│   │   │   ├── utils/                     # 工具函数
│   │   │   ├── index.css                  # 样式入口
│   │   │   └── index.ts                   # 组件导出
│   │   └── dist/                          # 构建输出
│   │
│   ├── tailwind-config/                   # Tailwind 配置（现有）
│   ├── eslint-config/                     # ESLint 配置（现有）
│   ├── prettier-config/                   # Prettier 配置（现有）
│   └── typescript-config/                 # TypeScript 配置（现有）
│
├── turbo.json                             # Turborepo 配置
├── package.json                           # 根包配置
└── README.md                              # 项目说明
```

## 设计令牌系统

### 色彩系统

```typescript
// 主品牌色 - 碳智METHAS蓝
primary: {
  50: '#F0F7FF',
  500: '#0066CC',    // 主要颜色
  900: '#001429',    // 深色变体
}

// 环保绿色 - 可持续发展
green: {
  50: '#F0FDF4',
  500: '#00A651',    // 环保绿
  900: '#00361C',
}

// 警示橙色 - 紧急气候行动
orange: {
  500: '#FF6B35',    // 强调色
}
```

### 字体系统

```css
/* 响应式字体 */
--methas-text-xs: clamp(0.75rem, 2vw, 0.875rem);
--methas-text-base: clamp(1rem, 3vw, 1.125rem);
--methas-text-5xl: clamp(3rem, 10vw, 5rem);

/* 字体族 */
--methas-font-primary: 'Inter', sans-serif;
--methas-font-heading: 'Playfair Display', serif;
--methas-font-mono: 'IBM Plex Mono', monospace;
```

### 间距系统

基于 8px 网格系统：

```css
--methas-space-1: 0.25rem;  /* 4px */
--methas-space-2: 0.5rem;   /* 8px */
--methas-space-4: 1rem;     /* 16px */
--methas-space-8: 2rem;     /* 32px */
```

## 组件架构

### 原子设计原则

#### 原子组件 (Atoms)
- **Button**: 多变体按钮组件，支持加载状态、图标、分组
- **Card**: 卡片组件，支持多种样式和交互状态
- **Input**: 表单输入组件（待实现）
- **Typography**: 文本组件（待实现）

#### 布局组件 (Layout)
- **Section**: 页面区域组件，支持多种背景和间距
- **Container**: 内容容器组件
- **Grid**: 网格布局组件
- **Flex**: 弹性布局组件
- **Stack**: 垂直堆叠组件

#### 组合组件 (Molecules)
- **CardGrid**: 卡片网格组件
- **ButtonGroup**: 按钮组组件
- **Navigation**: 导航组件（待实现）

### 组件特性

- **类型安全**: 完整的 TypeScript 类型定义
- **变体支持**: 使用 `class-variance-authority` 实现多变体
- **动画集成**: 内置 Framer Motion 动画
- **响应式**: 移动优先的响应式设计
- **可访问性**: 遵循 WCAG 2.1 AA 标准
- **主题支持**: 基于 CSS Variables 的主题系统

## 构建和部署

### 开发命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建所有包
npm run build

# 类型检查
npm run check-types

# 代码格式化
npm run format

# 清理构建文件
npm run clean
```

### 包构建顺序

1. **design-tokens** - 设计令牌系统
2. **ui-new** - UI 组件库
3. **main-site** - 主站应用

### 部署流程

1. **设计令牌构建**: 编译 SCSS 到 CSS，生成 TypeScript 定义
2. **UI 组件构建**: 编译 TypeScript，生成 CSS 和类型定义
3. **主站构建**: Next.js 生产构建，包含所有依赖

## 开发指南

### 添加新组件

1. 在 `packages/ui-new/src/components/` 创建组件
2. 使用设计令牌和 Tailwind 类
3. 添加 TypeScript 类型定义
4. 导出组件到 `index.ts`
5. 更新 Storybook 文档

### 修改设计令牌

1. 更新 `packages/design-tokens/src/tokens.scss`
2. 同步 `packages/design-tokens/src/index.ts`
3. 运行构建验证更改
4. 更新相关组件

### 集成到主站

```typescript
// 导入设计令牌 CSS
import '@methas/design-tokens/dist/index.css'

// 导入 UI 组件
import { Button, Card, Section } from '@methas/ui'

// 使用组件
<Section spacing="lg" background="gradient">
  <Card variant="elevated">
    <Button variant="primary" size="lg">
      开始使用
    </Button>
  </Card>
</Section>
```

## 性能优化

### 代码分割
- 按需导入组件
- 动态导入大型组件
- 分离样式和逻辑

### 样式优化
- CSS Variables 减少重复
- 原子化 CSS 类
- 按需加载样式

### 构建优化
- Turbo 缓存加速构建
- 增量构建和类型检查
- 并行构建多个包

## 测试策略

### 单元测试
- Jest + React Testing Library
- 组件快照测试
- 交互行为测试

### 视觉测试
- Storybook 视觉回归测试
- Chromatic 自动化测试
- 跨浏览器测试

### 集成测试
- Playwright 端到端测试
- 性能测试
- 可访问性测试

## 文档系统

### Storybook 配置
- 组件文档和示例
- 设计令牌展示
- 交互式测试工具

### 代码文档
- TSDoc 注释
- 自动生成 API 文档
- 使用示例和最佳实践

## 升级迁移

### 从现有系统迁移

1. **逐步迁移**: 新组件使用新架构，旧组件保持兼容
2. **样式迁移**: 将现有样式转换为设计令牌
3. **组件重构**: 使用新的组件 API 重写页面
4. **测试验证**: 确保功能和视觉一致性

### 版本管理
- 语义化版本控制
- 变更日志记录
- 向后兼容性保证

## 最佳实践

### 代码质量
- 遵循 TypeScript 严格模式
- 使用 ESLint 和 Prettier
- 代码审查和自动化检查

### 性能考虑
- 组件懒加载
- 避免不必要的重渲染
- 优化动画性能

### 可维护性
- 模块化设计
- 清晰的依赖关系
- 完整的文档和测试

## 路线图

### 第一阶段 ✅
- [x] 设计令牌系统
- [x] 基础组件库
- [x] 构建配置

### 第二阶段 🔄
- [ ] 重构现有组件
- [ ] Storybook 文档
- [ ] 测试覆盖

### 第三阶段 📋
- [ ] 高级组件
- [ ] 动画系统
- [ ] 性能优化

---

*本文档随架构发展持续更新。最后更新：2024-07-09*