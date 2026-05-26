import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BaseModal = ({ 
  visible, 
  onClose, 
  title, 
  children,
  footer,
  maxWidth = 500
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="w-full px-4"
              style={{ maxWidth }}
            >
              <View className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-50 dark:border-slate-800">
                {/* Header */}
                <View className="px-6 py-5 border-b border-slate-50 dark:border-slate-800 flex-row items-center justify-between">
                  <Text className="text-xl font-black text-slate-900 dark:text-white">{title}</Text>
                  <TouchableOpacity 
                    onPress={onClose}
                    className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-full"
                  >
                    <XMarkIcon size={20} color={isDarkMode ? "#94a3b8" : "#64748b"} />
                  </TouchableOpacity>
                </View>

                {/* Content */}
                <View className="p-6">
                  {children}
                </View>

                {/* Optional Footer */}
                {footer && (
                  <View className="px-6 pb-6 pt-2">
                    {footer}
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Slate-900 with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseModal;
