import React from 'react';
import {StatusBar, View} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import {AlertProvider} from './src/context/AlertContext';
import AlertModal from './src/common/components/AlertModal';
import Toast from './src/common/components/Toast';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {SettingsProvider} from './src/context/SettingsContext';
import {AppInitializer} from './src/common/components/AppInitializer';
import {LocationProvider} from './src/context/LocationContext';

const MainApp = () => {
  const {isDarkMode} = useTheme();

  return (
    <View key={isDarkMode ? 'dark' : 'light'} style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#0f172a' : '#f8fafc'}
      />
      <AppNavigator />
      <AlertModal />
      <Toast />
    </View>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <SettingsProvider>
          <AppInitializer>
            <AuthProvider>
              <AlertProvider>
                <MainApp />
              </AlertProvider>
            </AuthProvider>
          </AppInitializer>
        </SettingsProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
