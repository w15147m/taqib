import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {useSettings} from '../context/SettingsContext';
import Header from '../common/components/Header';
import ArabicText from '../common/components/ArabicText';
import UrduText from '../common/components/UrduText';

const Settings = () => {
  const {isDarkMode} = useTheme();
  const {
    showTranslation,
    showArabic,
    arabicFontSize,
    urduFontSize,
    setArabicFontSize,
    setUrduFontSize,
    resetSettings,
  } = useSettings();

  const adjustFontSize = (type, action) => {
    if (type === 'arabic') {
      const next =
        action === 'increment' ? arabicFontSize + 2 : arabicFontSize - 2;
      setArabicFontSize(Math.max(16, Math.min(50, next)));
    } else {
      const next = action === 'increment' ? urduFontSize + 1 : urduFontSize - 1;
      setUrduFontSize(Math.max(12, Math.min(30, next)));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Transparent Header */}
      <Header title="سیٹنگز" />

      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Toggle Switches Row */}
        {/* <View className="flex-row justify-between items-center py-6 border-b border-slate-100 dark:border-slate-900">
          <View className="flex-row items-center flex-1 justify-start">
            <Text className="text-slate-800 dark:text-slate-200 text-lg font-quran-header mr-3">
              ترجمہ
            </Text>
            <Switch
              trackColor={{ false: '#cbd5e1', true: '#818cf8' }}
              thumbColor={showTranslation ? '#ffffff' : '#f1f5f9'}
              ios_backgroundColor="#cbd5e1"
              onValueChange={setShowTranslation}
              value={showTranslation}
            />
          </View>
          <View className="flex-row items-center flex-1 justify-end">
            <Text className="text-slate-800 dark:text-slate-200 text-lg font-quran-header mr-3">
              عربی
            </Text>
            <Switch
              trackColor={{ false: '#cbd5e1', true: '#818cf8' }}
              thumbColor={showArabic ? '#ffffff' : '#f1f5f9'}
              ios_backgroundColor="#cbd5e1"
              onValueChange={setShowArabic}
              value={showArabic}
            />
          </View>
        </View> */}

        {/* Arabic Section */}
        <View
          style={{opacity: showArabic ? 1 : 0.3}}
          className="py-6 border-b border-slate-100 dark:border-slate-900 w-full">
          <View className="items-center mb-4">
            <Text className="text-slate-700 dark:text-slate-300 text-xl font-quran-header font-bold">
              عربی
            </Text>
          </View>

          {/* Full-width Adjuster Controls */}
          <View className="flex-row justify-between items-center w-full px-8 mb-6">
            <TouchableOpacity
              onPress={() => adjustFontSize('arabic', 'decrement')}
              disabled={!showArabic}
              activeOpacity={0.7}
              className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
              <MinusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
            </TouchableOpacity>
            <Text className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              {arabicFontSize}
            </Text>
            <TouchableOpacity
              onPress={() => adjustFontSize('arabic', 'increment')}
              disabled={!showArabic}
              activeOpacity={0.7}
              className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
              <PlusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
            </TouchableOpacity>
          </View>

          {/* Full-width Preview */}
          <View className="w-full bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 min-h-[90px] justify-center">
            {showArabic ? (
              <ArabicText className="text-slate-800 dark:text-slate-100 leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِیمِ
              </ArabicText>
            ) : (
              <Text className="text-slate-400 dark:text-slate-600 text-xs italic text-center font-quran-header">
                عربی متن غیر فعال ہے
              </Text>
            )}
          </View>
        </View>

        {/* Urdu Section */}
        <View
          style={{opacity: showTranslation ? 1 : 0.3}}
          className="py-6 border-b border-slate-100 dark:border-slate-900 w-full">
          <View className="items-center mb-4">
            <Text className="text-slate-700 dark:text-slate-300 text-xl font-quran-header font-bold">
              اردو
            </Text>
          </View>

          {/* Full-width Adjuster Controls */}
          <View className="flex-row justify-between items-center w-full px-8 mb-6">
            <TouchableOpacity
              onPress={() => adjustFontSize('urdu', 'decrement')}
              disabled={!showTranslation}
              activeOpacity={0.7}
              className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
              <MinusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
            </TouchableOpacity>
            <Text className="text-slate-800 dark:text-slate-100 text-2xl font-bold">
              {urduFontSize}
            </Text>
            <TouchableOpacity
              onPress={() => adjustFontSize('urdu', 'increment')}
              disabled={!showTranslation}
              activeOpacity={0.7}
              className="w-14 h-14 rounded-full border border-slate-300 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
              <PlusIcon size={22} color={isDarkMode ? '#e2e8f0' : '#475569'} />
            </TouchableOpacity>
          </View>

          {/* Full-width Preview */}
          <View className="w-full bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 min-h-[70px] justify-center">
            {showTranslation ? (
              <UrduText
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  padding: 0,
                  marginVertical: 0,
                }}
                className="text-slate-700 dark:text-slate-300 font-semibold text-right leading-relaxed">
                یہ اردو ترجمہ کا پیش نظارہ ہے۔
              </UrduText>
            ) : (
              <Text className="text-slate-400 dark:text-slate-600 text-xs italic text-center font-quran-header">
                ترجمہ غیر فعال ہے
              </Text>
            )}
          </View>
        </View>

        {/* Reset Settings Button */}
        <View className="mt-12 items-center">
          <TouchableOpacity
            onPress={resetSettings}
            activeOpacity={0.7}
            className="flex-row items-center justify-center border border-indigo-600 dark:border-indigo-400 rounded-2xl py-4 px-8 w-full max-w-xs bg-transparent">
            <ArrowPathIcon
              size={20}
              color={isDarkMode ? '#818cf8' : '#4f46e5'}
            />
            <Text className="text-indigo-600 dark:text-indigo-400 font-quran-header text-lg ml-3">
              سیٹنگز واپس پلٹائیں
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
});

export default Settings;
