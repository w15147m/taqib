import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Accordion from '../../../common/components/Accordion';
import {db} from '../../../db/client';
import {categories, contents} from '../../../db/schema';

const Accordions = ({handleLayout, handleOpen}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoriesAndContents = async () => {
      try {
        const cats = await db.select().from(categories);
        const conts = await db.select().from(contents);

        // Format to match accordionData structure
        const formatted = cats.map(cat => ({
          id: cat.id,
          title: cat.title_ur,
          items: conts
            .filter(c => c.category_id === cat.id)
            .map(c => ({
              id: c.id,
              title: c.title_ur,
            })),
          defaultOpen: cat.id === 'prayers',
        }));

        setData(formatted);
      } catch (error) {
        console.error('Error loading categories/contents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoriesAndContents();
  }, []);

  if (loading) {
    return (
      <View className="py-8 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="mt-4">
      {data.map(category => (
        <View
          key={category.id}
          onLayout={e => handleLayout(category.id, e)}
          className={`mx-6 ${category.id === 'namaz' ? 'mb-2' : 'mb-1'}`}>
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
    </View>
  );
};

export default Accordions;
