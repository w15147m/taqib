import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { AlertProvider } from './src/context/AlertContext';
import AlertModal from './src/components/AlertModal';
import Toast from './src/components/Toast';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import { runMigrations } from './src/db/client';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const MainApp = () => {
  const { isDarkMode } = useTheme();

  return (
    <View key={isDarkMode ? 'dark' : 'light'} style={{ flex: 1 }}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={isDarkMode ? "#0f172a" : "#f8fafc"} 
      />
      <AppNavigator />
      <AlertModal />
      <Toast />
    </View>
  );
};

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await runMigrations();
      } catch (error) {
        // Silent error for UI, or handle as needed
      } finally {
        SplashScreen.hide();
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AlertProvider>
          <MainApp />
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
