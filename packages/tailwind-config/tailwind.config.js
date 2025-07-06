/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // South Pole 主色调系统
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#002145', // South Pole 深海军蓝
          900: '#0c2340',
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
        // 成功色（绿色环保主题）
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // 警告色
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // 文字颜色
        text: {
          primary: '#002145',    // 深海军蓝用于标题
          secondary: '#334155',  // 深灰色用于正文
          muted: '#64748b',     // 浅灰色用于辅助文字
          inverse: '#ffffff',   // 白色用于反色文字
        },
        // 背景色
        background: {
          primary: '#ffffff',    // 主背景
          secondary: '#f8fafc',  // 次要背景
          muted: '#f1f5f9',     // 柔和背景
          accent: '#0369a1',    // 强调背景
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
        // 参考 MioTech 的响应式字体尺寸
        'display-lg': ['3.25rem', { lineHeight: '1.2', fontWeight: '700' }],  // 52px
        'display-md': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],  // 36px
        'display-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],   // 24px
        'heading-xl': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],    // 32px
        'heading-lg': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],  // 28px
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],   // 24px
        'heading-sm': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],  // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],    // 18px
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],        // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],    // 14px
        'body-xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],     // 12px
        'button-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '700' }],
        'button-md': ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
        'button-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '700' }],
      },
      spacing: {
        unit: '0.25rem',
      },
      maxWidth: {
        '7xl': '1280px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
}