import React from 'react';
import {View, Text} from 'react-native';

const CURRENT_EVENT = {
  id: 'eid_al_adha',
  titleUr: 'عیدِ قربان (عید الاضحیٰ)',
  hijriDate: '۱۰ ذوالحجہ',
  hijriDateEn: '10 Dhul-Hijjah',
  nextPrayerName: 'Zuhr',
  nextPrayerTime: '12:30',
};

const UpcomingEventsCard = () => {
  return (
    <View className="mx-6 my-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
      {/* Header Row: Date (Left) and Title (Right) */}
      <View className="flex-row justify-between items-center mb-3">
        {/* Date (Left) */}
        <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {CURRENT_EVENT.hijriDate}
        </Text>

        {/* Title (Right) */}
        <Text className="text-base font-bold text-slate-800 dark:text-slate-100 font-quran-header">
          مناسبت
        </Text>
      </View>

      {/* Featured Today's Event Banner */}
      <View className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 p-4 rounded-2xl">
        {/* Banner Top Row */}
        <View className="flex-row justify-between items-center mb-2">
          {/* Left: English Date */}
          <Text className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {CURRENT_EVENT.hijriDateEn}
          </Text>

          {/* Right: Today Badge */}
          <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
            <Text className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              آج / TODAY
            </Text>
          </View>
        </View>

        {/* Banner Main Row: Prayer (Left) and Event Title (Right) */}
        <View className="flex-row justify-between items-center mt-1">
          {/* Left: Prayer Details */}
          <Text className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {CURRENT_EVENT.nextPrayerName} {CURRENT_EVENT.nextPrayerTime}
          </Text>

          {/* Right: Urdu Event Title */}
          <Text className="text-base font-bold text-emerald-800 dark:text-emerald-400 font-quran-header">
            {CURRENT_EVENT.titleUr}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingEventsCard;
