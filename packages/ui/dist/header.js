'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const button_1 = require("./button");
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
            ourStory: '我们的故事',
            leadership: '领导团队',
            mission: '使命与价值',
            locations: '办公地点',
            storyDesc: '碳智METHAS如何成为气候领域的领导者',
            leadershipDesc: '认识我们的执行团队和董事会',
            missionDesc: '我们的目标和核心原则',
            locationsDesc: '我们的全球办公室和业务范围',
            whatWeDo: '我们的服务',
            services: '服务',
            solutions: '解决方案',
            industries: '行业',
            approach: '方法',
            servicesDesc: '完整的气候行动解决方案',
            solutionsDesc: '量身定制的气候策略',
            industriesDesc: '特定行业的专业知识',
            approachDesc: '我们的方法论和流程',
            ourImpact: '我们的影响',
            caseStudies: '案例研究',
            reports: '可持续发展报告',
            clientSuccess: '客户成功',
            metrics: '指标',
            caseStudiesDesc: '真实的气候项目',
            reportsDesc: '年度影响评估',
            clientSuccessDesc: '客户转型故事',
            metricsDesc: '可衡量的气候成果',
            newsInsights: '新闻与洞察',
            latestNews: '最新新闻',
            blog: '博客',
            resources: '资源',
            events: '活动',
            latestNewsDesc: '公司公告和更新',
            blogDesc: '专家见解和分析',
            resourcesDesc: '报告、指南和工具',
            eventsDesc: '会议和网络研讨会',
        },
        'en': {
            aboutUs: 'About us',
            ourStory: 'Our story',
            leadership: 'Leadership team',
            mission: 'Mission & values',
            locations: 'Locations',
            storyDesc: 'How 碳智METHAS became a climate leader',
            leadershipDesc: 'Meet our executive team and board',
            missionDesc: 'Our purpose and core principles',
            locationsDesc: 'Our global offices and presence',
            whatWeDo: 'What we do',
            services: 'Services',
            solutions: 'Solutions',
            industries: 'Industries',
            approach: 'Approach',
            servicesDesc: 'Complete climate action solutions',
            solutionsDesc: 'Tailored climate strategies',
            industriesDesc: 'Sector-specific expertise',
            approachDesc: 'Our methodology and process',
            ourImpact: 'Our impact',
            caseStudies: 'Case studies',
            reports: 'Sustainability reports',
            clientSuccess: 'Client success',
            metrics: 'Metrics',
            caseStudiesDesc: 'Real-world climate projects',
            reportsDesc: 'Annual impact assessments',
            clientSuccessDesc: 'Customer transformation stories',
            metricsDesc: 'Measurable climate outcomes',
            newsInsights: 'News & insights',
            latestNews: 'Latest news',
            blog: 'Blog',
            resources: 'Resources',
            events: 'Events',
            latestNewsDesc: 'Company announcements and updates',
            blogDesc: 'Expert insights and analysis',
            resourcesDesc: 'Reports, guides, and tools',
            eventsDesc: 'Conferences and webinars',
        },
        'de': {
            aboutUs: 'Über uns',
            ourStory: 'Unsere Geschichte',
            leadership: 'Führungsteam',
            mission: 'Mission & Werte',
            locations: 'Standorte',
            storyDesc: 'Wie 碳智METHAS zu einem Klimaführer wurde',
            leadershipDesc: 'Lernen Sie unser Führungsteam und den Vorstand kennen',
            missionDesc: 'Unser Zweck und unsere Grundprinzipien',
            locationsDesc: 'Unsere globalen Büros und Präsenz',
            whatWeDo: 'Was wir tun',
            services: 'Dienstleistungen',
            solutions: 'Lösungen',
            industries: 'Branchen',
            approach: 'Ansatz',
            servicesDesc: 'Komplette Klimaschutzlösungen',
            solutionsDesc: 'Maßgeschneiderte Klimastrategien',
            industriesDesc: 'Branchenspezifische Expertise',
            approachDesc: 'Unsere Methodik und unser Prozess',
            ourImpact: 'Unsere Wirkung',
            caseStudies: 'Fallstudien',
            reports: 'Nachhaltigkeitsberichte',
            clientSuccess: 'Kundenerfolg',
            metrics: 'Metriken',
            caseStudiesDesc: 'Reale Klimaprojekte',
            reportsDesc: 'Jährliche Wirkungsbeurteilungen',
            clientSuccessDesc: 'Geschichten über Kundentransformation',
            metricsDesc: 'Messbare Klimaergebnisse',
            newsInsights: 'News & Einblicke',
            latestNews: 'Neueste Nachrichten',
            blog: 'Blog',
            resources: 'Ressourcen',
            events: 'Veranstaltungen',
            latestNewsDesc: 'Unternehmensankündigungen und Updates',
            blogDesc: 'Experteneinblicke und Analysen',
            resourcesDesc: 'Berichte, Leitfäden und Tools',
            eventsDesc: 'Konferenzen und Webinare',
        },
        'fr': {
            aboutUs: 'À propos',
            ourStory: 'Notre histoire',
            leadership: 'Équipe dirigeante',
            mission: 'Mission et valeurs',
            locations: 'Emplacements',
            storyDesc: 'Comment 碳智METHAS est devenu un leader climatique',
            leadershipDesc: 'Rencontrez notre équipe dirigeante et notre conseil',
            missionDesc: 'Notre objectif et nos principes fondamentaux',
            locationsDesc: 'Nos bureaux mondiaux et notre présence',
            whatWeDo: 'Ce que nous faisons',
            services: 'Services',
            solutions: 'Solutions',
            industries: 'Industries',
            approach: 'Approche',
            servicesDesc: 'Solutions complètes d\'action climatique',
            solutionsDesc: 'Stratégies climatiques sur mesure',
            industriesDesc: 'Expertise sectorielle',
            approachDesc: 'Notre méthodologie et notre processus',
            ourImpact: 'Notre impact',
            caseStudies: 'Études de cas',
            reports: 'Rapports de durabilité',
            clientSuccess: 'Succès clients',
            metrics: 'Métriques',
            caseStudiesDesc: 'Projets climatiques réels',
            reportsDesc: 'Évaluations d\'impact annuelles',
            clientSuccessDesc: 'Histoires de transformation client',
            metricsDesc: 'Résultats climatiques mesurables',
            newsInsights: 'Actualités et perspectives',
            latestNews: 'Dernières nouvelles',
            blog: 'Blog',
            resources: 'Ressources',
            events: 'Événements',
            latestNewsDesc: 'Annonces d\'entreprise et mises à jour',
            blogDesc: 'Aperçus et analyses d\'experts',
            resourcesDesc: 'Rapports, guides et outils',
            eventsDesc: 'Conférences et webinaires',
        }
    };
    const t = navTranslations[language];
    return [
        {
            label: t.aboutUs,
            href: '/about',
            children: [
                { label: t.ourStory, href: '/about/story', description: t.storyDesc },
                { label: t.leadership, href: '/about/leadership', description: t.leadershipDesc },
                { label: t.mission, href: '/about/mission', description: t.missionDesc },
                { label: t.locations, href: '/about/locations', description: t.locationsDesc },
            ]
        },
        {
            label: t.whatWeDo,
            href: '/services',
            children: [
                { label: t.services, href: '/services', description: t.servicesDesc },
                { label: t.solutions, href: '/services/solutions', description: t.solutionsDesc },
                { label: t.industries, href: '/services/industries', description: t.industriesDesc },
                { label: t.approach, href: '/services/approach', description: t.approachDesc },
            ]
        },
        {
            label: t.ourImpact,
            href: '/impact',
            children: [
                { label: t.caseStudies, href: '/impact/case-studies', description: t.caseStudiesDesc },
                { label: t.reports, href: '/impact/reports', description: t.reportsDesc },
                { label: t.clientSuccess, href: '/impact/success-stories', description: t.clientSuccessDesc },
                { label: t.metrics, href: '/impact/metrics', description: t.metricsDesc },
            ]
        },
        {
            label: t.newsInsights,
            href: '/news',
            children: [
                { label: t.latestNews, href: '/news', description: t.latestNewsDesc },
                { label: t.blog, href: '/news/blog', description: t.blogDesc },
                { label: t.resources, href: '/news/resources', description: t.resourcesDesc },
                { label: t.events, href: '/news/events', description: t.eventsDesc },
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
            y: 0
        }, animate: {
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            boxShadow: isScrolled ? '0 10px 40px rgba(10, 61, 46, 0.08)' : '0 0 0 0 rgba(0, 0, 0, 0)',
            y: isHidden ? -100 : 0
        }, transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] // 专业缓动函数
        }, children: [(0, jsx_runtime_1.jsx)("div", { className: `border-b border-white/20 ${isScrolled ? 'hidden' : 'block'}`, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-12 items-center justify-between text-body-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center space-x-6", children: [(0, jsx_runtime_1.jsx)("a", { href: "/contact", className: `transition-colors text-body-sm ${isScrolled ? 'text-gray-600 hover:text-primary-500' : 'text-white/80 hover:text-white drop-shadow-md'}`, children: t.contact }), (0, jsx_runtime_1.jsx)("a", { href: "/locations", className: `transition-colors text-body-sm ${isScrolled ? 'text-gray-600 hover:text-primary-500' : 'text-white/80 hover:text-white drop-shadow-md'}`, children: t.locations })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-6 ml-auto", children: (0, jsx_runtime_1.jsxs)("select", { className: `bg-transparent text-body-sm cursor-pointer border-none outline-none ${isScrolled ? 'text-gray-600' : 'text-white/80 drop-shadow-md'}`, value: language, onChange: (e) => setLanguage(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "zh-CN", children: languageLabels['zh-CN'] }), (0, jsx_runtime_1.jsx)("option", { value: "en", children: languageLabels['en'] }), (0, jsx_runtime_1.jsx)("option", { value: "de", children: languageLabels['de'] }), (0, jsx_runtime_1.jsx)("option", { value: "fr", children: languageLabels['fr'] })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("nav", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`, children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "flex items-center", children: (0, jsx_runtime_1.jsx)("span", { className: `text-heading-lg font-semibold transition-colors duration-normal ${isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'}`, children: t.brandName }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex md:items-center md:space-x-6 lg:space-x-8", children: navItems.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative", onMouseEnter: () => item.children && setOpenMegaMenu(item.label), onMouseLeave: () => setOpenMegaMenu(null), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: `transition-colors font-medium text-body-md ${isScrolled
                                                    ? 'text-gray-700 hover:text-gray-900'
                                                    : 'text-white/90 hover:text-white drop-shadow-md'}`, children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: `h-4 w-4 transition-all duration-200 ${isScrolled ? 'text-gray-500' : 'text-white/70 drop-shadow-md'}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: openMegaMenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && openMegaMenu === item.label && ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-96 rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm", initial: { opacity: 0, y: -15, scale: 0.92 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -15, scale: 0.92 }, transition: {
                                                duration: 0.25,
                                                ease: [0.16, 1, 0.3, 1],
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 25
                                            }, style: {
                                                boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                            }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gradient-to-r from-primary-50 to-green-50 px-6 py-4 border-b border-primary-100 relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary-500/5 to-green-500/5" }), (0, jsx_runtime_1.jsx)("h3", { className: "relative font-semibold text-primary-800 text-body-sm uppercase tracking-wider", children: item.label })] }), (0, jsx_runtime_1.jsx)("div", { className: "py-3", children: item.children.map((child, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "group flex items-start px-6 py-4 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-green-50/50 transition-all duration-300 border-l-2 border-transparent hover:border-primary-500", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: {
                                                            delay: index * 0.08,
                                                            duration: 0.3,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }, whileHover: { x: 4 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-4 mt-1", children: (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-primary-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-semibold text-gray-900 group-hover:text-primary-700 transition-colors text-body-md", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 text-body-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed", children: child.description }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-5 w-5 text-gray-400 group-hover:text-primary-500 flex-shrink-0 ml-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", initial: { x: 0, opacity: 0.6 }, whileHover: { x: 3, opacity: 1 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }, child.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gradient-to-r from-primary-500 to-green-500 px-6 py-4 relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-primary-600/10 to-green-600/10" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: item.href, className: "relative text-sm font-semibold text-white hover:text-white/90 transition-colors flex items-center group", whileHover: { scale: 1.02 }, transition: { duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2", children: "\uD83D\uDCA1" }), "View all ", item.label.toLowerCase(), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-4 w-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", initial: { x: 0 }, whileHover: { x: 4 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })] })] })] })) })] }, item.label))) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "md", className: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-6 py-3", children: (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [t.getStarted, (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", initial: { x: 0 }, whileHover: { x: 2 }, transition: { duration: 0.2 }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })] }) }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: `md:hidden p-2 rounded-lg transition-colors ${isScrolled
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-white hover:bg-white/10 drop-shadow-md'}`, onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), whileTap: { scale: 0.95 }, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: isMobileMenuOpen ? "open" : "closed", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.path, { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, variants: {
                                                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                                                open: { d: "M6 18L18 6M6 6l12 12" }
                                            } }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: isMobileMenuOpen && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "md:hidden border-t border-gray-200 bg-white", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto max-w-7xl px-4 py-4 space-y-2 overflow-hidden", children: navItems.map((item, index) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between py-2", children: [(0, jsx_runtime_1.jsx)("a", { href: item.href, className: "text-gray-900 hover:text-primary-600 font-medium flex-1 text-body-md", children: item.label }), item.children && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: () => setMobileOpenSubmenu(mobileOpenSubmenu === item.label ? null : item.label), className: "p-1 rounded hover:bg-gray-100 transition-colors", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.svg, { className: "h-4 w-4 text-gray-500 transition-transform duration-200", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", animate: {
                                                    rotate: mobileOpenSubmenu === item.label ? 180 : 0
                                                }, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) }))] }), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { children: item.children && mobileOpenSubmenu === item.label && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "ml-4 space-y-1 overflow-hidden", initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }, children: item.children.map((child, childIndex) => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.a, { href: child.href, className: "block py-2 px-3 text-body-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: childIndex * 0.05, duration: 0.2 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: child.label }), child.description && ((0, jsx_runtime_1.jsx)("div", { className: "text-body-xs text-gray-500 mt-1", children: child.description }))] }, child.label))) })) })] }, item.label))) }) })) })] }));
}
