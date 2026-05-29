import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView,
  View,
} from 'react-native';
import {ExclamationTriangleIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import Header from '../common/components/Header';

const Disclaimer = () => {
  const {isDarkMode} = useTheme();

  const handleOpenWhatsApp = () => {
    Linking.openURL('https://wa.me/923130930399').catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Header */}
      <Header title="گزارش" />

      {/* Content Container */}
      <ScrollView
        className="flex-1 px-6 pt-2"
        showsVerticalScrollIndicator={false}>
        {/* Decorative Icon */}
        <View className="items-center justify-center mb-6 mt-4">
          <View className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 rounded-2xl items-center justify-center">
            <ExclamationTriangleIcon
              size={32}
              color={isDarkMode ? '#fda4af' : '#f43f5e'}
            />
          </View>
        </View>

        {/* Details Card */}
        <View className="w-full">
          <Text className="text-slate-800 dark:text-slate-100 text-lg text-right leading-7 mb-4">
            اس ایپ کو تیار کرنے کا مقصد مومنین کے لیے تعقیباتِ نماز، سورتیں اور
            دعائیں ایک جگہ فراہم کرنا ہے۔ ہماری پوری کوشش رہی ہے کہ تمام متن
            درست اور املا کی غلطیوں سے پاک ہو۔
          </Text>

          <Text className="text-slate-800 dark:text-slate-100 text-lg text-right leading-7 mb-6">
            تاہم، انسان ہونے کے ناطے کسی بھی قسم کی غیر ارادی غلطی یا املا کی
            فروگزاشت کا امکان موجود ہے۔ اگر آپ کو ایپ یا کسی آیت، دعا، یا تعقیب
            کے متن میں کوئی غلطی نظر آئے، تو براہِ کرم نیچے دیے گئے نمبر پر ہمیں
            میسج کریں۔
          </Text>
        </View>

        {/* Divider */}
        <View className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-6" />

        {/* Contact Section */}
        <HeaderText className="text-xl text-slate-900 dark:text-white mb-4 text-center">
          غلطی کی نشاندہی کے لیے رابطہ
        </HeaderText>

        <View className="w-full mb-10">
          <View className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
            <TouchableOpacity onPress={handleOpenWhatsApp}>
              <Text className="text-rose-600 dark:text-rose-400 font-semibold text-lg">
                03130930399
              </Text>
            </TouchableOpacity>
            <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-24 text-left">
              واٹس ایپ
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Disclaimer;
