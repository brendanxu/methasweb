'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const Button = react_1.default.forwardRef(({ variant = 'primary', size = 'md', asChild = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-disabled disabled:cursor-not-allowed transition-all duration-fast ease-out';
    const variants = {
        primary: 'bg-primary text-neutral-0 hover:bg-primary-accent active:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg',
        secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
        outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary focus:ring-primary-500',
        ghost: 'text-neutral-600 hover:text-primary hover:bg-neutral-50 focus:ring-primary-300'
    };
    const hoverVariants = {
        primary: { y: -1 },
        secondary: { y: -1 },
        outline: { y: -1 },
        ghost: { scale: 1 }
    };
    const sizes = {
        sm: 'px-4 py-2 text-sm min-h-[32px]', // 小按钮
        md: 'px-6 py-3 text-base min-h-[44px]', // 中按钮（默认）  
        lg: 'px-8 py-4 text-lg min-h-[52px]' // 大按钮
    };
    const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            className: buttonClasses,
            ref,
            ...props
        });
    }
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...otherProps } = props;
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { ref: ref, className: buttonClasses, whileHover: hoverVariants[variant], whileTap: { scale: 0.98 }, transition: {
            duration: 0.2,
            ease: [0, 0, 0.2, 1]
        }, ...otherProps, children: children }));
});
exports.Button = Button;
Button.displayName = 'Button';
