import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StatusBar, 
  StyleSheet
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { taqeebatBgSvg } from '../assets/images/taqeebat_bg';

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
      
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }],
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <SvgXml xml={taqeebatBgSvg} width="100%" height="100%" />
      </Animated.View>

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
