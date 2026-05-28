import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {MapPinIcon} from 'react-native-heroicons/outline';
import useLocation from '../common/hooks/useLocation';
import {calculatePrayerTimes} from '../utils/prayerTimes';

const TestPage = () => {
  const {location, locationName, error, loading, getLocation} = useLocation();
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const times = calculatePrayerTimes(location.latitude, location.longitude);
      setPrayerTimes(times);
    } else {
      setPrayerTimes(null);
    }
  }, [location]);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="flex-1 items-center justify-center px-8">
        {/* Title */}
        <Text className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Location Test
        </Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400 mb-10 text-center">
          Press the button below to fetch your current device location.
        </Text>

        {/* Trigger Button */}
        <TouchableOpacity
          onPress={getLocation}
          disabled={loading}
          activeOpacity={0.8}
          className="flex-row items-center bg-emerald-500 px-8 py-4 rounded-2xl shadow-md">
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <MapPinIcon size={20} color="#fff" />
          )}
          <Text className="text-white font-bold text-base ml-3">
            {loading ? 'Fetching...' : 'Get My Location'}
          </Text>
        </TouchableOpacity>

        {/* Result Box */}
        {location && (
          <View className="mt-8 w-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
            <Text className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-widest">
              Result
            </Text>
            <Text className="text-slate-700 dark:text-slate-300 text-sm mb-1">
              <Text className="font-bold">Latitude: </Text>
              {location.latitude}
            </Text>
            <Text className="text-slate-700 dark:text-slate-300 text-sm mb-1">
              <Text className="font-bold">Longitude: </Text>
              {location.longitude}
            </Text>
            <Text className="text-slate-700 dark:text-slate-300 text-sm mb-1">
              <Text className="font-bold">Accuracy: </Text>
              {location.accuracy ? `±${location.accuracy.toFixed(1)}m` : 'N/A'}
            </Text>
            {locationName && (
              <Text className="text-slate-700 dark:text-slate-300 text-sm">
                <Text className="font-bold">Location: </Text>
                {locationName}
              </Text>
            )}

            {/* Prayer Timings */}
            {prayerTimes && (
              <View className="mt-4 pt-4 border-t border-emerald-200/50 dark:border-emerald-800/50">
                <Text className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-widest">
                  Namaz Timings (Jafari)
                </Text>
                <View className="flex-row flex-wrap justify-between mt-1">
                  {[
                    {label: 'Fajr', time: prayerTimes.fajr},
                    {label: 'Dhuhr', time: prayerTimes.dhuhr},
                    {label: 'Asr', time: prayerTimes.asr},
                    {label: 'Maghrib', time: prayerTimes.maghrib},
                    {label: 'Isha', time: prayerTimes.isha},
                  ].map((p, idx) => (
                    <View
                      key={idx}
                      className="w-[48%] bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-3 mb-2 flex-row justify-between items-center">
                      <Text className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                        {p.label}
                      </Text>
                      <Text className="text-slate-800 dark:text-slate-200 text-sm font-bold">
                        {p.time}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Error Box */}
        {error && (
          <View className="mt-8 w-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl p-5">
            <Text className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-widest">
              Error
            </Text>
            <Text className="text-rose-700 dark:text-rose-300 text-sm">
              {error}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TestPage;
