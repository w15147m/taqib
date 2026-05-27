import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {SunIcon, MoonIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';

const ProfileDrawer = props => {
  const {theme, toggleTheme, isDarkMode} = useTheme();

  return (
    <View
      key={`drawer-${theme}`}
      style={styles.container}
      className="bg-white dark:bg-slate-900">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Image */}
        <View className="items-center justify-center py-8 border-b border-slate-100 dark:border-slate-800">
          <Image
            source={require('../../assets/images/parts/text_taqeebat.png')}
            style={styles.headerImage}
          />
        </View>

        {/* Shared Menu Items */}
        <View className="mt-6 px-2 space-y-1">
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
              className={`w-12 h-6 rounded-full px-1 justify-center ${
                isDarkMode
                  ? 'bg-indigo-600 items-end'
                  : 'bg-slate-200 items-start'
              }`}>
              <View className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  headerImage: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
});

export default ProfileDrawer;
