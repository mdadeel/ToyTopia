import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 premium-shadow',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 premium-shadow',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-primary/10 text-primary',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : children}
    </motion.button>
  );
};

export default Button;
