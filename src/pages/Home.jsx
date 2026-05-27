import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Bars3Icon,
  FireIcon,
  SparklesIcon,
} from 'react-native-heroicons/outline';

const {width} = Dimensions.get('window');

import {useTheme} from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import ContentText from '../common/components/ContentText';

const Home = () => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-2xl font-black text-slate-900 dark:text-white">
              تقیبات نماز
            </Text>
          </View>
          <TouchableOpacity
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}>
            <Bars3Icon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
          </TouchableOpacity>
        </View>

        {/* Test Custom Fonts Section */}
        <View className="mx-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm mb-6">
          <Text className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-4">
            Font Testing Section (Al Mushaf Quran)
          </Text>

          {/* Heading using Al Mushaf Quran */}
          <View className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <Text className="text-xs text-slate-400 dark:text-slate-500 mb-1">
              Heading style:
            </Text>
            <HeaderText className="text-4xl text-slate-900 dark:text-white">
              سُورَةُ الْفَاتِحَةِ
            </HeaderText>
          </View>

          {/* Content using Al Mushaf Quran */}
          <View>
            <Text className="text-xs text-slate-400 dark:text-slate-500 mb-2">
              Content style:
            </Text>
            <ContentText className="text-3xl leading-relaxed text-slate-800 dark:text-slate-200">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </ContentText>
            <ContentText className="text-2xl leading-relaxed text-slate-800 dark:text-slate-200 mt-2">
              الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞
            </ContentText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
