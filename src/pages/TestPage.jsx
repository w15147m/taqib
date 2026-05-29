import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { db } from '../db/client';
import { categories } from '../db/schema';

const TestPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await db.select().from(categories);
        setData(result);
      } catch (err) {
        setData({ error: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950 justify-center p-4">
      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" />
      ) : (
        <ScrollView className="flex-1">
          <Text style={styles.jsonText} className="text-slate-800 dark:text-slate-200">
            {JSON.stringify(data, null, 2)}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
});

export default TestPage;
