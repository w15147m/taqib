import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import HeaderText from './HeaderText';

const Header = ({ title, showSearchIcon = false, isSearching = false, onSearchPress }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <View className="flex-row justify-between items-center px-6 pt-4 mb-2">
      <View>
        <HeaderText className="text-3xl text-slate-900 dark:text-white text-right">
          {title}
        </HeaderText>
      </View>
      <View className="flex-row items-center">
        {showSearchIcon && (
          <TouchableOpacity
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 mr-2"
            onPress={onSearchPress}>
            {isSearching ? (
              <XMarkIcon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
            ) : (
              <MagnifyingGlassIcon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
          onPress={() => navigation.openDrawer()}>
          <Bars3Icon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
