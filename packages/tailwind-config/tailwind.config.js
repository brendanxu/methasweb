/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0057FF',
        secondary: '#00B5A1',
        dark: '#0F172A',
        light: '#F8FAFC',
        gray: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        lead: ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
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