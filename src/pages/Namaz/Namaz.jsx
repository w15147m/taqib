import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '../../context/ThemeContext';
import Header from '../../common/components/Header';
import useLocation from '../../common/hooks/useLocation';
import {calculatePrayerTimes, getNextPrayer} from '../../utils/prayerTimes';
import {
  getHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
} from '../../utils/eventsData';

// Child Components
import LocationCard from './components/LocationCard';
import NamazList from './components/NamazList';
import EditTimeModal from './components/EditTimeModal';

const OFFSETS_STORAGE_KEY = 'namaz_prayer_offsets';

const Namaz = () => {
  const {isDarkMode} = useTheme();
  const {location, locationName, loading, error, getLocation} = useLocation();

  const [offsets, setOffsets] = useState({
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState(null);

  // Load offsets on mount
  useEffect(() => {
    const loadOffsets = async () => {
      try {
        const stored = await AsyncStorage.getItem(OFFSETS_STORAGE_KEY);
        if (stored) {
          setOffsets(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Error loading prayer offsets:', err);
      }
    };
    loadOffsets();
  }, []);

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
  const hijriDateStr = `${toUrduDigits(todayHijri.day)} ${
    HIJRI_MONTHS_UR[todayHijri.month - 1]
  } ${toUrduDigits(todayHijri.year)}ھ`;

  // Calculate prayer times with offsets
  const times =
    location?.latitude && location?.longitude
      ? calculatePrayerTimes(
          location.latitude,
          location.longitude,
          today,
          offsets,
        )
      : null;

  const nextPrayer =
    location?.latitude && location?.longitude
      ? getNextPrayer(location.latitude, location.longitude, today, offsets)
      : null;

  const prayerList = [
    {key: 'fajr', nameUr: 'فجر', nameEn: 'Fajr', time: times?.fajr},
    {key: 'dhuhr', nameUr: 'ظہر', nameEn: 'Dhuhr', time: times?.dhuhr},
    {key: 'asr', nameUr: 'عصر', nameEn: 'Asr', time: times?.asr},
    {key: 'maghrib', nameUr: 'مغرب', nameEn: 'Maghrib', time: times?.maghrib},
    {key: 'isha', nameUr: 'عشاء', nameEn: 'Isha', time: times?.isha},
  ];

  const handleEditPress = useCallback(prayer => {
    setEditingPrayer(prayer);
    setEditModalVisible(true);
  }, []);

  const calculateOffset = (baseTimeStr, customHoursStr, customMinutesStr) => {
    const [baseHoursStr, baseMinutesStr] = baseTimeStr.split(':');
    const baseHours = parseInt(baseHoursStr, 10);
    const baseMinutes = parseInt(baseMinutesStr, 10);

    const customH = parseInt(customHoursStr, 10) || 12;
    const customM = parseInt(customMinutesStr, 10) || 0;

    const baseTotal = (baseHours % 12) * 60 + baseMinutes;
    const customTotal = (customH % 12) * 60 + customM;

    let diff = customTotal - baseTotal;
    if (diff > 360) {
      diff -= 720;
    }
    if (diff < -360) {
      diff += 720;
    }

    return diff;
  };

  const handleSaveOffset = async (customHours, customMinutes) => {
    if (!editingPrayer) {
      return;
    }

    // Calculate base times without offsets to get the reference time
    const baseTimes =
      location?.latitude && location?.longitude
        ? calculatePrayerTimes(location.latitude, location.longitude, today, {})
        : null;

    if (!baseTimes || !baseTimes[editingPrayer.key]) {
      setEditModalVisible(false);
      return;
    }

    const baseTimeStr = baseTimes[editingPrayer.key];
    const diff = calculateOffset(baseTimeStr, customHours, customMinutes);

    const newOffsets = {
      ...offsets,
      [editingPrayer.key]: diff,
    };

    setOffsets(newOffsets);
    try {
      await AsyncStorage.setItem(
        OFFSETS_STORAGE_KEY,
        JSON.stringify(newOffsets),
      );
    } catch (err) {
      console.error('Error saving prayer offsets:', err);
    }
    setEditModalVisible(false);
  };

  const handleResetOffset = async () => {
    if (!editingPrayer) {
      return;
    }

    const newOffsets = {
      ...offsets,
      [editingPrayer.key]: 0,
    };

    setOffsets(newOffsets);
    try {
      await AsyncStorage.setItem(
        OFFSETS_STORAGE_KEY,
        JSON.stringify(newOffsets),
      );
    } catch (err) {
      console.error('Error saving prayer offsets:', err);
    }
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="اوقاتِ نماز" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Location & Upcoming Prayer Info Card */}
        <LocationCard
          hijriDateStr={hijriDateStr}
          gregorianDateStr={gregorianDateStr}
          locationName={locationName}
          nextPrayer={nextPrayer}
          isDarkMode={isDarkMode}
        />

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
          /* Prayer Timings List component */
          <NamazList
            prayerList={prayerList}
            onEditPress={handleEditPress}
            toUrduDigits={toUrduDigits}
          />
        )}
      </ScrollView>

      {/* Edit Custom Prayer Time Modal component */}
      <EditTimeModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        prayer={editingPrayer}
        onSave={handleSaveOffset}
        onReset={handleResetOffset}
        isDarkMode={isDarkMode}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
});

export default Namaz;
