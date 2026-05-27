import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {BookOpenIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import Header from '../common/components/Header';

const About = () => {
  const {isDarkMode} = useTheme();

  const handleOpenLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/waseemln/').catch(err =>
      console.error('An error occurred', err),
    );
  };

  const handleOpenWhatsApp = () => {
    Linking.openURL('https://wa.me/923130930399').catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Header */}
      <Header title="تعارفِ کتاب" />

      {/* Content Container */}
      <View className="flex-1 px-6 justify-center items-center">
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full border border-slate-100/50 dark:border-slate-850/50 shadow-sm items-center">
          {/* Decorative Icon */}
          <View className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl items-center justify-center mb-6">
            <BookOpenIcon
              size={32}
              color={isDarkMode ? '#a5b4fc' : '#6366f1'}
            />
          </View>

          {/* Details Card */}
          <View className="w-full">
            <View className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
              <Text className="text-slate-800 dark:text-slate-100 font-semibold text-lg text-right flex-1 pr-2">
                تعقیباتِ نماز
              </Text>
              <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-16 text-left">
                کتاب
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
              <Text className="text-slate-800 dark:text-slate-100 font-semibold text-lg text-right flex-1 pr-2">
                جامعہ عروۃ الوثقیٰ
              </Text>
              <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-16 text-left">
                ناشر
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-4">
              <Text className="text-slate-800 dark:text-slate-100 font-semibold text-lg text-right flex-1 pr-2">
                ۱۰ ذی الحجہ ۱۴۴۷ھ / ۲۷ مئی ۲۰۲۶ء
              </Text>
              <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-16 text-left">
                تاریخ
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-6" />

          {/* Developer Section */}
          <HeaderText className="text-xl text-slate-900 dark:text-white mb-4 text-center">
            ڈویلپر کی معلومات
          </HeaderText>

          <View className="w-full">
            <View className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
              <TouchableOpacity onPress={handleOpenLinkedIn}>
                <Text className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                  LinkedIn Profile
                </Text>
              </TouchableOpacity>
              <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-24 text-left">
                لنکڈ ان
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-4">
              <TouchableOpacity onPress={handleOpenWhatsApp}>
                <Text className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                  03130930399
                </Text>
              </TouchableOpacity>
              <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm w-24 text-left">
                واٹس ایپ
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default About;
