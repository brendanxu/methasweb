// 碳智METHAS 设计令牌系统 - TypeScript 导出
// 基于专业气候解决方案咨询的品牌识别
// 主品牌色
export const colors = {
    primary: {
        50: '#F0F7FF',
        100: '#E0EFFF',
        200: '#B3D9FF',
        300: '#80C3FF',
        400: '#4DADFF',
        500: '#0066CC',
        600: '#0052A3',
        700: '#003D7A',
        800: '#002952',
        900: '#001429',
    },
    green: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#00A651',
        600: '#008A44',
        700: '#006E37',
        800: '#00522A',
        900: '#00361C',
    },
    orange: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#FF6B35',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
    },
    gray: {
        50: '#FAFBFC',
        100: '#F4F5F7',
        200: '#E9ECEF',
        300: '#DEE2E6',
        400: '#CED4DA',
        500: '#ADB5BD',
        600: '#6C757D',
        700: '#495057',
        800: '#343A40',
        900: '#212529',
    },
    // 功能色
    success: '#00A651',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
};
// 字体配置
export const fonts = {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Playfair Display, Georgia, serif',
    mono: 'IBM Plex Mono, "SF Mono", Monaco, monospace',
};
// 字重
export const fontWeights = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
};
// 响应式字号
export const fontSizes = {
    xs: 'clamp(0.75rem, 2vw, 0.875rem)',
    sm: 'clamp(0.875rem, 2.5vw, 1rem)',
    base: 'clamp(1rem, 3vw, 1.125rem)',
    lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',
    xl: 'clamp(1.25rem, 4vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 5vw, 2rem)',
    '3xl': 'clamp(2rem, 6vw, 3rem)',
    '4xl': 'clamp(2.5rem, 8vw, 4rem)',
    '5xl': 'clamp(3rem, 10vw, 5rem)',
};
// 间距系统 - 8px基准
export const spacing = {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    32: '8rem', // 128px
};
// 边框半径
export const borderRadius = {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
};
// 阴影系统
export const shadows = {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.15)',
    '2xl': '0 24px 64px rgba(0, 0, 0, 0.2)',
};
// 过渡动画
export const transitions = {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};
// 缓动函数
export const easing = {
    'in-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    out: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
};
// 断点
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
// Z-index层级
export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
};
// 所有设计令牌的导出
export const designTokens = {
    colors,
    fonts,
    fontWeights,
    fontSizes,
    spacing,
    borderRadius,
    shadows,
    transitions,
    easing,
    breakpoints,
    zIndex,
};
// 默认导出
export default designTokens;
