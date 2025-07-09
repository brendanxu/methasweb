import React from 'react';
export declare const methasAnimations: {
    duration: {
        fast: number;
        normal: number;
        slow: number;
    };
    easing: {
        out: number[];
        inOut: number[];
        in: number[];
        spring: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
    };
    variants: {
        fadeIn: {
            initial: {
                opacity: number;
            };
            animate: {
                opacity: number;
            };
            exit: {
                opacity: number;
            };
        };
        slideUp: {
            initial: {
                opacity: number;
                y: number;
            };
            animate: {
                opacity: number;
                y: number;
            };
            exit: {
                opacity: number;
                y: number;
            };
        };
        slideDown: {
            initial: {
                opacity: number;
                y: number;
            };
            animate: {
                opacity: number;
                y: number;
            };
            exit: {
                opacity: number;
                y: number;
            };
        };
        scaleIn: {
            initial: {
                opacity: number;
                scale: number;
            };
            animate: {
                opacity: number;
                scale: number;
            };
            exit: {
                opacity: number;
                scale: number;
            };
        };
        slideLeft: {
            initial: {
                opacity: number;
                x: number;
            };
            animate: {
                opacity: number;
                x: number;
            };
            exit: {
                opacity: number;
                x: number;
            };
        };
        slideRight: {
            initial: {
                opacity: number;
                x: number;
            };
            animate: {
                opacity: number;
                x: number;
            };
            exit: {
                opacity: number;
                x: number;
            };
        };
        rotateIn: {
            initial: {
                opacity: number;
                rotate: number;
            };
            animate: {
                opacity: number;
                rotate: number;
            };
            exit: {
                opacity: number;
                rotate: number;
            };
        };
        bounce: {
            initial: {
                opacity: number;
                y: number;
                scale: number;
            };
            animate: {
                opacity: number;
                y: number;
                scale: number;
            };
            exit: {
                opacity: number;
                y: number;
                scale: number;
            };
        };
    };
    interactions: {
        hover: {
            y: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
        tap: {
            scale: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
        focus: {
            scale: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
    };
    pageTransition: {
        initial: {
            opacity: number;
            y: number;
        };
        animate: {
            opacity: number;
            y: number;
        };
        exit: {
            opacity: number;
            y: number;
        };
        transition: {
            duration: number;
            ease: number[];
        };
    };
    scrollTrigger: {
        viewport: {
            once: boolean;
            margin: string;
        };
        transition: {
            duration: number;
            ease: number[];
        };
    };
};
interface AnimatedProps {
    children: React.ReactNode;
    variant?: keyof typeof methasAnimations.variants;
    delay?: number;
    duration?: number;
    className?: string;
}
export declare function Animated({ children, variant, delay, duration, className }: AnimatedProps): import("react/jsx-runtime").JSX.Element;
interface ScrollAnimatedProps {
    children: React.ReactNode;
    variant?: keyof typeof methasAnimations.variants;
    delay?: number;
    className?: string;
}
export declare function ScrollAnimated({ children, variant, delay, className }: ScrollAnimatedProps): import("react/jsx-runtime").JSX.Element;
interface InteractiveProps {
    children: React.ReactNode;
    hover?: boolean;
    tap?: boolean;
    focus?: boolean;
    className?: string;
    onClick?: () => void;
}
export declare function Interactive({ children, hover, tap, focus, className, onClick }: InteractiveProps): import("react/jsx-runtime").JSX.Element;
interface StaggeredProps {
    children: React.ReactNode;
    stagger?: number;
    variant?: keyof typeof methasAnimations.variants;
    className?: string;
}
export declare function Staggered({ children, stagger, variant, className }: StaggeredProps): import("react/jsx-runtime").JSX.Element;
interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}
export declare function PageTransition({ children, className }: PageTransitionProps): import("react/jsx-runtime").JSX.Element;
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function LoadingSpinner({ size, className }: LoadingSpinnerProps): import("react/jsx-runtime").JSX.Element;
export declare const useMethasAnimations: () => {
    fadeIn: (delay?: number) => {
        initial: {
            opacity: number;
        };
        animate: {
            opacity: number;
        };
        transition: {
            delay: number;
            duration: number;
        };
    };
    slideUp: (delay?: number) => {
        initial: {
            opacity: number;
            y: number;
        };
        animate: {
            opacity: number;
            y: number;
        };
        transition: {
            delay: number;
            duration: number;
        };
    };
    scaleIn: (delay?: number) => {
        initial: {
            opacity: number;
            scale: number;
        };
        animate: {
            opacity: number;
            scale: number;
        };
        transition: {
            delay: number;
            duration: number;
        };
    };
    duration: {
        fast: number;
        normal: number;
        slow: number;
    };
    easing: {
        out: number[];
        inOut: number[];
        in: number[];
        spring: {
            type: "spring";
            stiffness: number;
            damping: number;
        };
    };
    variants: {
        fadeIn: {
            initial: {
                opacity: number;
            };
            animate: {
                opacity: number;
            };
            exit: {
                opacity: number;
            };
        };
        slideUp: {
            initial: {
                opacity: number;
                y: number;
            };
            animate: {
                opacity: number;
                y: number;
            };
            exit: {
                opacity: number;
                y: number;
            };
        };
        slideDown: {
            initial: {
                opacity: number;
                y: number;
            };
            animate: {
                opacity: number;
                y: number;
            };
            exit: {
                opacity: number;
                y: number;
            };
        };
        scaleIn: {
            initial: {
                opacity: number;
                scale: number;
            };
            animate: {
                opacity: number;
                scale: number;
            };
            exit: {
                opacity: number;
                scale: number;
            };
        };
        slideLeft: {
            initial: {
                opacity: number;
                x: number;
            };
            animate: {
                opacity: number;
                x: number;
            };
            exit: {
                opacity: number;
                x: number;
            };
        };
        slideRight: {
            initial: {
                opacity: number;
                x: number;
            };
            animate: {
                opacity: number;
                x: number;
            };
            exit: {
                opacity: number;
                x: number;
            };
        };
        rotateIn: {
            initial: {
                opacity: number;
                rotate: number;
            };
            animate: {
                opacity: number;
                rotate: number;
            };
            exit: {
                opacity: number;
                rotate: number;
            };
        };
        bounce: {
            initial: {
                opacity: number;
                y: number;
                scale: number;
            };
            animate: {
                opacity: number;
                y: number;
                scale: number;
            };
            exit: {
                opacity: number;
                y: number;
                scale: number;
            };
        };
    };
    interactions: {
        hover: {
            y: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
        tap: {
            scale: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
        focus: {
            scale: number;
            transition: {
                type: string;
                stiffness: number;
                damping: number;
            };
        };
    };
    pageTransition: {
        initial: {
            opacity: number;
            y: number;
        };
        animate: {
            opacity: number;
            y: number;
        };
        exit: {
            opacity: number;
            y: number;
        };
        transition: {
            duration: number;
            ease: number[];
        };
    };
    scrollTrigger: {
        viewport: {
            once: boolean;
            margin: string;
        };
        transition: {
            duration: number;
            ease: number[];
        };
    };
};
export {};
//# sourceMappingURL=animations.d.ts.map