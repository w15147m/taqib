import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {CalendarIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import Header from '../common/components/Header';
import {
  getHijriDate,
  getEventForHijriDate,
  toUrduDigits,
  HIJRI_MONTHS_UR,
  SHIA_EVENTS,
} from '../utils/eventsData';

const CustomDay = ({date, state, isSelected, onSelect}) => {
  const {isDarkMode} = useTheme();

  // Convert Gregorian date to Hijri
  const gDate = new Date(date.dateString);
  const hijri = getHijriDate(gDate);
  const event = getEventForHijriDate(hijri.month, hijri.day);

  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  let textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
  if (isDisabled) {
    textColor = isDarkMode ? 'text-slate-600' : 'text-slate-300';
  } else if (isSelected) {
    textColor = 'text-white font-bold';
  } else if (isToday) {
    textColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
  }

  let dotColor = null;
  if (event) {
    dotColor = event.type === 'joy' ? 'bg-emerald-500' : 'bg-rose-500';
  }

  return (
    <TouchableOpacity
      onPress={() => onSelect(date.dateString)}
      activeOpacity={0.7}
      style={styles.dayButton}
      className={`items-center justify-center rounded-xl ${
        isSelected ? 'bg-emerald-600 dark:bg-emerald-500' : ''
      } ${isToday && !isSelected ? 'border border-emerald-500/30' : ''}`}>
      {/* Hijri Day Number */}
      <Text className={`text-sm ${textColor}`}>{hijri.day}</Text>

      {/* Gregorian Day Number */}
      <Text
        className={`text-[8px] mt-0.5 ${
          isSelected ? 'text-emerald-200' : 'text-slate-400 dark:text-slate-500'
        }`}>
        {date.day}
      </Text>

      {/* Event Dot */}
      {dotColor && (
        <View className={`w-1.5 h-1.5 rounded-full mt-0.5 ${dotColor}`} />
      )}
    </TouchableOpacity>
  );
};

const Monasibat = () => {
  const {isDarkMode} = useTheme();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const selectedHijri = getHijriDate(new Date(selectedDate));
  const selectedEvent = getEventForHijriDate(
    selectedHijri.month,
    selectedHijri.day,
  );

  const [displayedHijriMonth, setDisplayedHijriMonth] = useState(
    getHijriDate(new Date()).month,
  );

  // Format today's full Hijri date
  const todayHijri = getHijriDate(new Date());
  const todayHijriStr = `${toUrduDigits(todayHijri.day)} ${
    HIJRI_MONTHS_UR[todayHijri.month - 1]
  } ${toUrduDigits(todayHijri.year)}ھ`;

  const handleMonthChange = useCallback(gMonth => {
    // Convert middle of displayed Gregorian month (15th) to Hijri
    const midDate = new Date(gMonth.year, gMonth.month - 1, 15);
    const hijri = getHijriDate(midDate);
    setDisplayedHijriMonth(hijri.month);
  }, []);

  const handleDayPress = useCallback(dateString => {
    setSelectedDate(dateString);
  }, []);

  // Filter events of the current displayed Hijri month
  const monthlyEventsList = Object.keys(SHIA_EVENTS)
    .filter(key => key.startsWith(`${displayedHijriMonth}_`))
    .map(key => {
      const dayNum = parseInt(key.split('_')[1], 10);
      return {
        day: dayNum,
        ...SHIA_EVENTS[key],
      };
    })
    .sort((a, b) => a.day - b.day);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="مناسبت" />

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Today's Date Banner Card */}
        <View className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl items-center justify-center mr-3">
              <CalendarIcon
                size={20}
                color={isDarkMode ? '#34d399' : '#059669'}
              />
            </View>
            <View>
              <Text className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                آج کی تاریخ
              </Text>
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
          <Text className="text-base font-bold text-emerald-700 dark:text-emerald-400 font-quran-header">
            {todayHijriStr}
          </Text>
        </View>

        {/* Calendar Card */}
        <View className="mt-4 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <Calendar
            current={selectedDate}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: isDarkMode ? '#64748b' : '#64748b',
              monthTextColor: isDarkMode ? '#f8fafc' : '#0f172a',
              arrowColor: isDarkMode ? '#34d399' : '#059669',
              textMonthFontWeight: 'bold',
            }}
            onMonthChange={handleMonthChange}
            // eslint-disable-next-line react/no-unstable-nested-components
            dayComponent={({date, state}) => (
              <CustomDay
                date={date}
                state={state}
                isSelected={date.dateString === selectedDate}
                onSelect={handleDayPress}
              />
            )}
          />
        </View>

        {/* Selected Day Event Details */}
        <View className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <View className="flex-row justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
            <Text className="text-xs text-slate-400 dark:text-slate-500 font-bold">
              تفصیل مناسبت
            </Text>
            <Text className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {toUrduDigits(selectedHijri.day)}{' '}
              {HIJRI_MONTHS_UR[selectedHijri.month - 1]}
            </Text>
          </View>

          {selectedEvent ? (
            <View
              className={`p-3 rounded-xl border ${
                selectedEvent.type === 'joy'
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/30'
                  : 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/30'
              }`}>
              <Text
                className={`text-base font-bold font-quran-header text-right ${
                  selectedEvent.type === 'joy'
                    ? 'text-emerald-800 dark:text-emerald-400'
                    : 'text-rose-800 dark:text-rose-400'
                }`}>
                {selectedEvent.titleUr}
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 text-right mt-1">
                {selectedEvent.title}
              </Text>
            </View>
          ) : (
            <Text className="text-center py-4 text-slate-400 dark:text-slate-500 text-sm">
              اس تاریخ کو کوئی خاص مناسبت درج نہیں ہے۔
            </Text>
          )}
        </View>

        {/* Monthly Events List */}
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
                    evt.type === 'joy'
                      ? 'border-l-4 border-l-emerald-500 border-slate-100 dark:border-slate-800'
                      : 'border-l-4 border-l-rose-500 border-slate-100 dark:border-slate-800'
                  }`}>
                  <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 pr-2">
                    {toUrduDigits(evt.day)}{' '}
                    {HIJRI_MONTHS_UR[displayedHijriMonth - 1]}
                  </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    width: 38,
    height: 44,
  },
});

export default Monasibat;
