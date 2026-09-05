import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Accordion from '../../../common/components/Accordion';
import primaryData from '../../../db/primaryAccordion.json';

const PrimaryAccordion = () => {
  const navigation = useNavigation();
  const {categories = [], contents = []} = primaryData;

  const formatted = categories.map(cat => {
    const catContents = contents.filter(c => c.category_id === cat.id);
    const items = catContents.map(c => ({
      id: c.id,
      title: c.title_ur,
    }));

    return {
      id: cat.id,
      title: cat.title_ur,
      items,
      defaultOpen: cat.id === 'prayers',
    };
  });

  return (
    <View className="mt-4">
      {formatted.map(category => (
        <View
          key={category.id}
          className="mx-6 mb-1">
          <Accordion
            title={category.title}
            items={category.items}
            defaultOpen={category.defaultOpen}
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

export default PrimaryAccordion;
