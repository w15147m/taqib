import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../../context/ThemeContext';

// Enable layout animation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({
  title,
  items = [],
  defaultOpen = false,
  onOpen,
  onItemPress,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const {isDarkMode} = useTheme();

  const iconColor = isDarkMode ? '#ffffff' : '#000000';

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && onOpen) {
      onOpen();
    }
  };

  return (
    <View className={`w-full overflow-hidden mb-4 ${className}`}>
      {/* Header Button */}
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        className="flex-row justify-between items-center bg-[#bce5ea] dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
        {/* Chevron Icon */}
        {isOpen ? (
          <ChevronUpIcon size={20} color={iconColor} />
        ) : (
          <ChevronDownIcon size={20} color={iconColor} />
        )}

        {/* Title */}
        <Text className="font-quran-header text-xl text-right text-black dark:text-white flex-1 pl-4">
          {title}
        </Text>
      </TouchableOpacity>

      {/* Expandable Content Container */}
      {isOpen && (
        <View className="mt-2 bg-white dark:bg-slate-900 border border-slate-100/70 dark:border-slate-800 rounded-2xl divide-y divide-slate-100/50 dark:divide-slate-800/50">
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id || index}
              activeOpacity={0.7}
              onPress={() => onItemPress && onItemPress(item)}
              className="px-6 py-4 flex-row justify-between items-center">
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-right flex-1">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Accordion;
