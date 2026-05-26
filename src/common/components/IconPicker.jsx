import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Icon emoji list - simple and guaranteed to work
const ICON_EMOJIS = [
  // Islamic Icons
  { id: 1, emoji: '🕌', name: 'Mosque', value: 'mosque' },
  { id: 2, emoji: '🕋', name: 'Kaaba', value: 'kaaba' },
  { id: 3, emoji: '📿', name: 'Tasbih', value: 'tasbih' },
  { id: 4, emoji: '🤲', name: 'Dua', value: 'dua' },
  { id: 5, emoji: '📖', name: 'Quran', value: 'quran' },
  { id: 6, emoji: '🌙', name: 'Crescent', value: 'crescent' },
  { id: 7, emoji: '⭐', name: 'Star', value: 'star' },
  { id: 8, emoji: '🛐', name: 'Worship', value: 'worship' },
  
  // Nature & Allah's Creation
  { id: 9, emoji: '🌴', name: 'Palm Tree', value: 'palm' },
  { id: 10, emoji: '🐪', name: 'Camel', value: 'camel' },
  { id: 11, emoji: '🐑', name: 'Sheep', value: 'sheep' },
  { id: 12, emoji: '🐐', name: 'Goat', value: 'goat' },
  { id: 13, emoji: '🕊️', name: 'Dove', value: 'dove' },
  { id: 14, emoji: '🌳', name: 'Tree', value: 'tree' },
  { id: 15, emoji: '🌺', name: 'Flower', value: 'flower' },
  { id: 16, emoji: '💧', name: 'Water (Wudu)', value: 'water' },
  { id: 17, emoji: '☀️', name: 'Sun', value: 'sun' },
  { id: 18, emoji: '🌊', name: 'Wave', value: 'wave' },
  { id: 19, emoji: '🏔️', name: 'Mountain', value: 'mountain' },
  { id: 20, emoji: '🌈', name: 'Rainbow', value: 'rainbow' },

  // Lifestyle & Sunnah
  { id: 21, emoji: '🍯', name: 'Honey', value: 'honey' },
  { id: 22, emoji: '🥛', name: 'Milk', value: 'milk' },
  { id: 23, emoji: '🥗', name: 'Halal Food', value: 'halal' },
  { id: 24, emoji: '☕', name: 'Tea/Coffee', value: 'coffee' },
  { id: 25, emoji: '🍏', name: 'Fruit', value: 'fruit' },
  { id: 26, emoji: '🏠', name: 'Home', value: 'home' },
  { id: 27, emoji: '👪', name: 'Family', value: 'family' },
  { id: 28, emoji: '👵', name: 'Elderly', value: 'elderly' },
  { id: 29, emoji: '👴', name: 'Elderly', value: 'elderly_man' },
  { id: 30, emoji: '👶', name: 'Child', value: 'child' },

  // Time & Prayer
  { id: 31, emoji: '⏰', name: 'Prayer Time', value: 'prayer_time' },
  { id: 32, emoji: '⏳', name: 'Hourglass', value: 'hourglass' },
  { id: 33, emoji: '📅', name: 'Calendar', value: 'calendar' },
  { id: 34, emoji: '🔔', name: 'Notification', value: 'bell' },

  // Knowledge & Giving
  { id: 35, emoji: '📚', name: 'Books', value: 'books' },
  { id: 36, emoji: '🖊️', name: 'Pen', value: 'pen' },
  { id: 37, emoji: '🎓', name: 'Knowledge', value: 'knowledge' },
  { id: 38, emoji: '📜', name: 'Scroll', value: 'scroll' },
  { id: 39, emoji: '⚖️', name: 'Justice', value: 'justice' },
  { id: 40, emoji: '💰', name: 'Zakat', value: 'zakat' },
  { id: 41, emoji: '🎁', name: 'Eid Gift', value: 'gift' },
  { id: 42, emoji: '🤝', name: 'Brotherhood', value: 'brotherhood' },

  // Spirituality
  { id: 43, emoji: '❤️', name: 'Heart', value: 'heart' },
  { id: 44, emoji: '💡', name: 'Noor', value: 'noor' },
  { id: 45, emoji: '🧠', name: 'Mindfulness', value: 'mind' },
  { id: 46, emoji: '✨', name: 'Barakah', value: 'barakah' },
  { id: 47, emoji: '🛡️', name: 'Protection', value: 'shield' },
  { id: 48, emoji: '🗝️', name: 'Key', value: 'key' },

  // Travel & Hajj
  { id: 49, emoji: '✈️', name: 'Travel', value: 'travel' },
  { id: 50, emoji: '🗺️', name: 'Map', value: 'map' },
  { id: 51, emoji: '🧭', name: 'Qibla', value: 'compass' },
  { id: 52, emoji: '🚶', name: 'Walking', value: 'walking' },

  // Health & Daily
  { id: 53, emoji: '🏃', name: 'Sprints', value: 'run' },
  { id: 54, emoji: '💪', name: 'Strength', value: 'strength' },
  { id: 55, emoji: '💤', name: 'Sleep', value: 'sleep' },
  { id: 56, emoji: '🚪', name: 'Gate', value: 'gate' },
  { id: 57, emoji: '🌻', name: 'Sunlight', value: 'sunlight' },
  { id: 58, emoji: '🌹', name: 'Rose', value: 'rose' },
  { id: 59, emoji: '🌟', name: 'Shining', value: 'shining' },
  { id: 60, emoji: '🎊', name: 'Celebration', value: 'celebration' },
];

const IconPicker = ({ selectedIcon, onSelectIcon, isDarkMode }) => {
  // Calculate width for exactly 4 icons per row
  // Container has padding, so we use 23% width for each icon (4 x 23% = 92%, leaving 8% for gaps)
  const iconWidth = '23%';
  
  return (
    <View className="mb-3">
      <Text className="text-slate-500 dark:text-slate-400 text-sm mb-2 ml-1">
        Select Icon
      </Text>
      <ScrollView 
        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2"
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {ICON_EMOJIS.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              onPress={() => onSelectIcon(icon.value)}
              className={`mb-2 rounded-xl items-center justify-center ${
                selectedIcon === icon.value
                  ? 'bg-indigo-500 border-2 border-indigo-600'
                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700'
              }`}
              style={{ width: iconWidth, aspectRatio: 1 }}
            >
              <Text style={{ fontSize: 32 }}>{icon.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IconPicker;
