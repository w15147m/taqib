import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'nativewind';
import {getItem, setItem} from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const {colorScheme, setColorScheme, toggleColorScheme} = useColorScheme();
  const [themeLoading, setThemeLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await getItem('theme');
        if (savedTheme) {
          setColorScheme(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setThemeLoading(false);
      }
    };

    loadTheme();
  }, [setColorScheme]);

  const changeTheme = async theme => {
    setColorScheme(theme);
    await setItem('theme', theme);
  };

  const toggleTheme = async () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    toggleColorScheme();
    await setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
        isDarkMode: colorScheme === 'dark',
        toggleTheme,
        setTheme: changeTheme,
        themeLoading,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
