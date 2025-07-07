# South Pole 设计系统规范文档

## 1. 设计基础系统

### 颜色系统

#### 主色调（Primary Colors）
```css
--color-primary-dark: #002145;      /* 深海军蓝 - 品牌主色，传达专业、可信赖 */
--color-primary-light: #003366;     /* 中度蓝 - 主色调变体 */
--color-primary-accent: #0052CC;    /* 亮蓝 - 强调色，用于CTA */
```

#### 辅助色（Secondary Colors）
```css
--color-secondary-green: #00875A;   /* 环保绿 - 呼应可持续发展主题 */
--color-secondary-teal: #00B8A9;    /* 青绿色 - 数据可视化 */
--color-secondary-orange: #FF8B00;  /* 活力橙 - 警示/重要信息 */
```

#### 中性色（Neutral Colors）
```css
--color-neutral-000: #FFFFFF;       /* 纯白 - 背景 */
--color-neutral-050: #FAFBFC;       /* 浅灰白 - 次要背景 */
--color-neutral-100: #F4F5F7;       /* 浅灰 - 卡片背景 */
--color-neutral-200: #EBECF0;       /* 分割线 */
--color-neutral-300: #DFE1E6;       /* 边框 */
--color-neutral-400: #C1C7D0;       /* 禁用状态 */
--color-neutral-500: #A5ADBA;       /* 占位符文本 */
--color-neutral-600: #6B778C;       /* 次要文本 */
--color-neutral-700: #505F79;       /* 正文文本 */
--color-neutral-800: #253858;       /* 标题文本 */
--color-neutral-900: #091E42;       /* 深色文本 */
```

#### 语义色（Semantic Colors）
```css
--color-success: #00875A;           /* 成功 */
--color-warning: #FF8B00;           /* 警告 */
--color-error: #DE350B;             /* 错误 */
--color-info: #0065FF;              /* 信息 */
```

#### 透明度规则
```css
--opacity-hover: 0.9;
--opacity-disabled: 0.6;
--opacity-overlay: 0.85;
--opacity-backdrop: 0.5;
```

### 排版系统

#### 字体家族
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
--font-secondary: 'Georgia', 'Times New Roman', serif;  /* 用于引用 */
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
```

#### 字号体系
```css
/* 桌面端 */
--text-xs: 0.75rem;      /* 12px - 标签、说明文字 */
--text-sm: 0.875rem;     /* 14px - 辅助文本 */
--text-base: 1rem;       /* 16px - 正文 */
--text-lg: 1.125rem;     /* 18px - 重点内容 */
--text-xl: 1.25rem;      /* 20px - 小标题 */
--text-2xl: 1.5rem;      /* 24px - 标题 */
--text-3xl: 1.875rem;    /* 30px - 页面标题 */
--text-4xl: 2.25rem;     /* 36px - 主标题 */
--text-5xl: 3rem;        /* 48px - 大标题 */

/* 移动端 (-20%) */
--text-mobile-xs: 0.625rem;    /* 10px */
--text-mobile-sm: 0.75rem;     /* 12px */
--text-mobile-base: 0.875rem;  /* 14px */
--text-mobile-lg: 1rem;        /* 16px */
--text-mobile-xl: 1.125rem;    /* 18px */
--text-mobile-2xl: 1.25rem;    /* 20px */
--text-mobile-3xl: 1.5rem;     /* 24px */
--text-mobile-4xl: 1.875rem;   /* 30px */
--text-mobile-5xl: 2.25rem;    /* 36px */
```

#### 字重使用
```css
--font-light: 300;      /* 轻体 - 大标题 */
--font-regular: 400;    /* 常规 - 正文 */
--font-medium: 500;     /* 中等 - 重要内容 */
--font-semibold: 600;   /* 半粗 - 小标题 */
--font-bold: 700;       /* 粗体 - 强调 */
```

#### 行高规律
```css
--leading-tight: 1.25;    /* 标题 */
--leading-snug: 1.375;    /* 紧凑内容 */
--leading-normal: 1.5;    /* 正文 */
--leading-relaxed: 1.625; /* 宽松阅读 */
--leading-loose: 2;       /* 特殊场景 */
```

### 间距系统

#### 基础间距单位
```css
--space-unit: 8px;  /* 基础单位 */
```

#### 间距规模
```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

#### 栅格系统
```css
--grid-columns: 12;
--grid-gutter: 24px;
--grid-margin: 24px;
--container-max-width: 1280px;
```

## 2. 组件设计规范

### 按钮系统

#### 按钮类型与样式
```css
/* 主要按钮 */
.btn-primary {
  background: var(--color-primary-dark);
  color: var(--color-neutral-000);
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 33, 69, 0.15);
}

/* 次要按钮 */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-dark);
  border: 2px solid var(--color-primary-dark);
  padding: 10px 22px;
}

/* 文本按钮 */
.btn-text {
  background: transparent;
  color: var(--color-primary-dark);
  padding: 8px 16px;
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

#### 按钮尺寸
```css
/* 大按钮 */
.btn-lg {
  padding: 16px 32px;
  font-size: var(--text-lg);
}

/* 中按钮（默认） */
.btn-md {
  padding: 12px 24px;
  font-size: var(--text-base);
}

