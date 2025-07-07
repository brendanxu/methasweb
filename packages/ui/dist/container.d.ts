import React from 'react';
interface ContainerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare function Container({ size, padding, children, className, as: Component }: ContainerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=container.d.ts.map