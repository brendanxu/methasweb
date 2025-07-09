export declare const colors: {
    readonly primary: {
        readonly 50: "#F0F7FF";
        readonly 100: "#E0EFFF";
        readonly 200: "#B3D9FF";
        readonly 300: "#80C3FF";
        readonly 400: "#4DADFF";
        readonly 500: "#0066CC";
        readonly 600: "#0052A3";
        readonly 700: "#003D7A";
        readonly 800: "#002952";
        readonly 900: "#001429";
    };
    readonly green: {
        readonly 50: "#F0FDF4";
        readonly 100: "#DCFCE7";
        readonly 200: "#BBF7D0";
        readonly 300: "#86EFAC";
        readonly 400: "#4ADE80";
        readonly 500: "#00A651";
        readonly 600: "#008A44";
        readonly 700: "#006E37";
        readonly 800: "#00522A";
        readonly 900: "#00361C";
    };
    readonly orange: {
        readonly 50: "#FFF7ED";
        readonly 100: "#FFEDD5";
        readonly 200: "#FED7AA";
        readonly 300: "#FDBA74";
        readonly 400: "#FB923C";
        readonly 500: "#FF6B35";
        readonly 600: "#EA580C";
        readonly 700: "#C2410C";
        readonly 800: "#9A3412";
        readonly 900: "#7C2D12";
    };
    readonly gray: {
        readonly 50: "#FAFBFC";
        readonly 100: "#F4F5F7";
        readonly 200: "#E9ECEF";
        readonly 300: "#DEE2E6";
        readonly 400: "#CED4DA";
        readonly 500: "#ADB5BD";
        readonly 600: "#6C757D";
        readonly 700: "#495057";
        readonly 800: "#343A40";
        readonly 900: "#212529";
    };
    readonly success: "#00A651";
    readonly warning: "#FFC107";
    readonly error: "#DC3545";
    readonly info: "#17A2B8";
};
export declare const fonts: {
    readonly primary: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
    readonly heading: "Playfair Display, Georgia, serif";
    readonly mono: "IBM Plex Mono, \"SF Mono\", Monaco, monospace";
};
export declare const fontWeights: {
    readonly light: 300;
    readonly normal: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
export declare const fontSizes: {
    readonly xs: "clamp(0.75rem, 2vw, 0.875rem)";
    readonly sm: "clamp(0.875rem, 2.5vw, 1rem)";
    readonly base: "clamp(1rem, 3vw, 1.125rem)";
    readonly lg: "clamp(1.125rem, 3.5vw, 1.25rem)";
    readonly xl: "clamp(1.25rem, 4vw, 1.5rem)";
    readonly '2xl': "clamp(1.5rem, 5vw, 2rem)";
    readonly '3xl': "clamp(2rem, 6vw, 3rem)";
    readonly '4xl': "clamp(2.5rem, 8vw, 4rem)";
    readonly '5xl': "clamp(3rem, 10vw, 5rem)";
};
export declare const spacing: {
    readonly 0: "0";
    readonly 1: "0.25rem";
    readonly 2: "0.5rem";
    readonly 3: "0.75rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 8: "2rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 16: "4rem";
    readonly 20: "5rem";
    readonly 24: "6rem";
    readonly 32: "8rem";
};
export declare const borderRadius: {
    readonly sm: "0.25rem";
    readonly md: "0.5rem";
    readonly lg: "0.75rem";
    readonly xl: "1rem";
    readonly '2xl': "1.5rem";
    readonly full: "9999px";
};
export declare const shadows: {
    readonly sm: "0 1px 3px rgba(0, 0, 0, 0.08)";
    readonly md: "0 4px 12px rgba(0, 0, 0, 0.1)";
    readonly lg: "0 8px 24px rgba(0, 0, 0, 0.12)";
    readonly xl: "0 16px 48px rgba(0, 0, 0, 0.15)";
    readonly '2xl': "0 24px 64px rgba(0, 0, 0, 0.2)";
};
export declare const transitions: {
    readonly fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)";
    readonly normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)";
    readonly slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)";
};
export declare const easing: {
    readonly 'in-out': "cubic-bezier(0.16, 1, 0.3, 1)";
    readonly out: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly in: "cubic-bezier(0.4, 0, 1, 1)";
};
export declare const breakpoints: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
};
export declare const zIndex: {
    readonly dropdown: 1000;
    readonly sticky: 1020;
    readonly fixed: 1030;
    readonly modalBackdrop: 1040;
    readonly modal: 1050;
    readonly popover: 1060;
    readonly tooltip: 1070;
    readonly toast: 1080;
};
export declare const designTokens: {
    readonly colors: {
        readonly primary: {
            readonly 50: "#F0F7FF";
            readonly 100: "#E0EFFF";
            readonly 200: "#B3D9FF";
            readonly 300: "#80C3FF";
            readonly 400: "#4DADFF";
            readonly 500: "#0066CC";
            readonly 600: "#0052A3";
            readonly 700: "#003D7A";
            readonly 800: "#002952";
            readonly 900: "#001429";
        };
        readonly green: {
            readonly 50: "#F0FDF4";
            readonly 100: "#DCFCE7";
            readonly 200: "#BBF7D0";
            readonly 300: "#86EFAC";
            readonly 400: "#4ADE80";
            readonly 500: "#00A651";
            readonly 600: "#008A44";
            readonly 700: "#006E37";
            readonly 800: "#00522A";
            readonly 900: "#00361C";
        };
        readonly orange: {
            readonly 50: "#FFF7ED";
            readonly 100: "#FFEDD5";
            readonly 200: "#FED7AA";
            readonly 300: "#FDBA74";
            readonly 400: "#FB923C";
            readonly 500: "#FF6B35";
            readonly 600: "#EA580C";
            readonly 700: "#C2410C";
            readonly 800: "#9A3412";
            readonly 900: "#7C2D12";
        };
        readonly gray: {
            readonly 50: "#FAFBFC";
            readonly 100: "#F4F5F7";
            readonly 200: "#E9ECEF";
            readonly 300: "#DEE2E6";
            readonly 400: "#CED4DA";
            readonly 500: "#ADB5BD";
            readonly 600: "#6C757D";
            readonly 700: "#495057";
            readonly 800: "#343A40";
            readonly 900: "#212529";
        };
        readonly success: "#00A651";
        readonly warning: "#FFC107";
        readonly error: "#DC3545";
        readonly info: "#17A2B8";
    };
    readonly fonts: {
        readonly primary: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly heading: "Playfair Display, Georgia, serif";
        readonly mono: "IBM Plex Mono, \"SF Mono\", Monaco, monospace";
    };
    readonly fontWeights: {
        readonly light: 300;
        readonly normal: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly fontSizes: {
        readonly xs: "clamp(0.75rem, 2vw, 0.875rem)";
        readonly sm: "clamp(0.875rem, 2.5vw, 1rem)";
        readonly base: "clamp(1rem, 3vw, 1.125rem)";
        readonly lg: "clamp(1.125rem, 3.5vw, 1.25rem)";
        readonly xl: "clamp(1.25rem, 4vw, 1.5rem)";
        readonly '2xl': "clamp(1.5rem, 5vw, 2rem)";
        readonly '3xl': "clamp(2rem, 6vw, 3rem)";
        readonly '4xl': "clamp(2.5rem, 8vw, 4rem)";
        readonly '5xl': "clamp(3rem, 10vw, 5rem)";
    };
    readonly spacing: {
        readonly 0: "0";
        readonly 1: "0.25rem";
        readonly 2: "0.5rem";
        readonly 3: "0.75rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 8: "2rem";
        readonly 10: "2.5rem";
        readonly 12: "3rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
        readonly 32: "8rem";
    };
    readonly borderRadius: {
        readonly sm: "0.25rem";
        readonly md: "0.5rem";
        readonly lg: "0.75rem";
        readonly xl: "1rem";
        readonly '2xl': "1.5rem";
        readonly full: "9999px";
    };
    readonly shadows: {
        readonly sm: "0 1px 3px rgba(0, 0, 0, 0.08)";
        readonly md: "0 4px 12px rgba(0, 0, 0, 0.1)";
        readonly lg: "0 8px 24px rgba(0, 0, 0, 0.12)";
        readonly xl: "0 16px 48px rgba(0, 0, 0, 0.15)";
        readonly '2xl': "0 24px 64px rgba(0, 0, 0, 0.2)";
    };
    readonly transitions: {
        readonly fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)";
        readonly slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)";
    };
    readonly easing: {
        readonly 'in-out': "cubic-bezier(0.16, 1, 0.3, 1)";
        readonly out: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly in: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly breakpoints: {
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
    readonly zIndex: {
        readonly dropdown: 1000;
        readonly sticky: 1020;
        readonly fixed: 1030;
        readonly modalBackdrop: 1040;
        readonly modal: 1050;
        readonly popover: 1060;
        readonly tooltip: 1070;
        readonly toast: 1080;
    };
};
export type ColorScale = typeof colors.primary;
export type ColorName = keyof typeof colors;
export type FontSize = keyof typeof fontSizes;
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
export type Transition = keyof typeof transitions;
export type Breakpoint = keyof typeof breakpoints;
export type ZIndex = keyof typeof zIndex;
export default designTokens;
