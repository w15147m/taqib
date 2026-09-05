import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Header from '../../common/components/Header';
import UpcomingEventsCard from './components/UpcomingEventsCard';
import PrimaryAccordion from './components/PrimaryAccordion';
import useLocation from '../../common/hooks/useLocation';

const Home = () => {
  // Trigger location fetch automatically on first app load if not saved
  useLocation();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Sticky Top Header with search enabled */}
      <Header title="تَعْقِیبَاتِ نَمَاز" showSearchIcon={true} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Upcoming Events Card */}
        <UpcomingEventsCard />

        {/* Primary Accordion loaded from primaryAccordion.json */}
        <PrimaryAccordion />
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
