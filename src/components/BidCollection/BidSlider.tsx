import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface BidSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function BidSlider({ value, onChange, disabled = false }: BidSliderProps) {
  const handleChange = (newValue: number) => {
    if (newValue >= 0 && newValue <= 27) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => handleChange(value - 1)}
        disabled={disabled || value <= 0}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <div className="relative w-48">
        <input
          type="range"
          min="0"
          max="27"
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
        />
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium">{value}</span>
        </div>
      </div>

      <button
        onClick={() => handleChange(value + 1)}
        disabled={disabled || value >= 27}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}