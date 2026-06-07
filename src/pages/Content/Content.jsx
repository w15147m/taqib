import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../common/components/Header';
import ArabicText from '../../common/components/ArabicText';
import UrduText from '../../common/components/UrduText';
import { db } from '../../db/client';
import { contents, content_items, content_item_explanations } from '../../db/schema';
import { eq, asc } from 'drizzle-orm';
import primaryData from '../../db/primaryAccordion.json';
import ArabicContentFlow from './components/ArabicContentFlow';

const Content = () => {
  const route = useRoute();
  const { id, title } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const loadContentData = async () => {
      try {
        setLoading(true);
        let targetId = id;

        // Check if the ID belongs to the primary JSON data source
        const isFromJson = primaryData.contents.some(c => c.id === targetId);

        if (isFromJson) {
          // Load content meta from JSON
          const contentMeta = primaryData.contents.find(c => c.id === targetId);
          setContent({ id: contentMeta.id, title_ur: contentMeta.title_ur });

          // Load items from JSON sorted by sequence_number
          const jsonItems = primaryData.content_items
            .filter(item => item.content_id === targetId)
            .sort((a, b) => a.sequence_number - b.sequence_number);

          // Attach explanations from JSON
          const itemsWithDetails = jsonItems.map(item => {
            const itemExplanations = primaryData.content_item_explanations.filter(
              e => e.item_id === item.id,
            );
            return {
              ...item,
              beforeExplanations: itemExplanations.filter(e => e.position === 'before'),
              afterExplanations: itemExplanations.filter(e => e.position === 'after'),
            };
          });

          setContentItems(itemsWithDetails);
        } else {
          // Resolve ID if only title is provided
          if (!targetId && title) {
            const found = await db.select().from(contents).where(eq(contents.title_ur, title));
            if (found.length > 0) {
              targetId = found[0].id;
            }
          }

          if (targetId) {
            const contentRes = await db.select().from(contents).where(eq(contents.id, targetId));
            if (contentRes.length > 0) {
              setContent(contentRes[0]);
            }

            // Fetch items
            const items = await db.select()
              .from(content_items)
              .where(eq(content_items.content_id, targetId))
              .orderBy(asc(content_items.sequence_number));

            if (items.length > 0) {
              // Fetch explanations
              const explanations = await db.select({
                id: content_item_explanations.id,
                item_id: content_item_explanations.item_id,
                explanation_text: content_item_explanations.explanation_text,
                language: content_item_explanations.language,
                position: content_item_explanations.position,
                sequence_number: content_item_explanations.sequence_number,
              })
                .from(content_item_explanations)
                .innerJoin(content_items, eq(content_item_explanations.item_id, content_items.id))
                .where(eq(content_items.content_id, targetId))
                .orderBy(asc(content_item_explanations.sequence_number));

              const itemsWithDetails = items.map(item => {
                const itemExplanations = explanations.filter(e => e.item_id === item.id);
                return {
                  ...item,
                  beforeExplanations: itemExplanations.filter(e => e.position === 'before'),
                  afterExplanations: itemExplanations.filter(e => e.position === 'after'),
                };
              });

              setContentItems(itemsWithDetails);
            }
          }
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
