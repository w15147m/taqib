import React, {useRef, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const ITEM_HEIGHT = 44;

const ScrollPicker = ({items, value, onChange, isDarkMode}) => {
  const scrollViewRef = useRef(null);
  const currentScrollIndex = useRef(-1);

  // Pad the items list with empty placeholders at the beginning and end
  // so the first and last elements can snap to the center.
  const paddedItems = ['', ...items, ''];

  useEffect(() => {
    const selectedIndex = items.indexOf(value);
    if (selectedIndex !== -1 && selectedIndex !== currentScrollIndex.current) {
      currentScrollIndex.current = selectedIndex;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: selectedIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 50);
    }
  }, [value, items]);

  const handleScrollEnd = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
      currentScrollIndex.current = index;
      onChange(items[index]);
    }
  };

  const handleLayout = () => {
    const selectedIndex = items.indexOf(value);
    if (selectedIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Central Selection Highlight Line Overlay */}
      <View
        pointerEvents="none"
        style={[
          styles.highlightIndicator,
          {
            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
            backgroundColor: isDarkMode
              ? 'rgba(30, 41, 59, 0.4)'
              : 'rgba(241, 245, 249, 0.5)',
          },
        ]}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        onLayout={handleLayout}
        contentContainerStyle={styles.scrollContent}>
        {paddedItems.map((item, index) => {
          const isSelected = item === value && item !== '';
          return (
            <View key={index} style={styles.itemContainer}>
              <Text
                className={`text-lg font-bold text-center ${
                  isSelected
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 dark:text-slate-600'
                }`}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 3,
    width: 70,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 0,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightIndicator: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
});

export default ScrollPicker;
