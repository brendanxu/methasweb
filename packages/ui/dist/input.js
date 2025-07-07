'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Input = react_1.default.forwardRef(({ label, error, variant = 'default', inputSize = 'md', className = '', ...props }, ref) => {
    const baseStyles = 'w-full border rounded font-sans transition-all duration-fast ease-out focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-disabled disabled:cursor-not-allowed';
    const variants = {
        default: 'border-neutral-300 bg-neutral-0 text-neutral-700 placeholder:text-neutral-500 focus:border-primary focus:ring-primary/20',
        filled: 'border-neutral-200 bg-neutral-100 text-neutral-700 placeholder:text-neutral-500 focus:bg-neutral-0 focus:border-primary focus:ring-primary/20'
    };
    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg'
    };
    const errorStyles = error ? 'border-error focus:border-error focus:ring-error/20' : '';
    const inputClasses = `${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${errorStyles} ${className}`;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [label && ((0, jsx_runtime_1.jsx)("label", { className: "block mb-2 text-sm font-medium text-neutral-800", children: label })), (0, jsx_runtime_1.jsx)("input", { ref: ref, className: inputClasses, ...props }), error && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-error", role: "alert", children: error }))] }));
});
exports.Input = Input;
Input.displayName = 'Input';
