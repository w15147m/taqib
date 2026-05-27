import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Bars3Icon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import HeaderText from '../common/components/HeaderText';
import Accordion from '../common/components/Accordion';
import useAutoScroll from '../common/hooks/useAutoScroll';
import {accordionData} from '../utils/accordionData';

const Home = () => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();

  const {scrollViewRef, handleLayout, handleOpen} = useAutoScroll(12);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <HeaderText className="text-3xl text-slate-900 dark:text-white text-right">
              تَعْقِیبَاتِ نَمَاز
            </HeaderText>
          </View>
          <TouchableOpacity
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}>
            <Bars3Icon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
          </TouchableOpacity>
        </View>

        {/* Accordions Section */}
        {accordionData.map(category => (
          <View
            key={category.id}
            onLayout={e => handleLayout(category.id, e)}
            className={`mx-6 ${category.id === 'namaz' ? 'mb-6' : 'mb-4'}`}>
            <Accordion
              title={category.title}
              items={category.items}
              defaultOpen={category.defaultOpen}
              onOpen={() => handleOpen(category.id)}
              onItemPress={item =>
                navigation.navigate('Content', {
                  id: item.id,
                  title: item.title,
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
});

export default Home;
