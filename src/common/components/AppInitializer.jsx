import React, {useEffect, useState, useRef} from 'react';
import {View, StatusBar, Animated, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../context/ThemeContext';
import {useSettings} from '../../context/SettingsContext';
import textTaqeebatImage from '../../assets/images/parts/text_taqeebat.png';

export const AppInitializer = ({children}) => {
  const [isDbReady, setIsDbReady] = useState(true);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const {themeLoading} = useTheme();
  const {loading: settingsLoading} = useSettings();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Dismiss native splash dialog early (after 150ms) to show the identical static React Native view
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const showHome = isDbReady && !themeLoading && !settingsLoading;

  // Monitor loading states. Once everything is loaded, start the exit shrink & fade transition
  useEffect(() => {
    if (showHome && !isTransitioning && !isAnimationFinished) {
      setIsTransitioning(true);

      // Smoothly shrink and fade out the calligraphic logo
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.3,
          duration: 1000, // Slower shrink duration
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800, // Slower fade duration
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsAnimationFinished(true);
      });
    }
  }, [showHome, isTransitioning, isAnimationFinished, scaleAnim, opacityAnim]);

  if (isAnimationFinished) {
    return children;
  }

  return (
    <View style={{flex: 1}}>
      {showHome && children}
      <Animated.View
        style={[
          styles.container,
          showHome && StyleSheet.absoluteFill,
          {opacity: opacityAnim},
        ]}>
        <StatusBar backgroundColor="#bce5ea" barStyle="dark-content" />
        <Animated.Image
          source={textTaqeebatImage}
          style={[
            styles.logo,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
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
