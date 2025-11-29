import React from 'react';

const Slider = React.forwardRef(
  ({ className = '', min = 0, max = 100, step = 1, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${className}`}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
