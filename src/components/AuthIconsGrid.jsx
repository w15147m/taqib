import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const AuthIconsGrid = () => {
  const { isDarkMode } = useTheme();

  return (
    <View 
      style={StyleSheet.absoluteFillObject} 
      className="bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Decorative background circles */}
      <View style={styles.topCircle} className="dark:bg-indigo-500/10 dark:opacity-20" />
      <View style={styles.bottomCircle} className="dark:bg-indigo-500/10 dark:opacity-20" />
      <View style={styles.accentCircle} className="dark:bg-indigo-500/10 dark:opacity-10" />

      {/* Subtle overlay */}
      <View className="absolute inset-0 bg-slate-50/5 dark:bg-black/40" />
    </View>
  );
};

const styles = StyleSheet.create({
  topCircle: {
    position: 'absolute',
    top: -50,
    right: -30,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#e9d5ff',
    opacity: 0.4,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 20,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#ccfbf1',
    opacity: 0.3,
  },
  accentCircle: {
    position: 'absolute',
    top: 100,
    left: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fed7aa',
    opacity: 0.2,
  }
});

export default AuthIconsGrid;
