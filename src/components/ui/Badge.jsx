import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        accent: 'bg-accent/10 text-accent border-accent/20',
        outline: 'border-border text-muted-foreground',
    };

    return (
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
