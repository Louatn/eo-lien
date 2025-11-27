'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'NO' | 'BB';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  showAds: boolean;
  toggleAds: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('BB');
  const [showAds, setShowAds] = useState<boolean>(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedAds = localStorage.getItem('showAds');
    if (savedTheme === 'NO' || savedTheme === 'BB') {
      setTheme(savedTheme);
    }
    if (savedAds === 'false') {
      setShowAds(false);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('showAds', String(showAds));
  }, [showAds]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'BB' ? 'NO' : 'BB');
  };

  const toggleAds = () => {
    setShowAds(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, showAds, toggleAds }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
