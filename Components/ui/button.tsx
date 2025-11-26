import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
      icon: 'w-10 h-10 p-2',
    };

    const variantClasses: Record<string, string> = {
      default: 'bg-indigo-500 text-white hover:bg-indigo-600',
      outline: 'bg-transparent border border-slate-200 dark:border-slate-700',
      ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
    };

    const classes = `rounded-lg font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant] || ''} ${className || ''}`;

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
