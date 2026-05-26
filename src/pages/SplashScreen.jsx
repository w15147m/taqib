import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StatusBar, 
  Image, 
  ImageBackground,
  StyleSheet
} from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <ImageBackground 
        source={require('../assets/images/parts/main-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Animated.View 
          style={{ 
            opacity: fadeAnim, 
            transform: [{ translateY: slideAnim }],
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: '12%',
            paddingHorizontal: '8%'
          }}
        >
          {/* Top Text Calligraphy */}
          <Image 
            source={require('../assets/images/parts/text_top.png')}
            style={styles.textTop}
            resizeMode="contain"
          />

          {/* Middle Calligraphy (Title) */}
          <Image 
            source={require('../assets/images/parts/text_middle.png.png')}
            style={styles.textMiddle}
            resizeMode="contain"
          />

          {/* Bottom Calligraphy (Supplication) */}
          <Image 
            source={require('../assets/images/parts/text_bottom.png')}
            style={styles.textBottom}
            resizeMode="contain"
          />
        </Animated.View>
      </ImageBackground>

      {/* Subtle version indicator */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v 1.2.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bce5ea', // matching light blue/teal background
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textTop: {
    width: '80%',
    aspectRatio: 5.6,
    maxHeight: 70,
  },
  textMiddle: {
    width: '75%',
    aspectRatio: 1.64,
    maxHeight: 250,
  },
  textBottom: {
    width: '70%',
    aspectRatio: 1.67,
    maxHeight: 180,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
    width: '100%',
  },
  versionText: {
    color: 'rgba(71, 85, 105, 0.4)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
});

export default SplashScreen;
