import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import useLocation from '../../common/hooks/useLocation';
import { calculatePrayerTimes, getNextPrayer } from '../../utils/prayerTimes';
import {
  getHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
} from '../../utils/eventsData';

const Namaz = () => {
  const { isDarkMode } = useTheme();
  const { location, locationName, loading, error, getLocation } = useLocation();

  // Determine Gregorian date
  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const gregorianDateStr = today.toLocaleDateString('ur-PK', options);

  // Determine Hijri Date
  const todayHijri = getHijriDate(today);
  const hijriDateStr = `${toUrduDigits(todayHijri.day)} ${HIJRI_MONTHS_UR[todayHijri.month - 1]
    } ${toUrduDigits(todayHijri.year)}ھ`;

  // Calculate prayer times
  const times =
    location?.latitude && location?.longitude
      ? calculatePrayerTimes(location.latitude, location.longitude)
      : null;

  const nextPrayer =
    location?.latitude && location?.longitude
      ? getNextPrayer(location.latitude, location.longitude)
      : null;

  const prayerList = [
    { key: 'fajr', nameUr: 'فجر', nameEn: 'Fajr', time: times?.fajr },
    { key: 'dhuhr', nameUr: 'ظہر', nameEn: 'Dhuhr', time: times?.dhuhr },
    { key: 'asr', nameUr: 'عصر', nameEn: 'Asr', time: times?.asr },
    { key: 'maghrib', nameUr: 'مغرب', nameEn: 'Maghrib', time: times?.maghrib },
    { key: 'isha', nameUr: 'عشاء', nameEn: 'Isha', time: times?.isha },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="اوقاتِ نماز" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Date and Location Header Card */}
        <View className="mx-6 my-3 p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-sm">
          <View className="flex-row justify-between items-start mb-4">
            {/* Left side: Dates */}
            <View className="items-start flex-1 pr-2">
              <View className="flex-row items-center mb-1">
                <CalendarIcon
                  size={16}
                  color={isDarkMode ? '#94a3b8' : '#64748b'}
                  className="mr-1.5"
                />
                <Text className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {hijriDateStr}
                </Text>
              </View>
              <Text className="text-xs text-slate-400 dark:text-slate-500 text-left">
                {gregorianDateStr}
              </Text>
            </View>

            {/* Right side: Location Info */}
            <View className="items-end">
              <View className="flex-row items-center mb-1 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-100/50 dark:border-emerald-900/30">
                <MapPinIcon size={14} color="#10b981" className="mr-1" />
                <Text className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {locationName || 'لوکیشن تلاش کریں'}
                </Text>
              </View>
            </View>
          </View>

          {/* Next Prayer Banner */}
          {nextPrayer && (
            <View className="bg-[#bce5ea] dark:bg-indigo-950/20 border border-slate-200/20 dark:border-indigo-900/25 p-4 rounded-2xl flex-row justify-between items-center">
              <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  اگلی نماز
                </Text>
              </View>
              <View className="flex-row items-center">
                <ClockIcon size={18} color="#059669" className="mr-2" />
                <Text className="text-base font-bold text-slate-800 dark:text-slate-200 font-quran-header">
                  {`${nextPrayer.nameUr} ${toUrduDigits(nextPrayer.time)}`}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Loading/Error State or Timings List */}
        {loading ? (
          <View className="py-20 justify-center items-center">
            <ActivityIndicator size="large" color="#6366f1" />
            <Text className="text-sm text-slate-400 dark:text-slate-500 mt-4">
              لوکیشن حاصل کی جا رہی ہے...
            </Text>
          </View>
        ) : error || !location ? (
          <View className="mx-6 p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl items-center shadow-sm">
            <Text className="text-sm font-semibold text-slate-600 dark:text-slate-300 text-center mb-4 leading-6">
              {error ||
                'نماز کے اوقات کا حساب لگانے کے لیے لوکیشن حاصل کرنا ضروری ہے۔'}
            </Text>
            <TouchableOpacity
              onPress={getLocation}
              activeOpacity={0.8}
              className="bg-indigo-600 dark:bg-indigo-700 px-6 py-3 rounded-2xl border border-indigo-500/30">
              <Text className="text-sm font-bold text-white">
                لوکیشن حاصل کریں
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Prayer Timings List */
          <View className="mx-6 mt-2">
            {prayerList.map(prayer => {
              const isUpcoming =
                nextPrayer && nextPrayer.name === prayer.nameEn;
              return (
                <View
                  key={prayer.key}
                  style={isUpcoming ? styles.activeCard : null}
                  className={`flex-row justify-between items-center px-6 py-4 mb-3 rounded-2xl border ${isUpcoming
                    ? 'bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-800/40'
                    : 'bg-white dark:bg-slate-900 border-slate-100/50 dark:border-slate-800/50'
                    }`}>
                  {/* Left: Timing */}
                  <View className="flex-row items-center">
                    <Text
                      className={`text-lg font-bold font-quran-header ${isUpcoming
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-slate-800 dark:text-slate-200'
                        }`}>
                      {prayer.time ? toUrduDigits(prayer.time) : '--:--'}
                    </Text>
                  </View>

                  {/* Right: Prayer name in Urdu */}
                  <Text
                    className={`text-base font-bold font-quran-header text-right flex-1 ${isUpcoming
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-800 dark:text-slate-200'
                      }`}>
                    {prayer.nameUr}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
  activeCard: {
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default Namaz;
