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
const class_variance_authority_1 = require("class-variance-authority");
// 按钮变体配置 - 使用新设计系统
const buttonVariants = (0, class_variance_authority_1.cva)(
// 基础样式
'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed', {
    variants: {
        variant: {
            primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
            secondary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md',
            outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 bg-transparent',
            ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500 bg-transparent',
            link: 'text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500 bg-transparent p-0',
            destructive: 'bg-error text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
        },
        size: {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-base',
            lg: 'h-12 px-6 text-lg',
            xl: 'h-14 px-8 text-xl',
            icon: 'h-10 w-10',
        },
        loading: {
            true: 'cursor-not-allowed',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        loading: false,
    },
});
// 加载中图标组件
const LoadingIcon = () => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.svg, { className: "h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }));
// 按钮组件
const Button = react_1.default.forwardRef(({ className, variant, size, loading = false, disabled, leftIcon, rightIcon, children, asChild = false, onClick, ...props }, ref) => {
    const isDisabled = disabled || loading;
    // asChild 支持 - 向后兼容
    if (asChild && react_1.default.isValidElement(children)) {
        return react_1.default.cloneElement(children, {
            className: buttonVariants({ variant, size, loading, className }),
            ref,
            disabled: isDisabled,
            onClick,
            ...props
        });
    }
    return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.button, { ref: ref, className: buttonVariants({ variant, size, loading, className }), disabled: isDisabled, onClick: onClick, whileHover: !isDisabled ? { scale: 1.02 } : {}, whileTap: !isDisabled ? { scale: 0.98 } : {}, transition: { type: "spring", stiffness: 400, damping: 17 }, ...props, children: [loading && (0, jsx_runtime_1.jsx)(LoadingIcon, {}), !loading && leftIcon && leftIcon, children, !loading && rightIcon && rightIcon] }));
});
exports.Button = Button;
Button.displayName = "Button";
