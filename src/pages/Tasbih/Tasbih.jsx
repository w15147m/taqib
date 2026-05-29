import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {ArrowPathIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import {toUrduDigits} from '../../utils/eventsData';
import useTasbih from './hooks/useTasbih';

const Tasbih = () => {
  const {isDarkMode} = useTheme();
  const {count, fatimaPhase, increment, reset} = useTasbih();

  const getPhaseDetails = () => {
    switch (fatimaPhase) {
      case 'allahu_akbar':
        return {arabic: 'اَللّٰہُ اَکْبَرُ', target: 34};
      case 'alhamdulillah':
        return {arabic: 'اَلْحَمْدُ لِلّٰہِ', target: 33};
      case 'subhanallah':
        return {arabic: 'سُبْحَانَ اللّٰہِ', target: 33};
      case 'completed':
        return {arabic: 'تسبیح مکمل ہو گئی!', target: 33};
      default:
        return {arabic: '', target: null};
    }
  };

  const details = getPhaseDetails();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="تسبیح" />

      {/* Small reset button — top left */}
      <View className="px-4 pt-2">
        <TouchableOpacity
          onPress={reset}
          activeOpacity={0.7}
          style={styles.resetBtn}
          className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-slate-800 items-center justify-center">
          <ArrowPathIcon
            size={18}
            color={isDarkMode ? '#818cf8' : '#4f46e5'}
          />
        </TouchableOpacity>
      </View>

      {/* Full-screen tappable area */}
      <TouchableWithoutFeedback
        onPress={increment}
        disabled={fatimaPhase === 'completed'}>
        <View className="flex-1 items-center justify-center pb-16">
          {/* Title */}
          <Text className="text-slate-400 dark:text-slate-500 text-sm font-semibold mb-10">
            تسبیحِ فاطمہ زہراؑ
          </Text>

          {/* Visual circle (not a button — whole screen is tappable) */}
          <View
            style={styles.tapButton}
            className="w-72 h-72 rounded-full border-4 border-emerald-500/20 bg-white dark:bg-slate-900 items-center justify-center">

            {/* Arabic phrase */}
            <Text
              className={`text-3xl font-bold text-center px-4 font-quran-header mb-3 ${
                fatimaPhase === 'completed'
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
  resetBtn: {
    shadowColor: '#4f46e5',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
