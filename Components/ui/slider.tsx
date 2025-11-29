import React from 'react';

type SliderProps = {
  value?: number;
  onValueChange?: (v: number[] | number) => void;
} & any;

export const Slider = ({ value = 0, onValueChange, ...props }: SliderProps) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (typeof onValueChange === 'function') onValueChange([val]);
      }}
      {...props}
    />
  );
};

export default Slider;
import React from 'react';

type SliderProps = {
  value?: number;
  onValueChange?: (v: number[] | number) => void;
} & any;

export const Slider = ({ value = 0, onValueChange, ...props }: SliderProps) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (typeof onValueChange === 'function') onValueChange([val]);
      }}
      {...props}
    />
  );
};

export default Slider;
