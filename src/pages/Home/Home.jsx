import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Header from '../../common/components/Header';
import useAutoScroll from '../../common/hooks/useAutoScroll';
import UpcomingEventsCard from './components/UpcomingEventsCard';
import Accordions from './components/Accordions';
import useLocation from '../../common/hooks/useLocation';

const Home = () => {
  const {scrollViewRef, handleLayout, handleOpen} = useAutoScroll(12);

  // Trigger location fetch automatically on first app load if not saved
  useLocation();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Sticky Top Header with search enabled */}
      <Header title="تَعْقِیبَاتِ نَمَاز" showSearchIcon={true} />

      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Upcoming Events Card */}
        <UpcomingEventsCard />

        {/* Accordions child component (isolated logic) */}
        <Accordions handleLayout={handleLayout} handleOpen={handleOpen} />
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
