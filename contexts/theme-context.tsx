import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    headerBackground: string;
    headerText: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const lightTheme = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E5E5E5',
  primary: '#3E4ADE',
  headerBackground: '#3E4ADE',
  headerText: '#FFFFFF',
};

export const darkTheme = {
  background: '#181818',
  card: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#999999',
  border: '#3A3A3A',
  primary: '#3E4ADE',
  headerBackground: '#181818',
  headerText: '#FFFFFF',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
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
