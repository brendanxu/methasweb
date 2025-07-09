/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 新设计系统 - 主色调
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a1ff',
          400: '#3382ff',
          500: '#0052CC', // 主要按钮、强调色 (原accent)
          600: '#0042a3',
          700: '#00327a',
          800: '#002352',
          900: '#002145', // 深海军蓝 - 品牌主色
          DEFAULT: '#002145',
          light: '#003366',
          accent: '#0052CC',
        },
        // 辅助色系
        secondary: {
          50: '#e6f5f0',
          100: '#ccebe1',
          200: '#99d7c3',
          300: '#66c3a5',
          400: '#33af87',
          500: '#00875A', // 环保绿
          600: '#006e48',
          700: '#005436',
          800: '#003a24',
          900: '#002112',
          green: '#00875A',
          teal: '#00B8A9',
          orange: '#FF8B00',
        },
        // 中性色系统
        neutral: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F4F5F7',
          200: '#EBECF0',
          300: '#DFE1E6',
          400: '#C1C7D0',
          500: '#A5ADBA',
          600: '#6B778C',
          700: '#505F79',
          800: '#253858',
          900: '#091E42',
        },
        // 语义色
        success: '#00875A',
        warning: '#FF8B00',
        error: '#DE350B',
        info: '#0065FF',
        // 文字颜色系统 - 使用中性色
        text: {
          primary: '#253858',    // neutral-800
          secondary: '#6B778C',  // neutral-600
          muted: '#A5ADBA',     // neutral-500
          inverse: '#FFFFFF',   // neutral-0
        },
        // 背景色系统 - 使用中性色
        background: {
          primary: '#FFFFFF',    // neutral-0
          secondary: '#FAFBFC',  // neutral-50
          muted: '#F4F5F7',     // neutral-100
          dark: '#091E42',      // neutral-900
        },
      },
      fontFamily: {
        // 新设计系统字体
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        mono: ['"SF Mono"', 'Monaco', 'Inconsolata', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        // 碳智METHAS 字体系统 - 精确匹配官网规格
        'hero-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],      // 72px - Hero大标题
        'hero-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],      // 56px - Hero标题
        'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],     // 48px - 大标题
        'display-md': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],  // 36px - 中标题
        'display-sm': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }], // 30px - 小标题
        'heading-xl': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],   // 24px - 页面标题
        'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],  // 20px - 节标题
        'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px - 子标题
        'heading-sm': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],     // 16px - 小标题
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],    // 18px - 大正文
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],        // 16px - 标准正文
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],    // 14px - 小正文
        'body-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],     // 12px - 超小正文
        'button-lg': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],      // 16px 按钮
        'button-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '600' }],  // 14px 按钮
        'button-sm': ['0.75rem', { lineHeight: '1.5', fontWeight: '600' }],   // 12px 按钮
      },
      spacing: {
        // 碳智METHAS 8px 基础间距系统
        'unit': '0.5rem',     // 8px 基础单位
        '0.5': '0.25rem',     // 4px
        '1': '0.5rem',        // 8px
        '1.5': '0.75rem',     // 12px
        '2': '1rem',          // 16px
        '2.5': '1.25rem',     // 20px
        '3': '1.5rem',        // 24px
        '4': '2rem',          // 32px
        '5': '2.5rem',        // 40px
        '6': '3rem',          // 48px
        '8': '4rem',          // 64px
        '10': '5rem',         // 80px
        '12': '6rem',         // 96px
        '16': '8rem',         // 128px
        '20': '10rem',        // 160px
        '24': '12rem',        // 192px
      },
      maxWidth: {
        '7xl': '1280px',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',      // 4px
        DEFAULT: '0.5rem',    // 8px
        'md': '0.5rem',       // 8px
        'lg': '0.75rem',      // 12px
        'xl': '1rem',         // 16px
        '2xl': '1.5rem',      // 24px
        'full': '9999px',     // 完全圆角
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'xl': '0 16px 32px rgba(0, 0, 0, 0.12)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      // 新增设计系统配置
      opacity: {
        'hover': '0.9',
        'disabled': '0.6',
        'overlay': '0.85',
        'backdrop': '0.5',
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      screens: {
        'xs': '480px',
        // 默认断点保持不变
      },
    },
  },
  plugins: [],
}