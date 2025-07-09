'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMethasAnimations = exports.methasAnimations = void 0;
exports.Animated = Animated;
exports.ScrollAnimated = ScrollAnimated;
exports.Interactive = Interactive;
exports.Staggered = Staggered;
exports.PageTransition = PageTransition;
exports.LoadingSpinner = LoadingSpinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
// 碳智METHAS 统一动画配置
exports.methasAnimations = {
    // 基础动画持续时间
    duration: {
        fast: 0.15,
        normal: 0.3,
        slow: 0.5,
    },
    // 缓动函数
    easing: {
        out: [0.4, 0, 0.2, 1],
        inOut: [0.16, 1, 0.3, 1],
        in: [0.4, 0, 1, 1],
        spring: {
            type: "spring",
            stiffness: 400,
            damping: 17,
        },
    },
    // 常用动画变体
    variants: {
        // 淡入动画
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        // 向上滑动
        slideUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
        },
        // 向下滑动
        slideDown: {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
        },
        // 缩放进入
        scaleIn: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
        },
        // 从左侧滑入
        slideLeft: {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
        },
        // 从右侧滑入
        slideRight: {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 },
        },
        // 旋转进入
        rotateIn: {
            initial: { opacity: 0, rotate: -10 },
            animate: { opacity: 1, rotate: 0 },
            exit: { opacity: 0, rotate: 10 },
        },
        // 弹跳效果
        bounce: {
            initial: { opacity: 0, y: 20, scale: 0.8 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -20, scale: 0.8 },
        },
    },
    // 交互动画
    interactions: {
        hover: {
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 17 },
        },
        tap: {
            scale: 0.98,
            transition: { type: "spring", stiffness: 400, damping: 17 },
        },
        focus: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 17 },
        },
    },
    // 页面过渡动画
    pageTransition: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    // 滚动触发动画
    scrollTrigger: {
        viewport: { once: true, margin: "-100px" },
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};
function Animated({ children, variant = 'fadeIn', delay = 0, duration = exports.methasAnimations.duration.normal, className = '' }) {
    const animationVariant = exports.methasAnimations.variants[variant];
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: animationVariant.initial, animate: animationVariant.animate, exit: animationVariant.exit, transition: {
            duration,
            delay,
            ease: exports.methasAnimations.easing.out,
        }, children: children }));
}
function ScrollAnimated({ children, variant = 'slideUp', delay = 0, className = '' }) {
    const animationVariant = exports.methasAnimations.variants[variant];
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: animationVariant.initial, whileInView: animationVariant.animate, viewport: exports.methasAnimations.scrollTrigger.viewport, transition: {
            ...exports.methasAnimations.scrollTrigger.transition,
            delay,
        }, children: children }));
}
function Interactive({ children, hover = true, tap = true, focus = false, className = '', onClick }) {
    const whileHover = hover ? exports.methasAnimations.interactions.hover : undefined;
    const whileTap = tap ? exports.methasAnimations.interactions.tap : undefined;
    const whileFocus = focus ? exports.methasAnimations.interactions.focus : undefined;
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, whileHover: whileHover, whileTap: whileTap, whileFocus: whileFocus, onClick: onClick, children: children }));
}
function Staggered({ children, stagger = 0.1, variant = 'slideUp', className = '' }) {
    const animationVariant = exports.methasAnimations.variants[variant];
    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: stagger,
            },
        },
    };
    const itemVariants = {
        initial: animationVariant.initial,
        animate: animationVariant.animate,
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, variants: containerVariants, initial: "initial", animate: "animate", children: react_1.default.Children.map(children, (child, index) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: itemVariants, children: child }, index))) }));
}
function PageTransition({ children, className = '' }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: exports.methasAnimations.pageTransition.initial, animate: exports.methasAnimations.pageTransition.animate, exit: exports.methasAnimations.pageTransition.exit, transition: exports.methasAnimations.pageTransition.transition, children: children }));
}
function LoadingSpinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: `${sizes[size]} ${className}`, animate: { rotate: 360 }, transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear",
        }, children: (0, jsx_runtime_1.jsxs)("svg", { className: "h-full w-full", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }) }));
}
// 预设动画 hooks
const useMethasAnimations = () => {
    return {
        ...exports.methasAnimations,
        // 快捷方法
        fadeIn: (delay = 0) => ({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay, duration: exports.methasAnimations.duration.normal },
        }),
        slideUp: (delay = 0) => ({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay, duration: exports.methasAnimations.duration.normal },
        }),
        scaleIn: (delay = 0) => ({
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay, duration: exports.methasAnimations.duration.normal },
        }),
    };
};
exports.useMethasAnimations = useMethasAnimations;
