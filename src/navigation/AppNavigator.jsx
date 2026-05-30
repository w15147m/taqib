import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {ActivityIndicator, View} from 'react-native';

// Navigators
import MainDrawerNavigator from './components/MainDrawerNavigator';
import AuthNavigator from './components/AuthNavigator';

import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';

const AppNavigator = () => {
  const {user, loading} = useContext(AuthContext);
  const {isDarkMode} = useTheme();

  // 2. Auth Loading State
  if (loading) {
    return (
      <View
        className={`flex-1 ${
          isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'
        } justify-center items-center`}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // 3. Main Navigation Root - Show Auth or App based on user state
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      {user ? <MainDrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
