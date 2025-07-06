/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // South Pole 主色调系统 - 更现代的蓝绿色调
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // 主要的蓝绿色
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
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
        // 文字颜色 - South Pole风格
        text: {
          primary: '#1e293b',    // 深炭灰色用于标题
          secondary: '#475569',  // 中灰色用于正文
          muted: '#94a3b8',     // 浅灰色用于辅助文字
          inverse: '#ffffff',   // 白色用于反色文字
        },
        // 背景色 - South Pole风格
        background: {
          primary: '#ffffff',    // 主背景
          secondary: '#fafafa',  // 浅灰背景
          muted: '#f5f5f5',     // 柔和背景
          accent: '#f0fdfa',    // 淡蓝绿背景
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
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
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