'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// Language state management - matches the header approach
const useLanguageState = () => {
    const [language, setLanguage] = (0, react_1.useState)('zh-CN');
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('preferred-language');
            if (saved)
                setLanguage(saved);
            // Listen for language changes from other components
            const handleLanguageChange = (event) => {
                setLanguage(event.detail);
            };
            window.addEventListener('languageChange', handleLanguageChange);
            return () => window.removeEventListener('languageChange', handleLanguageChange);
        }
    }, []);
    return { language };
};
// Footer translations
const footerTranslations = {
    'zh-CN': {
        brandName: '碳智METHAS',
        followUs: '关注我们随时收到最新讯息',
        subscribeEmail: '请输入邮箱',
        subscribe: '订阅',
        mediaContact: '媒体联络',
        privacyPolicy: '隐私政策',
        termsOfService: '使用条款',
        siteMap: '网站地图',
        allRightsReserved: '保留所有权利',
        chooseMioTech: '选择碳智METHAS',
        sustainableBenefit: '可持续共益',
        carbonResearchInstitute: '碳智研究院',
        newsMedia: '新闻与媒体',
        joinUs: '加入我们',
        esgReport: 'ESG报告',
        industries: '行业',
        solutions: '解决方案',
        carbonAssets: '碳资产',
        data: '数据',
        digitalSolutions: '数字化解决方案',
        consulting: '咨询',
        carbonAssetManagement: '碳资产管理',
        carbonCreditTool: '碳智METHAS碳信用服务工具'
    },
    'en': {
        brandName: 'METHAS',
        followUs: 'Follow us to get the latest updates',
        subscribeEmail: 'Enter your email',
        subscribe: 'Subscribe',
        mediaContact: 'Media Contact',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        siteMap: 'Site Map',
        allRightsReserved: 'All rights reserved',
        chooseMioTech: 'Choose METHAS',
        sustainableBenefit: 'Sustainable Benefit',
        carbonResearchInstitute: 'Carbon Research Institute',
        newsMedia: 'News & Media',
        joinUs: 'Join Us',
        esgReport: 'ESG Report',
        industries: 'Industries',
        solutions: 'Solutions',
        carbonAssets: 'Carbon Assets',
        data: 'Data',
        digitalSolutions: 'Digital Solutions',
        consulting: 'Consulting',
        carbonAssetManagement: 'Carbon Asset Management',
        carbonCreditTool: 'METHAS Carbon Credit Service Tool'
    },
    'de': {
        brandName: 'METHAS',
        followUs: 'Folgen Sie uns für die neuesten Updates',
        subscribeEmail: 'E-Mail eingeben',
        subscribe: 'Abonnieren',
        mediaContact: 'Medienkontakt',
        privacyPolicy: 'Datenschutz',
        termsOfService: 'Nutzungsbedingungen',
        siteMap: 'Sitemap',
        allRightsReserved: 'Alle Rechte vorbehalten',
        chooseMioTech: 'METHAS wählen',
        sustainableBenefit: 'Nachhaltiger Nutzen',
        carbonResearchInstitute: 'Kohlenstoff-Forschungsinstitut',
        newsMedia: 'News & Medien',
        joinUs: 'Mitmachen',
        esgReport: 'ESG-Bericht',
        industries: 'Branchen',
        solutions: 'Lösungen',
        carbonAssets: 'Kohlenstoff-Assets',
        data: 'Daten',
        digitalSolutions: 'Digitale Lösungen',
        consulting: 'Beratung',
        carbonAssetManagement: 'Kohlenstoff-Asset-Management',
        carbonCreditTool: 'METHAS Kohlenstoff-Kredit-Service-Tool'
    },
    'fr': {
        brandName: 'METHAS',
        followUs: 'Suivez-nous pour recevoir les dernières mises à jour',
        subscribeEmail: 'Entrez votre email',
        subscribe: 'S\'abonner',
        mediaContact: 'Contact média',
        privacyPolicy: 'Politique de confidentialité',
        termsOfService: 'Conditions d\'utilisation',
        siteMap: 'Plan du site',
        allRightsReserved: 'Tous droits réservés',
        chooseMioTech: 'Choisir METHAS',
        sustainableBenefit: 'Bénéfice durable',
        carbonResearchInstitute: 'Institut de recherche carbone',
        newsMedia: 'Actualités & Médias',
        joinUs: 'Rejoignez-nous',
        esgReport: 'Rapport ESG',
        industries: 'Industries',
        solutions: 'Solutions',
        carbonAssets: 'Actifs carbone',
        data: 'Données',
        digitalSolutions: 'Solutions numériques',
        consulting: 'Conseil',
        carbonAssetManagement: 'Gestion d\'actifs carbone',
        carbonCreditTool: 'Outil de service de crédit carbone METHAS'
    }
};
// Dynamic footer navigation based on language
const getFooterNavigation = (language) => {
    const t = footerTranslations[language];
    return {
        chooseMioTech: {
            title: t.chooseMioTech,
            links: [
                { label: t.sustainableBenefit, href: '#' },
                { label: t.carbonResearchInstitute, href: '#' },
                { label: t.newsMedia, href: '#' },
                { label: t.joinUs, href: '#' },
                { label: t.esgReport, href: '#' },
            ]
        },
        industries: {
            title: t.industries,
            links: [
                { label: language === 'zh-CN' ? '工业、传统能源与制造业' : 'Industrial, Traditional Energy & Manufacturing', href: '#' },
                { label: language === 'zh-CN' ? '新能源' : 'Renewable Energy', href: '#' },
                { label: language === 'zh-CN' ? '金融' : 'Finance', href: '#' },
                { label: language === 'zh-CN' ? '商业地产与酒店' : 'Commercial Real Estate & Hospitality', href: '#' },
                { label: language === 'zh-CN' ? '消费品与零售' : 'Consumer Goods & Retail', href: '#' },
                { label: language === 'zh-CN' ? '科技与互联网' : 'Technology & Internet', href: '#' },
                { label: language === 'zh-CN' ? '国有企业' : 'State-Owned Enterprises', href: '#' },
                { label: language === 'zh-CN' ? '碳资产开发' : 'Carbon Asset Development', href: '#' },
                { label: language === 'zh-CN' ? '其它' : 'Others', href: '#' },
            ]
        },
        solutions: {
            title: t.solutions,
            links: [
                { label: t.data, href: '#' },
                { label: t.digitalSolutions, href: '#' },
                { label: t.consulting, href: '#' },
            ]
        },
        carbonAssets: {
            title: t.carbonAssets,
            links: [
                { label: t.carbonAssetManagement, href: '#' },
                { label: t.carbonCreditTool, href: '#' },
            ]
        }
    };
};
function Footer() {
    const { language } = useLanguageState();
    const [email, setEmail] = (0, react_1.useState)('');
    const t = footerTranslations[language];
    const footerNavigation = getFooterNavigation(language);
    const handleSubscribe = (e) => {
        e.preventDefault();
        // TODO: 二期开发具体的邮箱订阅功能
        console.log('Subscribe email:', email);
        setEmail('');
    };
    return ((0, jsx_runtime_1.jsxs)("footer", { className: "bg-neutral-50 text-neutral-900 relative overflow-hidden border-t border-neutral-200", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative z-10", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-7", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-heading-lg font-semibold text-neutral-900", children: t.brandName }) }), (0, jsx_runtime_1.jsx)("p", { className: "mb-6 text-neutral-600 text-body-lg", children: t.followUs }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8 bg-white rounded-xl p-6 border border-neutral-200 shadow-md", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-body-lg font-semibold mb-3 text-neutral-900", children: "Newsletter" }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-600 text-body-sm mb-4", children: t.followUs }), (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubscribe, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: t.subscribeEmail, className: "flex-1 px-4 py-3 bg-neutral-50 text-neutral-900 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-body-sm transition-all duration-normal", required: true }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-500 text-white font-medium rounded-lg hover:from-primary-800 hover:to-primary-600 transition-all duration-normal text-body-sm shadow-md hover:shadow-lg hover:-translate-y-0.5", children: t.subscribe })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-8", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-body-lg font-semibold mb-3 text-neutral-900", children: t.mediaContact }), (0, jsx_runtime_1.jsx)("a", { href: "mailto:pr@miotech.com", className: "text-primary-600 hover:text-primary-700 transition-colors duration-normal text-body-md", children: "pr@miotech.com" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-normal shadow-sm hover:shadow-md hover:-translate-y-0.5", "aria-label": "LinkedIn", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-neutral-600", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }) }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-success hover:text-white transition-all duration-normal shadow-sm hover:shadow-md hover:-translate-y-0.5", "aria-label": "\u5FAE\u4FE1", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-neutral-600", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.044c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .134-.55c1.516-1.125 2.472-2.865 2.472-4.8 0-3.394-2.904-6.151-6.988-6.151zm-2.530 3.274c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982zm5.061 0c.535 0 .969.44.969.982 0 .542-.434.982-.969.982s-.969-.44-.969-.982c0-.542.434-.982.969-.982z" }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8", children: Object.entries(footerNavigation).map(([key, section]) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-body-lg font-semibold text-neutral-900 mb-4", children: section.title }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: section.links.map((link, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: link.href, className: "text-neutral-600 hover:text-primary-600 transition-colors duration-normal text-body-sm leading-relaxed", children: link.label }) }, index))) })] }, key))) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1 flex justify-center lg:justify-end", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-32 h-32 bg-gradient-to-br from-primary-600 to-primary-400 rounded-full flex items-center justify-center opacity-90 shadow-lg", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-16 h-16 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-2 -right-2 w-4 h-4 bg-accent-amber rounded-full animate-pulse shadow-sm" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-1 -left-1 w-3 h-3 bg-success rounded-full animate-pulse delay-500 shadow-sm" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-1/2 -right-4 w-2 h-2 bg-accent-blue rounded-full animate-pulse delay-1000 shadow-sm" })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "border-t border-neutral-300", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-neutral-500 text-body-sm", children: ["\u00A9 ", new Date().getFullYear(), " ", t.brandName, ". ", t.allRightsReserved, "."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-neutral-500 hover:text-primary-600 text-body-sm transition-colors duration-normal", children: t.privacyPolicy }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-neutral-500 hover:text-primary-600 text-body-sm transition-colors duration-normal", children: t.termsOfService }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-neutral-500 hover:text-primary-600 text-body-sm transition-colors duration-normal", children: t.siteMap })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-5", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", style: {
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2315803d' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    } }) })] }));
}
