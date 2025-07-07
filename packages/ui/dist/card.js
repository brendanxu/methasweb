'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
function Card({ imageUrl, category, title, description, href }) {
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: href, className: "group block overflow-hidden rounded-md bg-neutral-0 shadow-sm hover:shadow-lg transition-shadow duration-normal", whileHover: {
            y: -4
        }, whileTap: { scale: 0.98 }, transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1]
        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-48 overflow-hidden bg-neutral-100", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { src: imageUrl, alt: title, className: "h-full w-full object-cover", whileHover: { scale: 1.05 }, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } }), category && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: "absolute top-4 left-4 inline-block rounded bg-secondary-green px-3 py-1 text-xs font-medium text-neutral-0", initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.2 }, children: category }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.h3, { className: "mb-2 text-xl font-semibold text-neutral-800 line-clamp-2 group-hover:text-primary transition-colors duration-fast", whileHover: { x: 2 }, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }, children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-600 line-clamp-3 text-sm leading-relaxed", children: description })] })] }));
}
