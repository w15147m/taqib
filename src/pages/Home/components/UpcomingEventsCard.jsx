import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import useLocation from '../../../common/hooks/useLocation';
import { getNextPrayer } from '../../../utils/prayerTimes';
import {
  getNextUpcomingEvent,
  getHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
} from '../../../utils/eventsData';

const UpcomingEventsCard = () => {
  const { location, locationName } = useLocation();
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  // Determine dynamic next prayer name and time
  let prayerText = 'ظہر 12:30'; // default fallback
  if (location?.latitude && location?.longitude) {
    const next = getNextPrayer(location.latitude, location.longitude);
    if (next) {
      prayerText = `${next.nameUr} ${next.time}`;
    }
  }

  const displayCity = locationName || '';

  // Get dynamic upcoming Shia event
  const upcomingEvent = getNextUpcomingEvent() || {
    titleUr: 'مناسبات',
    formattedDateUr: '--',
    isToday: false,
  };

  const todayHijri = getHijriDate(new Date());
  const todayHijriStr = `${toUrduDigits(todayHijri.day)} ${HIJRI_MONTHS_UR[todayHijri.month - 1]
    }`;

  // Start pulsing animation if today is an event day
  useEffect(() => {
    if (upcomingEvent.isToday) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1.0,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [upcomingEvent.isToday, glowAnim]);

  return (
    <View
      className={`mx-6 my-3 p-4 rounded-2xl border relative overflow-hidden ${upcomingEvent.isToday
        ? upcomingEvent.type === 'joy'
          ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/30'
          : 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-200/50 dark:border-rose-900/30'
        : 'bg-[#bce5ea] dark:bg-slate-900 border-slate-200/50 dark:border-slate-800/80 shadow-sm'
        }`}>
      {/* Animated Glowing Border Overlay */}
      {upcomingEvent.isToday && (
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: 16,
              borderWidth: 2,
              borderColor: upcomingEvent.type === 'joy' ? '#10b981' : '#f43f5e',
              opacity: glowAnim,
            },
          ]}
          pointerEvents="none"
        />
      )}

      {/* Header Row: Date (Left) and Title (Right) */}
      <View className="flex-row justify-between items-center mb-3">
        {/* Date (Left) */}
        <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {todayHijriStr}
        </Text>

        {/* Title (Right) */}
        <Text className="text-base font-bold text-slate-800 dark:text-slate-100 font-quran-header">
          مناسبات
        </Text>
      </View>

      {/* Featured Today's Event Banner */}
      <View
        className={`p-4 rounded-2xl border ${upcomingEvent.isToday
          ? upcomingEvent.type === 'joy'
            ? 'bg-emerald-100/30 dark:bg-emerald-900/10 border-emerald-200/30 dark:border-emerald-800/20'
            : 'bg-rose-100/30 dark:bg-rose-900/10 border-rose-200/30 dark:border-rose-800/20'
          : 'bg-white/40 dark:bg-emerald-950/20 border border-white/20 dark:border-emerald-900/30'
          }`}>
        {/* Banner Top Row */}
        <View className="flex-row justify-between items-center mb-2">
          {/* Left: City Name */}
          <Text
            className={`text-[10px] font-bold ${upcomingEvent.isToday
              ? upcomingEvent.type === 'joy'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
              : 'text-emerald-600 dark:text-emerald-400'
              }`}>
            {displayCity}
          </Text>

          {/* Right: Event Date & Today/Upcoming Badge */}
          <View className="flex-row items-center">
            <Text
              className={`text-[10px] font-bold mr-2 ${upcomingEvent.isToday
                ? upcomingEvent.type === 'joy'
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-rose-700 dark:text-rose-400'
                : 'text-emerald-700 dark:text-emerald-400'
                }`}>
              {upcomingEvent.formattedDateUr}
            </Text>
            <View
              className={`px-2 py-0.5 rounded-lg ${upcomingEvent.isToday
                ? upcomingEvent.type === 'joy'
                  ? 'bg-emerald-500'
                  : 'bg-rose-500'
                : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                }`}>
              <Text
                className={`text-[9px] font-bold ${upcomingEvent.isToday
                  ? 'text-white'
                  : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                {upcomingEvent.isToday ? 'آج کی مناسبت' : 'آنے والی'}
              </Text>
            </View>
          </View>
        </View>

        {/* Banner Main Row: Prayer (Left) and Event Title (Right) */}
        <View className="flex-row justify-between items-center mt-1">
          {/* Left: Prayer Details (Urdu name and time) */}
          <Text
            className={`text-xs font-bold ${upcomingEvent.isToday
              ? upcomingEvent.type === 'joy'
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-rose-700 dark:text-rose-300'
              : 'text-emerald-700 dark:text-emerald-300'
              }`}>
            {prayerText}
          </Text>

          {/* Right: Urdu Event Title */}
          <Text
            className={`text-base font-bold font-quran-header ${upcomingEvent.type === 'joy'
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
              }`}>
            {upcomingEvent.titleUr}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingEventsCard;
