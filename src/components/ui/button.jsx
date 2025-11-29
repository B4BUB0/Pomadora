import React from 'react';

const Button = React.forwardRef(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-indigo-500 text-white hover:bg-indigo-600',
      outline: 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
      ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    };

    const variantClass = variants[variant] || variants.default;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantClass} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
