'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = Container;
const jsx_runtime_1 = require("react/jsx-runtime");
function Container({ size = 'xl', padding = 'md', children, className = '', as: Component = 'div' }) {
    const sizes = {
        sm: 'max-w-2xl', // 672px
        md: 'max-w-4xl', // 896px
        lg: 'max-w-6xl', // 1152px
        xl: 'max-w-7xl', // 1280px - South Pole standard
        full: 'max-w-full'
    };
    const paddings = {
        none: '',
        sm: 'px-4',
        md: 'px-4 sm:px-6 lg:px-8', // Standard responsive padding
        lg: 'px-6 sm:px-8 lg:px-12'
    };
    const containerClasses = `
    w-full mx-auto
    ${sizes[size]}
    ${paddings[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
    return ((0, jsx_runtime_1.jsx)(Component, { className: containerClasses, children: children }));
}
