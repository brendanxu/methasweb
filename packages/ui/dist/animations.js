'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staggerContainerVariants = exports.slideInRightVariants = exports.slideInLeftVariants = exports.scaleInVariants = exports.fadeInVariants = exports.fadeInUpVariants = void 0;
exports.AnimatedElement = AnimatedElement;
exports.StaggerContainer = StaggerContainer;
exports.HoverLift = HoverLift;
exports.ClickScale = ClickScale;
exports.Parallax = Parallax;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
// 标准动画变体
exports.fadeInUpVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1]
        }
    }
};
exports.fadeInVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1]
        }
    }
};
exports.scaleInVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: [0, 0, 0.2, 1]
        }
    }
};
exports.slideInLeftVariants = {
    hidden: {
        opacity: 0,
        x: -20
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1]
        }
    }
};
exports.slideInRightVariants = {
    hidden: {
        opacity: 0,
        x: 20
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1]
        }
    }
};
// 交错动画容器
exports.staggerContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};
function AnimatedElement({ variant = 'fadeInUp', delay = 0, children, className = '', ...props }) {
    const variants = {
        fadeInUp: exports.fadeInUpVariants,
        fadeIn: exports.fadeInVariants,
        scaleIn: exports.scaleInVariants,
        slideInLeft: exports.slideInLeftVariants,
        slideInRight: exports.slideInRightVariants
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-50px" }, variants: variants[variant], transition: { delay }, ...props, children: children }));
}
function StaggerContainer({ staggerDelay = 0.1, children, className = '', ...props }) {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-50px" }, variants: containerVariants, ...props, children: children }));
}
function HoverLift({ liftAmount = -4, children, className = '', ...props }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, whileHover: { y: liftAmount }, transition: { duration: 0.2, ease: [0, 0, 0.2, 1] }, ...props, children: children }));
}
function ClickScale({ scaleAmount = 0.98, children, className = '', ...props }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, whileTap: { scale: scaleAmount }, transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }, ...props, children: children }));
}
function Parallax({ offset = 50, children, className = '', ...props }) {
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: className, initial: { y: offset }, whileInView: { y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }, ...props, children: children }));
}
