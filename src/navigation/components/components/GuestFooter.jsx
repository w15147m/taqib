import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';

const GuestFooter = ({ isDarkMode, onLoginPress }) => {
  return (
    <View className="px-6 py-6 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900">
      <TouchableOpacity 
        onPress={onLoginPress}
        activeOpacity={0.5}
        className="flex-row items-center py-2"
      >
        <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl items-center justify-center mr-4">
          <ArrowLeftOnRectangleIcon size={20} color={isDarkMode ? "#a5b4fc" : "#6366f1"} />
        </View>
        <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-base">Login Account</Text>
      </TouchableOpacity>
      
      <View className="mt-6">
        <Text className="text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[2px] text-center">
          VERSION 1.0.2 • PREMIUM
        </Text>
      </View>
    </View>
  );
};

export default GuestFooter;
