'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const button_1 = require("./button");
/**
 * Professional Header Component
 *
 * Features:
 * - Southpole.com inspired blue theme design
 * - 4 main navigation items with mega menu dropdowns
 * - Multi-language support (zh-CN, en, de, fr)
 * - Scroll effects: height reduction from 80px to 60px
 * - Mobile bottom navigation bar
 * - Smooth animations and transitions
 *
 * Last updated: 2025-01-10
 * Fixed: Export issue resolved, component now properly exports via 'export function'
 */
// Simple language state management for header
const useLanguageState = () => {
    const [language, setLanguage] = (0, react_1.useState)('zh-CN');
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('preferred-language');
            if (saved)
                setLanguage(saved);
        }
    }, []);
    const updateLanguage = (lang) => {
        setLanguage(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-language', lang);
            // Dispatch custom event for other components to listen
            window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
        }
    };
    return { language, setLanguage: updateLanguage };
};
// Translation mappings for header
const headerTranslations = {
    'zh-CN': {
        brandName: '碳智METHAS',
        contact: '联系我们',
        locations: '办公地点',
        getStarted: '开始合作',
        aboutUs: '关于我们',
        whatWeDo: '我们的服务',
        ourImpact: '我们的影响',
        newsInsights: '新闻与洞察'
    },
    'en': {
        brandName: 'METHAS',
        contact: 'Contact',
        locations: 'Locations',
        getStarted: 'Get started',
        aboutUs: 'About us',
        whatWeDo: 'What we do',
        ourImpact: 'Our impact',
        newsInsights: 'News & insights'
    },
    'de': {
        brandName: 'METHAS',
        contact: 'Kontakt',
        locations: 'Standorte',
        getStarted: 'Loslegen',
        aboutUs: 'Über uns',
        whatWeDo: 'Was wir tun',
        ourImpact: 'Unsere Wirkung',
        newsInsights: 'News & Einblicke'
    },
    'fr': {
        brandName: 'METHAS',
        contact: 'Contact',
        locations: 'Emplacements',
        getStarted: 'Commencer',
        aboutUs: 'À propos',
        whatWeDo: 'Ce que nous faisons',
        ourImpact: 'Notre impact',
        newsInsights: 'Actualités et perspectives'
    }
};
const languageLabels = {
    'zh-CN': '中文',
    'en': 'EN',
    'de': 'DE',
    'fr': 'FR'
};
const getNavItems = (language) => {
    const navTranslations = {
        'zh-CN': {
            aboutUs: '关于我们',
            companyIntro: '公司介绍',
            companyIntroDesc: '了解碳智METHAS的使命与愿景',
            teamIntro: '团队介绍',
            teamIntroDesc: '认识我们的专业团队',
            development: '发展历程',
            developmentDesc: '碳智METHAS的成长故事',
            contactUs: '联系我们',
            contactUsDesc: '获取更多信息与合作机会',
            serviceTypes: '服务类别',
            carbonAccounting: '碳核算服务',
            carbonAccountingDesc: '专业的碳排放核算与验证',
            carbonTrading: '碳交易服务',
            carbonTradingDesc: '碳资产交易与管理咨询',
            carbonNeutral: '碳中和规划',
            carbonNeutralDesc: '量身定制的碳中和路径',
            esgConsulting: 'ESG咨询',
            esgConsultingDesc: '环境、社会和治理解决方案',
            solutions: '解决方案',
            corporateCarbon: '企业碳中和',
            corporateCarbonDesc: '全面的企业碳中和解决方案',
            supplyChain: '供应链脱碳',
            supplyChainDesc: '供应链碳管理与优化',
            greenFinance: '绿色金融',
            greenFinanceDesc: '碳金融产品与服务',
            carbonAssets: '碳资产管理',
            carbonAssetsDesc: '碳资产组合管理与优化',
            carbonInsights: '碳智观察',
            marketAnalysis: '市场分析',
            marketAnalysisDesc: '碳市场趋势与机会分析',
            policyInterpretation: '政策解读',
            policyInterpretationDesc: '最新政策动态与影响分析',
            industryReports: '行业报告',
            industryReportsDesc: '深度行业研究与洞察',
            expertViews: '专家观点',
            expertViewsDesc: '权威专家的观点与建议',
        },
        'en': {
            aboutUs: 'About us',
            companyIntro: 'Company Introduction',
            companyIntroDesc: 'Learn about METHAS mission and vision',
            teamIntro: 'Team Introduction',
            teamIntroDesc: 'Meet our professional team',
            development: 'Development History',
            developmentDesc: 'METHAS growth story',
            contactUs: 'Contact Us',
            contactUsDesc: 'Get more information and cooperation opportunities',
            serviceTypes: 'Service Types',
            carbonAccounting: 'Carbon Accounting',
            carbonAccountingDesc: 'Professional carbon emission accounting and verification',
            carbonTrading: 'Carbon Trading',
            carbonTradingDesc: 'Carbon asset trading and management consulting',
            carbonNeutral: 'Carbon Neutral Planning',
            carbonNeutralDesc: 'Customized carbon neutral pathways',
            esgConsulting: 'ESG Consulting',
            esgConsultingDesc: 'Environmental, social and governance solutions',
            solutions: 'Solutions',
            corporateCarbon: 'Corporate Carbon Neutrality',
            corporateCarbonDesc: 'Comprehensive corporate carbon neutrality solutions',
            supplyChain: 'Supply Chain Decarbonization',
            supplyChainDesc: 'Supply chain carbon management and optimization',
            greenFinance: 'Green Finance',
            greenFinanceDesc: 'Carbon finance products and services',
            carbonAssets: 'Carbon Asset Management',
            carbonAssetsDesc: 'Carbon asset portfolio management and optimization',
            carbonInsights: 'Carbon Insights',
            marketAnalysis: 'Market Analysis',
            marketAnalysisDesc: 'Carbon market trends and opportunity analysis',
            policyInterpretation: 'Policy Interpretation',
            policyInterpretationDesc: 'Latest policy dynamics and impact analysis',
            industryReports: 'Industry Reports',
            industryReportsDesc: 'In-depth industry research and insights',
            expertViews: 'Expert Views',
            expertViewsDesc: 'Authoritative expert opinions and recommendations',
        },
        'de': {
            aboutUs: 'Über uns',
            companyIntro: 'Unternehmensvorstellung',
            companyIntroDesc: 'Lernen Sie 碳智METHAS Mission und Vision kennen',
            teamIntro: 'Teamvorstellung',
            teamIntroDesc: 'Lernen Sie unser professionelles Team kennen',
            development: 'Entwicklungsgeschichte',
            developmentDesc: 'Die Wachstumsgeschichte von 碳智METHAS',
            contactUs: 'Kontakt',
            contactUsDesc: 'Holen Sie sich weitere Informationen und Kooperationsmöglichkeiten',
            serviceTypes: 'Dienstleistungstypen',
            carbonAccounting: 'Kohlenstoffbilanzierung',
            carbonAccountingDesc: 'Professionelle Kohlenstoffemissionsbilanzierung und -verifizierung',
            carbonTrading: 'Kohlenstoffhandel',
            carbonTradingDesc: 'Kohlenstoffasset-Handel und Management-Beratung',
            carbonNeutral: 'Kohlenstoffneutrale Planung',
            carbonNeutralDesc: 'Maßgeschneiderte kohlenstoffneutrale Wege',
            esgConsulting: 'ESG-Beratung',
            esgConsultingDesc: 'Umwelt-, Sozial- und Governance-Lösungen',
            solutions: 'Lösungen',
            corporateCarbon: 'Unternehmenskohlenstoffneutralität',
            corporateCarbonDesc: 'Umfassende Unternehmenskohlenstoffneutralitätslösungen',
            supplyChain: 'Lieferkettendekarbonisierung',
            supplyChainDesc: 'Lieferketten-Kohlenstoffmanagement und -optimierung',
            greenFinance: 'Grüne Finanzierung',
            greenFinanceDesc: 'Kohlenstofffinanzprodukte und -dienstleistungen',
            carbonAssets: 'Kohlenstoffasset-Management',
            carbonAssetsDesc: 'Kohlenstoffasset-Portfolio-Management und -optimierung',
            carbonInsights: 'Kohlenstoff-Einblicke',
            marketAnalysis: 'Marktanalyse',
            marketAnalysisDesc: 'Kohlenstoffmarkttrends und Chancenanalyse',
            policyInterpretation: 'Politikinterpretation',
            policyInterpretationDesc: 'Neueste Politikdynamik und Auswirkungsanalyse',
            industryReports: 'Industrieberichte',
            industryReportsDesc: 'Tiefgreifende Industrieforschung und Einblicke',
            expertViews: 'Expertenmeinungen',
            expertViewsDesc: 'Maßgebliche Expertenmeinungen und Empfehlungen',
        },
        'fr': {
            aboutUs: 'À propos',
            companyIntro: 'Présentation de l\'entreprise',
            companyIntroDesc: 'Apprenez la mission et la vision de 碳智METHAS',
            teamIntro: 'Présentation de l\'équipe',
            teamIntroDesc: 'Rencontrez notre équipe professionnelle',
            development: 'Histoire du développement',
            developmentDesc: 'L\'histoire de croissance de 碳智METHAS',
            contactUs: 'Contactez-nous',
            contactUsDesc: 'Obtenez plus d\'informations et d\'opportunités de coopération',
            serviceTypes: 'Types de services',
            carbonAccounting: 'Comptabilité carbone',
            carbonAccountingDesc: 'Comptabilité et vérification professionnelles des émissions de carbone',
            carbonTrading: 'Commerce du carbone',
            carbonTradingDesc: 'Commerce d\'actifs carbone et conseil en gestion',
            carbonNeutral: 'Planification de la neutralité carbone',
            carbonNeutralDesc: 'Voies de neutralité carbone personnalisées',
            esgConsulting: 'Conseil ESG',
            esgConsultingDesc: 'Solutions environnementales, sociales et de gouvernance',
            solutions: 'Solutions',
            corporateCarbon: 'Neutralité carbone d\'entreprise',
            corporateCarbonDesc: 'Solutions complètes de neutralité carbone d\'entreprise',
            supplyChain: 'Décarbonisation de la chaîne d\'approvisionnement',
            supplyChainDesc: 'Gestion et optimisation du carbone de la chaîne d\'approvisionnement',
            greenFinance: 'Finance verte',
            greenFinanceDesc: 'Produits et services de finance carbone',
            carbonAssets: 'Gestion des actifs carbone',
            carbonAssetsDesc: 'Gestion et optimisation du portefeuille d\'actifs carbone',
            carbonInsights: 'Perspectives carbone',
            marketAnalysis: 'Analyse du marché',
            marketAnalysisDesc: 'Tendances du marché du carbone et analyse des opportunités',
            policyInterpretation: 'Interprétation des politiques',
            policyInterpretationDesc: 'Dernières dynamiques politiques et analyse d\'impact',
            industryReports: 'Rapports de l\'industrie',
            industryReportsDesc: 'Recherche approfondie de l\'industrie et perspectives',
            expertViews: 'Opinions d\'experts',
            expertViewsDesc: 'Opinions et recommandations d\'experts faisant autorité',
        }
    };
    const t = navTranslations[language];
    return [
        {
            label: t.aboutUs,
            href: '/about',
            children: [
                { label: t.companyIntro, href: '/about/company', description: t.companyIntroDesc },
                { label: t.teamIntro, href: '/about/team', description: t.teamIntroDesc },
                { label: t.development, href: '/about/history', description: t.developmentDesc },
                { label: t.contactUs, href: '/contact', description: t.contactUsDesc },
            ]
        },
        {
            label: t.serviceTypes,
            href: '/services',
            children: [
                { label: t.carbonAccounting, href: '/services/carbon-accounting', description: t.carbonAccountingDesc },
                { label: t.carbonTrading, href: '/services/carbon-trading', description: t.carbonTradingDesc },
                { label: t.carbonNeutral, href: '/services/carbon-neutral', description: t.carbonNeutralDesc },
                { label: t.esgConsulting, href: '/services/esg-consulting', description: t.esgConsultingDesc },
            ]
        },
        {
            label: t.solutions,
            href: '/solutions',
            children: [
                { label: t.corporateCarbon, href: '/solutions/corporate-carbon', description: t.corporateCarbonDesc },
                { label: t.supplyChain, href: '/solutions/supply-chain', description: t.supplyChainDesc },
                { label: t.greenFinance, href: '/solutions/green-finance', description: t.greenFinanceDesc },
                { label: t.carbonAssets, href: '/solutions/carbon-assets', description: t.carbonAssetsDesc },
            ]
        },
        {
            label: t.carbonInsights,
            href: '/insights',
            children: [
                { label: t.marketAnalysis, href: '/insights/market-analysis', description: t.marketAnalysisDesc },
                { label: t.policyInterpretation, href: '/insights/policy', description: t.policyInterpretationDesc },
                { label: t.industryReports, href: '/insights/reports', description: t.industryReportsDesc },
                { label: t.expertViews, href: '/insights/expert-views', description: t.expertViewsDesc },
            ]
        },
    ];
};
function Header() {
    const { language, setLanguage } = useLanguageState();
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    const [isHidden, setIsHidden] = (0, react_1.useState)(false);
    const [lastScrollY, setLastScrollY] = (0, react_1.useState)(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const [openMegaMenu, setOpenMegaMenu] = (0, react_1.useState)(null);
    const [mobileOpenSubmenu, setMobileOpenSubmenu] = (0, react_1.useState)(null);
    // Get translated content
    const t = headerTranslations[language];
    const navItems = getNavItems(language);
    (0, react_1.useEffect)(() => {
        // 检查是否在客户端环境
        if (typeof window === 'undefined')
            return;
        // 设置初始状态
        setIsScrolled(window.scrollY > 50);
        setLastScrollY(window.scrollY);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // 更新 isScrolled 状态（背景变化）
            setIsScrolled(currentScrollY > 50);
            // 碳智METHAS 导航隐藏逻辑：滚动超过500px时开始隐藏/显示
            if (currentScrollY > 500) {
                if (currentScrollY > lastScrollY && currentScrollY > 500) {
                    // 向下滚动 - 隐藏导航
                    setIsHidden(true);
                }
                else if (currentScrollY < lastScrollY) {
                    // 向上滚动 - 显示导航
                    setIsHidden(false);
                }
            }
            else {
                // 在500px以下总是显示导航
                setIsHidden(false);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.header, { className: `fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`, initial: {
            backgroundColor: 'transparent',
            y: 0,
            height: '80px'
        }, animate: {
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            boxShadow: isScrolled ? '0 10px 40px rgba(59, 130, 246, 0.08)' : '0 0 0 0 rgba(0, 0, 0, 0)',
            y: isHidden ? -100 : 0,
            height: isScrolled ? '60px' : '80px'
        }, transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] // 专业缓动函数
        }, children: [(0, jsx_runtime_1.jsx)("div", { className: `border-b border-white/20 ${isScrolled ? 'hidden' : 'block'}`, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-12 items-center justify-between text-body-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center space-x-6", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.a, { href: "/contact", className: `transition-colors text-body-sm ${isScrolled ? 'text-primary-700 hover:text-primary-600' : 'text-inverse/90 hover:text-inverse drop-shadow-md'}`, whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: t.contact }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.a, { href: "/locations", className: `transition-colors text-body-sm ${isScrolled ? 'text-primary-700 hover:text-primary-600' : 'text-inverse/90 hover:text-inverse drop-shadow-md'}`, whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: t.locations })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-6 ml-auto", children: (0, jsx_runtime_1.jsxs)("select", { className: `bg-transparent text-body-sm cursor-pointer border-none outline-none ${isScrolled ? 'text-primary-700' : 'text-white/80 drop-shadow-md'}`, value: language, onChange: (e) => setLanguage(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "zh-CN", children: languageLabels['zh-CN'] }), (0, jsx_runtime_1.jsx)("option", { value: "en", children: languageLabels['en'] }), (0, jsx_runtime_1.jsx)("option", { value: "de", children: languageLabels['de'] }), (0, jsx_runtime_1.jsx)("option", { value: "fr", children: languageLabels['fr'] })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("nav", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`, children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "flex items-center", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { className: `text-heading-lg font-semibold transition-colors duration-normal ${isScrolled ? 'text-primary-800' : 'text-inverse drop-shadow-lg'}`, whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: t.brandName }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex md:items-center md:space-x-6 lg:space-x-8", children: navItems.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative", onMouseEnter: () => item.children && setOpenMegaMenu(item.label), onMouseLeave: () => setOpenMegaMenu(null), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.a, { href: item.href, className: `transition-colors font-medium text-body-md ${isScrolled
                                                    ? 'text-primary-800 hover:text-primary-700'
                                                    : 'text-inverse/90 hover:text-inverse drop-shadow-md'}`, whileHover: { scale: 1.05 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: `h-4 w-4 transition-all duration-200 ${isScrolled ? 'text-primary-600' : 'text-white/70 drop-shadow-md'}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: openMegaMenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && openMegaMenu === item.label && ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-96 rounded-xl bg-white shadow-2xl border border-primary-100 overflow-hidden backdrop-blur-sm", initial: { opacity: 0, y: -15, scale: 0.92 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -15, scale: 0.92 }, transition: {
                                                duration: 0.25,
                                                ease: [0.16, 1, 0.3, 1],
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25
                                            }, style: {
                                                boxShadow: '0 32px 64px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                            }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-primary-100 relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5" }), (0, jsx_runtime_1.jsx)("h3", { className: "relative font-semibold text-primary-800 text-body-sm uppercase tracking-wider", children: item.label })] }), (0, jsx_runtime_1.jsx)("div", { className: "py-3", children: item.children.map((child, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "group flex items-start px-6 py-4 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-primary-100/50 transition-all duration-300 border-l-2 border-transparent hover:border-primary-500", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: {
                                                            delay: index * 0.08,
                                                            duration: 0.3,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }, whileHover: { x: 4 }, children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "mr-4 mt-1", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300", whileHover: { scale: 1.1, rotate: 5 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-primary-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-semibold text-primary-800 group-hover:text-primary-700 transition-colors text-body-md", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 text-body-sm text-primary-600 group-hover:text-primary-700 transition-colors leading-relaxed", children: child.description }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-5 w-5 text-gray-400 group-hover:text-primary-500 flex-shrink-0 ml-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", initial: { x: 0, opacity: 0.6 }, whileHover: { x: 3, opacity: 1 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }, child.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary-700/10 to-primary-800/10" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: item.href, className: "relative text-sm font-semibold text-white hover:text-white/90 transition-colors flex items-center group", whileHover: { scale: 1.02 }, transition: { duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: "\uD83D\uDCA1" }), "View all ", item.label.toLowerCase(), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-4 w-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", initial: { x: 0 }, whileHover: { x: 4 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })] })] })] })) })] }, item.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "primary", size: "md", className: "bg-primary-600 hover:bg-primary-700 text-white border-0 shadow-lg hover:shadow-xl relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "absolute inset-0 bg-white/20 rounded-lg", initial: { scale: 0, opacity: 0 }, whileHover: { scale: 1, opacity: 1 }, transition: { duration: 0.3 } }), (0, jsx_runtime_1.jsx)("span", { className: "relative z-10", children: "\u7ACB\u5373\u54A8\u8BE2" })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: `md:hidden p-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-primary-700 hover:bg-primary-50'
                                        : 'text-inverse hover:bg-white/10 drop-shadow-md'}`, onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: isMobileMenuOpen ? "open" : "closed", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.path, { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, variants: {
                                                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                                open: { d: "M6 18L18 6M6 6l12 12" }
                                            } }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isMobileMenuOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "md:hidden border-t border-gray-200 bg-white", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-4 space-y-2 overflow-hidden", children: navItems.map((item, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between py-2", children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: "text-primary-800 hover:text-primary-700 font-medium flex-1 text-body-md", children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: () => setMobileOpenSubmenu(mobileOpenSubmenu === item.label ? null : item.label), className: "p-1 rounded hover:bg-gray-100 transition-colors", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-4 w-4 text-gray-500 transition-transform duration-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: mobileOpenSubmenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && mobileOpenSubmenu === item.label && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "ml-4 space-y-1 overflow-hidden", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }, children: item.children.map((child, childIndex) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "block py-2 px-3 text-body-sm text-primary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: childIndex * 0.05, duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "text-body-xs text-primary-600 mt-1", children: child.description }))] }, child.label))) })) })] }, item.label))) }) })) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary-200 shadow-lg", initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-4 h-16", children: navItems.map((item, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: item.href, className: "flex flex-col items-center justify-center text-center p-2 hover:bg-primary-50 transition-colors", whileTap: { scale: 0.95 }, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-6 h-6 mb-1 text-primary-600", children: [index === 0 && ((0, jsx_runtime_1.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) })), index === 1 && ((0, jsx_runtime_1.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" }) })), index === 2 && ((0, jsx_runtime_1.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) })), index === 3 && ((0, jsx_runtime_1.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }))] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-700 font-medium truncate", children: item.label })] }, item.label))) }) })] }));
}
