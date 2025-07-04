'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// MioTech style footer navigation data
const footerNavigation = {
    chooseMioTech: {
        title: '选择妙盈',
        links: [
            { label: '可持续共益', href: '#' },
            { label: '妙盈研究院', href: '#' },
            { label: '新闻与媒体', href: '#' },
            { label: '加入我们', href: '#' },
            { label: 'ESG报告', href: '#' },
        ]
    },
    industries: {
        title: '行业',
        links: [
            { label: '工业、传统能源与制造业', href: '#' },
            { label: '新能源', href: '#' },
            { label: '金融', href: '#' },
            { label: '商业地产与酒店', href: '#' },
            { label: '消费品与零售', href: '#' },
            { label: '科技与互联网', href: '#' },
            { label: '国有企业', href: '#' },
            { label: '碳资产开发', href: '#' },
            { label: '其它', href: '#' },
        ]
    },
    solutions: {
        title: '解决方案',
        links: [
            { label: '数据', href: '#' },
            { label: '数字化解决方案', href: '#' },
            { label: '咨询', href: '#' },
        ]
    },
    carbonAssets: {
        title: '碳资产',
        links: [
            { label: '碳资产管理', href: '#' },
            { label: '妙盈碳信用服务工具', href: '#' },
        ]
    }
};
function Footer() {
    const [email, setEmail] = (0, react_1.useState)('');
    const handleSubscribe = (e) => {
        e.preventDefault();
        // TODO: 二期开发具体的邮箱订阅功能
        console.log('Subscribe email:', email);
        setEmail('');
    };
    return ((0, jsx_runtime_1.jsxs)("footer", { className: "bg-[#1a1f2e] text-white relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative z-10", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-7", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-white", children: "\u5999\u76C8" }) }), (0, jsx_runtime_1.jsx)("p", { className: "mb-6 text-gray-300 text-lg", children: "\u5173\u6CE8\u6211\u4EEC\u968F\u65F6\u6536\u5230\u6700\u65B0\u8BAF\u606F" }), (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubscribe, className: "mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1", className: "flex-1 px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none", required: true }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200", children: "\u8BA2\u9605" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-semibold mb-3", children: "\u5A92\u4F53\u8054\u7EDC" }), (0, jsx_runtime_1.jsx)("a", { href: "mailto:pr@miotech.com", className: "text-blue-400 hover:text-blue-300 transition-colors duration-200", children: "pr@miotech.com" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center hover:bg-[#005582] transition-colors duration-200", "aria-label": "LinkedIn", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "w-10 h-10 bg-[#07c160] rounded-lg flex items-center justify-center hover:bg-[#06a850] transition-colors duration-200", "aria-label": "\u5FAE\u4FE1", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.044c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .134-.55c1.516-1.125 2.472-2.865 2.472-4.8 0-3.394-2.904-6.151-6.988-6.151zm-2.530 3.274c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982zm5.061 0c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982z" }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8", children: Object.entries(footerNavigation).map(([key, section]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-white mb-4", children: section.title }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: section.links.map((link, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: link.href, className: "text-gray-300 hover:text-white transition-colors duration-200 text-sm leading-relaxed", children: link.label }) }, index))) })] }, key))) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1 flex justify-center lg:justify-end", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center opacity-80", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-16 h-16 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-500" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-1000" })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-700", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-gray-400 text-sm", children: ["\u00A9 ", new Date().getFullYear(), " \u5999\u76C8\u79D1\u6280. \u4FDD\u7559\u6240\u6709\u6743\u5229."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-gray-400 hover:text-white text-sm transition-colors duration-200", children: "\u9690\u79C1\u653F\u7B56" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-gray-400 hover:text-white text-sm transition-colors duration-200", children: "\u4F7F\u7528\u6761\u6B3E" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-gray-400 hover:text-white text-sm transition-colors duration-200", children: "\u7F51\u7AD9\u5730\u56FE" })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-5", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", style: {
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    } }) })] }));
}
