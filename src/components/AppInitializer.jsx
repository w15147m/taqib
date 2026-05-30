import React, {useEffect, useState} from 'react';
import {View, StatusBar, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {runMigrations} from '../db/client';
import {useTheme} from '../context/ThemeContext';
import {useSettings} from '../context/SettingsContext';
import textTaqeebatImage from '../assets/images/parts/text_taqeebat.png';

export const AppInitializer = ({children}) => {
  const [isDbReady, setIsDbReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const {themeLoading} = useTheme();
  const {loading: settingsLoading} = useSettings();

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

  // Monitor loading states and set ready state
  useEffect(() => {
    if (isDbReady && !themeLoading && !settingsLoading) {
      setIsReady(true);
    }
  }, [isDbReady, themeLoading, settingsLoading]);

  // Delay native splash screen dismissal slightly to ensure the UI has finished mounting
  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        SplashScreen.hide();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#bce5ea" barStyle="dark-content" />
        <Image
          source={textTaqeebatImage}
          style={styles.logo}
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
