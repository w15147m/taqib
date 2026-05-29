import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ArrowPathIcon, MapPinIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import useLocation from '../../common/hooks/useLocation';
import Header from '../../common/components/Header';
import useSettingsLogic from './hooks/useSettingsLogic';
import SettingSection from './components/SettingSection';

const Settings = () => {
  const {isDarkMode} = useTheme();
  const {locationName, resetLocation} = useLocation();
  const {
    showTranslation,
    showArabic,
    arabicFontSize,
    urduFontSize,
    adjustFontSize,
    resetSettings,
  } = useSettingsLogic();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Transparent Header */}
      <Header title="سیٹنگز" />

      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Arabic Section */}
        <SettingSection
          title="عربی"
          isActive={showArabic}
          fontSize={arabicFontSize}
          onDecrement={() => adjustFontSize('arabic', 'decrement')}
          onIncrement={() => adjustFontSize('arabic', 'increment')}
          isArabic={true}
          previewText="بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِیمِ"
          disabledText="عربی متن غیر فعال ہے"
          isDarkMode={isDarkMode}
        />

        {/* Urdu Section */}
        <SettingSection
          title="اردو"
          isActive={showTranslation}
          fontSize={urduFontSize}
          onDecrement={() => adjustFontSize('urdu', 'decrement')}
          onIncrement={() => adjustFontSize('urdu', 'increment')}
          isArabic={false}
          previewText="یہ اردو ترجمہ کا پیش نظارہ ہے۔"
          disabledText="ترجمہ غیر فعال ہے"
          isDarkMode={isDarkMode}
        />

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

        {/* Reset Location Button */}
        <View className="mt-4 items-center">
          <TouchableOpacity
            onPress={resetLocation}
            activeOpacity={0.7}
            className="flex-row items-center justify-center border border-emerald-600 dark:border-emerald-400 rounded-2xl py-4 px-8 w-full max-w-xs bg-transparent">
            <MapPinIcon size={20} color={isDarkMode ? '#34d399' : '#059669'} />
            <Text className="text-emerald-600 dark:text-emerald-400 font-quran-header text-lg ml-3">
              {locationName
                ? `لوکیشن ری سیٹ کریں (${locationName})`
                : 'لوکیشن ری سیٹ کریں'}
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
