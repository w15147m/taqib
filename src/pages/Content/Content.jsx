import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../common/components/Header';
import ArabicText from '../../common/components/ArabicText';
import UrduText from '../../common/components/UrduText';
import primaryData from '../../db/primaryAccordion.json';
import ArabicContentFlow from './components/ArabicContentFlow';

const Content = () => {
  const route = useRoute();
  const { id, title } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const loadContentData = () => {
      try {
        setLoading(true);
        let targetId = id;

        // Resolve ID by title if id not provided
        if (!targetId && title) {
          const found = primaryData.contents.find(c => c.title_ur === title);
          if (found) {
            targetId = found.id;
          }
        }

        const contentMeta = primaryData.contents.find(c => c.id === targetId);
        if (contentMeta) {
          setContent({ id: contentMeta.id, title_ur: contentMeta.title_ur });

          // Load items from JSON sorted by sequence_number
          const jsonItems = (primaryData.content_items || [])
            .filter(item => item.content_id === targetId)
            .sort((a, b) => a.sequence_number - b.sequence_number);

          // Attach explanations from JSON
          const itemsWithDetails = jsonItems.map(item => {
            const itemExplanations = (primaryData.content_item_explanations || []).filter(
              e => e.item_id === item.id,
            );
            return {
              ...item,
              beforeExplanations: itemExplanations.filter(e => e.position === 'before'),
              afterExplanations: itemExplanations.filter(e => e.position === 'after'),
            };
          });

          setContentItems(itemsWithDetails);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContentData();
  }, [id, title]);

  const displayTitle = title || (content ? content.title_ur : '');

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      {/* Reusable Header with search icon */}
      <Header title={displayTitle} showSearchIcon={true} />

      {/* Content Scroll View */}
      <ScrollView
        className="flex-1 px-4 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ArabicText className="text-slate-800 dark:text-slate-200 leading-[58px]">
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِیمِ
        </ArabicText>

        <ArabicContentFlow contentItems={contentItems} />
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
