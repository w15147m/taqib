import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {toUrduDigits, HIJRI_MONTHS_UR} from '../../../utils/eventsData';
import BaseModal from '../../../common/components/BaseModal';

const MonthlyEventsList = ({headerTitle, monthlyEventsList}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEventPress = evt => {
    setSelectedEvent(evt);
    setModalVisible(true);
  };

  return (
    <View className="mt-4 mb-8">
      <Text className="text-base font-bold text-slate-800 dark:text-slate-200 mb-3 text-right font-quran-header">
        {headerTitle} کی مناسبات
      </Text>

      {monthlyEventsList.length > 0 ? (
        <View className="space-y-2">
          {monthlyEventsList.map((evt, idx) => (
            <TouchableOpacity
              key={`evt-${idx}`}
              activeOpacity={0.8}
              onPress={() => handleEventPress(evt)}
              className={`p-4 bg-white dark:bg-slate-900 rounded-2xl border flex-row items-center justify-between shadow-sm ${
                evt.isToday
                  ? 'border-2 border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20'
                  : evt.type === 'joy'
                  ? 'border-l-4 border-l-emerald-500 border-slate-100 dark:border-slate-800'
                  : 'border-l-4 border-l-rose-500 border-slate-100 dark:border-slate-800'
              }`}>
              <View className="items-start pr-2">
                <View className="flex-row items-center">
                  {evt.isToday && (
                    <View className="bg-emerald-500/20 dark:bg-emerald-400/20 px-2 py-0.5 rounded-full mr-2">
                      <Text className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        آج
                      </Text>
                    </View>
                  )}
                  <Text className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {toUrduDigits(evt.day)}{' '}
                    {HIJRI_MONTHS_UR[evt.month - 1]}
                  </Text>
                </View>
                {evt.gregorianDateStr && (
                  <Text className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 text-left">
                    {evt.gregorianDateStr}
                  </Text>
                )}
                {evt.countdownText && !evt.isToday && (
                  <Text className="text-[9px] font-semibold text-indigo-500 dark:text-indigo-400 mt-1 text-left">
                    {evt.countdownText}
                  </Text>
                )}
              </View>
              <View className="flex-1 items-end pl-2">
                <Text
                  className={`text-sm font-bold text-right font-quran-header ${
                    evt.type === 'joy'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}>
                  {evt.titleUr}
                </Text>
                <Text className="text-[10px] text-slate-400 dark:text-slate-500 text-right mt-0.5">
                  {evt.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm items-center">
          <Text className="text-slate-400 dark:text-slate-500 text-sm">
            اس مہینے کی کوئی مناسبات درج نہیں ہے۔
          </Text>
        </View>
      )}

      {/* Details Modal */}
      <BaseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="مناسبت کی تفصیلات"
        maxWidth={400}>
        {selectedEvent && (
          <View className="items-center py-4">
            {/* Event Type Badge */}
            <View
              className={`px-3 py-1 rounded-full mb-4 ${
                selectedEvent.type === 'joy'
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/30'
                  : 'bg-rose-100 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/30'
              }`}>
              <Text
                className={`text-xs font-bold ${
                  selectedEvent.type === 'joy'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}>
                {selectedEvent.type === 'joy' ? 'مسرت / عید' : 'عزا / سوگ'}
              </Text>
            </View>

            {/* Urdu Title */}
            <Text
              className={`text-2xl font-bold text-center font-quran-header mb-2 ${
                selectedEvent.type === 'joy'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}>
              {selectedEvent.titleUr}
            </Text>

            {/* English Title */}
            <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
              {selectedEvent.title}
            </Text>

            {/* Description Text */}
            {selectedEvent.description && (
              <Text className="text-sm text-slate-600 dark:text-slate-350 text-center mb-6 leading-6 px-4 font-quran-header">
                {selectedEvent.description}
              </Text>
            )}

            {/* Dates Card */}
            <View className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 p-4 rounded-2xl mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  اسلامی تاریخ
                </Text>
                <Text className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {toUrduDigits(selectedEvent.day)}{' '}
                  {HIJRI_MONTHS_UR[selectedEvent.month - 1]}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  عیسوی تاریخ
                </Text>
                <Text className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {selectedEvent.gregorianDateStr}
                </Text>
              </View>
            </View>

            {/* Countdown Box */}
            <View className="w-full bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-100/30 dark:border-indigo-900/20 p-4 rounded-2xl items-center">
              <Text className="text-xs font-bold text-indigo-500 dark:text-indigo-400 mb-1">
                وقت باقی
              </Text>
              <Text className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300">
                {selectedEvent.countdownText === 'آج'
                  ? 'آج یہ مناسبت ہے'
                  : selectedEvent.countdownText === 'کل'
                  ? 'کل یہ مناسبت ہے'
                  : selectedEvent.countdownText}
              </Text>
            </View>
          </View>
        )}
      </BaseModal>
    </View>
  );
};

export default MonthlyEventsList;
