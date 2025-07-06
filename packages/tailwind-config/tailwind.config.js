/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // South Pole 精确色彩系统 (#0066CC 主蓝色)
        primary: {
          50: '#e6f2ff',
          100: '#ccddff',
          200: '#99bbff',
          300: '#6699ff',
          400: '#3377ff',
          500: '#0066CC', // South Pole 主蓝色 
          600: '#0052A3', // 深蓝色
          700: '#004080',
          800: '#002d5c',
          900: '#001a38',
        },
        // 辅助色系
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // South Pole 成功色系统 (#00A651 绿色)
        success: {
          50: '#e6fff0',
          100: '#ccfae1',
          200: '#99f5c3',
          300: '#66f0a5',
          400: '#33eb87',
          500: '#00A651', // South Pole 绿色
          600: '#008a44',
          700: '#006e37',
          800: '#00522a',
          900: '#00361d',
        },
        // South Pole 强调色系统 (#FF6B35 橙红色)
        accent: {
          50: '#fff4f0',
          100: '#ffe9e1',
          200: '#ffd3c3',
          300: '#ffbda5',
          400: '#ffa787',
          500: '#FF6B35', // South Pole 橙红色
          600: '#e55a2b',
          700: '#cc4921',
          800: '#b23817',
          900: '#99270d',
        },
        // South Pole 文字颜色系统
        text: {
          primary: '#1A1A1A',    // South Pole 黑色
          secondary: '#666666',  // South Pole 灰色
          muted: '#999999',     // 浅灰色用于辅助文字
          inverse: '#ffffff',   // 白色用于反色文字
        },
        // South Pole 背景色系统
        background: {
          primary: '#ffffff',    // 主背景
          secondary: '#F5F5F5',  // South Pole 浅灰背景
          muted: '#f8f9fa',     // 更柔和的背景
          dark: '#1A1A1A',      // 深色背景
        },
      },
      fontFamily: {
        // 参考 MioTech 字体系统
        sans: [
          'Ubuntu', 
          'Roboto', 
          'Source Han Sans CN', 
          'PingFang SC', 
          'Microsoft YaHei', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        // South Pole 字体系统 - 精确匹配官网规格
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
        // South Pole 8px 基础间距系统
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
        'md': '0.75rem',      // 12px
        'lg': '1rem',         // 16px
        'xl': '1.5rem',       // 24px
        '2xl': '2rem',        // 32px
        'full': '3.125rem',   // 50px - South Pole 按钮圆角
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}