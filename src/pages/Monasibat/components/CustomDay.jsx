import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useTheme} from '../../../context/ThemeContext';
import {getHijriDate, getEventForHijriDate} from '../../../utils/eventsData';

const CustomDay = ({date, state, isSelected, onSelect}) => {
  const {isDarkMode} = useTheme();

  // Convert Gregorian date to Hijri
  const gDate = new Date(date.dateString);
  const hijri = getHijriDate(gDate);
  const event = getEventForHijriDate(hijri.month, hijri.day);

  const isToday = state === 'today';
  const isDisabled = state === 'disabled';

  let gregColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
  if (isDisabled) {
    gregColor = isDarkMode ? 'text-slate-600' : 'text-slate-300';
  } else if (isSelected) {
    gregColor = 'text-white font-bold';
  } else if (isToday) {
    gregColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
  }

  let hijriColor = isDarkMode ? 'text-slate-500' : 'text-slate-400';
  if (isDisabled) {
    hijriColor = isDarkMode ? 'text-slate-700' : 'text-slate-200';
  } else if (isSelected) {
    hijriColor = 'text-emerald-200';
  } else if (isToday) {
    hijriColor = 'text-emerald-500/80 dark:text-emerald-400/80';
  }

  // Soft translucent highlights for events, contrasting text colors
  let eventBg = '';
  let eventTextColor = 'text-white';
  if (event) {
    if (isSelected) {
      eventBg = 'bg-white/25';
      eventTextColor = 'text-white';
    } else {
      if (event.type === 'joy') {
        eventBg = 'bg-emerald-500/10 dark:bg-emerald-500/20';
        eventTextColor = 'text-emerald-700 dark:text-emerald-300';
      } else {
        eventBg = 'bg-rose-500/10 dark:bg-rose-500/20';
        eventTextColor = 'text-rose-700 dark:text-rose-300';
      }
    }
  }

  return (
    <TouchableOpacity
      onPress={() => onSelect(date.dateString)}
      activeOpacity={0.7}
      style={styles.dayButton}
      className={`items-center justify-start py-1 px-0.5 rounded-xl w-full h-full ${
        isSelected ? 'bg-emerald-600 dark:bg-emerald-500' : ''
      } ${
        isToday && !isSelected
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/50'
          : ''
      }`}>
      {/* Gregorian Day Number */}
      <Text className={`text-xs font-semibold ${gregColor}`}>{date.day}</Text>

      {/* Hijri Date representation (day/month) */}
      <Text className={`text-[8px] mt-0.5 ${hijriColor}`}>
        {`(${hijri.day}/${hijri.month})`}
      </Text>

      {/* Event Title Block */}
      {event && (
        <View
          className={`mt-1 px-1 py-0.5 rounded w-full items-center justify-center ${eventBg}`}>
          <Text
            className={`text-[7px] font-bold text-center ${eventTextColor}`}
            style={styles.eventText}>
            {event.titleUr}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    width: '100%',
    height: 60,
    justifyContent: 'flex-start',
  },
  eventText: {
    fontSize: 7,
    lineHeight: 8,
  },
});

export default CustomDay;
