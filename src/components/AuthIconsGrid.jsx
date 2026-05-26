import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

// Requiring icons with cleaned filenames (no spaces)
const icons = [
  require('../assets/3D-Icon/Rocket-small.png'),
  require('../assets/3D-Icon/Calender-small.png'),
  require('../assets/3D-Icon/Clock-small.png'),
  require('../assets/3D-Icon/Target-small.png'),
  require('../assets/3D-Icon/Brief_case_bag-small.png'),
  require('../assets/3D-Icon/Credit_Card-small.png'),
  require('../assets/3D-Icon/Folder-small.png'),
  require('../assets/3D-Icon/Magnifying_Glass-small.png'),
  require('../assets/3D-Icon/Smartphone-small.png'),
  require('../assets/3D-Icon/Safe_Box-small.png'),
  require('../assets/3D-Icon/Coin_Bag-small.png'),
  require('../assets/3D-Icon/Desktop_computer_graph-small.png'),
  require('../assets/3D-Icon/Bill_Printers-small.png'),
  require('../assets/3D-Icon/Draf_Note-small.png'),
  require('../assets/3D-Icon/Mail_Bill_Payment-small.png'),
  require('../assets/3D-Icon/Money_Coin-small.png'),
  require('../assets/3D-Icon/Note_Calculator-small.png'),
  require('../assets/3D-Icon/Projector-small.png'),
  require('../assets/3D-Icon/Rolls_of_Paper-small.png'),
  require('../assets/3D-Icon/Speaker-small.png'),
];

// Aesthetic background colors from the reference
const bgColors = ['#fbcfe8', '#e9d5ff', '#fed7aa', '#ccfbf1', '#dcfce7', '#d9f99d'];

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

      <View className="flex-row flex-wrap justify-between items-center px-4 z-10 opacity-40 dark:opacity-20">
        {[...icons, ...icons].map((source, i) => (
          <View 
            key={i} 
            className="w-[85px] h-[85px] m-1 rounded-[24px] items-center justify-center"
            style={{ 
              backgroundColor: isDarkMode ? `${bgColors[i % bgColors.length]}15` : bgColors[i % bgColors.length]
            }} 
          >
            <Image 
              source={source} 
              style={{ width: 60, height: 60 }} 
              resizeMode="contain"
              fadeDuration={0}
              className={isDarkMode ? 'opacity-80' : 'opacity-100'}
            />
          </View>
        ))}
      </View>
      
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
