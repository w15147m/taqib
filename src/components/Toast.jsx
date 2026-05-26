import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from 'react-native-heroicons/solid';
import { useAlert } from '../context/AlertContext';

const { width } = Dimensions.get('window');

const Toast = () => {
  const { toastVisible, toastConfig, hideToast } = useAlert();
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (toastVisible) {
      // Slide down
      Animated.spring(slideAnim, {
        toValue: 50, // Distance from top
        useNativeDriver: true,
        friction: 8,
      }).start();

      // Auto hide
      const timer = setTimeout(() => {
        hideToast();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Slide up
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toastVisible]);

  if (!toastConfig) return null;

  const getIcon = () => {
    switch (toastConfig.type) {
      case 'success':
        return <CheckCircleIcon size={24} color="#10b981" />;
      case 'error':
        return <XCircleIcon size={24} color="#ef4444" />;
      default:
        return <InformationCircleIcon size={24} color="#6366f1" />;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View className="flex-row items-center bg-white dark:bg-slate-900 px-4 py-3 rounded-full shadow-lg border border-slate-100 dark:border-slate-800">
        {getIcon()}
        <Text className="ml-3 font-semibold text-slate-800 dark:text-white text-sm">
          {toastConfig.message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default Toast;
