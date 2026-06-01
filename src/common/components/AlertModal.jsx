import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  StyleSheet
} from 'react-native';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon 
} from 'react-native-heroicons/solid';
import { useAlert } from '../../context/AlertContext';

const { width } = Dimensions.get('window');

const AlertModal = () => {
  const { visible, config, hideAlert } = useAlert();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  const getIcon = () => {
    switch (config.type) {
      case 'success':
        return <CheckCircleIcon size={60} color="#10b981" />;
      case 'error':
        return <XCircleIcon size={60} color="#ef4444" />;
      default:
        return <InformationCircleIcon size={60} color="#6366f1" />;
    }
  };

  const getButtonColor = () => {
    switch (config.type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-rose-500';
      default:
        return 'bg-indigo-600';
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={hideAlert}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
          className="bg-white dark:bg-slate-900 rounded-[40px] p-8 items-center shadow-2xl border border-slate-50 dark:border-slate-800"
        >
          {/* Decorative Circles inside Alert */}
          <View style={styles.circle1} className="dark:bg-slate-800 dark:opacity-10" />
          <View style={styles.circle2} className="dark:bg-slate-800 dark:opacity-10" />

          <View className="mb-6 z-10">
            {getIcon()}
          </View>
          
          <Text className="text-2xl font-black text-slate-900 dark:text-white mb-2 text-center z-10">
            {config.title}
          </Text>
          
          <Text className="text-slate-500 dark:text-slate-400 text-center mb-10 leading-6 font-medium z-10">
            {config.message}
          </Text>

          {/* Buttons Row */}
          <View className="flex-row w-full space-x-3 z-10">
            {/* Cancel Button */}
            <TouchableOpacity
              onPress={hideAlert}
              className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800"
            >
              <Text className="text-slate-700 dark:text-slate-300 text-center font-bold text-base">
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Confirm Button */}
            <TouchableOpacity
              onPress={() => {
                hideAlert();
                if (config.onConfirm) config.onConfirm();
              }}
              className={`flex-1 py-3.5 rounded-2xl ${getButtonColor()} shadow-lg shadow-slate-200 dark:shadow-none`}
            >
              <Text className="text-white text-center font-bold text-base">
                {config.confirmText || 'Got it'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f3ff',
    opacity: 0.6,
  },
  circle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0fdfa',
    opacity: 0.6,
  }
});

export default AlertModal;
