import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from './button';

export const ThemeToggle = ({ className = '', size = 'default' }) => {
  const themeContext = useTheme();
  const { theme, toggleTheme, isDark, mounted } = themeContext || { 
    theme: 'light', 
    toggleTheme: () => {}, 
    isDark: false, 
    mounted: false 
  };

  const showLoadingState = !mounted;

  if (showLoadingState) {
    return (
      <Button
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'default'}
        className={`relative p-2 rounded-full transition-all duration-300 hover:bg-gray-100 ${className}`}
        disabled
      >
        <div className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'sm' : 'default'}
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          } text-yellow-500`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          } text-blue-400`}
        />
      </div>
    </Button>
  );
};