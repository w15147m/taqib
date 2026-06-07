import React from 'react';
import {View, Text} from 'react-native';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import {toUrduDigits} from '../../../utils/eventsData';

const LocationCard = ({
  hijriDateStr,
  gregorianDateStr,
  locationName,
  nextPrayer,
  isDarkMode,
}) => {
  return (
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
  );
};

export default LocationCard;
