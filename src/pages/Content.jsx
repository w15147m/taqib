import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Header from '../common/components/Header';
import ArabicText from '../common/components/ArabicText';
import UrduText from '../common/components/UrduText';
import {contentData, contentList} from '../utils/contentData';

const Content = () => {
  const route = useRoute();
  const {id, title} = route.params || {};

  let itemData = contentData[id] || {};
  if (!id && title) {
    const found = contentList.find(item => item.title === title);
    if (found) {
      itemData = found;
    }
  }
  const displayTitle = title || itemData.title || '';
  const rawText = itemData.text || '';
  const lines = rawText.split('\n');

  console.log('CONTENT_PAGE_DEBUG:', {
    id,
    title,
    resolvedId: itemData.id,
    hasText: !!rawText,
    textLength: rawText.length,
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Header */}
      <Header title={displayTitle} />

      {/* Content Scroll View */}
      <ScrollView
        className="flex-1 px-4 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ArabicText className="text-slate-800 dark:text-slate-200 leading-[58px]">
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِیمِ
        </ArabicText>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return null;
          }

          // Check if it's an explanation or translation line
          const isExplanation =
            trimmed.startsWith('*(') && trimmed.endsWith(')*');

          if (isExplanation) {
            const cleanText = trimmed.replace(/[*()]/g, '').trim();
            return <UrduText key={idx}>{cleanText}</UrduText>;
          }

          // Normal Arabic Text
          return (
            <ArabicText
              key={idx}
              className="text-slate-800 dark:text-slate-200 my-4 leading-[58px]">
              {line}
            </ArabicText>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
});

export default Content;
