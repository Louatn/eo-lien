'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  showAds: boolean;
  toggleAds: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [showAds, setShowAds] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    const savedAds = localStorage.getItem('showAds');
    setTheme(savedTheme);
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
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
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
