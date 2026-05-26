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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
