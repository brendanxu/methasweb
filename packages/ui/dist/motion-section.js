'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotionSection = MotionSection;
exports.MotionGrid = MotionGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const framer_motion_2 = require("framer-motion");
function MotionSection({ children, className = '', delay = 0, duration = 0.6, direction = 'up' }) {
    const ref = react_1.default.useRef(null);
    const isInView = (0, framer_motion_2.useInView)(ref, { once: true, margin: "-100px" });
    const directionVariants = {
        up: { y: 50 },
        down: { y: -50 },
        left: { x: 50 },
        right: { x: -50 }
    };
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { ref: ref, className: className, initial: {
            opacity: 0,
            ...directionVariants[direction]
        }, animate: isInView ? {
            opacity: 1,
            x: 0,
            y: 0
        } : {}, transition: {
            duration,
            delay,
            ease: [0.25, 0.25, 0, 1]
        }, children: children }));
}
function MotionGrid({ children, className = '', staggerDelay = 0.1 }) {
    const ref = react_1.default.useRef(null);
    const isInView = (0, framer_motion_2.useInView)(ref, { once: true, margin: "-50px" });
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { ref: ref, className: className, initial: "hidden", animate: isInView ? "visible" : "hidden", variants: {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: staggerDelay
                }
            }
        }, children: react_1.default.Children.map(children, (child, index) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { variants: {
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.25, 0.25, 0, 1]
                    }
                }
            }, children: child }, index))) }));
}
