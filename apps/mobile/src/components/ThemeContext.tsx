import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemePreset, defaultTheme } from '../styles/themes';

// Theme Context Type
interface ThemeContextType {
  currentTheme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(defaultTheme);

  const setTheme = (theme: ThemePreset) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 