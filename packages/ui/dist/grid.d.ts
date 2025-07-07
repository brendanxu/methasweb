import React from 'react';
interface GridProps {
    cols?: 1 | 2 | 3 | 4 | 6 | 12;
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    responsive?: {
        sm?: 1 | 2 | 3 | 4 | 6;
        md?: 1 | 2 | 3 | 4 | 6;
        lg?: 1 | 2 | 3 | 4 | 6;
        xl?: 1 | 2 | 3 | 4 | 6;
    };
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare function Grid({ cols, gap, responsive, children, className, as: Component }: GridProps): import("react/jsx-runtime").JSX.Element;
interface FlexProps {
    direction?: 'row' | 'col';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    gap?: 'sm' | 'md' | 'lg' | 'xl';
    wrap?: boolean;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare function Flex({ direction, align, justify, gap, wrap, children, className, as: Component }: FlexProps): import("react/jsx-runtime").JSX.Element;
interface StackProps {
    space?: 'sm' | 'md' | 'lg' | 'xl';
    align?: 'start' | 'center' | 'end' | 'stretch';
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}
export declare function Stack({ space, align, children, className, as: Component }: StackProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=grid.d.ts.map