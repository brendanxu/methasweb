import React from 'react';
interface MotionSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}
export declare function MotionSection({ children, className, delay, duration, direction }: MotionSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function MotionGrid({ children, className, staggerDelay }: {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=motion-section.d.ts.map