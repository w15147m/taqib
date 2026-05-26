import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';

const LoggedInFooter = ({ handleLogout }) => {
  return (
    <View className="px-6 py-6 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900">
      <TouchableOpacity 
        onPress={handleLogout}
        activeOpacity={0.5}
        className="flex-row items-center py-2"
      >
        <View className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-xl items-center justify-center mr-4">
          <ArrowLeftOnRectangleIcon size={20} color="#f43f5e" />
        </View>
        <Text className="text-rose-600 dark:text-rose-400 font-bold text-base">Logout Account</Text>
      </TouchableOpacity>
      
      <View className="mt-6">
        <Text className="text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[2px] text-center">
          VERSION 1.0.2 • PREMIUM
        </Text>
      </View>
    </View>
  );
};

export default LoggedInFooter;
