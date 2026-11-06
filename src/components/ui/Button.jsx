const variants = {
  coral: 'btn-coral',
  sun: 'btn-sun',
  outline: 'btn-outline-toy',
  ghost: 'btn-ghost-toy',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  as: As = 'button',
  variant = 'coral',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <As className={`${variants[variant] || variants.coral} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {children}
    </As>
  );
}
