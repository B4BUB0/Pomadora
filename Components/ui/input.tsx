import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-2 rounded-lg border bg-white text-slate-900 placeholder-slate-400 outline-none transition-colors ${className || ''}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
