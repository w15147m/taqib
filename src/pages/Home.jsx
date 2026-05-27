import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Bars3Icon,
  FireIcon,
  SparklesIcon,
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

import { useTheme } from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import ContentText from '../common/components/ContentText';
import Accordion from '../common/components/Accordion';

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const scrollViewRef = useRef(null);
  const [accordionYPositions, setAccordionYPositions] = useState({});

  const handleAccordionLayout = (id, event) => {
    const { y } = event.nativeEvent.layout;
    setAccordionYPositions(prev => ({ ...prev, [id]: y }));
  };

  const handleAccordionOpen = (id) => {
    const yPos = accordionYPositions[id];
    if (yPos !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, yPos - 12), animated: true });
    }
  };

  const prayersList = [
    'تعقیباتِ مشترکہ',
    'تعقیباتِ نمازِ فجر',
    'تعقیباتِ نمازِ ظہر',
    'تعقیباتِ نمازِ عصر',
    'تعقیباتِ نمازِ مغرب',
    'تعقیباتِ نمازِ عشاء',
    'تعقیباتِ نمازِ عشاء',
    'تعقیباتِ نمازِ عشاء',
    'تعقیباتِ نمازِ عشاء',

  ];

  const devotionsList = [
    'دعائے کمیل',
    'حدیثِ کساء',
    'زیارتِ عاشورا',
    'دعائے توسل',
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
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
            <ContentText className="text-2xl leading-relaxed text-right text-slate-800 dark:text-slate-200 mt-2">
              الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۞ الرَّحْمَٰنِ الرَّحِيمِ ۞ مَالِكِ يَوْمِ الدِّينِ ۞
            </ContentText>
          </View>
        </View>

        {/* Accordions Section */}
        <View onLayout={(e) => handleAccordionLayout('prayers', e)} className="mx-6 mb-4">
          <Accordion
            title="تعقیباتِ نماز"
            items={prayersList}
            defaultOpen={true}
            onOpen={() => handleAccordionOpen('prayers')}
          />
        </View>
        <View onLayout={(e) => handleAccordionLayout('devotions', e)} className="mx-6 mb-6">
          <Accordion
            title="دیگر ادعیہ و اعمال"
            items={devotionsList}
            defaultOpen={false}
            onOpen={() => handleAccordionOpen('devotions')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
