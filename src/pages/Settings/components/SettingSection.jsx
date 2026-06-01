import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import ArabicText from '../../../common/components/ArabicText';
import UrduText from '../../../common/components/UrduText';

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
      <View className="w-full bg-slate-50 dark:bg-slate-900/40 py-3 px-4 rounded-2xl border border-slate-100 dark:border-slate-900 min-h-[70px] justify-center">
        {isActive ? (
          isArabic ? (
            <ArabicText className="text-slate-800 dark:text-slate-100 leading-relaxed">
              {previewText}
            </ArabicText>
          ) : (
            <UrduText
              style={styles.urduTextPreview}
              className="text-slate-700 dark:text-slate-300 font-semibold text-right leading-relaxed">
              {previewText}
            </UrduText>
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
  urduTextPreview: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginVertical: 0,
  },
});

export default SettingSection;
