import React from 'react';
import {View, Text} from 'react-native';
import {toUrduDigits, HIJRI_MONTHS_UR} from '../../../utils/eventsData';

const MonthlyEventsList = ({displayedHijriMonth, monthlyEventsList}) => {
  return (
    <View className="mt-4 mb-8">
      <Text className="text-base font-bold text-slate-800 dark:text-slate-200 mb-3 text-right font-quran-header">
        {HIJRI_MONTHS_UR[displayedHijriMonth - 1]} کی مناسبتیں
      </Text>

      {monthlyEventsList.length > 0 ? (
        <View className="space-y-2">
          {monthlyEventsList.map((evt, idx) => (
            <View
              key={`evt-${idx}`}
              className={`p-4 bg-white dark:bg-slate-900 rounded-2xl border flex-row items-center justify-between shadow-sm ${
                evt.isToday
                  ? 'border-2 border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20'
                  : evt.type === 'joy'
                  ? 'border-l-4 border-l-emerald-500 border-slate-100 dark:border-slate-800'
                  : 'border-l-4 border-l-rose-500 border-slate-100 dark:border-slate-800'
              }`}>
              <View className="flex-row items-center">
                {evt.isToday && (
                  <View className="bg-emerald-500/20 dark:bg-emerald-400/20 px-2 py-0.5 rounded-full mr-2">
                    <Text className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      آج
                    </Text>
                  </View>
                )}
                <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 pr-2">
                  {toUrduDigits(evt.day)}{' '}
                  {HIJRI_MONTHS_UR[displayedHijriMonth - 1]}
                </Text>
              </View>
              <View className="flex-1 items-end pl-2">
                <Text className="text-sm font-bold text-slate-800 dark:text-slate-200 text-right font-quran-header">
                  {evt.titleUr}
                </Text>
                <Text className="text-[10px] text-slate-400 dark:text-slate-500 text-right mt-0.5">
                  {evt.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm items-center">
          <Text className="text-slate-400 dark:text-slate-500 text-sm">
            اس مہینے کی کوئی مناسبت درج نہیں ہے۔
          </Text>
        </View>
      )}
    </View>
  );
};

export default MonthlyEventsList;
