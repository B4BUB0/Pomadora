import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className={`w-full h-2 appearance-none bg-slate-200 rounded-lg ${className || ''}`}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';
