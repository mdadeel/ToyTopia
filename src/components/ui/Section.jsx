import React from 'react';

const Section = ({ children, title, subtitle, className = '', containerClassName = '', ...props }) => {
    return (
        <section className={`py-16 md:py-16 px-4 ${className}`} {...props}>
            <div className={`max-w-7xl mx-auto ${containerClassName}`}>
                {(title || subtitle) && (
                    <div className="text-center mb-12 md:mb-16">
                        {title && <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{title}</h2>}
                        {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
