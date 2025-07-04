"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
const footerLinks = {
    solutions: {
        title: 'Solutions',
        links: [
            { label: 'Climate Action', href: '/climate-action' },
            { label: 'Climate Finance', href: '/climate-finance' },
            { label: 'Renewable Energy', href: '/renewable-energy' },
            { label: 'Nature-Based Solutions', href: '/nature-based' },
            { label: 'Carbon Credits', href: '/carbon-credits' },
        ]
    },
    company: {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Our Work', href: '/work' },
            { label: 'Careers', href: 'https://careers.southpole.com' },
            { label: 'Press', href: '/press' },
            { label: 'Contact', href: '/contact' },
        ]
    },
    resources: {
        title: 'Resources',
        links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Reports', href: '/reports' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Webinars', href: '/webinars' },
            { label: 'FAQ', href: '/faq' },
        ]
    },
    legal: {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'Disclaimer', href: '/disclaimer' },
        ]
    }
};
const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/south-pole', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://twitter.com/southpole', icon: 'twitter' },
    { name: 'YouTube', href: 'https://youtube.com/southpole', icon: 'youtube' },
];
function Footer() {
    return ((0, jsx_runtime_1.jsx)("footer", { className: "bg-dark text-white", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-1", children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "text-2xl font-bold", children: "South Pole" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-sm text-gray", children: "Leading the way in climate action and sustainability solutions." }), (0, jsx_runtime_1.jsx)("div", { className: "mt-6 flex space-x-4", children: socialLinks.map((social) => ((0, jsx_runtime_1.jsxs)("a", { href: social.href, className: "text-gray hover:text-white transition-colors", target: "_blank", rel: "noopener noreferrer", children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: social.name }), (0, jsx_runtime_1.jsx)("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" }) })] }, social.name))) })] }), Object.entries(footerLinks).map(([key, section]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-semibold tracking-wider uppercase", children: section.title }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-4 space-y-2", children: section.links.map((link) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: link.href, className: "text-sm text-gray hover:text-white transition-colors", children: link.label }) }, link.label))) })] }, key)))] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-12 border-t border-gray/20 pt-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray", children: ["\u00A9 ", new Date().getFullYear(), " South Pole. All rights reserved."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap justify-center md:justify-end space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "/sitemap", className: "text-sm text-gray hover:text-white", children: "Sitemap" }), (0, jsx_runtime_1.jsx)("a", { href: "/accessibility", className: "text-sm text-gray hover:text-white", children: "Accessibility" })] })] }) })] }) }));
}
