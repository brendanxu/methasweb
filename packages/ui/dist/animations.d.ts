import React from 'react';
import { HTMLMotionProps, Variants } from 'framer-motion';
export declare const fadeInUpVariants: Variants;
export declare const fadeInVariants: Variants;
export declare const scaleInVariants: Variants;
export declare const slideInLeftVariants: Variants;
export declare const slideInRightVariants: Variants;
export declare const staggerContainerVariants: Variants;
interface AnimatedElementProps extends HTMLMotionProps<'div'> {
    variant?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
    delay?: number;
}
export declare function AnimatedElement({ variant, delay, children, className, ...props }: AnimatedElementProps): import("react/jsx-runtime").JSX.Element;
interface StaggerContainerProps extends HTMLMotionProps<'div'> {
    staggerDelay?: number;
    children: React.ReactNode;
}
export declare function StaggerContainer({ staggerDelay, children, className, ...props }: StaggerContainerProps): import("react/jsx-runtime").JSX.Element;
interface HoverLiftProps extends HTMLMotionProps<'div'> {
    liftAmount?: number;
    children: React.ReactNode;
}
export declare function HoverLift({ liftAmount, children, className, ...props }: HoverLiftProps): import("react/jsx-runtime").JSX.Element;
interface ClickScaleProps extends HTMLMotionProps<'div'> {
    scaleAmount?: number;
    children: React.ReactNode;
}
export declare function ClickScale({ scaleAmount, children, className, ...props }: ClickScaleProps): import("react/jsx-runtime").JSX.Element;
interface ParallaxProps extends HTMLMotionProps<'div'> {
    offset?: number;
    children: React.ReactNode;
}
export declare function Parallax({ offset, children, className, ...props }: ParallaxProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=animations.d.ts.map