/* 小按钮 */
.btn-sm {
  padding: 8px 16px;
  font-size: var(--text-sm);
}
```

### 表单元素

```css
/* 输入框基础样式 */
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-neutral-300);
  border-radius: 4px;
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-dark);
  box-shadow: 0 0 0 3px rgba(0, 33, 69, 0.1);
}

/* 标签样式 */
.label {
  display: block;
  margin-bottom: 8px;
  font-weight: var(--font-medium);
  color: var(--color-neutral-800);
}
```

### 卡片组件

```css
.card {
  background: var(--color-neutral-000);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

## 3. 动效系统

### 过渡动画标准

```css
/* 时长标准 */
--duration-instant: 100ms;   /* 即时反馈 */
--duration-fast: 200ms;      /* 快速过渡 */
--duration-normal: 300ms;    /* 标准过渡 */
--duration-slow: 500ms;      /* 缓慢过渡 */

/* 缓动函数 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 交互动画

```css
/* 悬停效果 */
.hover-lift {
  transition: transform var(--duration-fast) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* 点击反馈 */
.click-scale {
  transition: transform var(--duration-instant) var(--ease-in-out);
}
.click-scale:active {
  transform: scale(0.98);
}

/* 进入动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp var(--duration-normal) var(--ease-out);
}
```

## 4. 布局系统

### 响应式断点

```css
/* 移动优先 */
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板竖屏 */
--breakpoint-lg: 1024px;  /* 平板横屏/小屏桌面 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏幕 */
```

### 容器系统

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--grid-margin);
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 5. 视觉效果

### 阴影系统

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);
```

### 边框系统

```css
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;

--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

## 6. 设计令牌（Design Tokens）

```json
{
  "color": {
    "primary": {
      "dark": { "value": "#002145" },
      "light": { "value": "#003366" },
      "accent": { "value": "#0052CC" }
    },
    "neutral": {
      "000": { "value": "#FFFFFF" },
      "100": { "value": "#F4F5F7" },
      "200": { "value": "#EBECF0" },
      "300": { "value": "#DFE1E6" },
      "400": { "value": "#C1C7D0" },
      "500": { "value": "#A5ADBA" },
      "600": { "value": "#6B778C" },
      "700": { "value": "#505F79" },
      "800": { "value": "#253858" },
      "900": { "value": "#091E42" }
    }
  },
  "spacing": {
    "unit": { "value": "8px" },
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "16px" },
    "lg": { "value": "24px" },
    "xl": { "value": "32px" },
    "2xl": { "value": "48px" },
    "3xl": { "value": "64px" }
  },
  "typography": {
    "fontSize": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" },
      "5xl": { "value": "3rem" }
    }
  }
}
```

## 7. Sass 混入函数

```scss
// 响应式混入
@mixin responsive($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: 640px) { @content; }
  } @else if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == 'lg' {
    @media (min-width: 1024px) { @content; }
  } @else if $breakpoint == 'xl' {
    @media (min-width: 1280px) { @content; }
  }
}

// 按钮样式混入
@mixin button-variant($bg, $color) {
  background-color: $bg;
  color: $color;
  
  &:hover {
    background-color: darken($bg, 10%);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 卡片阴影混入
@mixin card-shadow($level: 'md') {
  @if $level == 'sm' {
    box-shadow: var(--shadow-sm);
  } @else if $level == 'md' {
    box-shadow: var(--shadow-md);
  } @else if $level == 'lg' {
    box-shadow: var(--shadow-lg);
  }
  
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-#{$level});
  }
}
```

## 8. 快速应用指南

### 步骤 1：引入设计令牌
```css
/* 在项目根CSS文件中引入 */
@import 'design-tokens.css';
```

### 步骤 2：设置基础样式
```css
/* reset.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-neutral-700);
  background: var(--color-neutral-000);
}
```

### 步骤 3：应用组件样式
```jsx
// React 组件示例
import styles from './Button.module.css';

const Button = ({ variant = 'primary', size = 'md', children }) => {
  return (
    <button className={`${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]}`}>
      {children}
    </button>
  );
};
```

### 步骤 4：实施响应式布局
```css
.section {
  padding: var(--space-8) var(--space-4);
}

@media (min-width: 768px) {
  .section {
    padding: var(--space-16) var(--space-8);
  }
}
```

### 步骤 5：添加交互动效
```css
.interactive-element {
  transition: all var(--duration-fast) var(--ease-out);
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### 项目集成清单

- [ ] 导入设计令牌文件
- [ ] 配置 CSS 变量
- [ ] 设置基础排版样式
- [ ] 实现栅格系统
- [ ] 创建基础组件（按钮、表单、卡片）
- [ ] 配置响应式断点
- [ ] 添加动画和过渡效果
- [ ] 测试跨浏览器兼容性
- [ ] 优化性能（CSS 压缩、关键 CSS 内联）
- [ ] 建立组件文档

### 性能优化建议

1. **CSS 优化**
   - 使用 CSS 变量减少重复
   - 合并相似选择器
   - 移除未使用的样式

2. **动画性能**
   - 优先使用 transform 和 opacity
   - 使用 will-change 谨慎
   - 避免同时动画多个属性

3. **加载优化**
   - 关键 CSS 内联
   - 非关键 CSS 异步加载
   - 使用 CSS 压缩

4. **图片优化**
   - 使用现代格式（WebP、AVIF）
   - 实施懒加载
   - 响应式图片策略

---

*South Pole 设计系统 v1.0 | 基于可持续发展理念的现代化设计语言*