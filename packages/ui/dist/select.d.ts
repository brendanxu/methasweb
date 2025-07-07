import React from 'react';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    variant?: 'default' | 'filled';
    selectSize?: 'sm' | 'md' | 'lg';
    options: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export { Select };
//# sourceMappingURL=select.d.ts.map