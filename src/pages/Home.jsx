import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Header from '../common/components/Header';
import useAutoScroll from '../common/hooks/useAutoScroll';
import UpcomingEventsCard from './components/UpcomingEventsCard';
import Categories from './components/Categories';
import useLocation from '../common/hooks/useLocation';

const Home = () => {
  const {scrollViewRef, handleLayout, handleOpen} = useAutoScroll(12);

  // Trigger location fetch automatically on first app load if not saved
  useLocation();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Reusable Header */}
        <Header title="تَعْقِیبَاتِ نَمَاز" />

        {/* Upcoming Events Card */}
        <UpcomingEventsCard />

        {/* Categories child component (isolated logic) */}
        <Categories handleLayout={handleLayout} handleOpen={handleOpen} />
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
