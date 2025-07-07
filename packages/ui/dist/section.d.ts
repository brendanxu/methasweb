import React from 'react';
interface SectionProps {
    spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    background?: 'white' | 'neutral' | 'primary' | 'secondary' | 'gradient';
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare function Section({ spacing, background, children, className, as: Component }: SectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=section.d.ts.map