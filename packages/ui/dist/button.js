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
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200';
    const variants = {
        primary: 'bg-primary-500 text-text-inverse hover:bg-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-medium',
        secondary: 'bg-background-primary text-text-primary border border-secondary-300 hover:bg-secondary-50 focus:ring-secondary-300 shadow-subtle',
        outline: 'border border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-secondary-50 focus:ring-secondary-300'
    };
    const hoverVariants = {
        primary: { scale: 1.01 },
        secondary: { scale: 1.00 },
        outline: { scale: 1.00 },
        ghost: { scale: 1.00 }
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-button-sm',
        md: 'px-5 py-2.5 text-button-md',
        lg: 'px-6 py-3 text-button-lg'
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
    return ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { ref: ref, className: buttonClasses, whileHover: hoverVariants[variant], whileTap: { scale: 0.95 }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }, ...otherProps, children: children }));
});
exports.Button = Button;
Button.displayName = 'Button';
