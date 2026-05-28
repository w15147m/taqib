import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  SunIcon,
  MoonIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  BeakerIcon,
} from 'react-native-heroicons/outline';
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
          {/* Theme Toggle Button */}
          <TouchableOpacity
            onPress={toggleTheme}
            activeOpacity={0.7}
            className="flex-row items-center px-5 py-4 rounded-2xl">
            <View className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl items-center justify-center mr-4">
              {isDarkMode ? (
                <SunIcon size={20} color="#f59e0b" />
              ) : (
                <MoonIcon size={20} color="#fbbf24" />
              )}
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base text-left">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>

          {/* About Book Navigation Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('About')}
            activeOpacity={0.7}
            className="flex-row items-center px-5 py-4 rounded-2xl">
            <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl items-center justify-center mr-4">
              <BookOpenIcon
                size={20}
                color={isDarkMode ? '#a5b4fc' : '#6366f1'}
              />
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base text-left">
              تعارفِ کتاب
            </Text>
          </TouchableOpacity>

          {/* Disclaimer Navigation Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Disclaimer')}
            activeOpacity={0.7}
            className="flex-row items-center px-5 py-4 rounded-2xl">
            <View className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 rounded-xl items-center justify-center mr-4">
              <ExclamationTriangleIcon
                size={20}
                color={isDarkMode ? '#fda4af' : '#f43f5e'}
              />
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base text-left">
              دستبرداری
            </Text>
          </TouchableOpacity>

          {/* Settings Navigation Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Settings')}
            activeOpacity={0.7}
            className="flex-row items-center px-5 py-4 rounded-2xl">
            <View className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl items-center justify-center mr-4">
              <Cog6ToothIcon
                size={20}
                color={isDarkMode ? '#cbd5e1' : '#475569'}
              />
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base text-left">
              سیٹنگز
            </Text>
          </TouchableOpacity>

          {/* Test Page Navigation Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TestPage')}
            activeOpacity={0.7}
            className="flex-row items-center px-5 py-4 rounded-2xl">
            <View className="w-10 h-10 bg-violet-50 dark:bg-violet-900/30 rounded-xl items-center justify-center mr-4">
              <BeakerIcon
                size={20}
                color={isDarkMode ? '#c4b5fd' : '#7c3aed'}
              />
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base text-left">
              Test Page
            </Text>
          </TouchableOpacity>
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
