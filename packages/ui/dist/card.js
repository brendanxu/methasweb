'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
function Card({ imageUrl, category, title, description, href, className = '' }) {
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: href, className: `group block overflow-hidden rounded-xl bg-white border border-neutral-200 transition-all duration-normal relative ${className}`, whileHover: {
            y: -4,
            boxShadow: '0 10px 40px rgba(10, 61, 46, 0.08)',
        }, whileTap: { scale: 0.98 }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
        }, style: {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-700 to-primary-500", initial: { scaleX: 0 }, whileHover: { scaleX: 1 }, transition: { duration: 0.3 } }), (0, jsx_runtime_1.jsxs)("div", { className: "relative h-48 overflow-hidden bg-neutral-100", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { src: imageUrl, alt: title, className: "h-full w-full object-cover", whileHover: { scale: 1.05 }, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } }), category && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: "absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.2 }, children: category }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.h3, { className: "mb-3 text-xl font-semibold text-neutral-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-normal", whileHover: { x: 2 }, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }, children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-600 line-clamp-3 text-sm leading-relaxed", children: description }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "mt-4 flex items-center text-primary-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-normal", initial: { x: -10 }, whileHover: { x: 0 }, children: ["\u4E86\u89E3\u66F4\u591A", (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "ml-1 w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", whileHover: { x: 2 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] })] })] }));
}
