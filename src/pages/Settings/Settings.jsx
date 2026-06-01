import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ArrowPathIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import useLocation from '../../common/hooks/useLocation';
import Header from '../../common/components/Header';
import useSettingsLogic from './hooks/useSettingsLogic';
import SettingSection from './components/SettingSection';
import {useAlert} from '../../context/AlertContext';
import LocationModal from './components/LocationModal';

const Settings = () => {
  const {isDarkMode} = useTheme();
  const {locationName, resetLocation, geocodeCity, loading: locationLoading} = useLocation();
  const {showToast} = useAlert();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    showTranslation,
    showArabic,
    arabicFontSize,
    urduFontSize,
    adjustFontSize,
    resetSettings,
  } = useSettingsLogic();

  const handleResetSettings = () => {
    resetSettings();
    showToast('آپ کی سیٹنگز ری سیٹ ہو گئی ہیں۔', 'success');
  };

  const handleSelectGPS = async () => {
    try {
      await resetLocation();
      showToast('لوکیشن کامیابی سے اپ ڈیٹ ہو گئی ہے', 'success');
      setModalVisible(false);
    } catch {
      showToast('لوکیشن اپ ڈیٹ کرنے میں ناکامی ہوئی', 'error');
    }
  };

  const handleSelectCity = async (city) => {
    const success = await geocodeCity(city);
    if (success) {
      showToast('شہر کی لوکیشن تبدیل کر دی گئی ہے', 'success');
      setModalVisible(false);
    } else {
      showToast('شہر تلاش کرنے میں ناکامی ہوئی', 'error');
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

        {/* Location Section */}
        <View className="py-6 border-b border-slate-100 dark:border-slate-900 w-full">
          {/* Location Info & Refresh Button Row (Entire Card Clickable) */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            className="w-full bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 min-h-[80px] flex-row justify-between items-center px-6">
            
            {/* Refresh/Reset Icon Container */}
            <View className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
              <ArrowPathIcon
                size={18}
                color={isDarkMode ? '#34d399' : '#059669'}
              />
            </View>

            {/* Current City Name */}
            <View className="flex-1 items-end pr-4">
              <Text className="text-xs text-slate-400 dark:text-slate-500 font-bold mb-1">
                موجودہ شہر
              </Text>
              <Text className="text-base font-bold text-slate-800 dark:text-slate-100">
                {locationName || 'دستیاب نہیں ہے'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Reset Settings Button */}
        <View className="mt-12 items-center">
          <TouchableOpacity
            onPress={handleResetSettings}
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

      {/* Location Selector Modal */}
      <LocationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectGPS={handleSelectGPS}
        onSelectCity={handleSelectCity}
        loading={locationLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
});

export default Settings;
