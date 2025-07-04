'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const button_1 = require("./button");
const navItems = [
    {
        label: 'What we do',
        href: '#',
        children: [
            { label: 'Climate Action', href: '/climate-action', description: 'Solutions for net zero' },
            { label: 'Climate Finance', href: '/climate-finance', description: 'Investment solutions' },
            { label: 'Renewable Energy', href: '/renewable-energy', description: 'Clean energy projects' },
            { label: 'Nature-Based Solutions', href: '/nature-based', description: 'Natural climate solutions' },
        ]
    },
    {
        label: 'Who we serve',
        href: '#',
        children: [
            { label: 'Corporations', href: '/corporations', description: 'Enterprise solutions' },
            { label: 'Governments', href: '/governments', description: 'Public sector support' },
            { label: 'Financial Institutions', href: '/financial', description: 'Investment partners' },
        ]
    },
    { label: 'Our work', href: '/work' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
];
function Header() {
    const [isSticky, setIsSticky] = (0, react_1.useState)(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const [openMegaMenu, setOpenMegaMenu] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.header, { className: "fixed top-0 left-0 right-0 z-50", initial: { y: 0 }, animate: {
            backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: isSticky ? 'blur(10px)' : 'blur(0px)',
            boxShadow: isSticky ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)'
        }, transition: { duration: 0.3, ease: 'easeInOut' }, children: [(0, jsx_runtime_1.jsx)("div", { className: `border-b border-gray/20 ${isSticky ? 'hidden' : 'block'}`, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-12 items-center justify-between text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "/contact", className: "text-gray hover:text-primary transition-colors", children: "Contact" }), (0, jsx_runtime_1.jsx)("a", { href: "/locations", className: "text-gray hover:text-primary transition-colors", children: "Locations" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-6 ml-auto", children: (0, jsx_runtime_1.jsxs)("select", { className: "bg-transparent text-gray text-sm", children: [(0, jsx_runtime_1.jsx)("option", { children: "EN" }), (0, jsx_runtime_1.jsx)("option", { children: "DE" }), (0, jsx_runtime_1.jsx)("option", { children: "FR" })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("nav", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-between transition-all duration-300 ${isSticky ? 'h-16' : 'h-20'}`, children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-primary", children: "South Pole" }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden lg:flex lg:items-center lg:space-x-8", children: navItems.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative", onMouseEnter: () => item.children && setOpenMegaMenu(item.label), onMouseLeave: () => setOpenMegaMenu(null), children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: "text-dark hover:text-primary transition-colors font-medium", children: item.label }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && openMegaMenu === item.label && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "absolute left-0 top-full mt-2 w-screen max-w-md rounded-lg bg-white p-6 shadow-xl", initial: { opacity: 0, y: -10, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.95 }, transition: { duration: 0.2, ease: 'easeOut' }, children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: item.children.map((child, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "block rounded-lg p-3 hover:bg-light transition-colors", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.05, duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium text-dark", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 text-sm text-gray", children: child.description }))] }, child.label))) }) })) })] }, item.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "md", children: "Get started" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "lg:hidden p-2 rounded-lg hover:bg-gray/10 transition-colors", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: isMobileMenuOpen ? "open" : "closed", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.path, { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, variants: {
                                                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                                open: { d: "M6 18L18 6M6 6l12 12" }
                                            } }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isMobileMenuOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "lg:hidden border-t border-gray/20 bg-white", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: 'easeInOut' }, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-4 space-y-2 overflow-hidden", children: navItems.map((item, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: "block py-2 text-dark hover:text-primary font-medium", children: item.label }), item.children && ((0, jsx_runtime_1.jsx)("div", { className: "ml-4 space-y-1", children: item.children.map((child, childIndex) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.a, { href: child.href, className: "block py-1 text-sm text-gray hover:text-primary", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: (index * 0.1) + (childIndex * 0.05), duration: 0.2 }, children: child.label }, child.label))) }))] }, item.label))) }) })) })] }));
}
