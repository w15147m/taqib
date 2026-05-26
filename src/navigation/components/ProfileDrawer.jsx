import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { SunIcon, MoonIcon, UserIcon, ArrowLeftOnRectangleIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';

import LoggedInContent from './components/LoggedInContent';
import GuestContent from './components/GuestContent';
import LoggedInFooter from './components/LoggedInFooter';
import GuestFooter from './components/GuestFooter';

const ProfileDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to log out?',
      'info',
      () => logout(),
      'Logout'
    );
  };

  const handleEditProfile = () => {
    props.navigation.navigate('TabsRoot', { screen: 'ProfileTab' });
  };

  return (
    <View key={`drawer-${theme}`} style={{ flex: 1 }} className="bg-white dark:bg-slate-900">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {user ? (
          <LoggedInContent 
            user={user} 
            isDarkMode={isDarkMode} 
            handleLogout={handleLogout} 
          />
        ) : (
          <GuestContent 
            isDarkMode={isDarkMode} 
            onLoginPress={() => props.navigation.navigate('Auth')} 
          />
        )}

        {/* Shared Menu Items */}
        <View className="mt-6 px-2 space-y-1">
          {user && (
            <TouchableOpacity 
              onPress={handleEditProfile}
              activeOpacity={0.5}
              className="flex-row items-center px-4 py-4 rounded-2xl"
            >
              <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl items-center justify-center mr-4">
                <UserIcon size={20} color={isDarkMode ? "#a5b4fc" : "#6366f1"} />
              </View>
              <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base">My Profile</Text>
              <ChevronRightIcon size={16} color="#94a3b8" />
            </TouchableOpacity>
          )}

          {/* Theme Toggle (Always Shown) */}
          <View className="flex-row items-center px-5 py-4">
            <View className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl items-center justify-center mr-4">
              {isDarkMode ? (
                <MoonIcon size={20} color="#fbbf24" />
              ) : (
                <SunIcon size={20} color="#f59e0b" />
              )}
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <TouchableOpacity 
              onPress={toggleTheme}
              activeOpacity={0.8}
              className={`w-12 h-6 rounded-full px-1 justify-center ${isDarkMode ? 'bg-indigo-600 items-end' : 'bg-slate-200 items-start'}`}
            >
              <View className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Fixed Footer at the bottom */}
      {user ? (
        <LoggedInFooter handleLogout={handleLogout} />
      ) : (
        <GuestFooter 
          isDarkMode={isDarkMode} 
          onLoginPress={() => props.navigation.navigate('Auth')} 
        />
      )}
    </View>
  );
};

export default ProfileDrawer;
