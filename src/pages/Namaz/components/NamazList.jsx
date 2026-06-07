import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const NamazList = ({prayerList, onEditPress, toUrduDigits}) => {
  return (
    <View className="mx-6 mt-2">
      {prayerList.map(prayer => {
        return (
          <TouchableOpacity
            key={prayer.key}
            onPress={() => onEditPress(prayer)}
            activeOpacity={0.7}
            className="flex-row justify-between items-center px-6 py-4 mb-3 rounded-2xl border bg-white dark:bg-slate-900 border-slate-100/50 dark:border-slate-800/50">
            {/* Left: Timing */}
            <View className="flex-row items-center">
              <Text className="text-lg font-bold font-quran-header text-slate-800 dark:text-slate-200">
                {prayer.time ? toUrduDigits(prayer.time) : '--:--'}
              </Text>
            </View>

            {/* Right: Prayer name in Urdu */}
            <Text className="text-base font-bold font-quran-header text-right flex-1 text-slate-800 dark:text-slate-200">
              {prayer.nameUr}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NamazList;
