import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {runMigrations} from '../db/client';
import {useTheme} from '../context/ThemeContext';
import {useSettings} from '../context/SettingsContext';

export const AppInitializer = ({children}) => {
  const [isDbReady, setIsDbReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const {themeLoading} = useTheme();
  const {loading: settingsLoading} = useSettings();

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

  useEffect(() => {
    if (isDbReady && !themeLoading && !settingsLoading) {
      setIsReady(true);
      SplashScreen.hide();
    }
  }, [isDbReady, themeLoading, settingsLoading]);

  if (!isReady) {
    // Return a blank view that matches native splash background color (#bce5ea)
    // to prevent any white flash while native splash screen transitions.
    return (
      <View style={{flex: 1, backgroundColor: '#bce5ea'}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      </View>
    );
  }

  return children;
};
