import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../../../../context/ThemeContext';
import primaryData from '../../../../db/primaryAccordion.json';
import {db} from '../../../../db/client';
import {contents} from '../../../../db/schema';

// Enable layout animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SearchAccordion = ({handleLayout, handleOpen, autoFocus = false}) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState([]);
  const {isDarkMode} = useTheme();

  const iconColor = isDarkMode ? '#ffffff' : '#000000';

  useEffect(() => {
    const loadItems = async () => {
      // 1. Get primary (static) items
      const primaryItems = (primaryData.contents || []).map(c => ({
        id: c.id,
        title_ur: c.title_ur,
        title_en: c.title_en,
      }));

      // 2. Get secondary (DB) items
      let dbItems = [];
      try {
        const conts = await db.select().from(contents);
        dbItems = conts.map(c => ({
          id: c.id,
          title_ur: c.title_ur,
          title_en: c.title_en,
        }));
      } catch (error) {
        console.error('Error loading search items from DB:', error);
      }

      // 3. Combine and de-duplicate
      const combined = [...primaryItems];
      const seenIds = new Set(primaryItems.map(item => item.id));
      for (const item of dbItems) {
        if (!seenIds.has(item.id)) {
          combined.push(item);
          seenIds.add(item.id);
        }
      }
      setAllItems(combined);
    };

    loadItems();
  }, []);

  const toggleAccordion = () => {
    if (!searchQuery.trim()) {
      return;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && handleOpen) {
      handleOpen('search_accordion');
    }
  };

  const handleFocus = () => {
    if (searchQuery.trim() && !isOpen) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsOpen(true);
      if (handleOpen) {
        handleOpen('search_accordion');
      }
    }
  };

  const handleTextChange = text => {
    setSearchQuery(text);
    const hasText = !!text.trim();
    if (hasText !== isOpen) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsOpen(hasText);
      if (hasText && handleOpen) {
        handleOpen('search_accordion');
      }
    }
  };

  const filteredItems = allItems.filter(item => {
    if (!searchQuery.trim()) {
      return false;
    }
    const query = searchQuery.toLowerCase().trim();
    const matchUr = item.title_ur
      ? item.title_ur.toLowerCase().includes(query)
      : false;
    const matchEn = item.title_en
      ? item.title_en.toLowerCase().includes(query)
      : false;
    return matchUr || matchEn;
  });

  return (
    <View
      onLayout={e => handleLayout && handleLayout('search_accordion', e)}
      className="mx-6 mb-2">
      {/* Header Button with TextInput */}
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        className="flex-row justify-between items-center bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-300 dark:border-slate-700">
        {/* Search Icon */}
        <MagnifyingGlassIcon size={20} color={iconColor} />

        {/* Search Input */}
        <TextInput
          autoFocus={autoFocus}
          placeholder="تلاش کریں..."
          placeholderTextColor={isDarkMode ? '#94a3b8' : '#64748b'}
          value={searchQuery}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          className="font-quran-header text-xl text-right text-black dark:text-white flex-1 pl-4 py-0"
        />
      </TouchableOpacity>

      {/* Dropdown Items List */}
      {isOpen && (
        <View className="mt-2 bg-white dark:bg-slate-900 border border-slate-100/70 dark:border-slate-800 rounded-2xl divide-y divide-slate-100/50 dark:divide-slate-800/50">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Content', {
                    id: item.id,
                    title: item.title_ur,
                  })
                }
                className="px-6 py-4 flex-row justify-between items-center">
                <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-right flex-1">
                  {item.title_ur}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View className="px-6 py-4">
              <Text className="text-sm text-slate-400 dark:text-slate-500 text-center">
                کوئی نتیجہ نہیں ملا
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchAccordion;
