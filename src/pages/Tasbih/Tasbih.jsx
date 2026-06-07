import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ArrowPathIcon} from 'react-native-heroicons/outline';
import {ChevronDownIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import BaseModal from '../../common/components/BaseModal';
import {toUrduDigits} from '../../utils/eventsData';
import useTasbih from './hooks/useTasbih';

const Tasbih = () => {
  const {isDarkMode} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    count,
    selectedPresetId,
    fatimaPhase,
    customText,
    setCustomText,
    customLimit,
    setCustomLimit,
    isCompleted,
    increment,
    reset,
    changePreset,
    PRESETS,
  } = useTasbih();

  const currentPreset = PRESETS.find(p => p.id === selectedPresetId);

  const getPhaseDetails = () => {
    if (selectedPresetId === 'fatima') {
      switch (fatimaPhase) {
        case 'allahu_akbar':
          return {arabic: 'اَللّٰہُ اَکْبَرُ', target: 34, completed: false};
        case 'alhamdulillah':
          return {arabic: 'اَلْحَمْدُ لِلّٰہِ', target: 33, completed: false};
        case 'subhanallah':
          return {arabic: 'سُبْحَانَ اللّٰہِ', target: 33, completed: false};
        case 'completed':
          return {arabic: 'تسبیح مکمل ہو گئی!', target: 33, completed: true};
        default:
          return {arabic: '', target: null, completed: false};
      }
    } else {
      const limit = parseInt(customLimit, 10) || 100;
      return {
        arabic: isCompleted ? 'تسبیح مکمل ہو گئی!' : customText || 'تسبیح',
        target: limit,
        completed: isCompleted,
      };
    }
  };

  const details = getPhaseDetails();
  const isCompletedDisplay = details.completed;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="تسبیح" />

      {/* Configuration Section (rendered outside the counter touch area) */}
      <View className="mx-6 mt-2 p-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-sm z-50">
        <View className="flex-row items-center gap-3">
          {/* Dropdown Selector trigger */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
            className="flex-1 flex-row justify-between items-center bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700">
            <ChevronDownIcon
              size={20}
              color={isDarkMode ? '#94a3b8' : '#64748b'}
            />
            <Text className="text-sm font-semibold text-slate-800 dark:text-slate-100 text-right flex-1 pr-2">
              {currentPreset ? currentPreset.name : 'تسبیح کا انتخاب'}
            </Text>
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={reset}
            activeOpacity={0.7}
            className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-slate-800 items-center justify-center border border-indigo-100/50 dark:border-slate-700">
            <ArrowPathIcon
              size={20}
              color={isDarkMode ? '#818cf8' : '#4f46e5'}
            />
          </TouchableOpacity>
        </View>

        {/* Custom Input Fields (show only if single preset is selected) */}
        {currentPreset && currentPreset.type === 'single' && (
          <View className="flex-row gap-3 mt-3">
            {/* Text Input for Custom Dhikr */}
            <TextInput
              placeholder="تسبیح کا متن..."
              placeholderTextColor={isDarkMode ? '#94a3b8' : '#64748b'}
              value={customText}
              onChangeText={setCustomText}
              className="flex-1 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-right text-sm py-0"
              style={{height: 46}}
            />

            {/* Target Limit Input */}
            <TextInput
              placeholder="حد (100)"
              placeholderTextColor={isDarkMode ? '#94a3b8' : '#64748b'}
              value={customLimit}
              onChangeText={setCustomLimit}
              keyboardType="numeric"
              className="w-24 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-center text-sm py-0"
              style={{height: 46}}
            />
          </View>
        )}
      </View>

      {/* Full-screen tappable area */}
      <TouchableWithoutFeedback
        onPress={increment}
        disabled={isCompletedDisplay}>
        <View className="flex-1 items-center justify-center pb-16">
          {/* Title */}
          <Text className="text-slate-400 dark:text-slate-500 text-sm font-semibold mb-10">
            {currentPreset ? currentPreset.name : 'تسبیح'}
          </Text>

          {/* Visual circle (not a button — whole screen is tappable) */}
          <View
            style={styles.tapButton}
            className="w-72 h-72 rounded-full border-4 border-emerald-500/20 bg-white dark:bg-slate-900 items-center justify-center">
            {/* Arabic phrase */}
            <Text
              className={`text-3xl font-bold text-center px-4 font-quran-header mb-3 ${
                isCompletedDisplay
                  ? 'text-emerald-500 dark:text-emerald-400 text-base'
                  : 'text-slate-800 dark:text-slate-100'
              }`}>
              {details.arabic}
            </Text>

            {/* Large counter */}
            <View className="flex-row items-baseline">
              <Text
                style={styles.countText}
                className="text-emerald-600 dark:text-emerald-400 font-bold font-quran-header">
                {toUrduDigits(count)}
              </Text>
              {details.target && (
                <Text
                  style={styles.targetText}
                  className="text-slate-300 dark:text-slate-600 font-quran-header ml-1">
                  {` / ${toUrduDigits(details.target)}`}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Preset Selector Modal */}
      <BaseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="تسبیح کا انتخاب کریں"
        maxWidth={400}>
        <View className="divide-y divide-slate-100 dark:divide-slate-800">
          {PRESETS.map(preset => (
            <TouchableOpacity
              key={preset.id}
              activeOpacity={0.7}
              onPress={() => {
                changePreset(preset.id);
                setModalVisible(false);
              }}
              className="py-4 flex-row justify-between items-center">
              <Text className="text-base text-slate-800 dark:text-slate-100 text-right flex-1 pr-2">
                {preset.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BaseModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tapButton: {
    shadowColor: '#10b981',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 15,
  },
  countText: {
    fontSize: 60,
    lineHeight: 70,
  },
  targetText: {
    fontSize: 22,
    lineHeight: 30,
  },
});

export default Tasbih;
