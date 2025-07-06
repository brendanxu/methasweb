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
        label: 'About us',
        href: '/about',
        children: [
            { label: 'Our story', href: '/about/story', description: 'How South Pole became a climate leader' },
            { label: 'Leadership team', href: '/about/leadership', description: 'Meet our executive team and board' },
            { label: 'Mission & values', href: '/about/mission', description: 'Our purpose and core principles' },
            { label: 'Locations', href: '/about/locations', description: 'Our global offices and presence' },
        ]
    },
    {
        label: 'What we do',
        href: '/services',
        children: [
            { label: 'Services', href: '/services', description: 'Complete climate action solutions' },
            { label: 'Solutions', href: '/services/solutions', description: 'Tailored climate strategies' },
            { label: 'Industries', href: '/services/industries', description: 'Sector-specific expertise' },
            { label: 'Approach', href: '/services/approach', description: 'Our methodology and process' },
        ]
    },
    {
        label: 'Our impact',
        href: '/impact',
        children: [
            { label: 'Case studies', href: '/impact/case-studies', description: 'Real-world climate projects' },
            { label: 'Sustainability reports', href: '/impact/reports', description: 'Annual impact assessments' },
            { label: 'Client success', href: '/impact/success-stories', description: 'Customer transformation stories' },
            { label: 'Metrics', href: '/impact/metrics', description: 'Measurable climate outcomes' },
        ]
    },
    {
        label: 'News & insights',
        href: '/news',
        children: [
            { label: 'Latest news', href: '/news', description: 'Company announcements and updates' },
            { label: 'Blog', href: '/news/blog', description: 'Expert insights and analysis' },
            { label: 'Resources', href: '/news/resources', description: 'Reports, guides, and tools' },
            { label: 'Events', href: '/news/events', description: 'Conferences and webinars' },
        ]
    },
];
function Header() {
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const [openMegaMenu, setOpenMegaMenu] = (0, react_1.useState)(null);
    const [mobileOpenSubmenu, setMobileOpenSubmenu] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // 设置初始状态
        setIsScrolled(window.scrollY > 50);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.header, { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`, initial: { backgroundColor: 'transparent' }, animate: {
            backgroundColor: isScrolled ? '#ffffff' : 'transparent',
            boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)'
        }, transition: { duration: 0.3, ease: 'easeInOut' }, children: [(0, jsx_runtime_1.jsx)("div", { className: `border-b border-white/20 ${isScrolled ? 'hidden' : 'block'}`, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-12 items-center justify-between text-body-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "/contact", className: `transition-colors text-body-sm ${isScrolled ? 'text-gray-600 hover:text-primary-600' : 'text-white/80 hover:text-white'}`, children: "Contact" }), (0, jsx_runtime_1.jsx)("a", { href: "/locations", className: `transition-colors text-body-sm ${isScrolled ? 'text-gray-600 hover:text-primary-600' : 'text-white/80 hover:text-white'}`, children: "Locations" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-6 ml-auto", children: (0, jsx_runtime_1.jsxs)("select", { className: `bg-transparent text-body-sm ${isScrolled ? 'text-gray-600' : 'text-white/80'}`, children: [(0, jsx_runtime_1.jsx)("option", { children: "EN" }), (0, jsx_runtime_1.jsx)("option", { children: "DE" }), (0, jsx_runtime_1.jsx)("option", { children: "FR" })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("nav", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`, children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: `text-heading-lg font-semibold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`, children: "South Pole" }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden lg:flex lg:items-center lg:space-x-8", children: navItems.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative", onMouseEnter: () => item.children && setOpenMegaMenu(item.label), onMouseLeave: () => setOpenMegaMenu(null), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: `transition-colors font-medium text-body-md ${isScrolled
                                                    ? 'text-gray-700 hover:text-gray-900'
                                                    : 'text-white/90 hover:text-white'}`, children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: `h-4 w-4 transition-all duration-200 ${isScrolled ? 'text-gray-500' : 'text-white/70'}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: openMegaMenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && openMegaMenu === item.label && ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "absolute left-1/2 transform -translate-x-1/2 top-full mt-3 w-80 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden", initial: { opacity: 0, y: -15, scale: 0.92 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -15, scale: 0.92 }, transition: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }, style: {
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-gray-50 px-6 py-4 border-b border-gray-100", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-gray-900 text-body-sm uppercase tracking-wider", children: item.label }) }), (0, jsx_runtime_1.jsx)("div", { className: "py-2", children: item.children.map((child, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "group flex items-start px-6 py-3 hover:bg-gray-50 transition-all duration-200", initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.08, duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium text-gray-900 group-hover:text-primary-600 transition-colors text-body-sm", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 text-body-xs text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed", children: child.description }))] }), (0, jsx_runtime_1.jsx)("svg", { className: "h-4 w-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 ml-3 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }, child.label))) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-50 px-6 py-3 border-t border-gray-100", children: (0, jsx_runtime_1.jsxs)("a", { href: item.href, className: "text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center", children: ["View all ", item.label.toLowerCase(), (0, jsx_runtime_1.jsx)("svg", { className: "h-3 w-3 ml-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }) })] })) })] }, item.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "md", children: "Get started" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: `lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-white hover:bg-white/10'}`, onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: isMobileMenuOpen ? "open" : "closed", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.path, { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, variants: {
                                                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                                open: { d: "M6 18L18 6M6 6l12 12" }
                                            } }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isMobileMenuOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "lg:hidden border-t border-gray-200 bg-white", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: 'easeInOut' }, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-4 space-y-2 overflow-hidden", children: navItems.map((item, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between py-2", children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: "text-gray-900 hover:text-primary-600 font-medium flex-1 text-body-md", children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: () => setMobileOpenSubmenu(mobileOpenSubmenu === item.label ? null : item.label), className: "p-1 rounded hover:bg-gray-100 transition-colors", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-4 w-4 text-gray-500 transition-transform duration-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: mobileOpenSubmenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && mobileOpenSubmenu === item.label && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "ml-4 space-y-1 overflow-hidden", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: 'easeInOut' }, children: item.children.map((child, childIndex) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "block py-2 px-3 text-body-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: childIndex * 0.05, duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "text-body-xs text-gray-500 mt-1", children: child.description }))] }, child.label))) })) })] }, item.label))) }) })) })] }));
}
