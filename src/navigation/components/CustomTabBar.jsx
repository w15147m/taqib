import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {isDarkMode} = useTheme();

  const shadowStyle = isDarkMode ? styles.shadowDark : styles.shadowLight;

  return (
    <View
      className="bg-white dark:bg-slate-900 p-2 rounded-t-[30px] flex-row items-center px-8 shadow-2xl border-t border-slate-50 dark:border-slate-800 absolute bottom-0 left-0 right-0"
      style={[styles.container, shadowStyle]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        // Hide tab if specific option is set
        if (options.tabBarItemStyle?.display === 'none') {
          return null;
        }

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
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

        const activeColor = isDarkMode ? '#818cf8' : '#6366f1';
        const inactiveColor = isDarkMode ? '#64748b' : '#94a3b8';
        const iconColor = isFocused ? activeColor : inactiveColor;

        const activeTextClass = isDarkMode
          ? 'text-indigo-400'
          : 'text-indigo-600';
        const inactiveTextClass = isDarkMode
          ? 'text-slate-500'
          : 'text-slate-400';
        const textClass = isFocused ? activeTextClass : inactiveTextClass;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className={`flex-1 items-center justify-center py-1.5 px-2 rounded-xl ${
              isFocused
                ? isDarkMode
                  ? 'bg-indigo-900/40'
                  : 'bg-indigo-50/80'
                : 'bg-transparent'
            }`}
            style={isFocused ? styles.focusedTab : null}>
            <Icon size={24} color={iconColor} />
            <Text className={`text-[9px] font-bold mt-1 ${textClass}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowRadius: 15,
    elevation: 30,
    paddingBottom: 10,
  },
  shadowLight: {
    shadowOpacity: 0.05,
  },
  shadowDark: {
    shadowOpacity: 0.2,
  },
  focusedTab: {
    maxWidth: 80,
  },
});

export default CustomTabBar;
