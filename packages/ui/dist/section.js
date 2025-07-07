'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = Section;
const jsx_runtime_1 = require("react/jsx-runtime");
function Section({ spacing = 'lg', background = 'white', children, className = '', as: Component = 'section' }) {
    const spacings = {
        none: '',
        sm: 'py-12', // 48px vertical padding
        md: 'py-16', // 64px vertical padding
        lg: 'py-24', // 96px vertical padding - South Pole standard
        xl: 'py-32' // 128px vertical padding
    };
    const backgrounds = {
        white: 'bg-neutral-0',
        neutral: 'bg-neutral-50',
        primary: 'bg-primary text-neutral-0',
        secondary: 'bg-secondary-green text-neutral-0',
        gradient: 'bg-gradient-to-r from-primary to-secondary-green text-neutral-0'
    };
    const sectionClasses = `
    w-full
    ${spacings[spacing]}
    ${backgrounds[background]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
    return ((0, jsx_runtime_1.jsx)(Component, { className: sectionClasses, children: children }));
}
