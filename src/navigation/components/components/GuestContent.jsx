import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { UserIcon, ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';

const GuestContent = ({ isDarkMode, onLoginPress }) => {
  return (
    <>
      {/* Header Section */}
      <View className="px-6 pt-14 pb-8 border-b border-slate-50 dark:border-slate-800 flex-row items-center">
        <View className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden mr-4">
          <UserIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            Guest
          </Text>
          <Text className="text-slate-400 font-bold text-xs mt-0.5">
            Welcome to Starter Kit
          </Text>
        </View>
      </View>

    </>
  );
};

export default GuestContent;
