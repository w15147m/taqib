import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../common/components/Header';
import Accordion from '../common/components/Accordion';
import useAutoScroll from '../common/hooks/useAutoScroll';
import { accordionData } from '../utils/accordionData';

const Home = () => {
  const navigation = useNavigation();
  const { scrollViewRef, handleLayout, handleOpen } = useAutoScroll(12);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Reusable Header */}
        <Header title="تَعْقِیبَاتِ نَمَاز" />

        {/* Accordions Section */}
        {accordionData.map((category) => (
          <View
            key={category.id}
            onLayout={(e) => handleLayout(category.id, e)}
            className={`mx-6 ${category.id === 'namaz' ? 'mb-2' : 'mb-1'}`}
          >
            <Accordion
              title={category.title}
              items={category.items}
              defaultOpen={category.defaultOpen}
              onOpen={() => handleOpen(category.id)}
              onItemPress={(item) =>
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
