import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import {contentData} from '../utils/contentData';

const Content = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {isDarkMode} = useTheme();
  const {title} = route.params || {};

  const rawText = contentData[title] || '';
  const lines = rawText.split('\n');

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 shadow-sm">
        <TouchableOpacity
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
        </TouchableOpacity>
        <HeaderText className="text-2xl text-slate-900 dark:text-white text-right flex-1 pl-4">
          {title}
        </HeaderText>
      </View>

      {/* Content Scroll View */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100/50 dark:border-slate-850/50">
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            // Check if it's an explanation or translation line
            const isExplanation =
              trimmed.startsWith('*') ||
              trimmed.startsWith('(*') ||
              trimmed.endsWith('*') ||
              trimmed.endsWith('*)');

            if (isExplanation) {
              const cleanText = trimmed.replace(/[\*\(\)]/g, '').trim();
              return (
                <Text
                  key={idx}
                  className="text-slate-500 dark:text-slate-400 text-sm font-semibold text-right my-2 leading-6 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60"
                >
                  {cleanText}
                </Text>
              );
            }

            // Normal Arabic Text
            return (
              <Text
                key={idx}
                className="font-quran-content text-3xl text-right text-slate-850 dark:text-slate-200 my-4 leading-[58px]"
              >
                {line}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Content;
