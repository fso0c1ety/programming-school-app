import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const lightColors = {
  primary: '#4A6CF7',
  secondary: '#FFB84C',
  background: '#F6F7FB',
  white: '#FFFFFF',
  text: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  purple: '#8B5CF6',
  cardBg: '#FFFFFF',
  inputBg: '#FFFFFF',
};

const darkColors = {
  primary: '#4A6CF7',
  secondary: '#FFB84C',
  background: '#0F172A',
  white: '#1E293B',
  text: '#F1F5F9',
  textLight: '#94A3B8',
  border: '#334155',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  purple: '#8B5CF6',
  cardBg: '#1E293B',
  inputBg: '#334155',
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme preference
    AsyncStorage.getItem('theme').then((value) => {
      if (value === 'dark') setIsDark(true);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
