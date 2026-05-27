import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bars3Icon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import HeaderText from './HeaderText';

const Header = ({title}) => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();

  return (
    <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
      <View>
        <HeaderText className="text-3xl text-slate-900 dark:text-white text-right">
          {title}
        </HeaderText>
      </View>
      <TouchableOpacity
        className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
        onPress={() => navigation.openDrawer()}>
        <Bars3Icon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
