import React, {useEffect, useState, useRef} from 'react';
import {View, StatusBar, Animated, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {runMigrations} from '../db/client';
import {useTheme} from '../context/ThemeContext';
import {useSettings} from '../context/SettingsContext';
import textTaqeebatImage from '../assets/images/parts/text_taqeebat.png';

export const AppInitializer = ({children}) => {
  const [isDbReady, setIsDbReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const {themeLoading} = useTheme();
  const {loading: settingsLoading} = useSettings();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Run database migrations and seeding
  useEffect(() => {
    const initialize = async () => {
      try {
        // Run database migrations
        await runMigrations();

        // Check if database has been seeded
        const isSeeded = await AsyncStorage.getItem('db_seeded_v1');

        if (isSeeded === 'true') {
          // Already seeded, essential data ready
          setIsDbReady(true);
        } else {
          // First launch: seed essential data while keeping native splash screen visible
          const {
            seedEssentialData,
            seedBackgroundData,
          } = require('../db/seeds');

          await seedEssentialData();

          // Mark as seeded so we don't run essential seeding again
          await AsyncStorage.setItem('db_seeded_v1', 'true');

          // DB is ready
          setIsDbReady(true);

          // Seed large background data asynchronously
          seedBackgroundData().catch(error => {
            console.error('Error seeding background data:', error);
          });
        }
      } catch (error) {
        console.error('Initialization error:', error);
        setIsDbReady(true);
      }
    };

    initialize();
  }, []);

  // Dismiss native splash dialog early (after 150ms) to show the identical static React Native view
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Monitor loading states. Once everything is loaded, start the exit shrink & fade transition
  useEffect(() => {
    if (
      isDbReady &&
      !themeLoading &&
      !settingsLoading &&
      !isTransitioning &&
      !isReady
    ) {
      setIsTransitioning(true);

      // Smoothly shrink and fade out the calligraphic logo
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsReady(true);
      });
    }
  }, [
    isDbReady,
    themeLoading,
    settingsLoading,
    isTransitioning,
    isReady,
    scaleAnim,
    opacityAnim,
  ]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#bce5ea" barStyle="dark-content" />
        <Animated.Image
          source={textTaqeebatImage}
          style={[
            styles.logo,
            {
              transform: [{scale: scaleAnim}],
              opacity: opacityAnim,
            },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bce5ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 260,
    height: 150,
  },
});
