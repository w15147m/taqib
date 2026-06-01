import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';

const SettingSection = ({
  title,
  isActive,
  fontSize,
  onDecrement,
  onIncrement,
  isArabic,
  previewText,
  disabledText,
  isDarkMode,
}) => {
  return (
    <View
      style={isActive ? styles.containerActive : styles.containerInactive}
      className="py-4 border-b border-slate-100 dark:border-slate-900 w-full">

      {/* Full-width Adjuster Controls */}
      <View className="flex-row justify-between items-center w-full px-8 mb-3">
        <TouchableOpacity
          onPress={onDecrement}
          disabled={!isActive}
          activeOpacity={0.7}
          className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
          <MinusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
        </TouchableOpacity>
        <Text className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
          {fontSize}
        </Text>
        <TouchableOpacity
          onPress={onIncrement}
          disabled={!isActive}
          activeOpacity={0.7}
          className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
          <PlusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
        </TouchableOpacity>
      </View>

      {/* Full-width Preview */}
      <View className="w-full mt-2">
        {isActive ? (
          isArabic ? (
            <Text
              style={{fontSize}}
              className="font-quran-content text-slate-800 dark:text-slate-100 text-center leading-relaxed">
              {previewText}
            </Text>
          ) : (
            <Text
              style={{fontSize}}
              className="text-slate-700 dark:text-slate-300 font-semibold text-right leading-relaxed">
              {previewText}
            </Text>
          )
        ) : (
          <Text className="text-slate-400 dark:text-slate-600 text-xs italic text-center font-quran-header">
            {disabledText}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    opacity: 1,
  },
  containerInactive: {
    opacity: 0.3,
  },
});

export default SettingSection;
