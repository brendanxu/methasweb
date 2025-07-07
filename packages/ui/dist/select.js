'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Select = react_1.default.forwardRef(({ label, error, variant = 'default', selectSize = 'md', options, placeholder, className = '', ...props }, ref) => {
    const baseStyles = 'w-full border rounded font-sans transition-all duration-fast ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-disabled disabled:cursor-not-allowed appearance-none bg-no-repeat bg-right';
    const variants = {
        default: 'border-neutral-300 bg-neutral-0 text-neutral-700 focus:border-primary focus:ring-primary/20',
        filled: 'border-neutral-200 bg-neutral-100 text-neutral-700 focus:bg-neutral-0 focus:border-primary focus:ring-primary/20'
    };
    const sizes = {
        sm: 'px-3 py-2 pr-8 text-sm',
        md: 'px-4 py-3 pr-10 text-base',
        lg: 'px-5 py-4 pr-12 text-lg'
    };
    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : '';
    const selectClasses = `${baseStyles} ${variants[variant]} ${sizes[selectSize]} ${errorStyles} ${className}`;
    // SVG arrow icon inline as background
    const arrowIcon = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B778C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [label && ((0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-sm font-medium text-neutral-800", children: label })), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsxs)("select", { ref: ref, className: selectClasses, style: {
                        backgroundImage: arrowIcon,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25rem 1.25rem'
                    }, ...props, children: [placeholder && ((0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: placeholder })), options.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.value, children: option.label }, option.value)))] }) }), error && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-error", role: "alert", children: error }))] }));
});
exports.Select = Select;
Select.displayName = 'Select';
