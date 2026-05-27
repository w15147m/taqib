import React from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Header from '../common/components/Header';
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
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Text className="font-quran-content text-3xl text-center text-slate-800 dark:text-slate-200 my-4 leading-[58px]">
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِیمِ
        </Text>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return null;
          }

          // Check if it's an explanation or translation line
          const isExplanation =
            trimmed.startsWith('*') ||
            trimmed.startsWith('(*') ||
            trimmed.endsWith('*') ||
            trimmed.endsWith('*)');

          if (isExplanation) {
            const cleanText = trimmed.replace(/[*()]/g, '').trim();
            return (
              <Text
                key={idx}
                className="text-slate-500 dark:text-slate-400 text-sm font-semibold text-right my-2 leading-6 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60">
                {cleanText}
              </Text>
            );
          }

          // Normal Arabic Text
          return (
            <Text
              key={idx}
              className="font-quran-content text-3xl text-right text-slate-800 dark:text-slate-200 my-4 leading-[58px]">
              {line}
            </Text>
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
