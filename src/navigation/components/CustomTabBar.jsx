import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isDarkMode } = useTheme();

  return (
    <View 
      className="bg-white dark:bg-slate-900 p-2 rounded-t-[30px] flex-row items-center px-8 shadow-2xl border-t border-slate-50 dark:border-slate-800 absolute bottom-0 left-0 right-0"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: isDarkMode ? 0.2 : 0.05,
        shadowRadius: 15,
        elevation: 30,
        paddingBottom: 10
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // Hide tab if specific option is set
        if (options.tabBarItemStyle?.display === 'none') return null;

        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
             navigation.navigate(route.name);
          }
        };

        const Icon = isFocused ? options.tabBarIconActive : options.tabBarIcon;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className={`flex-1 items-center justify-center ${isFocused ? (isDarkMode ? 'bg-indigo-900/40 rounded-xl py-1.5 px-2' : 'bg-indigo-50/80 rounded-xl py-1.5 px-2') : ''}`}
            style={isFocused ? { maxWidth: 80 } : {}}
          >
            <Icon size={24} color={isFocused ? (isDarkMode ? '#818cf8' : '#6366f1') : (isDarkMode ? '#64748b' : '#94a3b8')} />
            <Text className={`text-[9px] font-bold mt-1 ${isFocused ? (isDarkMode ? 'text-indigo-400' : 'text-indigo-600') : (isDarkMode ? 'text-slate-500' : 'text-slate-400')}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
