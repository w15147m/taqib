import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import HeaderText from './HeaderText';
import useSearchState from '../hooks/useSearchState';
import primaryData from '../../db/primaryAccordion.json';
import {db} from '../../db/client';
import {contents} from '../../db/schema';

const Header = ({title, showSearchIcon = false}) => {
  const navigation = useNavigation();
  const {isDarkMode} = useTheme();
  const {isSearching, setIsSearching, closeSearch} = useSearchState();

  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (isSearching && allItems.length === 0) {
      const loadItems = async () => {
        // 1. Get primary (static) items
        const primaryItems = (primaryData.contents || []).map(c => ({
          id: c.id,
          title_ur: c.title_ur,
          title_en: c.title_en,
        }));

        // 2. Get DB items
        let dbItems = [];
        try {
          const conts = await db.select().from(contents);
          dbItems = conts.map(c => ({
            id: c.id,
            title_ur: c.title_ur,
            title_en: c.title_en,
          }));
        } catch (error) {
          console.error('Error loading search items in Header:', error);
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
    }
  }, [isSearching, allItems.length]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const filtered = allItems.filter(item => {
      const matchUr = item.title_ur
        ? item.title_ur.toLowerCase().includes(query)
        : false;
      const matchEn = item.title_en
        ? item.title_en.toLowerCase().includes(query)
        : false;
      return matchUr || matchEn;
    });
    setFilteredItems(filtered);
  }, [searchQuery, allItems]);

  const handleCloseSearch = () => {
    closeSearch();
    setSearchQuery('');
    setFilteredItems([]);
  };

  const handleItemPress = item => {
    handleCloseSearch();
    navigation.navigate('Content', {
      id: item.id,
      title: item.title_ur,
    });
  };

  if (isSearching) {
    return (
      <View style={styles.headerContainer}>
        {/* Search input field with border */}
        <View className="flex-row items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-4 py-1 rounded-2xl flex-1 mr-3">
          <MagnifyingGlassIcon
            size={20}
            color={isDarkMode ? '#94a3b8' : '#64748b'}
          />
          <TextInput
            autoFocus
            placeholder="تلاش کریں..."
            placeholderTextColor={isDarkMode ? '#94a3b8' : '#64748b'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="font-quran-header text-lg text-right text-black dark:text-white flex-1 pl-4 py-0"
          />
        </View>

        {/* Close Search Button */}
        <TouchableOpacity onPress={handleCloseSearch} className="p-2">
          <XMarkIcon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
        </TouchableOpacity>

        {/* Floating Search Dropdown Overlay */}
        {searchQuery.trim() !== '' && (
          <View
            style={[
              styles.dropdownContainer,
              {
                backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              },
            ]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 8}}>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    onPress={() => handleItemPress(item)}
                    className="px-6 py-4 border-b border-slate-100/50 dark:border-slate-800/50 last:border-b-0">
                    <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-right">
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
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <View>
        <HeaderText className="text-3xl text-slate-900 dark:text-white text-right">
          {title}
        </HeaderText>
      </View>
      <View className="flex-row items-center">
        {showSearchIcon && (
          <TouchableOpacity
            className="p-2 mr-2"
            onPress={() => setIsSearching(true)}>
            <MagnifyingGlassIcon
              size={24}
              color={isDarkMode ? '#f8fafc' : '#1e293b'}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.openDrawer()}>
          <Bars3Icon size={24} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 8,
    position: 'relative',
    zIndex: 999,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 64,
    left: 24,
    right: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxHeight: 280,
    zIndex: 1000,
  },
});

export default Header;
