'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = Grid;
exports.Flex = Flex;
exports.Stack = Stack;
const jsx_runtime_1 = require("react/jsx-runtime");
function Grid({ cols = 1, gap = 'md', responsive, children, className = '', as: Component = 'div' }) {
    const colsMap = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        6: 'grid-cols-6',
        12: 'grid-cols-12'
    };
    const gaps = {
        sm: 'gap-4', // 16px
        md: 'gap-8', // 32px - South Pole standard
        lg: 'gap-12', // 48px
        xl: 'gap-16' // 64px
    };
    // Build responsive classes
    let responsiveClasses = '';
    if (responsive) {
        if (responsive.sm)
            responsiveClasses += ` sm:${colsMap[responsive.sm]}`;
        if (responsive.md)
            responsiveClasses += ` md:${colsMap[responsive.md]}`;
        if (responsive.lg)
            responsiveClasses += ` lg:${colsMap[responsive.lg]}`;
        if (responsive.xl)
            responsiveClasses += ` xl:${colsMap[responsive.xl]}`;
    }
    const gridClasses = `
    grid
    ${colsMap[cols]}
    ${gaps[gap]}
    ${responsiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
    return ((0, jsx_runtime_1.jsx)(Component, { className: gridClasses, children: children }));
}
function Flex({ direction = 'row', align = 'start', justify = 'start', gap = 'md', wrap = false, children, className = '', as: Component = 'div' }) {
    const directions = {
        row: 'flex-row',
        col: 'flex-col'
    };
    const alignments = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    };
    const justifications = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
    };
    const gaps = {
        sm: 'gap-4',
        md: 'gap-8',
        lg: 'gap-12',
        xl: 'gap-16'
    };
    const flexClasses = `
    flex
    ${directions[direction]}
    ${alignments[align]}
    ${justifications[justify]}
    ${gaps[gap]}
    ${wrap ? 'flex-wrap' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
    return ((0, jsx_runtime_1.jsx)(Component, { className: flexClasses, children: children }));
}
function Stack({ space = 'md', align = 'start', children, className = '', as: Component = 'div' }) {
    return ((0, jsx_runtime_1.jsx)(Flex, { direction: "col", align: align, gap: space, className: className, as: Component, children: children }));
}
