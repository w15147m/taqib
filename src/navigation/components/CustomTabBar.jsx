import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Keyboard} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const {isDarkMode} = useTheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const shadowStyle = isDarkMode ? styles.shadowDark : styles.shadowLight;

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={[styles.container, shadowStyle]}>
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

        const activeTextColor = isDarkMode ? '#818cf8' : '#4f46e5';
        const inactiveTextColor = isDarkMode ? '#64748b' : '#94a3b8';

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}>
            <Icon size={24} color={iconColor} />
            <Text
              style={[
                styles.label,
                {color: isFocused ? activeTextColor : inactiveTextColor},
              ]}>
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
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    paddingBottom: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowRadius: 15,
    elevation: 30,
  },
  shadowLight: {
    shadowOpacity: 0.05,
    backgroundColor: '#ffffff',
  },
  shadowDark: {
    shadowOpacity: 0.2,
    backgroundColor: '#0f172a',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  label: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default CustomTabBar;
