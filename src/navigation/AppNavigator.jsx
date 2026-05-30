import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Navigators
import MainDrawerNavigator from './components/MainDrawerNavigator';

import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';

const AppNavigator = () => {
  const {isDarkMode} = useTheme();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
