import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', isGlass = false, hoverLift = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hoverLift ? { y: -8, transition: { duration: 0.3 } } : {}}
            className={`
        rounded-[2.5rem] p-6 overflow-hidden
        ${isGlass ? 'glass' : 'bg-card text-card-foreground premium-shadow'}
        ${className}
      `}
            {...props}
        >
            {children}
        </motion.div>
    );
};

const CardHeader = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
    <div className={`${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
    <div className={`mt-6 pt-4 border-t ${className}`}>{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter };
