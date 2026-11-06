import { motion } from 'framer-motion';

export function Card({ className = '', children, hover = true, ...props }) {
  return (
    <div className={`panel ${hover ? 'transition-transform duration-300 hover:-translate-y-1' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export function CardContent({ className = '', children }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
export function CardFooter({ className = '', children }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
