import React, { useState, useRef, useEffect } from 'react';
import { filterArabicNames } from '../data/arabicNames';
import { playSound } from '../utils/sounds';

interface NameAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

export function NameAutocomplete({ value, onChange, placeholder, required }: NameAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside of the component
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.length >= 1) {
      setSuggestions(filterArabicNames(newValue));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    playSound.click();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => value && setSuggestions(filterArabicNames(value))}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 
                 text-white font-bold placeholder-white/50 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 
                       first:rounded-t-lg last:rounded-b-lg transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}